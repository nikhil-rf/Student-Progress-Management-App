import { useState, useEffect } from 'react';
import { getStudentDetails } from '../api/studentAPI';
import ContestHistory from './ContestHistory';
import ProblemSolvingData from './ProblemSolvingData';
import SyncTimeUpdater from './SyncTimeUpdater';

export default function StudentProfile({ studentId }) {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    const data = await getStudentDetails(studentId);
    setStudent(data);
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{student.name}'s Profile</h2>
      <SyncTimeUpdater student={student} refresh={fetchStudent} />
      <ContestHistory contests={student.cfData.contests} />
      <ProblemSolvingData problems={student.cfData.problems} heatmap={student.cfData.heatmap} />
    </div>
  );
}
