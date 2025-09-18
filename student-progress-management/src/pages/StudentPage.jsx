import { useParams } from 'react-router-dom';
import StudentProfile from '../components/StudentProfile';

export default function StudentPage() {
  const { id } = useParams();
  return (
    <div className="p-4">
      <StudentProfile studentId={id} />
    </div>
  );
}
