import { Link } from 'react-router-dom';
import ThesisLayout, { T } from '@/components/thesis/ThesisLayout';

const CareerDnaConceptPage = () => (
  <ThesisLayout
    title="Career DNA — DNA nghề nghiệp số"
    eyebrow="Mục IV · Linh hồn của đề án"
    aside={
      <>
        <p className="font-semibold text-slate-900 dark:text-white mb-2">Trên nền tảng</p>
        <p className="text-slate-600 dark:text-gray-400 mb-3">
          Sinh viên cập nhật hồ sơ, kỹ năng, liên kết dự án trong{' '}
          <Link to="/student/profile" className="text-primary-600 dark:text-primary-400">
            Dashboard → Hồ sơ
          </Link>
          .
        </p>
        <Link
          to="/student/profile"
          className="inline-block w-full text-center py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold"
        >
          Mở hồ sơ Career DNA
        </Link>
      </>
    }
  >
    <T.p>
      Sinh viên không chỉ có một CV tĩnh mà sở hữu <strong>Career DNA</strong>: tập hợp có cấu trúc về hành trình học
      tập, kỹ năng, dự án, đồ án, hoạt động ngoại khóa, kinh nghiệm và — trong tầm nhìn đề án — phản hồi từ doanh
      nghiệp và phân tích AI.
    </T.p>

    <T.h2>Doanh nghiệp nhìn thấy gì?</T.h2>
    <T.p>
      Thay vì chỉ biết “học ngành gì”, nhà tuyển dụng có thể thấy <em>khả năng học hỏi</em>, tiềm năng phát triển,
      tư duy công nghệ và năng lực thực tế qua dự án và tiến trình cập nhật hồ sơ.
    </T.p>

    <T.h2>Ví dụ minh họa (đề án)</T.h2>
    <T.ul>
      <T.li>
        <strong>Năm 1:</strong> CAD cơ bản, tham gia CLB robot.
      </T.li>
      <T.li>
        <strong>Năm 2:</strong> đồ án IoT, teamwork.
      </T.li>
      <T.li>
        <strong>Năm 3:</strong> thực tập doanh nghiệp, đánh giá mentor.
      </T.li>
      <T.li>
        <strong>Năm 4:</strong> project AI / nhúng — thể hiện một kỹ sư đang trưởng thành.
      </T.li>
    </T.ul>

    <T.note>
      Phiên bản hiện tại của web đã có <strong>dữ liệu nền</strong> (kỹ năng, học vấn, Career DNA trong hồ sơ).
      Timeline trực quan theo năm và phản hồi DN là <strong>hướng phát triển</strong> tiếp theo trong báo cáo.
    </T.note>

    <T.h2>Tiếp theo</T.h2>
    <T.p>
      <Link to="/ai-engine" className="text-primary-600 dark:text-primary-400 font-medium">
        AI Career Engine →
      </Link>{' '}
      kết hợp với Career DNA để gợi ý nghề nghiệp, khoảng trống kỹ năng và ghép việc thông minh hơn.
    </T.p>
  </ThesisLayout>
);

export default CareerDnaConceptPage;
