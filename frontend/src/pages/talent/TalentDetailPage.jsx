import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Dna, Target } from 'lucide-react';
import api from '@/services/api';

const TalentDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['students', id],
    queryFn: () => api.get(`/students/${id}`).then((r) => r.data.data),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 pt-24">
        <div className="h-48 bg-slate-200 dark:bg-white/10 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 pt-24 text-center">
        <p className="text-slate-600 dark:text-gray-400 mb-4">Không tìm thấy hồ sơ.</p>
        <Link to="/talent" className="text-primary-600 dark:text-primary-400">
          ← Danh sách talent
        </Link>
      </div>
    );
  }

  const dna = data.careerDNA || {};
  const skills = data.skills || [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 pt-24">
      <Link
        to="/talent"
        className="inline-flex items-center gap-2 text-sm text-primary-600 mb-6 dark:text-primary-400"
      >
        <ArrowLeft className="w-4 h-4" />
        Talent &amp; Career DNA
      </Link>

      <header className="glass rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-white/10 mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {data.firstName} {data.lastName}
            </h1>
            <p className="text-slate-600 dark:text-gray-400 mt-1">
              {data.education?.[0]?.major} · {data.education?.[0]?.university}
            </p>
          </div>
          {data.isDemoProfile ? (
            <span className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-100">
              Hồ sơ minh họa
            </span>
          ) : null}
        </div>
        {data.bio ? <p className="mt-4 text-slate-700 dark:text-gray-300 leading-relaxed">{data.bio}</p> : null}
      </header>

      {dna && Object.keys(dna).length > 0 ? (
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white mb-4">
            <Dna className="w-6 h-6 text-primary-500" />
            Career DNA
          </h2>
          <div className="glass rounded-xl p-6 border border-slate-200/80 dark:border-white/10 space-y-4">
            {dna.marketValue != null ? (
              <p className="text-slate-700 dark:text-gray-300">
                <strong className="text-primary-600 dark:text-primary-400">Điểm thị trường (ước lượng):</strong>{' '}
                {dna.marketValue}/100
              </p>
            ) : null}
            {dna.careerPath ? (
              <p className="flex items-start gap-2 text-slate-700 dark:text-gray-300">
                <Target className="w-5 h-5 shrink-0 text-accent-500 mt-0.5" />
                <span>
                  <strong className="text-slate-900 dark:text-white">Định hướng:</strong> {dna.careerPath}
                </span>
              </p>
            ) : null}
            {dna.strengths?.length ? (
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white mb-2">Điểm mạnh</h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-gray-400 space-y-1">
                  {dna.strengths.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {dna.weaknesses?.length ? (
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white mb-2">Cần cải thiện</h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-gray-400 space-y-1">
                  {dna.weaknesses.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {dna.recommendations?.length ? (
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white mb-2">Gợi ý phát triển</h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-gray-400 space-y-1">
                  {dna.recommendations.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {dna.skillGaps?.length ? (
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white mb-2">Khoảng trống kỹ năng</h3>
                <ul className="space-y-2">
                  {dna.skillGaps.map((g) => (
                    <li
                      key={g.skill}
                      className="text-sm text-slate-600 dark:text-gray-400 border-l-2 border-primary-500/50 pl-3"
                    >
                      <strong className="text-slate-800 dark:text-gray-200">{g.skill}</strong>
                      {g.importance ? ` · ${g.importance}` : ''}
                      {g.marketDemand != null ? ` · nhu cầu ~${g.marketDemand}%` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {skills.length ? (
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Kỹ năng</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((sk) => (
              <span
                key={`${sk.name}-${sk.category}`}
                className="px-3 py-1 rounded-full text-sm bg-slate-200/90 text-slate-800 dark:bg-white/10 dark:text-gray-200"
              >
                {sk.name}
                <span className="opacity-70 text-xs ml-1">({sk.level})</span>
              </span>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default TalentDetailPage;
