import ThesisLayout, { T } from '@/components/thesis/ThesisLayout';

const BusinessModelPage = () => (
  <ThesisLayout
    title="Giá trị kinh tế & gói dịch vụ doanh nghiệp"
    eyebrow="Mục XIII · Phát triển bền vững"
    aside={
      <p className="text-sm text-slate-600 dark:text-gray-400">
        Nội dung mang tính mô hình kinh doanh trong đề án; triển khai thanh toán và gói premium là giai đoạn sau MVP.
      </p>
    }
  >
    <T.p>
      UTE không chỉ có giá trị giáo dục mà còn tiềm năng trở thành <strong>nền tảng dữ liệu nhân lực kỹ thuật</strong>,
      giảm chi phí headhunter / hội chợ việc làm nhờ pipeline dài hạn.
    </T.p>

    <T.h2>Gói minh họa (đề án)</T.h2>
    <T.h3>Basic Package</T.h3>
    <T.ul>
      <T.li>Đăng tuyển cơ bản, quản lý ứng viên.</T.li>
    </T.ul>
    <T.h3>Premium Recruitment</T.h3>
    <T.ul>
      <T.li>AI matching nâng cao, tìm kiếm chuyên sâu, xem Career DNA chi tiết, ưu tiên hiển thị.</T.li>
    </T.ul>
    <T.h3>Strategic Partner</T.h3>
    <T.ul>
      <T.li>Tài trợ học bổng, đặt hàng đào tạo, kết nối nghiên cứu, ưu tiên tuyển, tiếp cận sinh viên tiềm năng sớm.</T.li>
    </T.ul>

    <T.note>
      Trên web hiện tại, doanh nghiệp có thể đăng ký và dùng dashboard cơ bản; <strong>gói trả phí</strong> được mô tả
      trong đề án để chứng minh tính bền vững kinh tế — không bắt buộc hiện thực hóa đầy đủ trong phạm vi khóa luận.
    </T.note>
  </ThesisLayout>
);

export default BusinessModelPage;
