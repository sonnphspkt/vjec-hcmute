'use client'
import { Calendar, User, Eye, Tag, TrendingUp } from 'lucide-react'
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
    content: 'Thị trường việc làm IT tại Việt Nam đang trải qua giai đoạn phát triển mạnh mẽ...',
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
    content: 'Trong bối cảnh thị trường công nghệ phát triển mạnh mẽ, nhiều công ty đang...',
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
    content: 'Từ sau đại dịch COVID-19, mô hình làm việc từ xa đã trở thành...',
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

function NewsCard({ article, featured = false }: {
  article: Article
  featured?: boolean
}) {
  const router = useRouter()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleArticleClick = () => {
    // For now, show an alert. Later this would navigate to article detail page
    alert(`Đang chuyển đến bài viết: ${article.title}`)
    // router.push(`/news/${article.id}`)
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

export default function NewsPage() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>(mockNews)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)

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

  const handlePopularArticleClick = (article: Article) => {
    alert(`Đang chuyển đến bài viết phổ biến: ${article.title}`)
    // router.push(`/news/${article.id}`)
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
                <NewsCard key={article.id} article={article} featured={true} />
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
                <NewsCard key={article.id} article={article} />
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
    </div>
  )
} 