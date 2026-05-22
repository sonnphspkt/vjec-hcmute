import { Sun, Moon } from 'lucide-react';
import useThemeStore from '@/store/themeStore';

const ThemeToggle = ({ className = '' }) => {
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      className={`p-2 rounded-lg border border-slate-200/80 bg-white/80 text-slate-700 hover:bg-slate-100 transition-colors dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10 ${className}`}
      title={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
      aria-label={isDark ? 'Bật chế độ sáng' : 'Bật chế độ tối'}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
