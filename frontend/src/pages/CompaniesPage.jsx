import { Link } from 'react-router-dom';
import { BarChart3, Building2, Dna, Search, ShieldCheck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

const companyValues = [
  { title: 'Hồ sơ thương hiệu tuyển dụng', text: 'Giới thiệu doanh nghiệp, lĩnh vực, văn hóa và nhu cầu nhân lực.', icon: Building2 },
  { title: 'Tìm kiếm Career DNA', text: 'Đánh giá sinh viên qua kỹ năng, project, chứng chỉ và tốc độ phát triển.', icon: Dna },
  { title: 'Pipeline ứng viên', text: 'Theo dõi ứng tuyển, trạng thái xét duyệt và mức độ phù hợp.', icon: Search },
  { title: 'Analytics tuyển dụng', text: 'Nhìn xu hướng kỹ năng, nhu cầu tuyển dụng và hiệu quả tin đăng.', icon: BarChart3 },
];

const CompaniesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['companies', 'public'],
    queryFn: () => api.get('/companies', { params: { limit: 24 } }).then((r) => r.data),
  });

  const companies = data?.data || [];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-24 pt-28 dark:bg-dark-500">
      <section className="mx-auto max-w-6xl">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Company Hub
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 dark:text-white">
            Kết nối doanh nghiệp với nguồn nhân lực kỹ thuật trẻ
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-gray-400">
            Company Hub giúp doanh nghiệp xây dựng pipeline tuyển dụng dài hạn thông qua Career DNA,
            project showcase và dữ liệu kỹ năng của sinh viên.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-3 font-semibold text-white hover:opacity-95"
            >
              Đăng ký doanh nghiệp
            </Link>
            <Link
              to="/talent"
              className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
            >
              Xem Talent Hub
            </Link>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-accent-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Luồng doanh nghiệp</h2>
          </div>
          <div className="space-y-4">
            {['Tạo hồ sơ công ty', 'Đăng tuyển hoặc remote work', 'Xem Career DNA ứng viên', 'Theo dõi analytics tuyển dụng'].map((item, index) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-sm font-bold text-primary-700 dark:text-primary-200">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {companyValues.map(({ title, text, icon: Icon }) => (
          <div key={title} className="glass rounded-xl p-5">
            <Icon className="mb-4 h-6 w-6 text-primary-500" />
            <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-gray-400">{text}</p>
          </div>
        ))}
      </div>

      <section className="mt-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
              Đối tác tuyển dụng
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Doanh nghiệp đang tham gia</h2>
            <p className="mt-2 max-w-2xl text-slate-600 dark:text-gray-400">
              Dữ liệu mẫu minh họa các nhóm doanh nghiệp phần mềm, nhúng, dữ liệu, tự động hóa và sản xuất thông minh.
            </p>
          </div>
          <Link to="/jobs" className="text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400">
            Xem việc làm đang mở
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 animate-pulse rounded-xl bg-slate-200 dark:bg-white/10" />
            ))}
          </div>
        ) : companies.length === 0 ? (
          <p className="text-slate-600 dark:text-gray-400">Chưa có dữ liệu doanh nghiệp. Hãy chạy rich seed backend.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <article key={company._id} className="glass rounded-xl p-5 card-hover">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{company.companyName}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-gray-500">
                      {company.industry || 'Technology'} · {company.size || 'Đang cập nhật'}
                    </p>
                  </div>
                  {company.isVerified ? (
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-200">
                      Verified
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-gray-400">
                  {company.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(company.benefits || []).slice(0, 3).map((benefit) => (
                    <span key={benefit} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:bg-white/10 dark:text-gray-300">
                      {benefit}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-gray-500">
                    {company.stats?.activeJobs || 0} tin đang mở
                  </span>
                  <Link to="/jobs" className="font-medium text-primary-600 hover:underline dark:text-primary-400">
                    Xem cơ hội
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="mt-12 rounded-xl bg-slate-900 p-6 text-white dark:bg-white/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold">Dashboard doanh nghiệp đã sẵn sàng</h2>
            <p className="mt-1 text-sm text-slate-300">Đăng nhập bằng tài khoản company để quản lý hồ sơ, tin tuyển dụng, ứng viên và analytics.</p>
          </div>
          <Link to="/login" className="rounded-lg bg-white px-5 py-3 text-center font-semibold text-slate-900 hover:bg-slate-100">
            Vào dashboard
          </Link>
        </div>
      </div>
      </section>
    </div>
  );
};

export default CompaniesPage;
