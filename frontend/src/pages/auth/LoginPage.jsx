import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = await login(formData.email, formData.password);
    
    if (success) {
      toast.success('Đăng nhập thành công!');
      const role = useAuthStore.getState().user?.role;
      const rawFrom = location.state?.from;
      const safeFrom =
        typeof rawFrom === 'string' && rawFrom.startsWith('/') && !rawFrom.startsWith('//')
          ? rawFrom
          : null;
      if (safeFrom) {
        navigate(safeFrom, { replace: true });
        return;
      }
      if (role === 'company') navigate('/company');
      else if (role === 'student') navigate('/student');
      else navigate('/');
    } else {
      const err = useAuthStore.getState().error;
      toast.error(
        typeof err === 'string' && err.length > 0 ? err : 'Email hoặc mật khẩu không đúng'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-primary-100 px-4 dark:from-dark-500 dark:via-dark-400 dark:to-primary-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">
            UTE Job Platform
          </h1>
          <p className="text-slate-600 dark:text-gray-400">Đăng nhập vào tài khoản của bạn</p>
        </div>

        {/* Login Form */}
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-800 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="student@ute.edu.vn"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-800 dark:text-gray-200">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-slate-700 dark:text-gray-300">
                <input type="checkbox" className="mr-2" />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <Link to="/forgot-password" className="text-primary-400 hover:text-primary-300">
                Quên mật khẩu?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center mt-6 text-slate-600 dark:text-gray-400">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-primary-400 hover:text-primary-300 font-semibold">
              Đăng ký ngay
            </Link>
          </p>
        </div>

        {/* Demo Accounts */}
        <div className="mt-6 p-4 glass rounded-lg text-sm text-slate-600 dark:text-gray-400">
          <p className="font-semibold mb-2">🧪 Tài khoản demo:</p>
          <p>Student: student@ute.edu.vn / student123</p>
          <p>Company: company@example.com / company123</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
