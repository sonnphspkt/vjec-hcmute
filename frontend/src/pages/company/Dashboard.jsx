import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '@/services/api';

const CompanyDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['company', 'me'],
    queryFn: () => api.get('/companies/me').then((r) => r.data.data),
  });

  if (isLoading) return <p className="text-slate-600 dark:text-gray-500">Đang tải...</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{data?.companyName || 'Doanh nghiệp'}</h1>
        <p className="text-slate-600 dark:text-gray-400">Quản lý tuyển dụng và kết nối với sinh viên UTE.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-6">
          <p className="text-sm text-slate-600 dark:text-gray-500">Tổng tin đã đăng</p>
          <p className="text-2xl font-bold text-gradient">{data?.stats?.totalJobs ?? 0}</p>
        </div>
        <div className="glass rounded-xl p-6">
          <p className="text-sm text-slate-600 dark:text-gray-500">Tin đang mở</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{data?.stats?.activeJobs ?? 0}</p>
        </div>
        <div className="glass rounded-xl p-6">
          <p className="text-sm text-slate-600 dark:text-gray-500">Lượt xem hồ sơ</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{data?.stats?.profileViews ?? 0}</p>
        </div>
      </div>

      <div className="glass rounded-xl p-6">
        <h2 className="font-semibold mb-2 text-slate-900 dark:text-white">Giới thiệu</h2>
        <p className="text-slate-600 text-sm dark:text-gray-400">{data?.description || 'Cập nhật mô tả công ty trong phần cài đặt (API PUT /companies/me).'}</p>
        <Link to="/jobs" className="inline-block mt-4 text-primary-400 text-sm hover:underline">
          Xem việc làm công khai →
        </Link>
      </div>
    </div>
  );
};

export default CompanyDashboard;
