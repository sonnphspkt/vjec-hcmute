import { Link } from 'react-router-dom';
import ThesisLayout, { T } from '@/components/thesis/ThesisLayout';

const HelpGuidePage = () => (
  <ThesisLayout title="Hướng dẫn & mục lục đề án trên web" eyebrow="Trợ giúp">
    <T.p>
      Các mục <strong>I–XV</strong> trong đề án đã được đưa lên web dưới dạng trang chiến lược — tra cứu nhanh cho báo
      cáo khóa luận.
    </T.p>

    <T.h2>Mục lục</T.h2>
    <T.ul>
      <T.li>
        <Link to="/about" className="text-primary-600 dark:text-primary-400">
          I–III · Tư duy, bài toán, giải pháp bốn trụ
        </Link>
      </T.li>
      <T.li>
        <Link to="/career-dna" className="text-primary-600 dark:text-primary-400">
          IV · Career DNA
        </Link>
      </T.li>
      <T.li>
        <Link to="/ai-engine" className="text-primary-600 dark:text-primary-400">
          V · AI Career Engine
        </Link>
      </T.li>
      <T.li>
        <Link to="/showcase-ecosystem" className="text-primary-600 dark:text-primary-400">
          VI · Project Showcase Ecosystem
        </Link>
      </T.li>
      <T.li>
        <Link to="/remote-work" className="text-primary-600 dark:text-primary-400">
          VII · Remote Work Ecosystem
        </Link>
      </T.li>
      <T.li>
        <Link to="/micro-internship" className="text-primary-600 dark:text-primary-400">
          VIII · Micro Internship
        </Link>
      </T.li>
      <T.li>
        <Link to="/research-hub" className="text-primary-600 dark:text-primary-400">
          IX · Research &amp; Innovation Hub
        </Link>
      </T.li>
      <T.li>
        <Link to="/network" className="text-primary-600 dark:text-primary-400">
          X · Mạng xã hội học thuật
        </Link>
      </T.li>
      <T.li>
        <Link to="/compare" className="text-primary-600 dark:text-primary-400">
          XI · So sánh điểm khác biệt
        </Link>
      </T.li>
      <T.li>
        <Link to="/university-analytics" className="text-primary-600 dark:text-primary-400">
          XII · Giá trị cho nhà trường
        </Link>
      </T.li>
      <T.li>
        <Link to="/packages" className="text-primary-600 dark:text-primary-400">
          XIII · Kinh tế &amp; gói dịch vụ
        </Link>
      </T.li>
      <T.li>
        <Link to="/vision-2030" className="text-primary-600 dark:text-primary-400">
          XIV · Tầm nhìn 2030
        </Link>
      </T.li>
      <T.li>
        <Link to="/strategy-conclusion" className="text-primary-600 dark:text-primary-400">
          XV · Kết luận chiến lược
        </Link>
      </T.li>
    </T.ul>
  </ThesisLayout>
);

export default HelpGuidePage;
