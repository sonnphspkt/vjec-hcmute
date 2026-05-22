import { Link } from 'react-router-dom';
import ThesisLayout, { T } from '@/components/thesis/ThesisLayout';

const ShowcaseEcosystemPage = () => (
  <ThesisLayout
    title="Project Showcase Ecosystem"
    eyebrow="Mục VI · Triển lãm đồ án số"
    aside={
      <Link
        to="/projects"
        className="inline-block w-full text-center py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold"
      >
        Vào Showcase thực tế
      </Link>
    }
  >
    <T.p>
      Nhiều đồ án sau khi bảo vệ nằm im trong thư viện. Đề án đề xuất <strong>Project Showcase Ecosystem</strong>: mỗi
      dự án có video demo, ảnh, GitHub, công nghệ, nhóm thực hiện; doanh nghiệp có thể quan tâm, lưu, mời phỏng vấn,
      tài trợ — hướng tới trải nghiệm “TikTok + LinkedIn cho đồ án kỹ thuật”.
    </T.p>

    <T.h2>Đã có trên web (MVP)</T.h2>
    <T.ul>
      <T.li>Danh sách và chi tiết project công khai.</T.li>
      <T.li>Like và bình luận (API).</T.li>
      <T.li>Liên kết demo / mã nguồn / công nghệ sử dụng.</T.li>
    </T.ul>

    <T.h2>Roadmap theo đề án</T.h2>
    <T.ul>
      <T.li>Upload video demo, thư viện ảnh.</T.li>
      <T.li>Mentor / giảng viên hướng dẫn hiển thị trên thẻ dự án.</T.li>
      <T.li>Nút follow / save / mời phỏng vấn cho doanh nghiệp.</T.li>
    </T.ul>

    <T.p>
      <Link to="/projects" className="text-primary-600 dark:text-primary-400 font-medium">
        Xem Showcase →
      </Link>
    </T.p>
  </ThesisLayout>
);

export default ShowcaseEcosystemPage;
