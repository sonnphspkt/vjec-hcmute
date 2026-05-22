import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import api from '@/services/api';

const catLabel = {
  recruitment: 'Tuyển dụng',
  market: 'Thị trường',
  campus: 'Campus',
  tips: 'Mẹo nghề',
  policy: 'Quy định',
};

const NewsArticlePage = () => {
  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['news', slug],
    queryFn: () => api.get(`/news/${slug}`).then((r) => r.data.data),
    enabled: Boolean(slug),
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 pt-24">
        <div className="h-10 bg-slate-200 dark:bg-white/10 rounded animate-pulse mb-4" />
        <div className="h-64 bg-slate-200 dark:bg-white/10 rounded animate-pulse" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 pt-24 text-center">
        <p className="text-slate-600 dark:text-gray-400 mb-4">Không tìm thấy bài viết.</p>
        <Link to="/news" className="text-primary-600 dark:text-primary-400">
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 pt-24">
      <Link
        to="/news"
        className="inline-flex items-center gap-2 text-sm text-primary-600 mb-6 dark:text-primary-400"
      >
        <ArrowLeft className="w-4 h-4" />
        Tin tức tuyển dụng
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-gray-400 mb-3">
          <span className="px-2 py-0.5 rounded-full bg-primary-500/15 text-primary-700 dark:text-primary-300">
            {catLabel[data.category] || data.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {data.readTimeMinutes} phút đọc
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{data.title}</h1>
        {data.excerpt ? (
          <p className="mt-4 text-lg text-slate-600 dark:text-gray-400">{data.excerpt}</p>
        ) : null}
      </header>

      <div className="max-w-none whitespace-pre-wrap text-slate-700 dark:text-gray-300 leading-relaxed text-[15px] md:text-base">
        {data.content}
      </div>

      {data.tags?.length ? (
        <footer className="mt-10 pt-6 border-t border-slate-200 dark:border-white/10">
          <p className="text-sm text-slate-500 dark:text-gray-500">
            Thẻ:{' '}
            {data.tags.map((t, i) => (
              <span key={t}>
                {i > 0 ? ' · ' : ''}
                #{t}
              </span>
            ))}
          </p>
        </footer>
      ) : null}
    </article>
  );
};

export default NewsArticlePage;
