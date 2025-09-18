export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
