import { Link } from 'react-router-dom';
import ThesisLayout, { T } from '@/components/thesis/ThesisLayout';

const AboutVisionPage = () => (
  <ThesisLayout
    title="Tư duy mới & bài toán thực tế"
    eyebrow="Mục I – III · Đề án UTE Job Platform"
    aside={
      <>
        <p className="font-semibold text-slate-900 dark:text-white mb-3">Tiếp theo trong đề án</p>
        <ul className="space-y-2 text-slate-600 dark:text-gray-400">
          <li>
            <Link to="/career-dna" className="hover:text-primary-500">
              IV · Career DNA →
            </Link>
          </li>
          <li>
            <Link to="/ai-engine" className="hover:text-primary-500">
              V · AI Career Engine →
            </Link>
          </li>
          <li>
            <Link to="/showcase-ecosystem" className="hover:text-primary-500">
              VI · Project Showcase →
            </Link>
          </li>
        </ul>
      </>
    }
  >
    <T.h2>I. Đây không chỉ là website tuyển dụng</T.h2>
    <T.p>
      UTE Job Platform được định vị là{' '}
      <strong className="text-slate-900 dark:text-white">
        hệ sinh thái hồ sơ năng lực số & kết nối nhân lực tương lai
      </strong>
      — hay ngắn gọn: <em>Digital Career Ecosystem for Future Engineers</em>.
    </T.p>
    <T.p>
      Khác với nền tảng chỉ nhìn CV tĩnh, UTE hướng tới <strong>số hóa toàn bộ hành trình</strong> từ năm nhất,
      thực tập, dự án, remote work đến tốt nghiệp và nghiên cứu — hình thành một{' '}
      <strong className="text-slate-900 dark:text-white">hệ sinh thái nhân lực số</strong> liên tục.
    </T.p>

    <T.h2>II. Bài toán thực tế</T.h2>
    <T.ul>
      <T.li>
        <strong>Sinh viên:</strong> có thời gian và năng lực học nhưng khó tiếp cận việc đúng chuyên môn, thiếu
        định hướng và trải nghiệm thực tế sớm.
      </T.li>
      <T.li>
        <strong>Doanh nghiệp:</strong> thiếu nhân lực trẻ có kỹ năng thực tế, khó đánh giá đúng năng lực, chi phí
        đào tạo lại cao.
      </T.li>
      <T.li>
        <strong>Nhà trường:</strong> khó theo dõi chất lượng đầu ra, thiếu dữ liệu thị trường để điều chỉnh đào tạo.
      </T.li>
    </T.ul>
    <T.note>
      Nhiều sinh viên phải làm thêm ngoài ngành (xe công nghệ, phục vụ…) chỉ để trang trải — những việc đó{' '}
      <strong>không</strong> tích lũy chuyên môn. Đề án đặt mục tiêu chuyển dần sang việc làm{' '}
      <strong>đúng chuyên ngành</strong> (remote, freelance, mini project).
    </T.note>

    <T.h2>III. Giải pháp chiến lược — bốn trụ</T.h2>
    <T.ul>
      <T.li>
        <Link to="/career-dna" className="font-medium text-primary-600 dark:text-primary-400">
          Career DNA + Remote Work
        </Link>{' '}
        — hồ sơ năng lực phát triển theo thời gian; làm việc từ xa / freelance đúng chuyên môn.
      </T.li>
      <T.li>
        <Link to="/ai-engine" className="font-medium text-primary-600 dark:text-primary-400">
          AI Matching &amp; phân tích
        </Link>{' '}
        — ghép việc và phân tích khoảng trống kỹ năng (phiên bản nền tảng đang mở rộng dần).
      </T.li>
      <T.li>
        <Link to="/university-analytics" className="font-medium text-primary-600 dark:text-primary-400">
          Analytics cho nhà trường
        </Link>{' '}
        — dữ liệu đầu ra, kỹ năng, xu hướng tuyển dụng (roadmap sản phẩm).
      </T.li>
      <T.li>
        <Link to="/showcase-ecosystem" className="font-medium text-primary-600 dark:text-primary-400">
          Project Showcase Ecosystem
        </Link>{' '}
        — đưa đồ án / portfolio ra khỏi “ngăn kéo”, kết nối doanh nghiệp.
      </T.li>
    </T.ul>
  </ThesisLayout>
);

export default AboutVisionPage;
