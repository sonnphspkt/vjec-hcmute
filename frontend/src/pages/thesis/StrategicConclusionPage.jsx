import { Link } from 'react-router-dom';
import ThesisLayout, { T } from '@/components/thesis/ThesisLayout';

const StrategicConclusionPage = () => (
  <ThesisLayout title="Kết luận chiến lược" eyebrow="Mục XV">
    <T.p>
      UTE Job Platform <strong>không</strong> chỉ là website tìm việc truyền thống mà là{' '}
      <strong className="text-slate-900 dark:text-white">
        nền tảng dữ liệu nghề nghiệp – kết nối nhân lực – đổi mới sáng tạo
      </strong>{' '}
      cho hệ sinh thái đại học kỹ thuật.
    </T.p>
    <T.ul>
      <T.li>Nâng cao chất lượng đào tạo và cơ hội việc làm.</T.li>
      <T.li>Phát triển kỹ năng thực tế từ sớm.</T.li>
      <T.li>Hỗ trợ doanh nghiệp tiếp cận nhân lực chất lượng.</T.li>
      <T.li>Thúc đẩy nghiên cứu và đổi mới sáng tạo.</T.li>
    </T.ul>
    <T.p>
      Triển khai hiệu quả có thể đưa UTE trở thành{' '}
      <strong>mô hình chuyển đổi số nghề nghiệp tiêu biểu</strong> cho các trường đại học kỹ thuật tại Việt Nam.
    </T.p>
    <T.p>
      <Link to="/" className="text-primary-600 dark:text-primary-400 font-medium">
        ← Về trang chủ
      </Link>
    </T.p>
  </ThesisLayout>
);

export default StrategicConclusionPage;
