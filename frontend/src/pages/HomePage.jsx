import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart3,
  Briefcase, 
  Building2,
  CheckCircle2,
  Users, 
  Rocket, 
  TrendingUp,
  Code,
  Award,
  Newspaper,
  ArrowRight,
  Dna,
  FolderKanban,
  GraduationCap,
  Network,
  ShieldCheck,
  UserSearch
} from 'lucide-react';
import api from '@/services/api';

const HomePage = () => {
  const { data: newsData } = useQuery({
    queryKey: ['news', 'home'],
    queryFn: () => api.get('/news', { params: { limit: 4 } }).then((r) => r.data),
  });
  const newsItems = newsData?.data || [];
  const stats = [
    { label: 'Sinh viên', value: '5,000+' },
    { label: 'Doanh nghiệp', value: '200+' },
    { label: 'Việc làm', value: '1,000+' },
    { label: 'Dự án', value: '3,000+' },
  ];

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Career DNA',
      description: 'Hồ sơ năng lực số phát triển theo thời gian - theo dõi kỹ năng và tiềm năng từ năm 1'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'AI Career Engine',
      description: 'AI thông minh phân tích kỹ năng và kết nối với công việc phù hợp nhất'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Project Showcase',
      description: 'Triển lãm đồ án số - biến project thành portfolio ấn tượng'
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Remote Work Hub',
      description: 'Việc làm từ xa đúng chuyên môn - tích lũy kinh nghiệm từ sớm'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Smart Matching',
      description: 'Kết nối thông minh giữa sinh viên và doanh nghiệp dựa trên AI'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Analytics',
      description: 'Phân tích xu hướng thị trường và cơ hội nghề nghiệp'
    },
  ];

  const platformModules = [
    { title: 'Career DNA Profile', text: 'Hồ sơ nghề nghiệp số theo dõi kỹ năng, dự án, chứng chỉ và tốc độ phát triển.', icon: Dna, to: '/career-dna' },
    { title: 'Job & Remote Work Hub', text: 'Việc làm, thực tập, freelance và micro internship đúng chuyên môn.', icon: Briefcase, to: '/jobs' },
    { title: 'Project Showcase', text: 'Không gian triển lãm đồ án, prototype và sản phẩm kỹ thuật của sinh viên.', icon: FolderKanban, to: '/projects' },
    { title: 'Talent Hub', text: 'Doanh nghiệp tìm kiếm sinh viên qua kỹ năng, project và dữ liệu Career DNA.', icon: UserSearch, to: '/talent' },
    { title: 'Company Hub', text: 'Hồ sơ doanh nghiệp, thương hiệu tuyển dụng và pipeline ứng viên.', icon: Building2, to: '/companies' },
    { title: 'University Analytics', text: 'Dữ liệu kỹ năng, nhu cầu tuyển dụng và chất lượng đầu ra cho nhà trường.', icon: BarChart3, to: '/university-analytics' },
  ];

  const roleFlows = [
    {
      role: 'Sinh viên',
      icon: GraduationCap,
      steps: ['Tạo Career DNA', 'Đăng project', 'Nhận gợi ý AI', 'Ứng tuyển và theo dõi trạng thái'],
    },
    {
      role: 'Doanh nghiệp',
      icon: Building2,
      steps: ['Tạo hồ sơ công ty', 'Đăng tuyển', 'Xem Career DNA', 'Quản lý pipeline ứng viên'],
    },
    {
      role: 'Nhà trường',
      icon: ShieldCheck,
      steps: ['Theo dõi dữ liệu', 'Phân tích skill gap', 'Kết nối doanh nghiệp', 'Cải tiến đào tạo'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-500">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-16">
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full mb-6">
              <span className="text-accent-400 font-semibold text-sm">Digital Career Ecosystem</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-slate-900 dark:text-white">
              <span className="text-gradient">Hệ Sinh Thái Nghề Nghiệp Số</span>
              <br />
              <span className="text-slate-900 dark:text-white">Cho Kỹ Sư Tương Lai</span>
            </h1>
            
            <p className="text-xl text-slate-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Không chỉ là nơi tìm việc - UTE Job Platform là hệ sinh thái kết nối, 
              phát triển và số hóa toàn bộ hành trình nghề nghiệp của sinh viên kỹ thuật.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity text-white"
              >
                Bắt đầu ngay
              </Link>
              <Link
                to="/jobs"
                className="px-8 py-4 glass rounded-lg font-semibold text-lg text-slate-800 hover:bg-slate-200/70 transition-colors dark:text-white dark:hover:bg-white/10"
              >
                Khám phá việc làm
              </Link>
              <Link
                to="/help"
                className="px-8 py-4 border border-slate-300 dark:border-white/20 rounded-lg font-semibold text-lg text-slate-800 hover:bg-slate-100/80 transition-colors dark:text-white dark:hover:bg-white/5"
              >
                Đọc đề án (I–XV)
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 grid gap-3 md:grid-cols-3 text-left">
              {[
                'Dashboard riêng theo vai trò',
                'Dữ liệu Career DNA thay cho CV tĩnh',
                'Kết nối học tập, dự án, việc làm và analytics',
              ].map((item) => (
                <div key={item} className="glass rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Structure */}
      <section className="py-20 px-4 bg-white dark:bg-dark-400/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="text-accent-500 font-bold uppercase tracking-wider text-sm">
                Cấu trúc giao diện
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 text-slate-900 dark:text-white">
                Các hub chính của nền tảng
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600 dark:text-gray-400">
                Giao diện được chia theo module để sinh viên, doanh nghiệp và nhà trường đi đúng luồng công việc của mình.
              </p>
            </div>
            <Link to="/help" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:underline dark:text-primary-400">
              Xem bản đề án
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {platformModules.map(({ title, text, icon: Icon, to }) => (
              <Link key={title} to={to} className="glass rounded-xl p-6 card-hover">
                <Icon className="mb-5 h-8 w-8 text-primary-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-gray-400">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Role Flows */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-accent-500 font-bold uppercase tracking-wider text-sm">
              Theo vai trò
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-slate-900 dark:text-white">
              Mỗi người dùng có một dashboard riêng
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {roleFlows.map(({ role, icon: Icon, steps }) => (
              <div key={role} className="glass rounded-xl p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-500/15 text-primary-600 dark:text-primary-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{role}</h3>
                </div>
                <ol className="space-y-3">
                  {steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm text-slate-600 dark:text-gray-400">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-primary-700 dark:bg-white/10 dark:text-primary-300">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-100/80 dark:bg-dark-400/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent-400 font-bold uppercase tracking-wider text-sm">
              Tính năng nổi bật
            </span>
            <h2 className="text-4xl font-bold mt-4 mb-4 text-slate-900 dark:text-white">
              Tại sao UTE Job Platform khác biệt?
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Hệ sinh thái toàn diện từ năm nhất đến nghề nghiệp, được hỗ trợ bởi AI và dữ liệu thực tế
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6 card-hover"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment news */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-accent-400 font-bold uppercase tracking-wider text-sm mb-2">
                <Newspaper className="w-5 h-5" />
                Tin tức tuyển dụng
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Cập nhật thị trường &amp; kỹ năng
              </h2>
              <p className="text-slate-600 dark:text-gray-400 mt-2 max-w-xl">
                Bài viết ngắn kèm trang việc làm — phù hợp để chuẩn bị phỏng vấn và CV.
              </p>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:underline dark:text-primary-400"
            >
              Xem tất cả
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {newsItems.length === 0 ? (
            <p className="text-slate-600 dark:text-gray-400 text-sm">
              Chưa có tin — chạy seed backend để tải nội dung mẫu.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {newsItems.map((a) => (
                <Link
                  key={a._id}
                  to={`/news/${a.slug}`}
                  className="glass rounded-xl p-5 border border-slate-200/80 dark:border-white/10 card-hover block"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{a.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-2">{a.excerpt}</p>
                  <span className="inline-block mt-3 text-sm text-primary-600 dark:text-primary-400">
                    Đọc tiếp →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Demo talent teaser */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Network className="mx-auto mb-4 h-9 w-9 text-accent-500" />
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Career DNA minh họa
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Xem hồ sơ mẫu với điểm thị trường, định hướng nghề và khoảng trống kỹ năng — dữ liệu seed để demo nền tảng.
          </p>
          <Link
            to="/talent"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:opacity-95 transition-opacity"
          >
            Khám phá Talent DNA
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-500 to-accent-500 p-12 text-center"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sẵn sàng xây dựng tương lai nghề nghiệp?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Tham gia UTE Job Platform ngay hôm nay và bắt đầu hành trình phát triển sự nghiệp
              </p>
              <Link
                to="/register"
                className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Đăng ký miễn phí
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
