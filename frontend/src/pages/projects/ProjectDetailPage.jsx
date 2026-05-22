import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '@/services/api';
import useAuthStore from '@/store/authStore';
import { Heart, Github, ExternalLink } from 'lucide-react';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => api.get(`/projects/${id}`).then((r) => r.data.data),
    enabled: !!id,
  });

  const likeMutation = useMutation({
    mutationFn: () => api.post(`/projects/${id}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      toast.success('Đã thích dự án');
    },
    onError: () => toast.error('Cần đăng nhập để thích'),
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 pt-28">
        <p className="text-slate-600 dark:text-gray-500">Đang tải...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 pt-28">
        <p className="text-slate-800 dark:text-gray-200">Không tìm thấy dự án.</p>
        <Link to="/projects" className="text-primary-400 mt-4 inline-block">
          ← Showcase
        </Link>
      </div>
    );
  }

  const student = data.student || {};
  const name = [student.firstName, student.lastName].filter(Boolean).join(' ') || 'Sinh viên';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pt-24">
      <Link
        to="/projects"
        className="text-sm text-slate-600 hover:text-slate-900 mb-6 inline-block dark:text-gray-400 dark:hover:text-white"
      >
        ← Showcase
      </Link>

      <div className="glass rounded-2xl p-8 border border-slate-200/80 dark:border-white/10">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-accent-400 text-sm uppercase tracking-wide mb-1">{data.category}</p>
            <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">{data.title}</h1>
            <p className="text-slate-600 dark:text-gray-400">Bởi {name}</p>
          </div>
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => likeMutation.mutate()}
              disabled={likeMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-slate-200/80 hover:border-primary-500/40 dark:border-white/10 text-slate-800 dark:text-gray-100"
            >
              <Heart className="w-5 h-5" /> Thích
            </button>
          )}
        </div>

        <p className="text-slate-700 whitespace-pre-wrap mb-8 dark:text-gray-300">{data.description}</p>

        <div className="flex flex-wrap gap-4">
          {data.demoUrl && (
            <a
              href={data.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-primary-400 hover:underline"
            >
              <ExternalLink className="w-4 h-4" /> Demo
            </a>
          )}
          {data.sourceCodeUrl && (
            <a
              href={data.sourceCodeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-primary-400 hover:underline"
            >
              <Github className="w-4 h-4" /> Mã nguồn
            </a>
          )}
        </div>

        {(data.technologies || []).length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {data.technologies.map((t) => (
              <span
                key={t.name}
                className="text-xs px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 dark:bg-dark-400 dark:border-white/10 dark:text-gray-100"
              >
                {t.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
