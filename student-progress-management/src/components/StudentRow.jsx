import { Link } from 'react-router-dom';
// import { deleteStudent } from '../api/studentAPI';
import { deleteStudent } from '../api/studentAPI';


export default function StudentRow({ student, refresh }) {
  const handleDelete = async () => {
    await deleteStudent(student._id);
    refresh();
  };

  return (
    <tr className="text-center border-b dark:border-gray-700">
      <td>{student.name}</td>
      <td>{student.email}</td>
      <td>{student.phone}</td>
      <td>{student.cf_handle}</td>
      <td>{student.current_rating}</td>
      <td>{student.max_rating}</td>
      <td>{new Date(student.last_synced).toLocaleString()}</td>
      <td className="space-x-2">
        <Link to={`/student/${student._id}`} className="text-blue-600">View</Link>
        <button onClick={handleDelete} className="text-red-600">Delete</button>
      </td>
    </tr>
  );
}
