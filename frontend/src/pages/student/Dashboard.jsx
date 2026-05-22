import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BarChart3, Briefcase, CheckCircle2, Dna, FolderKanban, Lightbulb, Sparkles, TrendingUp } from 'lucide-react';
import api from '@/services/api';
import JobCard from '@/components/JobCard';
import useAuthStore from '@/store/authStore';

const StudentDashboard = () => {
  const { profile } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['jobs', 'featured'],
    queryFn: () => api.get('/jobs', { params: { limit: 6 } }).then((r) => r.data),
  });

  const jobs = data?.data || [];
  const completion = profile?.completionPercentage ?? 0;
  const skillCount = profile?.skills?.length || 0;
  const projectCount = profile?.stats?.projectsCount || 0;
  const applicationCount = profile?.stats?.applicationsSubmitted || 0;
  const skillGaps = profile?.careerDNA?.skillGaps || [];
  const strengths = profile?.careerDNA?.strengths || [];

  return (
    <div className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="glass rounded-xl p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Home Dashboard
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            Xin chào{profile?.firstName ? `, ${profile.firstName}` : ''}
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-gray-400">
            Theo dõi Career DNA, việc làm phù hợp, kỹ năng cần cải thiện và các hoạt động nghề nghiệp trên cùng một màn hình.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Kỹ năng', value: skillCount, icon: Dna },
              { label: 'Dự án', value: projectCount, icon: FolderKanban },
              { label: 'Ứng tuyển', value: applicationCount, icon: Briefcase },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                <Icon className="mb-3 h-5 w-5 text-accent-500" />
                <p className="text-sm text-slate-500 dark:text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass rounded-xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-gray-500">Mức độ hoàn thiện hồ sơ</p>
              <p className="mt-1 text-4xl font-bold text-gradient">{completion}%</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-primary-500" />
          </div>
          <div className="mt-5 h-2 rounded-full bg-slate-200 dark:bg-white/10">
            <div className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" style={{ width: `${Math.min(100, completion)}%` }} />
          </div>
          <Link
            to="/student/profile"
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-primary-500/15 px-5 py-3 font-semibold text-primary-700 hover:bg-primary-500/20 dark:text-primary-200"
          >
            Cập nhật Career DNA
          </Link>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="glass rounded-xl p-5">
          <div className="mb-4 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Career DNA nổi bật</h2>
          </div>
          {strengths.length ? (
            <div className="flex flex-wrap gap-2">
              {strengths.slice(0, 5).map((item) => (
                <span key={item} className="rounded-full bg-primary-500/10 px-3 py-1 text-sm text-primary-800 dark:text-primary-200">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-600 dark:text-gray-400">Cập nhật kỹ năng và project để hệ thống nhận diện điểm mạnh.</p>
          )}
        </section>

        <section className="glass rounded-xl p-5">
          <div className="mb-4 flex items-center gap-3">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Kỹ năng cần cải thiện</h2>
          </div>
          {skillGaps.length ? (
            <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
              {skillGaps.slice(0, 3).map((gap) => (
                <li key={gap.skill} className="flex items-center justify-between gap-3">
                  <span>{gap.skill}</span>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-700 dark:text-amber-200">
                    {gap.importance || 'important'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-600 dark:text-gray-400">Chưa có dữ liệu skill gap. Hãy thêm kỹ năng hoặc chạy seed demo.</p>
          )}
        </section>

        <section className="glass rounded-xl p-5">
          <div className="mb-4 flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-accent-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Xu hướng nghề nghiệp</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-600 dark:text-gray-400">
            <p>Full-stack, Data Engineer và Embedded đang có nhu cầu cao trong hệ sinh thái kỹ thuật.</p>
            <Link to="/ai-engine" className="inline-flex items-center gap-2 font-medium text-primary-600 hover:underline dark:text-primary-400">
              <BarChart3 className="h-4 w-4" />
              Xem AI Career Center
            </Link>
          </div>
        </section>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Việc làm gợi ý</h2>
          <Link to="/jobs" className="text-primary-400 text-sm hover:underline">
            Xem tất cả
          </Link>
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
      </section>
    </div>
  );
};

export default StudentDashboard;
