import { Link } from 'react-router-dom';
import { BarChart3, Building2, Dna, Search, ShieldCheck } from 'lucide-react';

const companyValues = [
  { title: 'Hồ sơ thương hiệu tuyển dụng', text: 'Giới thiệu doanh nghiệp, lĩnh vực, văn hóa và nhu cầu nhân lực.', icon: Building2 },
  { title: 'Tìm kiếm Career DNA', text: 'Đánh giá sinh viên qua kỹ năng, project, chứng chỉ và tốc độ phát triển.', icon: Dna },
  { title: 'Pipeline ứng viên', text: 'Theo dõi ứng tuyển, trạng thái xét duyệt và mức độ phù hợp.', icon: Search },
  { title: 'Analytics tuyển dụng', text: 'Nhìn xu hướng kỹ năng, nhu cầu tuyển dụng và hiệu quả tin đăng.', icon: BarChart3 },
];

const CompaniesPage = () => (
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

export default CompaniesPage;
