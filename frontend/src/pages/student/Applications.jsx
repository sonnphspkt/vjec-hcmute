import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '@/services/api';

const StudentApplications = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['applications', 'me'],
    queryFn: () => api.get('/applications/me').then((r) => r.data),
  });

  const rows = data?.data || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Đơn ứng tuyển</h1>
      {isLoading ? (
        <p className="text-slate-600 dark:text-gray-500">Đang tải...</p>
      ) : rows.length === 0 ? (
        <p className="text-slate-600 dark:text-gray-500">Bạn chưa ứng tuyển tin nào. Khám phá tại trang việc làm.</p>
      ) : (
        <ul className="space-y-3">
          {rows.map((app) => (
            <li
              key={app._id}
              className="glass rounded-lg p-4 border border-slate-200/80 dark:border-white/10 flex flex-wrap justify-between gap-2"
            >
              <div>
                <Link to={`/jobs/${app.job?._id}`} className="font-semibold text-primary-700 hover:underline dark:text-primary-300">
                  {app.job?.title || 'Tin đã xóa'}
                </Link>
                <p className="text-sm text-slate-600 dark:text-gray-500">{app.job?.company?.companyName}</p>
              </div>
              <span className="text-sm px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 h-fit dark:bg-dark-400 dark:border-white/10 dark:text-gray-100">
                {app.status}
              </span>
            </li>
          ))}
        </ul>
      )}
      <Link to="/jobs" className="text-primary-400 text-sm hover:underline">
        → Việc làm
      </Link>
    </div>
  );
};

export default StudentApplications;
