import ThesisLayout from '@/components/thesis/ThesisLayout';

const DifferentiationPage = () => (
  <ThesisLayout title="Điểm khác biệt so với nền tảng hiện nay" eyebrow="Mục XI">
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
            <th className="p-3 font-semibold text-slate-900 dark:text-white">Nền tảng truyền thống</th>
            <th className="p-3 font-semibold text-primary-700 dark:text-primary-300">UTE Job Platform</th>
          </tr>
        </thead>
        <tbody className="text-slate-600 dark:text-gray-400">
          <tr className="border-b border-slate-100 dark:border-white/5">
            <td className="p-3">CV tĩnh</td>
            <td className="p-3">Career DNA phát triển theo thời gian</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-white/5">
            <td className="p-3">Tuyển dụng đại trà</td>
            <td className="p-3">Tập trung nhân lực kỹ thuật trẻ</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-white/5">
            <td className="p-3">Không gắn đào tạo</td>
            <td className="p-3">Gắn học tập – thực tập – việc làm</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-white/5">
            <td className="p-3">Không xác thực học thuật</td>
            <td className="p-3">Hướng tới xác thực từ nhà trường (roadmap)</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-white/5">
            <td className="p-3">Không dữ liệu phát triển kỹ năng</td>
            <td className="p-3">Tiến trình năng lực trên hồ sơ</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-white/5">
            <td className="p-3">Không hệ sinh thái đồ án</td>
            <td className="p-3">Project Showcase</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-white/5">
            <td className="p-3">Ít hỗ trợ từ năm nhất</td>
            <td className="p-3">Định hướng &amp; việc làm đúng chuyên môn sớm</td>
          </tr>
          <tr>
            <td className="p-3">Ít remote chuyên môn</td>
            <td className="p-3">Remote Work Ecosystem (đang mở rộng)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </ThesisLayout>
);

export default DifferentiationPage;
