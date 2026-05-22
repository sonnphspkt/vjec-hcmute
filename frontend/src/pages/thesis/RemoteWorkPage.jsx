import { Link } from 'react-router-dom';
import ThesisLayout, { T } from '@/components/thesis/ThesisLayout';

const RemoteWorkPage = () => (
  <ThesisLayout
    title="Student Remote Work Ecosystem"
    eyebrow="Mục VII · Việc làm đúng chuyên môn từ xa"
    aside={
      <>
        <p className="font-semibold text-slate-900 dark:text-white mb-2">Thử lọc việc remote</p>
        <Link
          to="/jobs?remote=1"
          className="inline-block w-full text-center py-2 rounded-lg border border-primary-500/50 text-primary-700 dark:text-primary-300 text-sm font-semibold hover:bg-primary-500/10"
        >
          Việc làm remote
        </Link>
      </>
    }
  >
    <T.p>
      Thay vì chỉ làm thêm để kiếm tiền ngoài ngành, đề án hướng tới{' '}
      <strong>việc làm chuyên môn từ xa</strong>: freelance, mini project, part-time đúng kỹ năng — có thu nhập, có
      portfolio và có đánh giá từ doanh nghiệp ngay từ năm nhất.
    </T.p>

    <T.h2>Nhóm công việc minh họa (đề án)</T.h2>
    <T.ul>
      <T.li>
        <strong>Công nghệ:</strong> lập trình, UI/UX, test, nhập liệu / hỗ trợ AI.
      </T.li>
      <T.li>
        <strong>Kỹ thuật:</strong> AutoCAD, thiết kế 3D, bóc tách kỹ thuật.
      </T.li>
      <T.li>
        <strong>Truyền thông:</strong> edit video, content marketing.
      </T.li>
    </T.ul>

    <T.note>
      Module “hub” riêng cho remote/freelance là <strong>hướng mở rộng</strong>. Hiện tại bạn có thể xem các tin có
      chế độ <strong>remote</strong> trong danh sách việc làm (lọc query).
    </T.note>

    <T.p>
      <Link to="/jobs?remote=1" className="text-primary-600 dark:text-primary-400 font-medium">
        Danh sách việc remote →
      </Link>
    </T.p>
  </ThesisLayout>
);

export default RemoteWorkPage;
