import { useQuery } from '@tanstack/react-query';
import { BarChart3, Briefcase, TrendingUp, Users } from 'lucide-react';
import api from '@/services/api';

const CompanyAnalytics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['company', 'analytics'],
    queryFn: () => api.get('/analytics/companies').then((r) => r.data.data),
  });

  const metrics = [
    { label: 'Tin tuyển dụng', value: data?.totalPostings ?? 0, icon: Briefcase },
    { label: 'Ứng tuyển tháng này', value: data?.applicationsThisMonth ?? 0, icon: Users },
    { label: 'Xu hướng', value: 'AI-ready', icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
          Analytics Dashboard
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Phân tích tuyển dụng</h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-gray-400">
          Theo dõi hiệu quả tuyển dụng, nguồn ứng viên và tín hiệu kỹ năng để xây dựng pipeline nhân lực dài hạn.
        </p>
      </div>

      {isLoading ? (
        <p className="text-slate-600 dark:text-gray-500">Đang tải...</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {metrics.map(({ label, value, icon: Icon }) => (
              <div key={label} className="glass rounded-lg p-5">
                <Icon className="mb-3 h-5 w-5 text-primary-500" />
                <p className="text-sm text-slate-500 dark:text-gray-500">{label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
            <section className="glass rounded-xl p-6">
              <div className="mb-5 flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-accent-500" />
                <h2 className="font-semibold text-slate-900 dark:text-white">Pipeline tuyển dụng</h2>
              </div>
              <div className="space-y-4">
                {[
                  ['Hồ sơ xem xét', 72],
                  ['Phù hợp kỹ năng', 54],
                  ['Mời phỏng vấn', 28],
                  ['Offer', 12],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-gray-400">{label}</span>
                      <span className="font-medium text-slate-900 dark:text-white">{value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10">
                      <div className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass rounded-xl p-6">
              <h2 className="font-semibold text-slate-900 dark:text-white">Ghi chú triển khai</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-gray-400">
                API analytics hiện là dữ liệu mẫu. Khi triển khai thật, khu vực này sẽ lấy dữ liệu từ job, application,
                Career DNA và hành vi tuyển dụng để tạo báo cáo động.
              </p>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyAnalytics;
