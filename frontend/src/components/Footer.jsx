import { Link } from 'react-router-dom';
import { Github, Linkedin, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 border-t border-slate-200/90 mt-20 dark:bg-dark-400 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center font-bold">
                UTE
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">UTE Job Platform</span>
            </div>
            <p className="text-slate-600 text-sm dark:text-gray-400">
              Hệ sinh thái nghề nghiệp số hàng đầu cho kỹ sư tương lai.
              Kết nối - Phát triển - Thành công.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Sản phẩm</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
              <li>
                <Link to="/jobs" className="hover:text-primary-400 transition-colors">
                  Tìm việc làm
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-primary-400 transition-colors">
                  Dự án nổi bật
                </Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-primary-400 transition-colors">
                  Doanh nghiệp
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-primary-400 transition-colors">
                  Tin tức tuyển dụng
                </Link>
              </li>
              <li>
                <Link to="/talent" className="hover:text-primary-400 transition-colors">
                  Talent &amp; Career DNA
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  Tầm nhìn đề án (I–III)
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-primary-400 transition-colors">
                  Mục lục đề án I–XV
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Dành cho sinh viên</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
              <li>
                <Link to="/register" className="hover:text-primary-400 transition-colors">
                  Đăng ký tài khoản
                </Link>
              </li>
              <li>
                <Link to="/career-dna" className="hover:text-primary-400 transition-colors">
                  Career DNA
                </Link>
              </li>
              <li>
                <Link to="/ai-engine" className="hover:text-primary-400 transition-colors">
                  AI Career Engine
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-primary-400 transition-colors">
                  Hướng dẫn
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Kết nối</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-slate-200/80 dark:hover:bg-white/10 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-slate-200/80 dark:hover:bg-white/10 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-slate-200/80 dark:hover:bg-white/10 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@utejobplatform.com"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-slate-200/80 dark:hover:bg-white/10 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              Email: support@utejobplatform.com
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-200/90 dark:border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 dark:text-gray-400">
          <p>© {currentYear} UTE Job Platform. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-primary-400 transition-colors">
              Chính sách bảo mật
            </Link>
            <Link to="/terms" className="hover:text-primary-400 transition-colors">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
