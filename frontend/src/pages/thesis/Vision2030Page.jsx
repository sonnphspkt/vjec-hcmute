import ThesisLayout, { T } from '@/components/thesis/ThesisLayout';

const Vision2030Page = () => (
  <ThesisLayout title="Tầm nhìn 2030" eyebrow="Mục XIV">
    <T.p>
      Đến năm 2030, đề án hướng UTE Job Platform trở thành{' '}
      <strong className="text-slate-900 dark:text-white">
        hệ sinh thái dữ liệu nghề nghiệp và kết nối nhân lực kỹ thuật hàng đầu
      </strong>
      — không chỉ cho một trường mà có thể mở rộng đa trường, doanh nghiệp, trung tâm nghiên cứu và hệ sinh thái đổi mới
      sáng tạo.
    </T.p>
    <T.p>
      UTE trở thành <strong>cầu nối chiến lược</strong> giữa giáo dục – doanh nghiệp – công nghệ – đổi mới sáng tạo.
    </T.p>
    <T.note>
      Phiên bản khóa luận đóng vai trò <strong>MVP và minh chứng kỹ thuật</strong> cho lộ trình này.
    </T.note>
  </ThesisLayout>
);

export default Vision2030Page;
