import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/authStore';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    companyName: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      password: formData.password,
      role,
      ...(role === 'student'
        ? { firstName: formData.firstName, lastName: formData.lastName }
        : { companyName: formData.companyName }),
    };

    const ok = await register(payload);
    if (ok) {
      toast.success('Đăng ký thành công!');
      navigate(role === 'company' ? '/company' : '/student');
    } else {
      const err = useAuthStore.getState().error;
      toast.error(typeof err === 'string' ? err : 'Đăng ký thất bại');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-primary-100 px-4 py-12 dark:from-dark-500 dark:via-dark-400 dark:to-primary-900">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">UTE Job Platform</h1>
          <p className="text-slate-600 dark:text-gray-400">Tạo tài khoản miễn phí</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <div className="flex rounded-lg bg-slate-200/80 p-1 mb-6 dark:bg-dark-400">
            {['student', 'company'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  role === r
                    ? 'bg-primary-500 text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {r === 'student' ? 'Sinh viên' : 'Doanh nghiệp'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-800 dark:text-gray-200">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-800 dark:text-gray-200">Mật khẩu</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="input-field"
              />
            </div>

            {role === 'student' ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-800 dark:text-gray-200">Họ</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-800 dark:text-gray-200">Tên</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-800 dark:text-gray-200">Tên công ty</label>
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-semibold text-white disabled:opacity-50"
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </button>
          </form>

          <p className="text-center mt-6 text-slate-600 dark:text-gray-400 text-sm">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-primary-400 font-semibold hover:text-primary-300">
              Đăng nhập
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
