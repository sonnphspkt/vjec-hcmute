import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Dna, Sparkles } from 'lucide-react';
import api from '@/services/api';

const TalentPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['students', 'talent'],
    queryFn: () => api.get('/students', { params: { limit: 30 } }).then((r) => r.data),
  });

  const students = data?.data || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-24">
      <div className="flex items-center gap-3 mb-2">
        <Dna className="w-9 h-9 text-accent-500" />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Talent &amp; Career DNA</h1>
      </div>
      <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl">
        Hồ sơ công khai minh họa năng lực và Career DNA (điểm thị trường, định hướng nghề). Một số tài khoản được đánh dấu{' '}
        <span className="font-medium text-primary-600 dark:text-primary-400">minh họa</span> từ dữ liệu seed.
      </p>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 rounded-xl bg-slate-200/80 animate-pulse dark:bg-white/10" />
          ))}
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((s) => (
            <li key={s._id}>
              <Link
                to={`/talent/${s._id}`}
                className="block glass rounded-xl p-5 h-full border border-slate-200/80 dark:border-white/10 card-hover"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h2 className="font-semibold text-slate-900 dark:text-white">
                      {s.firstName} {s.lastName}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-gray-500 mt-0.5">
                      {s.education?.[0]?.major || 'Sinh viên kỹ thuật'}
                    </p>
                  </div>
                  {s.isDemoProfile ? (
                    <span className="shrink-0 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-200">
                      Minh họa
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-2 mb-3">{s.bio}</p>
                {s.careerDNA?.marketValue != null ? (
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-primary-500" />
                    <span className="text-slate-700 dark:text-gray-300">
                      Career DNA: <strong>{s.careerDNA.marketValue}</strong>/100
                    </span>
                  </div>
                ) : null}
                {s.careerDNA?.strengths?.length ? (
                  <p className="text-xs text-slate-500 dark:text-gray-500 mt-2 line-clamp-1">
                    {s.careerDNA.strengths.join(' · ')}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TalentPage;
