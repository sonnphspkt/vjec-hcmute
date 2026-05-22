import { Link } from 'react-router-dom';
import { Briefcase, Plus, Radio, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

const CompanyJobs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['company', 'jobs-preview'],
    queryFn: () => api.get('/jobs', { params: { limit: 12 } }).then((r) => r.data),
  });

  const jobs = data?.data || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Recruitment pipeline
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Tin tuyển dụng</h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-gray-400">
            Khu vực quản lý cơ hội việc làm, remote work, internship và micro internship cho sinh viên kỹ thuật.
          </p>
        </div>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-5 py-3 font-semibold text-white hover:opacity-95"
        >
          <Plus className="h-4 w-4" />
          Xem trang việc làm
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Tin công khai', value: data?.pagination?.total ?? jobs.length, icon: Briefcase },
          { label: 'Kênh ứng tuyển', value: 'Platform', icon: Radio },
          { label: 'Nguồn ứng viên', value: 'Career DNA', icon: Users },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass rounded-lg p-5">
            <Icon className="mb-3 h-5 w-5 text-primary-500" />
            <p className="text-sm text-slate-500 dark:text-gray-500">{label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      <section className="glass rounded-xl p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-semibold text-slate-900 dark:text-white">Tin đang hiển thị trên nền tảng</h2>
          <Link to="/jobs" className="text-sm text-primary-600 hover:underline dark:text-primary-400">
            Mở Job Hub
          </Link>
        </div>
        {isLoading ? (
          <p className="text-slate-600 dark:text-gray-500">Đang tải...</p>
        ) : jobs.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-gray-400">
            Chưa có tin tuyển dụng mẫu. Chạy seed backend để có dữ liệu demo, hoặc tạo tin qua API POST /jobs.
          </p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-200/80 dark:border-white/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Vị trí</th>
                  <th className="px-4 py-3 font-medium">Loại</th>
                  <th className="px-4 py-3 font-medium">Địa điểm</th>
                  <th className="px-4 py-3 font-medium">Ứng tuyển</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 dark:divide-white/10">
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td className="px-4 py-3">
                      <Link to={`/jobs/${job._id}`} className="font-medium text-slate-900 hover:text-primary-600 dark:text-white">
                        {job.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-gray-400">{job.type}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-gray-400">
                      {job.location?.isRemote ? 'Remote' : job.location?.city || 'Linh hoạt'}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-gray-400">{job.applications || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default CompanyJobs;
