import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Dna, Search, Sparkles } from 'lucide-react';
import api from '@/services/api';

const CompanyCandidates = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['company', 'candidate-talent'],
    queryFn: () => api.get('/students', { params: { limit: 12 } }).then((r) => r.data),
  });

  const students = data?.data || [];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
          Talent Hub
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Ứng viên & Career DNA</h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-gray-400">
          Khám phá sinh viên theo kỹ năng, dự án, định hướng nghề nghiệp và dữ liệu Career DNA.
        </p>
      </div>

      <div className="glass rounded-xl p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-500/15 text-primary-600 dark:text-primary-300">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">Bộ lọc nâng cao</h2>
              <p className="text-sm text-slate-600 dark:text-gray-400">Kỹ năng, chuyên ngành, project và mức độ phù hợp.</p>
            </div>
          </div>
          <Link to="/talent" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400">
            Mở Talent Hub công khai
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl bg-slate-200 dark:bg-white/10" />
          ))}
        </div>
      ) : students.length === 0 ? (
        <p className="text-slate-600 dark:text-gray-500">Chưa có hồ sơ sinh viên mẫu.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {students.map((student) => (
            <Link key={student._id} to={`/talent/${student._id}`} className="glass rounded-xl p-5 card-hover">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">
                    {student.firstName} {student.lastName}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-gray-500">
                    {student.education?.[0]?.major || 'Sinh viên kỹ thuật'}
                  </p>
                </div>
                <Dna className="h-5 w-5 text-accent-500" />
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-slate-600 dark:text-gray-400">{student.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(student.skills || []).slice(0, 3).map((skill) => (
                  <span key={skill._id || skill.name} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:bg-white/10 dark:text-gray-300">
                    {skill.name}
                  </span>
                ))}
              </div>
              {student.careerDNA?.marketValue != null ? (
                <p className="mt-4 flex items-center gap-2 text-sm text-slate-700 dark:text-gray-300">
                  <Sparkles className="h-4 w-4 text-primary-500" />
                  Career DNA: <strong>{student.careerDNA.marketValue}/100</strong>
                </p>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyCandidates;
