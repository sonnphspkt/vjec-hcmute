import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, User, FolderKanban, Briefcase, Building2, LogOut } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
    isActive
      ? 'bg-primary-500/15 text-primary-700 border border-primary-500/40 dark:bg-primary-500/20 dark:text-primary-300 dark:border-primary-500/30'
      : 'text-slate-700 hover:bg-slate-200/70 dark:text-gray-300 dark:hover:bg-white/5'
  }`;

const DashboardLayout = ({ userType }) => {
  const { logout, profile } = useAuthStore();
  const navigate = useNavigate();

  const studentLinks = [
    { to: '/student', end: true, label: 'Tổng quan', icon: LayoutDashboard },
    { to: '/student/profile', label: 'Hồ sơ', icon: User },
    { to: '/student/projects', label: 'Dự án của tôi', icon: FolderKanban },
    { to: '/student/applications', label: 'Ứng tuyển', icon: Briefcase },
  ];

  const companyLinks = [
    { to: '/company', end: true, label: 'Tổng quan', icon: LayoutDashboard },
    { to: '/company/jobs', label: 'Tin tuyển dụng', icon: Briefcase },
    { to: '/company/candidates', label: 'Ứng viên', icon: User },
    { to: '/company/analytics', label: 'Phân tích', icon: Building2 },
  ];

  const links = userType === 'student' ? studentLinks : companyLinks;
  const title =
    userType === 'student'
      ? `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || 'Sinh viên'
      : profile?.companyName || 'Doanh nghiệp';

  return (
    <div className="min-h-screen bg-slate-50 flex dark:bg-dark-500">
      <aside className="w-64 shrink-0 border-r border-slate-200/80 glass hidden md:flex flex-col dark:border-white/10">
        <div className="p-6 border-b border-slate-200/80 dark:border-white/10 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-slate-500 uppercase tracking-wider dark:text-gray-500">Dashboard</p>
            <p className="font-bold text-lg truncate text-slate-900 dark:text-white">{title}</p>
          </div>
          <ThemeToggle className="shrink-0" />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200/80 dark:border-white/10">
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 transition-colors dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-slate-200/80 dark:border-white/10 glass gap-2">
          <span className="font-semibold truncate text-slate-900 dark:text-white">{title}</span>
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="text-sm text-slate-600 dark:text-gray-400"
            >
              Thoát
            </button>
          </div>
        </header>
        <nav className="md:hidden flex gap-2 overflow-x-auto border-b border-slate-200/80 px-4 py-3 dark:border-white/10">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary-500/15 text-primary-700 dark:text-primary-300'
                    : 'text-slate-600 hover:bg-slate-200/70 dark:text-gray-400 dark:hover:bg-white/5'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
