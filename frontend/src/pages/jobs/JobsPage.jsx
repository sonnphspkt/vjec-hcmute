import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import api from '@/services/api';
import JobCard from '@/components/JobCard';

const JobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');

  const remoteOnly = searchParams.get('remote') === '1' || searchParams.get('remote') === 'true';
  const typeFilter = searchParams.get('type') || '';

  const queryParams = useMemo(
    () => ({
      limit: 20,
      search: search || undefined,
      remote: remoteOnly ? '1' : undefined,
      type: typeFilter || undefined,
    }),
    [search, remoteOnly, typeFilter]
  );

  const { data, isLoading } = useQuery({
    queryKey: ['jobs', queryParams],
    queryFn: () => api.get('/jobs', { params: queryParams }).then((r) => r.data),
  });

  useEffect(() => {
    const q = searchParams.get('q');
    if (q != null) setSearch(q);
  }, [searchParams]);

  const jobs = data?.data || [];

  const setFilter = (patch) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([k, v]) => {
      if (v === '' || v == null) next.delete(k);
      else next.set(k, v);
    });
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-24">
      <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Việc làm</h1>
      <p className="text-slate-600 mb-6 dark:text-gray-400">Tìm cơ hội thực tập và việc làm phù hợp chuyên ngành kỹ thuật.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setFilter({ remote: remoteOnly ? '' : '1', type: '' })}
          className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
            remoteOnly
              ? 'border-primary-500 bg-primary-500/15 text-primary-800 dark:text-primary-200'
              : 'border-slate-300 dark:border-white/20 text-slate-700 dark:text-gray-300'
          }`}
        >
          Remote
        </button>
        <button
          type="button"
          onClick={() => setFilter({ type: typeFilter === 'internship' ? '' : 'internship', remote: '' })}
          className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
            typeFilter === 'internship'
              ? 'border-primary-500 bg-primary-500/15 text-primary-800 dark:text-primary-200'
              : 'border-slate-300 dark:border-white/20 text-slate-700 dark:text-gray-300'
          }`}
        >
          Thực tập
        </button>
        <button
          type="button"
          onClick={() => setFilter({ type: '', remote: '' })}
          className="px-3 py-1.5 rounded-full text-sm border border-slate-300 dark:border-white/20 text-slate-600 dark:text-gray-400"
        >
          Xóa lọc
        </button>
        <Link to="/remote-work" className="text-sm text-primary-600 self-center ml-2 dark:text-primary-400">
          Đề án: Remote Work →
        </Link>
      </div>

      <div className="mb-8">
        <input
          type="search"
          placeholder="Tìm theo từ khóa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field max-w-md"
        />
      </div>

      {isLoading ? (
        <p className="text-slate-600 dark:text-gray-500">Đang tải...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}

      {!isLoading && jobs.length === 0 && (
        <p className="text-slate-600 dark:text-gray-500">
          Chưa có tin tuyển dụng. Chạy backend và{' '}
          <code className="text-accent-400">npm run seed</code> trong thư mục backend.
        </p>
      )}

      <p className="mt-8 text-sm text-slate-600 dark:text-gray-500">
        <Link to="/" className="text-primary-400 hover:underline">
          ← Về trang chủ
        </Link>
      </p>
    </div>
  );
};

export default JobsPage;
