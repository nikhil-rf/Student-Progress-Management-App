import { LightDarkToggle } from './LightDarkToggle';

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-blue-600 dark:bg-blue-800 text-white">
      <h1 className="text-2xl font-bold">Student Progress Management</h1>
      <LightDarkToggle />
    </div>
  );
}
