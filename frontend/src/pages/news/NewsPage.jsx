import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Newspaper, Clock } from 'lucide-react';
import api from '@/services/api';

const catLabel = {
  recruitment: 'Tuyển dụng',
  market: 'Thị trường',
  campus: 'Campus',
  tips: 'Mẹo nghề',
  policy: 'Quy định',
};

const NewsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['news', 'list'],
    queryFn: () => api.get('/news', { params: { limit: 30 } }).then((r) => r.data),
  });

  const articles = data?.data || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-24">
      <div className="flex items-center gap-3 mb-2">
        <Newspaper className="w-9 h-9 text-primary-500" />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Tin tức tuyển dụng</h1>
      </div>
      <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl">
        Bài viết ngắn về thị trường, phỏng vấn và kỹ năng — bổ sung cho danh sách việc làm trên nền tảng.
      </p>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 rounded-xl bg-slate-200/80 animate-pulse dark:bg-white/10" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <p className="text-slate-600 dark:text-gray-400">Chưa có bài đăng. Chạy seed backend để tải nội dung mẫu.</p>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2">
          {articles.map((a) => (
            <li key={a._id}>
              <Link
                to={`/news/${a.slug}`}
                className="block glass rounded-xl p-6 card-hover h-full border border-slate-200/80 dark:border-white/10"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary-500/15 text-primary-700 dark:text-primary-300">
                    {catLabel[a.category] || a.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 dark:text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    {a.readTimeMinutes} phút đọc
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{a.title}</h2>
                <p className="text-slate-600 dark:text-gray-400 text-sm line-clamp-3">{a.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsPage;
