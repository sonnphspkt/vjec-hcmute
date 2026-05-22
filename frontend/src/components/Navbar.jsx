import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import useAuthStore from '@/store/authStore';
import ThemeToggle from '@/components/ThemeToggle';

const linkStyles =
  'rounded-lg border border-slate-200/80 px-3 py-2 text-slate-700 hover:border-primary-400/70 hover:bg-primary-50 hover:text-primary-600 transition-colors dark:border-white/10 dark:text-gray-100 dark:hover:border-primary-400/60 dark:hover:bg-white/10 dark:hover:text-primary-400';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200/80 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center font-bold text-lg text-white">
              UTE
            </div>
            <span className="font-bold text-xl hidden sm:block text-slate-900 dark:text-white">
              UTE Job Platform
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/jobs" className={linkStyles}>
              Việc làm
            </Link>
            <Link to="/projects" className={linkStyles}>
              Dự án
            </Link>
            <Link to="/companies" className={linkStyles}>
              Doanh nghiệp
            </Link>
            <Link to="/news" className={linkStyles}>
              Tin tức
            </Link>
            <Link to="/talent" className={linkStyles}>
              Talent DNA
            </Link>
            <div className="relative group">
              <button
                type="button"
                className={`${linkStyles} inline-flex items-center gap-0.5`}
                aria-expanded={false}
                aria-haspopup="true"
              >
                Đề án <ChevronDown className="w-4 h-4 opacity-70" />
              </button>
              <div className="absolute right-0 top-full pt-1 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60]">
                <div className="glass rounded-xl border border-slate-200/90 dark:border-white/10 py-2 shadow-xl text-sm">
                  <Link to="/help" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-white/10">
                    Mục lục &amp; hướng dẫn (I–XV)
                  </Link>
                  <Link to="/about" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-white/10">
                    I–III · Tầm nhìn &amp; giải pháp
                  </Link>
                  <Link to="/career-dna" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-white/10">
                    IV · Career DNA
                  </Link>
                  <Link to="/ai-engine" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-white/10">
                    V · AI Career Engine
                  </Link>
                  <Link to="/showcase-ecosystem" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-white/10">
                    VI · Showcase Ecosystem
                  </Link>
                  <Link to="/remote-work" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-white/10">
                    VII · Remote Work
                  </Link>
                  <Link to="/compare" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-white/10">
                    XI · So sánh điểm khác biệt
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Link
                  to={
                    user?.role === 'student'
                      ? '/student'
                      : user?.role === 'company'
                        ? '/company'
                        : '/'
                  }
                  className={`flex items-center space-x-2 ${linkStyles}`}
                >
                  <User className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 glass rounded-lg hover:bg-slate-100/80 dark:hover:bg-white/10 transition-colors text-slate-800 dark:text-gray-100"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Đăng xuất</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`px-4 py-2 ${linkStyles}`}>
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg hover:opacity-90 transition-opacity text-white font-medium"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-slate-200/70 dark:hover:bg-white/10 transition-colors text-slate-800 dark:text-gray-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-t border-slate-200/80 dark:border-white/10">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/jobs"
              className={`block py-2 ${linkStyles}`}
              onClick={() => setIsOpen(false)}
            >
              Việc làm
            </Link>
            <Link
              to="/projects"
              className={`block py-2 ${linkStyles}`}
              onClick={() => setIsOpen(false)}
            >
              Dự án
            </Link>
            <Link
              to="/companies"
              className={`block py-2 ${linkStyles}`}
              onClick={() => setIsOpen(false)}
            >
              Doanh nghiệp
            </Link>
            <Link to="/news" className={`block py-2 ${linkStyles}`} onClick={() => setIsOpen(false)}>
              Tin tức tuyển dụng
            </Link>
            <Link to="/talent" className={`block py-2 ${linkStyles}`} onClick={() => setIsOpen(false)}>
              Talent DNA
            </Link>
            <p className="text-xs uppercase tracking-wider text-slate-500 pt-2">Đề án</p>
            <Link to="/help" className={`block py-2 pl-2 ${linkStyles}`} onClick={() => setIsOpen(false)}>
              Mục lục I–XV
            </Link>
            <Link to="/about" className={`block py-2 pl-2 ${linkStyles}`} onClick={() => setIsOpen(false)}>
              Tầm nhìn (I–III)
            </Link>
            <Link to="/career-dna" className={`block py-2 pl-2 ${linkStyles}`} onClick={() => setIsOpen(false)}>
              Career DNA
            </Link>

            <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to={
                      user?.role === 'student'
                        ? '/student'
                        : user?.role === 'company'
                          ? '/company'
                          : '/'
                    }
                    className={`block py-2 ${linkStyles}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className={`w-full text-left py-2 ${linkStyles}`}
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`block py-2 ${linkStyles}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2 px-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg text-center text-white font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
