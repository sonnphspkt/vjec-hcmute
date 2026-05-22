import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '@/services/api';
import ProjectCard from '@/components/ProjectCard';

const ProjectsShowcase = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects', { params: { limit: 24 } }).then((r) => r.data),
  });

  const projects = data?.data || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-24">
      <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Project Showcase</h1>
      <p className="text-slate-600 mb-10 dark:text-gray-400">Đồ án và sản phẩm từ cộng đồng sinh viên kỹ thuật.</p>

      {isLoading ? (
        <p className="text-slate-600 dark:text-gray-500">Đang tải...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}

      {!isLoading && projects.length === 0 && (
        <p className="text-slate-600 dark:text-gray-500">
          Chưa có dự án. Chạy <code className="text-accent-400">npm run seed</code> trong backend.
        </p>
      )}

      <p className="mt-10 text-sm">
        <Link to="/" className="text-primary-400 hover:underline">
          ← Trang chủ
        </Link>
      </p>
    </div>
  );
};

export default ProjectsShowcase;
