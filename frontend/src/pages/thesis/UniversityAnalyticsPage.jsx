import ThesisLayout, { T } from '@/components/thesis/ThesisLayout';

const UniversityAnalyticsPage = () => (
  <ThesisLayout
    title="Giá trị cho nhà trường & University Analytics"
    eyebrow="Mục XII · Dữ liệu đầu ra"
    aside={
      <p className="text-sm text-slate-600 dark:text-gray-400">
        Dashboard phân tích cho nhà trường trong đề án gồm thống kê việc làm, kỹ năng nổi bật, skill gap, xu hướng
        tuyển dụng — phục vụ cải tiến chương trình đào tạo.
      </p>
    }
  >
    <T.p>
      Giá trị chiến lược lớn nhất của đề án là <strong>dữ liệu</strong>: hiểu sinh viên, doanh nghiệp và thị trường
      lao động để điều chỉnh đào tạo sát thực tế.
    </T.p>

    <T.h2>University Analytics Dashboard (định hướng)</T.h2>
    <T.ul>
      <T.li>Thống kê việc làm của sinh viên.</T.li>
      <T.li>Phân tích kỹ năng nổi bật và skill gap.</T.li>
      <T.li>Theo dõi xu hướng tuyển dụng và nhu cầu thị trường.</T.li>
    </T.ul>

    <T.note>
      Phiên bản khóa luận đã có <strong>khung API analytics</strong> và vai trò admin trong thiết kế; báo cáo đầy đủ
      cần dữ liệu lịch sử và chính sách chia sẻ với nhà trường.
    </T.note>
  </ThesisLayout>
);

export default UniversityAnalyticsPage;
