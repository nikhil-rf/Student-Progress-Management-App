import { useState, useEffect } from 'react';

export function LightDarkToggle() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button onClick={() => setIsDark(!isDark)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
