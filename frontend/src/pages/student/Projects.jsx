import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '@/services/api';
import useAuthStore from '@/store/authStore';

const StudentProjects = () => {
  const { profile } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['projects', 'public'],
    queryFn: () => api.get('/projects', { params: { limit: 24 } }).then((r) => r.data),
  });

  const list = (data?.data || []).filter(
    (p) => String(p.student?._id || p.student) === String(profile?._id)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dự án của tôi</h1>
        <Link to="/projects" className="text-sm text-primary-400 hover:underline">
          Showcase công khai
        </Link>
      </div>
      {isLoading ? (
        <p className="text-slate-600 dark:text-gray-500">Đang tải...</p>
      ) : list.length === 0 ? (
        <p className="text-slate-600 dark:text-gray-500">Chưa có dự án nào được liên kết. Tạo dự án qua API hoặc seed dữ liệu mẫu.</p>
      ) : (
        <ul className="space-y-2">
          {list.map((p) => (
            <li key={p._id}>
              <Link
                to={`/projects/${p._id}`}
                className="glass rounded-lg px-4 py-3 block hover:border-primary-500/40 border border-slate-200/80 text-slate-900 dark:border-white/5 dark:text-white dark:hover:border-primary-500/30"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentProjects;
