import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '@/services/api';
import useAuthStore from '@/store/authStore';
import { MapPin, Briefcase, Building2 } from 'lucide-react';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: () => api.get(`/jobs/${id}`).then((r) => r.data.data),
    enabled: !!id,
  });

  const applyMutation = useMutation({
    mutationFn: () => api.post(`/jobs/${id}/apply`, {}),
    onSuccess: () => {
      toast.success('Đã gửi đơn ứng tuyển');
      queryClient.invalidateQueries({ queryKey: ['job', id] });
    },
    onError: (err) => {
      const msg = err.response?.data?.error || 'Ứng tuyển thất bại';
      toast.error(msg);
    },
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
        <p className="text-slate-800 dark:text-gray-200">Không tìm thấy tin tuyển dụng.</p>
        <Link to="/jobs" className="text-primary-400 mt-4 inline-block">
          ← Danh sách việc làm
        </Link>
      </div>
    );
  }

  const c = data.company || {};
  const canApply = isAuthenticated && user?.role === 'student';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pt-24">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-sm text-slate-600 hover:text-slate-900 mb-6 dark:text-gray-400 dark:hover:text-white"
      >
        ← Quay lại
      </button>

      <div className="glass rounded-2xl p-8 border border-slate-200/80 dark:border-white/10">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">{data.title}</h1>
            <div className="flex flex-wrap gap-4 text-slate-600 text-sm dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" /> {c.companyName}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {data.location?.city || '—'}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" /> {data.type} · {data.level}
              </span>
            </div>
          </div>
          {canApply && (
            <button
              type="button"
              onClick={() => applyMutation.mutate()}
              disabled={applyMutation.isPending}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-semibold text-white disabled:opacity-50"
            >
              {applyMutation.isPending ? 'Đang gửi...' : 'Ứng tuyển'}
            </button>
          )}
        </div>

        {!isAuthenticated && (
          <p className="text-sm text-slate-600 mb-6 dark:text-gray-500">
            <Link to="/login" className="text-primary-400">
              Đăng nhập
            </Link>{' '}
            tài khoản sinh viên để ứng tuyển.
          </p>
        )}

        <div className="max-w-none">
          <h2 className="text-lg font-semibold mt-6 mb-2 text-slate-900 dark:text-white">Mô tả</h2>
          <p className="text-slate-700 whitespace-pre-wrap dark:text-gray-300">{data.description}</p>

          {data.responsibilities?.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mt-6 mb-2 text-slate-900 dark:text-white">Trách nhiệm</h2>
              <ul className="list-disc pl-5 text-slate-700 space-y-1 dark:text-gray-300">
                {data.responsibilities.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </>
          )}

          {data.requirements?.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mt-6 mb-2 text-slate-900 dark:text-white">Yêu cầu</h2>
              <ul className="list-disc pl-5 text-slate-700 space-y-1 dark:text-gray-300">
                {data.requirements.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
