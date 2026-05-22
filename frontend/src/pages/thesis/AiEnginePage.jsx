import { Link } from 'react-router-dom';
import ThesisLayout, { T } from '@/components/thesis/ThesisLayout';

const AiEnginePage = () => (
  <ThesisLayout
    title="AI Career Engine"
    eyebrow="Mục V · Trái tim công nghệ"
    aside={
      <p className="text-slate-600 dark:text-gray-400">
        Các API gợi ý đang được triển khai dần. Sinh viên có thể xem việc làm và hồ sơ để chuẩn bị dữ liệu cho AI.
      </p>
    }
  >
    <T.p>
      Đề án không dùng AI chỉ để “chat”, mà xây <strong>AI Career Engine</strong> — bộ module chuyên sâu cho định
      hướng nghề nghiệp và phát triển nhân lực.
    </T.p>

    <T.h2>1. AI Career Orientation</T.h2>
    <T.p>Phân tích sở thích, kỹ năng, kết quả học tập và xu hướng ngành → đề xuất nghề phù hợp, roadmap, kỹ năng cần học.</T.p>

    <T.h2>2. AI Skill Gap Analysis</T.h2>
    <T.p>
      So khớp yêu cầu doanh nghiệp (ví dụ Python, PLC, AutoCAD) với hồ sơ sinh viên → gợi ý môn học, workshop,
      chứng chỉ; có giá trị cho cả nhà trường khi cải tiến chương trình.
    </T.p>

    <T.h2>3. AI Job Matching</T.h2>
    <T.p>Không chỉ từ khóa: xét kỹ năng, dự án, quỹ đạo phát triển để đề xuất việc phù hợp hơn.</T.p>

    <T.h2>4. AI Market Trend Forecast</T.h2>
    <T.p>Dự báo xu hướng ngành, kỹ năng “hot”, giúp đào tạo hướng về tương lai.</T.p>

    <T.h2>5. AI Portfolio Reviewer</T.h2>
    <T.p>Đánh giá CV / đồ án / portfolio: điểm mạnh-yếu và gợi ý cải thiện.</T.p>

    <T.note>
      Trên phiên bản khóa luận hiện tại, một số chức năng này đang ở dạng <strong>API / logic khởi đầu</strong> hoặc{' '}
      <strong>định hướng trong báo cáo</strong>. Hoàn thiện đầy đủ cần tích hợp mô hình ML và dữ liệu huấn luyện (phần
      mở rộng sau khóa luận).
    </T.note>

    <T.p>
      <Link to="/jobs" className="text-primary-600 dark:text-primary-400 font-medium">
        Khám phá việc làm →
      </Link>
    </T.p>
  </ThesisLayout>
);

export default AiEnginePage;
