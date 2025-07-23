'use client'
import { Calendar, User, Eye, Tag, TrendingUp, X } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Interface for Article
interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  image?: string
  category: string
  author: string
  publishedAt: string
  views: number
  featured: boolean
  published: boolean
}

// Mock recruitment news data for fallback
const mockNews = [
  {
    id: '1',
    title: 'Nhu cầu tuyển dụng IT tại Việt Nam tăng mạnh trong Q4/2024',
    excerpt: 'Theo báo cáo từ các công ty tuyển dụng hàng đầu, nhu cầu tuyển dụng nhân sự IT tại Việt Nam tăng 35% so với cùng kỳ năm trước, với các vị trí Frontend, Backend Developer và Data Analyst được săn đón nhiều nhất.',
    content: `
      <h2>Thị trường việc làm IT Việt Nam bùng nổ trong Q4/2024</h2>
      
      <p>Theo báo cáo mới nhất từ JobStreet và VietnamWorks, nhu cầu tuyển dụng nhân sự IT tại Việt Nam đã tăng vượt bậc 35% so với cùng kỳ năm trước, đánh dấu một giai đoạn phát triển mạnh mẽ của ngành công nghệ thông tin trong nước.</p>
      
      <h3>Các vị trí được săn đón nhất</h3>
      <ul>
        <li><strong>Frontend Developer:</strong> Tăng 45% về nhu cầu tuyển dụng, đặc biệt là các kỹ năng React, Vue.js và Angular</li>
        <li><strong>Backend Developer:</strong> Tăng 38% với yêu cầu cao về Node.js, Python và Java</li>
        <li><strong>Data Analyst/Data Scientist:</strong> Tăng 52%, phản ánh xu hướng chuyển đổi số mạnh mẽ</li>
        <li><strong>DevOps Engineer:</strong> Tăng 41% khi các công ty tập trung vào tự động hóa</li>
        <li><strong>Mobile Developer:</strong> Tăng 33% với focus vào Flutter và React Native</li>
      </ul>
      
      <h3>Mức lương hấp dẫn</h3>
      <p>Mức lương trung bình cho các vị trí IT đã tăng 20-30% so với năm trước:</p>
      <ul>
        <li>Junior Developer: 12-18 triệu VND</li>
        <li>Mid-level Developer: 20-35 triệu VND</li>
        <li>Senior Developer: 35-60 triệu VND</li>
        <li>Tech Lead/Architect: 60-100 triệu VND</li>
      </ul>
      
      <h3>Cơ hội cho sinh viên mới tốt nghiệp</h3>
      <p>Đặc biệt, các công ty công nghệ đang mở rộng chương trình tuyển dụng fresher với các khóa đào tạo nội bộ từ 3-6 tháng. Nhiều công ty cam kết lương khởi điểm từ 10-15 triệu VND cho sinh viên mới ra trường có kỹ năng tốt.</p>
      
      <h3>Xu hướng Remote và Hybrid</h3>
      <p>Đáng chú ý, hơn 70% các vị trí IT hiện tại cho phép làm việc remote hoặc hybrid, tạo điều kiện linh hoạt cho người lao động và mở rộng cơ hội việc làm không giới hạn địa lý.</p>
      
      <p><em>Nguồn: Báo cáo thị trường việc làm IT Q4/2024 từ JobStreet, VietnamWorks và TopDev</em></p>
    `,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=300&fit=crop&crop=center',
    category: 'Thị trường việc làm',
    author: 'Nguyễn Minh Hoàng',
    publishedAt: '2024-01-20',
    views: 1234,
    featured: true,
    published: true
  },
  {
    id: '2',
    title: 'Top 10 công ty công nghệ hàng đầu tuyển dụng sinh viên mới tốt nghiệp',
    excerpt: 'Danh sách 10 công ty công nghệ uy tín nhất hiện đang mở rộng tuyển dụng sinh viên mới tốt nghiệp với mức lương hấp dẫn và cơ hội phát triển sự nghiệp tốt.',
    content: `
      <h2>Top 10 công ty công nghệ săn tìm tài năng trẻ</h2>
      
      <p>Trong bối cảnh chuyển đổi số mạnh mẽ, nhiều công ty công nghệ hàng đầu đang tích cực mở rộng đội ngũ với các chương trình tuyển dụng dành riêng cho sinh viên mới tốt nghiệp.</p>
      
      <h3>1. FPT Software</h3>
      <ul>
        <li>Tuyển dụng: 2000+ fresher/năm</li>
        <li>Mức lương: 12-18 triệu VND</li>
        <li>Đặc biệt: Chương trình đào tạo 6 tháng, cơ hội làm việc tại Nhật Bản</li>
      </ul>
      
      <h3>2. VNG Corporation</h3>
      <ul>
        <li>Tuyển dụng: 500+ vị trí</li>
        <li>Mức lương: 15-25 triệu VND</li>
        <li>Đặc biệt: Môi trường startup, cổ phiếu nhân viên</li>
      </ul>
      
      <h3>3. Shopee Vietnam</h3>
      <ul>
        <li>Tuyển dụng: 800+ vị trí</li>
        <li>Mức lương: 18-28 triệu VND</li>
        <li>Đặc biệt: Graduate Program 1 năm, cơ hội rotation</li>
      </ul>
      
      <h3>4. Grab Vietnam</h3>
      <ul>
        <li>Tuyển dụng: 300+ vị trí</li>
        <li>Mức lương: 20-30 triệu VND</li>
        <li>Đặc biệt: Làm việc với technology cutting-edge</li>
      </ul>
      
      <h3>5. Tiki</h3>
      <ul>
        <li>Tuyển dụng: 400+ vị trí</li>
        <li>Mức lương: 15-22 triệu VND</li>
        <li>Đặc biệt: Chương trình mentorship 1-1</li>
      </ul>
      
      <h3>6. Viettel Solutions</h3>
      <ul>
        <li>Tuyển dụng: 1500+ vị trí</li>
        <li>Mức lương: 12-20 triệu VND</li>
        <li>Đặc biệt: Cơ hội làm việc tại 10+ quốc gia</li>
      </ul>
      
      <h3>7. Base.vn</h3>
      <ul>
        <li>Tuyển dụng: 200+ vị trí</li>
        <li>Mức lương: 14-20 triệu VND</li>
        <li>Đặc biệt: Focus vào AI và Machine Learning</li>
      </ul>
      
      <h3>8. Zalo (VNG)</h3>
      <ul>
        <li>Tuyển dụng: 300+ vị trí</li>
        <li>Mức lương: 16-24 triệu VND</li>
        <li>Đặc biệt: Sản phẩm có 100+ triệu người dùng</li>
      </ul>
      
      <h3>9. CMC Global</h3>
      <ul>
        <li>Tuyển dụng: 1000+ vị trí</li>
        <li>Mức lương: 10-18 triệu VND</li>
        <li>Đặc biệt: Đào tạo offshore development</li>
      </ul>
      
      <h3>10. Sun* Inc</h3>
      <ul>
        <li>Tuyển dụng: 600+ vị trí</li>
        <li>Mức lương: 12-20 triệu VND</li>
        <li>Đặc biệt: 100% dự án từ Nhật Bản</li>
      </ul>
      
      <h3>Cách thức ứng tuyển hiệu quả</h3>
      <ol>
        <li><strong>Chuẩn bị CV chuyên nghiệp:</strong> Highlight các project, internship và kỹ năng technical</li>
        <li><strong>Build portfolio:</strong> Tạo GitHub profile ấn tượng với các dự án cá nhân</li>
        <li><strong>Luyện tập coding interview:</strong> Tập trung vào algorithms và data structures</li>
        <li><strong>Soft skills:</strong> Giao tiếp, teamwork và problem-solving</li>
        <li><strong>Tìm hiểu công ty:</strong> Research về sản phẩm, culture và technology stack</li>
      </ol>
      
      <p><em>Lưu ý: Thông tin được cập nhật đến tháng 12/2024. Ứng viên nên check website chính thức của từng công ty để có thông tin mới nhất.</em></p>
    `,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop&crop=center',
    category: 'Cơ hội việc làm',
    author: 'Trần Thị Mai',
    publishedAt: '2024-01-18',
    views: 856,
    featured: true,
    published: true
  },
  {
    id: '3',
    title: 'Xu hướng Remote Work: Cơ hội và thách thức cho người tìm việc',
    excerpt: 'Làm việc từ xa không còn là xu hướng mà đã trở thành thực tế phổ biến. Bài viết phân tích những cơ hội và thách thức khi tìm kiếm việc làm remote.',
    content: `
      <h2>Remote Work - Cuộc cách mạng trong cách thức làm việc</h2>
      
      <p>Từ sau đại dịch COVID-19, mô hình làm việc từ xa (Remote Work) đã chuyển từ một xu hướng thời thượng thành một chuẩn mực mới trong thế giới công việc. Tại Việt Nam, hơn 60% các công ty công nghệ hiện tại đang áp dụng mô hình hybrid hoặc full remote.</p>
      
      <h3>🚀 Cơ hội từ Remote Work</h3>
      
      <h4>1. Mở rộng cơ hội việc làm không giới hạn địa lý</h4>
      <ul>
        <li>Làm việc cho công ty quốc tế mà không cần di chuyển</li>
        <li>Tiếp cận mức lương USD với chi phí sống Việt Nam</li>
        <li>Cơ hội học hỏi từ các chuyên gia hàng đầu thế giới</li>
      </ul>
      
      <h4>2. Cân bằng cuộc sống - công việc tốt hơn</h4>
      <ul>
        <li>Tiết kiệm 2-3 giờ di chuyển mỗi ngày</li>
        <li>Linh hoạt thời gian để chăm sóc gia đình</li>
        <li>Làm việc trong môi trường thoải mái, quen thuộc</li>
      </ul>
      
      <h4>3. Tăng năng suất làm việc</h4>
      <ul>
        <li>Ít bị phân tâm bởi tiếng ồn văn phòng</li>
        <li>Tự chủ trong việc sắp xếp không gian làm việc</li>
        <li>Focus sâu vào công việc mà không bị gián đoạn</li>
      </ul>
      
      <h3>⚠️ Thách thức cần vượt qua</h3>
      
      <h4>1. Tự kỷ luật và quản lý thời gian</h4>
      <ul>
        <li>Dễ bị phân tâm bởi môi trường gia đình</li>
        <li>Khó tách biệt rõ ràng giữa thời gian làm việc và nghỉ ngơi</li>
        <li>Cần xây dựng thói quen làm việc hiệu quả</li>
      </ul>
      
      <h4>2. Giao tiếp và hợp tác</h4>
      <ul>
        <li>Thiếu tương tác trực tiếp với đồng nghiệp</li>
        <li>Khó khăn trong việc brainstorm và creative collaboration</li>
        <li>Risk của miscommunication qua text/chat</li>
      </ul>
      
      <h4>3. Cô lập xã hội và sức khỏe tinh thần</h4>
      <ul>
        <li>Cảm giác cô đơn, thiếu kết nối với team</li>
        <li>Burnout do làm việc quá nhiều tại nhà</li>
        <li>Thiếu ranh giới rõ ràng giữa work và life</li>
      </ul>
      
      <h3>💡 Kỹ năng cần thiết cho Remote Work thành công</h3>
      
      <h4>Hard Skills:</h4>
      <ul>
        <li><strong>Digital Communication:</strong> Slack, Microsoft Teams, Zoom</li>
        <li><strong>Project Management:</strong> Jira, Trello, Asana, Notion</li>
        <li><strong>Cloud Technologies:</strong> Google Workspace, Office 365</li>
        <li><strong>Version Control:</strong> Git, GitHub cho developer</li>
      </ul>
      
      <h4>Soft Skills:</h4>
      <ul>
        <li><strong>Self-management:</strong> Tự kỷ luật và quản lý thời gian</li>
        <li><strong>Written Communication:</strong> Viết email, chat rõ ràng, súc tích</li>
        <li><strong>Adaptability:</strong> Thích ứng với múi giờ và văn hóa khác nhau</li>
        <li><strong>Proactive Mindset:</strong> Chủ động báo cáo và cập nhật progress</li>
      </ul>
      
      <h3>🛠️ Setup workspace hiệu quả</h3>
      
      <h4>Thiết bị cần thiết:</h4>
      <ul>
        <li>Laptop/Desktop với cấu hình tốt</li>
        <li>Webcam và microphone chất lượng cao</li>
        <li>Màn hình phụ để tăng productivity</li>
        <li>Ghế ngồi ergonomic và bàn làm việc phù hợp</li>
        <li>Internet ổn định tối thiểu 50Mbps</li>
      </ul>
      
      <h4>Môi trường làm việc:</h4>
      <ul>
        <li>Không gian riêng biệt, tránh tiếng ồn</li>
        <li>Ánh sáng tự nhiên hoặc đèn bàn chất lượng tốt</li>
        <li>Nhiệt độ phòng 22-25°C</li>
        <li>Background chuyên nghiệp cho video call</li>
      </ul>
      
      <h3>📈 Tương lai của Remote Work tại Việt Nam</h3>
      
      <p>Theo dự báo của các chuyên gia, đến 2025:</p>
      <ul>
        <li>80% công ty IT sẽ áp dụng mô hình hybrid</li>
        <li>Mức lương remote cao hơn onsite 15-20%</li>
        <li>Xuất hiện nhiều co-working space chuyên biệt</li>
        <li>Chính phủ sẽ có chính sách hỗ trợ digital nomad</li>
      </ul>
      
      <h3>✅ Lời khuyên cho người tìm việc remote</h3>
      
      <ol>
        <li><strong>Build strong online presence:</strong> LinkedIn, GitHub, personal website</li>
        <li><strong>Highlight remote experience:</strong> Nhấn mạnh kinh nghiệm làm việc độc lập</li>
        <li><strong>Practice video interviews:</strong> Luyện tập phỏng vấn qua video call</li>
        <li><strong>Time zone awareness:</strong> Hiểu và thích ứng với múi giờ làm việc</li>
        <li><strong>Portfolio showcase:</strong> Chuẩn bị portfolio online dễ access và impressive</li>
      </ol>
      
      <p><strong>Kết luận:</strong> Remote Work không chỉ là xu hướng mà đã trở thành future of work. Những ai chuẩn bị tốt các kỹ năng cần thiết sẽ có lợi thế cạnh tranh lớn trong thị trường việc làm tương lai.</p>
      
      <p><em>Nguồn tham khảo: Buffer State of Remote Work 2024, GitLab Remote Work Report, Việt Nam Digital Workforce Survey</em></p>
    `,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop&crop=center',
    category: 'Xu hướng nghề nghiệp',
    author: 'Lê Văn Đức',
    publishedAt: '2024-01-15',
    views: 642,
    featured: false,
    published: true
  },
  {
    id: '4',
    title: 'Hướng dẫn viết CV ấn tượng để chinh phục nhà tuyển dụng IT',
    excerpt: 'Những bí quyết để tạo ra một bản CV chuyên nghiệp, ấn tượng và hiệu quả trong việc chinh phục các nhà tuyển dụng trong lĩnh vực công nghệ thông tin.',
    content: 'Một bản CV chất lượng là chìa khóa mở cửa đến với cơ hội việc làm mơ ước...',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=300&fit=crop&crop=center',
    category: 'Kỹ năng nghề nghiệp',
    author: 'Phạm Thị Hoa',
    publishedAt: '2024-01-12',
    views: 923,
    featured: false,
    published: true
  },
  {
    id: '5',
    title: 'Mức lương ngành IT Việt Nam 2024: Báo cáo chi tiết theo vị trí',
    excerpt: 'Báo cáo toàn diện về mức lương trung bình của các vị trí IT phổ biến tại Việt Nam năm 2024, từ junior đến senior level.',
    content: 'Ngành công nghệ thông tin tiếp tục là một trong những ngành có mức lương cao nhất...',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=300&fit=crop&crop=center',
    category: 'Báo cáo lương',
    author: 'Hoàng Minh Tâm',
    publishedAt: '2024-01-10',
    views: 1567,
    featured: false,
    published: true
  },
  {
    id: '6',
    title: 'Cơ hội việc làm tại Nhật Bản cho kỹ sư phần mềm Việt Nam',
    excerpt: 'Phân tích chi tiết về thị trường việc làm IT tại Nhật Bản, yêu cầu kỹ năng, quy trình xin visa và các chương trình hỗ trợ cho người Việt.',
    content: 'Nhật Bản đang là điểm đến hấp dẫn cho nhiều kỹ sư phần mềm Việt Nam...',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=300&fit=crop&crop=center',
    category: 'Việc làm quốc tế',
    author: 'Ngô Văn Thành',
    publishedAt: '2024-01-08',
    views: 789,
    featured: false,
    published: true
  }
]

