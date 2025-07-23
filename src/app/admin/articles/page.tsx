'use client'
import { useState, useEffect } from 'react'
import { Plus, Edit, Eye, Trash2, Upload, X } from 'lucide-react'

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

const categories = [
  'Thị trường việc làm',
  'Cơ hội việc làm', 
  'Xu hướng nghề nghiệp',
  'Kỹ năng nghề nghiệp',
  'Báo cáo lương',
  'Việc làm quốc tế'
]

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewingArticle, setViewingArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: categories[0],
    author: '',
    featured: false,
    published: false
  })

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles?published=false')
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      category: categories[0],
      author: '',
      featured: false,
      published: false
    })
  }

  const handleView = (article: Article) => {
    setViewingArticle(article)
    setShowViewModal(true)
  }

  const handleEdit = (article: Article) => {
    setEditingArticle(article)
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      image: article.image || '',
      category: article.category,
      author: article.author,
      featured: article.featured,
      published: article.published
    })
    setShowEditForm(true)
  }

  const handleDelete = async (article: Article) => {
    const confirmed = confirm(`Bạn có chắc chắn muốn xóa bài viết "${article.title}"?`)
    if (!confirmed) return

    setDeleting(article.id)
    try {
      const response = await fetch(`/api/articles/${article.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Xóa bài viết thành công!')
        fetchArticles() // Refresh list
      } else {
        const error = await response.json()
        alert(`Lỗi xóa bài viết: ${error.error}`)
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Lỗi xóa bài viết!')
    } finally {
      setDeleting(null)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({ ...prev, image: data.url }))
      } else {
        alert('Lỗi upload ảnh!')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Lỗi upload ảnh!')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.excerpt || !formData.content || !formData.author) {
      alert('Vui lòng điền đầy đủ thông tin!')
      return
    }

    setSaving(true)
    try {
      const url = editingArticle ? `/api/articles/${editingArticle.id}` : '/api/articles'
      const method = editingArticle ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert(`${editingArticle ? 'Cập nhật' : 'Tạo'} bài viết thành công!`)
        setShowCreateForm(false)
        setShowEditForm(false)
        setEditingArticle(null)
        resetForm()
        fetchArticles()
      } else {
        const error = await response.json()
        alert(`Lỗi ${editingArticle ? 'cập nhật' : 'tạo'} bài viết: ${error.error}`)
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert(`Lỗi ${editingArticle ? 'cập nhật' : 'tạo'} bài viết!`)
    } finally {
      setSaving(false)
    }
  }

  const closeCreateForm = () => {
    setShowCreateForm(false)
    resetForm()
  }

  const closeEditForm = () => {
    setShowEditForm(false)
    setEditingArticle(null)
    resetForm()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý bài viết</h1>
          <p className="text-gray-600 mt-1">Tạo và quản lý nội dung tin tức tuyển dụng</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tạo bài viết mới
        </button>
      </div>

      {/* View Modal */}
      {showViewModal && viewingArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Xem bài viết</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              {viewingArticle.image && (
                <img 
                  src={viewingArticle.image} 
                  alt={viewingArticle.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{viewingArticle.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span>📝 {viewingArticle.author}</span>
                  <span>🏷️ {viewingArticle.category}</span>
                  <span>👁️ {viewingArticle.views} lượt xem</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    viewingArticle.published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {viewingArticle.published ? 'Đã xuất bản' : 'Bản nháp'}
                  </span>
                  {viewingArticle.featured && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                      Nổi bật
                    </span>
                  )}
                </div>
              </div>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-6 font-medium">{viewingArticle.excerpt}</p>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {viewingArticle.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Tạo bài viết mới</h2>
              <button
                onClick={closeCreateForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập tiêu đề bài viết..."
                  required
                />
              </div>

              {/* Author & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tác giả *
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tên tác giả..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh bài viết
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {formData.image ? (
                    <div className="relative">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, image: ''})}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            {uploading ? 'Đang upload...' : 'Click để chọn ảnh'}
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                          />
                        </label>
                        <p className="mt-1 text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tóm tắt *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tóm tắt ngắn gọn về bài viết..."
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nội dung chi tiết của bài viết..."
                  required
                />
              </div>

              {/* Options */}
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Bài viết nổi bật</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Xuất bản ngay</span>
                </label>
              </div>

              {/* Submit */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeCreateForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Đang tạo...' : 'Tạo bài viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {showEditForm && editingArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Chỉnh sửa bài viết</h2>
              <button
                onClick={closeEditForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập tiêu đề bài viết..."
                  required
                />
              </div>

              {/* Author & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tác giả *
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tên tác giả..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh bài viết
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {formData.image ? (
                    <div className="relative">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, image: ''})}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            {uploading ? 'Đang upload...' : 'Click để chọn ảnh'}
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                          />
                        </label>
                        <p className="mt-1 text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tóm tắt *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tóm tắt ngắn gọn về bài viết..."
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nội dung chi tiết của bài viết..."
                  required
                />
              </div>

              {/* Options */}
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Bài viết nổi bật</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Xuất bản ngay</span>
                </label>
              </div>

              {/* Submit */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeEditForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Đang cập nhật...' : 'Cập nhật bài viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Danh sách bài viết ({articles.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Chưa có bài viết nào</p>
            </div>
          ) : (
            articles.map((article) => (
              <div key={article.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📝 {article.author}</span>
                      <span>🏷️ {article.category}</span>
                      <span>👁️ {article.views} lượt xem</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        article.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {article.published ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                      {article.featured && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                          Nổi bật
                        </span>
                      )}
                    </div>
                  </div>
                  {article.image && (
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-32 h-20 object-cover rounded-lg ml-4"
                    />
                  )}
                </div>
                <div className="flex space-x-2 mt-4">
                  <button 
                    onClick={() => handleView(article)}
                    className="flex items-center px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg text-sm transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Xem
                  </button>
                  <button 
                    onClick={() => handleEdit(article)}
                    className="flex items-center px-3 py-1 text-gray-600 hover:bg-gray-50 rounded-lg text-sm transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Sửa
                  </button>
                  <button 
                    onClick={() => handleDelete(article)}
                    disabled={deleting === article.id}
                    className="flex items-center px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {deleting === article.id ? 'Đang xóa...' : 'Xóa'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 