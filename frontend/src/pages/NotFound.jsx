import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 relative">
    <div className="absolute top-6 right-6">
      <ThemeToggle />
    </div>
    <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
    <p className="text-slate-600 mb-8 text-center max-w-md dark:text-gray-400">
      Trang không tồn tại hoặc đã được di chuyển.
    </p>
    <Link
      to="/"
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-semibold text-white"
    >
      <Home className="w-5 h-5" /> Về trang chủ
    </Link>
  </div>
);

export default NotFound;