const categories = [
  'Tất cả',
  'Thị trường việc làm',
  'Cơ hội việc làm', 
  'Xu hướng nghề nghiệp',
  'Kỹ năng nghề nghiệp',
  'Báo cáo lương',
  'Việc làm quốc tế'
]

function NewsCard({ article, featured = false, onArticleClick }: {
  article: Article
  featured?: boolean
  onArticleClick: (article: Article) => void
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleArticleClick = () => {
    onArticleClick(article)
  }

  return (
    <article className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow ${
      featured ? 'lg:flex lg:space-x-6' : ''
    }`}>
      <div className={featured ? 'lg:w-1/2' : ''} onClick={handleArticleClick}>
        <div className="aspect-video bg-gray-200 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none overflow-hidden relative cursor-pointer">
          <Image 
            src={article.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=300&fit=crop&crop=center'} 
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white bg-opacity-90 text-gray-900">
              📰 {article.category}
            </span>
          </div>
        </div>
      </div>
      
      <div className={`p-6 ${featured ? 'lg:w-1/2' : ''}`}>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Tag className="h-3 w-3 mr-1" />
            {article.category}
          </span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(article.publishedAt)}
          </span>
          <span className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {article.views.toLocaleString()}
          </span>
        </div>
        
        <h2 
          className={`font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer ${
            featured ? 'text-2xl' : 'text-xl'
          }`}
          onClick={handleArticleClick}
        >
          {article.title}
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{article.author}</span>
          </div>
          <button 
            onClick={handleArticleClick}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Đọc thêm →
          </button>
        </div>
      </div>
    </article>
  )
}

// Article Modal Component
function ArticleModal({ article, isOpen, onClose }: {
  article: Article | null
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen || !article) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              📰 {article.category}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(article.publishedAt)}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {article.views.toLocaleString()} lượt xem
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Featured Image */}
          {article.image && (
            <div className="aspect-video bg-gray-200 overflow-hidden relative">
              <Image 
                src={article.image} 
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {article.author}
              </span>
            </div>

            <div className="text-lg text-gray-600 mb-6 leading-relaxed">
              {article.excerpt}
            </div>

            <div 
              className="article-content text-gray-700"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NewsPage() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>(mockNews)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  
  // Modal state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchArticles()
  }, [selectedCategory])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const url = selectedCategory === 'Tất cả' 
        ? '/api/articles?published=true'
        : `/api/articles?published=true&category=${encodeURIComponent(selectedCategory)}`
      
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setArticles(data.length > 0 ? data : mockNews) // Fallback to mock data if no articles
      } else {
        setArticles(mockNews) // Fallback to mock data on error
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
      setArticles(mockNews) // Fallback to mock data on error
    } finally {
      setLoading(false)
    }
  }

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article)
    setIsModalOpen(true)
  }

  const handlePopularArticleClick = (article: Article) => {
    setSelectedArticle(article)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedArticle(null)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
    // Apply sorting logic here
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const featuredArticles = articles.filter(article => article.featured)
  const regularArticles = articles.filter(article => !article.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tin tức tuyển dụng
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cập nhật những thông tin mới nhất về thị trường việc làm, xu hướng tuyển dụng và cơ hội nghề nghiệp
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Tin nổi bật</h2>
            </div>
            <div className="space-y-8">
              {featuredArticles.map((article) => (
                <NewsCard key={article.id} article={article} featured={true} onArticleClick={handleArticleClick} />
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Danh mục tin tức</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      category === selectedCategory
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
              <h3 className="text-lg font-semibold mb-4">Tin đọc nhiều</h3>
              <div className="space-y-4">
                {mockNews.slice(0, 3).map((article, index) => (
                  <div 
                    key={article.id} 
                    className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    onClick={() => handlePopularArticleClick(article)}
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {article.views.toLocaleString()} lượt xem
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Articles */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Tất cả tin tức ({mockNews.length} bài viết)
              </h2>
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Mới nhất</option>
                <option value="popular">Phổ biến nhất</option>
                <option value="mostViewed">Đọc nhiều nhất</option>
              </select>
            </div>

            <div className="grid gap-6">
              {regularArticles.map((article) => (
                <NewsCard key={article.id} article={article} onArticleClick={handleArticleClick} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 pt-8">
              <button 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              {[1, 2, 3, '...', 10].map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  disabled={typeof page !== 'number'}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    page === currentPage
                      ? 'text-white bg-blue-600 border border-blue-600'
                      : typeof page === 'number'
                      ? 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      : 'text-gray-400 bg-white border border-gray-300 cursor-default'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => handlePageChange(Math.min(10, currentPage + 1))}
                disabled={currentPage === 10}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      <ArticleModal 
        article={selectedArticle} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  )
} 