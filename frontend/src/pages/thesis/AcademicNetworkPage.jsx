import { Link } from 'react-router-dom';
import ThesisLayout, { T } from '@/components/thesis/ThesisLayout';

const AcademicNetworkPage = () => (
  <ThesisLayout
    title="Mạng xã hội nghề nghiệp học thuật"
    eyebrow="Mục X · Hoạt động liên tục"
    aside={
      <p className="text-sm text-slate-600 dark:text-gray-400">
        Showcase dự án và việc làm là hai “trục” đầu tiên của mạng lưới trong MVP.
      </p>
    }
  >
    <T.p>
      UTE không chỉ là site theo mùa tuyển dụng mà hướng tới <strong>mạng xã hội nghề nghiệp học thuật</strong>: sinh
      viên đăng project, cập nhật kỹ năng, chia sẻ thành tựu, tìm teammate; giảng viên đăng đề tài, kết nối DN; doanh
      nghiệp theo dõi tiềm năng, tài trợ hackathon.
    </T.p>

    <T.h2>Đã có trong MVP</T.h2>
    <T.ul>
      <T.li>
        <Link to="/projects" className="text-primary-600 dark:text-primary-400">
          Showcase project
        </Link>{' '}
        và tương tác cơ bản.
      </T.li>
      <T.li>
        <Link to="/jobs" className="text-primary-600 dark:text-primary-400">
          Việc làm &amp; ứng tuyển
        </Link>{' '}
        cho sinh viên.
      </T.li>
    </T.ul>

    <T.h2>Roadmap đề án</T.h2>
    <T.ul>
      <T.li>Bài viết kỹ thuật, feed cộng đồng.</T.li>
      <T.li>Kết nối teammate / nhóm dự án.</T.li>
      <T.li>Kênh giảng viên – đề tài – doanh nghiệp.</T.li>
    </T.ul>
  </ThesisLayout>
);

export default AcademicNetworkPage;
