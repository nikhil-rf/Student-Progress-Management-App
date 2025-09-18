import { useEffect, useState } from 'react';
import { getStudents } from '../api/studentAPI';
import StudentRow from './StudentRow';

export default function StudentTable() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Handle</th>
            <th>Current Rating</th>
            <th>Max Rating</th>
            <th>Last Sync</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <StudentRow key={student._id} student={student} refresh={fetchStudents} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
