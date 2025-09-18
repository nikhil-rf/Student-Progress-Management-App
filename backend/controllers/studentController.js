const Student = require('../models/Student');
const CFData = require('../models/CFData');
const { fetchUserInfo, fetchUserRating, fetchUserSubmissions } = require('../utils/codeforcesAPI');

// 🟢 GET All Students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 ADD Student
exports.addStudent = async (req, res) => {
  try {
    const { name, email, phone, cf_handle } = req.body;

    const userInfo = await fetchUserInfo(cf_handle);
    const userRating = await fetchUserRating(cf_handle);
    const submissions = await fetchUserSubmissions(cf_handle);

    const currentRating = userInfo.rating || 0;
    const maxRating = userInfo.maxRating || 0;

    const newStudent = await Student.create({
      name, email, phone, cf_handle, current_rating: currentRating, max_rating: maxRating
    });

    const cfData = await processCFData(newStudent._id, userRating, submissions);
    await CFData.create(cfData);

    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 UPDATE Student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, cf_handle } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(id, { name, email, phone, cf_handle }, { new: true });

    const userInfo = await fetchUserInfo(cf_handle);
    const userRating = await fetchUserRating(cf_handle);
    const submissions = await fetchUserSubmissions(cf_handle);

    updatedStudent.current_rating = userInfo.rating || 0;
    updatedStudent.max_rating = userInfo.maxRating || 0;
    updatedStudent.last_synced = new Date();
    await updatedStudent.save();

    await CFData.findOneAndDelete({ studentId: id });
    const cfData = await processCFData(id, userRating, submissions);
    await CFData.create(cfData);

    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 DELETE Student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    await CFData.findOneAndDelete({ studentId: id });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 GET Student Details (Profile View)
exports.getStudentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    const cfData = await CFData.findOne({ studentId: id });

    res.json({ student, cfData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Helper: Process Codeforces Data
async function processCFData(studentId, contests, submissions) {
  const contestHistory = contests.map(c => ({
    contestId: c.contestId,
    contestName: c.contestName,
    rank: c.rank,
    oldRating: c.oldRating,
    newRating: c.newRating,
    ratingUpdateTimeSeconds: c.ratingUpdateTimeSeconds
  }));

  const solvedProblems = {};
  const heatmap = {};

  submissions.forEach(sub => {
    if (sub.verdict === 'OK') {
      const key = `${sub.problem.contestId}-${sub.problem.index}`;
      if (!solvedProblems[key]) {
        const date = new Date(sub.creationTimeSeconds * 1000);
        const day = date.toISOString().split('T')[0];

        solvedProblems[key] = {
          problemId: key,
          name: sub.problem.name,
          rating: sub.problem.rating || 0,
          tags: sub.problem.tags,
          solvedAt: date
        };

        heatmap[day] = (heatmap[day] || 0) + 1;
      }
    }
  });

  return {
    studentId,
    contests: contestHistory,
    problems: Object.values(solvedProblems),
    heatmap: Object.entries(heatmap).map(([date, count]) => ({ date, count })),
    lastFetched: new Date()
  };
}
