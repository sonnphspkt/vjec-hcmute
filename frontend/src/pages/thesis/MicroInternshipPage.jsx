import { Link } from 'react-router-dom';
import ThesisLayout, { T } from '@/components/thesis/ThesisLayout';

const MicroInternshipPage = () => (
  <ThesisLayout
    title="Micro Internship"
    eyebrow="Mục VIII · Thực tập siêu ngắn"
    aside={
      <Link
        to="/jobs?type=internship"
        className="inline-block w-full text-center py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold"
      >
        Xem tin thực tập
      </Link>
    }
  >
    <T.p>
      Thay vì chờ đến năm 4 mới thực tập dài ngày, đề án đề xuất <strong>Micro Internship</strong>: 1–2 tuần hoặc mini
      project ngắn — giúp sinh viên năm 1–2 đã chạm tay vào môi trường doanh nghiệp và bổ sung Career DNA liên tục.
    </T.p>

    <T.h2>Giá trị</T.h2>
    <T.ul>
      <T.li>Trải nghiệm sớm, ít rào cản thời gian.</T.li>
      <T.li>Tích lũy kỹ năng và minh chứng trên hồ sơ.</T.li>
      <T.li>Doanh nghiệp thử nghiệm phù hợp trước khi cam kết dài hạn.</T.li>
    </T.ul>

    <T.note>
      Trên web, các tin <strong>thực tập / internship</strong> có thể được lọc trong trang việc làm. Module đặt lịch
      micro-internship riêng có thể bổ sung trong phiên bản sau.
    </T.note>

    <T.p>
      <Link to="/jobs?type=internship" className="text-primary-600 dark:text-primary-400 font-medium">
        Lọc việc làm loại thực tập →
      </Link>
    </T.p>
  </ThesisLayout>
);

export default MicroInternshipPage;
