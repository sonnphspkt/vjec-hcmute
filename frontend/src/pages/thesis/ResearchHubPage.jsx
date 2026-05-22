import { Link } from 'react-router-dom';
import ThesisLayout, { T } from '@/components/thesis/ThesisLayout';

const ResearchHubPage = () => (
  <ThesisLayout
    title="Research & Innovation Hub"
    eyebrow="Mục IX · Đổi mới sáng tạo"
    aside={
      <p className="text-sm text-slate-600 dark:text-gray-400">
        Không gian này trong đề án kết nối ThS/TS/GV với doanh nghiệp. Phiên bản web hiện tập trung MVP sinh viên –
        doanh nghiệp.
      </p>
    }
  >
    <T.p>
      Đề án mở rộng UTE từ tuyển dụng sang <strong>đổi mới sáng tạo</strong>: Research Profile (lĩnh vực, công bố,
      bằng sáng chế), Innovation Showcase (prototype), Industry Collaboration (đặt bài toán, R&D, tài trợ).
    </T.p>

    <T.h2>Đối tượng</T.h2>
    <T.p>Thạc sĩ, tiến sĩ, giảng viên, nhóm nghiên cứu — song song với sinh viên và doanh nghiệp.</T.p>

    <T.h2>Trạng thái triển khai web</T.h2>
    <T.note>
      Module <strong>R&amp;I Hub</strong> được mô tả đầy đủ trong đề án và là <strong>hướng phát triển</strong> (phiên
      bản sau khóa luận): cần luồng đăng ký researcher, showcase đề tài và matching doanh nghiệp.
    </T.note>

    <T.p>
      <Link to="/network" className="text-primary-600 dark:text-primary-400 font-medium">
        Mạng xã hội nghề nghiệp học thuật (mục X) →
      </Link>
    </T.p>
  </ThesisLayout>
);

export default ResearchHubPage;
