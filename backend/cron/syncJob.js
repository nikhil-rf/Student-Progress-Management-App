const cron = require('node-cron');
const Student = require('../models/Student');
const CFData = require('../models/CFData');
const { fetchUserInfo, fetchUserRating, fetchUserSubmissions } = require('../utils/codeforcesAPI');
const { sendReminderEmail } = require('../services/emailService');

// Run daily at 2 AM (Adjustable later)
const scheduleStudentSync = (cronTime = '0 2 * * *') => {
  cron.schedule(cronTime, async () => {
    console.log('⏰ Running Daily Sync Job');

    const students = await Student.find();

    for (const student of students) {
      try {
        const userInfo = await fetchUserInfo(student.cf_handle);
        const userRating = await fetchUserRating(student.cf_handle);
        const submissions = await fetchUserSubmissions(student.cf_handle);

        student.current_rating = userInfo.rating || 0;
        student.max_rating = userInfo.maxRating || 0;
        student.last_synced = new Date();
        await student.save();

        await CFData.findOneAndDelete({ studentId: student._id });
        const cfData = await processCFData(student._id, userRating, submissions);
        await CFData.create(cfData);

        const inactive = checkInactivity(submissions);
        if (inactive && student.auto_email_enabled) {
          await sendReminderEmail(student.email, student.name);
          student.reminder_count += 1;
          await student.save();
        }

        console.log(`✅ Synced data for ${student.name}`);
      } catch (err) {
        console.error(`❌ Error syncing student ${student.name}: ${err.message}`);
      }
    }

    console.log('✅ Daily Sync Job Completed');
  });
};

// Helper: Check Inactivity
function checkInactivity(submissions) {
  const sevenDaysAgo = Date.now() / 1000 - 7 * 24 * 60 * 60;

  for (let submission of submissions) {
    if (submission.creationTimeSeconds >= sevenDaysAgo && submission.verdict === 'OK') {
      return false; // Active user
    }
  }

  return true; // Inactive user
}

// Helper: Reuse CF Data Processor
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

module.exports = scheduleStudentSync;
