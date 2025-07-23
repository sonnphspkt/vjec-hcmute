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
    content: `
      <h2>Tạo CV IT ấn tượng - Chìa khóa mở cửa sự nghiệp</h2>
      
      <p>Trong thị trường việc làm IT cạnh tranh khốc liệt hiện nay, một bản CV chuyên nghiệp không chỉ là giấy thông hành mà còn là yếu tố quyết định đến 80% khả năng được gọi phỏng vấn. Sau đây là hướng dẫn chi tiết để tạo ra một bản CV IT ấn tượng.</p>
      
      <h3>🎯 Cấu trúc CV IT hiệu quả</h3>
      
      <h4>1. Thông tin cá nhân</h4>
      <ul>
        <li><strong>Họ tên:</strong> Font chữ lớn, rõ ràng</li>
        <li><strong>Liên hệ:</strong> Email chuyên nghiệp, số điện thoại, LinkedIn</li>
        <li><strong>GitHub/Portfolio:</strong> Link đến các dự án thực tế</li>
        <li><strong>Địa chỉ:</strong> Chỉ cần thành phố, không cần địa chỉ chi tiết</li>
      </ul>
      
      <h4>2. Professional Summary (50-70 từ)</h4>
      <p>Ví dụ: "Fullstack Developer với 3+ năm kinh nghiệm phát triển web applications sử dụng React, Node.js và MongoDB. Có kinh nghiệm làm việc với Agile/Scrum, đã deploy 15+ projects thành công. Đam mê học hỏi công nghệ mới và giải quyết vấn đề phức tạp."</p>
      
      <h4>3. Technical Skills</h4>
      <ul>
        <li><strong>Programming Languages:</strong> JavaScript, Python, Java, TypeScript</li>
        <li><strong>Frontend:</strong> React, Vue.js, Angular, HTML5, CSS3, Bootstrap</li>
        <li><strong>Backend:</strong> Node.js, Express, Django, Spring Boot</li>
        <li><strong>Database:</strong> MySQL, PostgreSQL, MongoDB, Redis</li>
        <li><strong>DevOps:</strong> Docker, AWS, Git, Jenkins, Linux</li>
        <li><strong>Tools:</strong> VS Code, Postman, Jira, Figma</li>
      </ul>
      
      <h3>💼 Phần Work Experience</h3>
      
      <h4>Format chuẩn cho mỗi position:</h4>
      <ul>
        <li><strong>Job Title</strong> - Company Name (MM/YYYY - MM/YYYY)</li>
        <li>Mô tả ngắn gọn về công ty và team</li>
        <li>3-5 bullet points về achievements với số liệu cụ thể</li>
        <li>Technologies sử dụng</li>
      </ul>
      
      <h4>Ví dụ:</h4>
      <p><strong>Frontend Developer - TechViet Solutions (01/2022 - Present)</strong></p>
      <ul>
        <li>Developed 5+ responsive web applications serving 10,000+ daily users</li>
        <li>Improved page load speed by 40% through code optimization and lazy loading</li>
        <li>Collaborated with 8-member cross-functional team using Agile methodology</li>
        <li>Mentored 2 junior developers in React best practices</li>
        <li><em>Tech stack: React, TypeScript, Redux, Material-UI, Jest</em></li>
      </ul>
      
      <h3>🚀 Phần Projects</h3>
      
      <p>Highlight 3-4 projects quan trọng nhất:</p>
      
      <h4>E-commerce Platform (Team Project)</h4>
      <ul>
        <li><strong>Description:</strong> Full-stack e-commerce platform with admin dashboard</li>
        <li><strong>Role:</strong> Frontend Lead, implemented checkout flow and user authentication</li>
        <li><strong>Technologies:</strong> React, Node.js, Express, MongoDB, Stripe API</li>
        <li><strong>Achievement:</strong> Processed 500+ transactions during demo phase</li>
        <li><strong>Demo:</strong> https://ecommerce-demo.com | <strong>GitHub:</strong> github.com/user/project</li>
      </ul>
      
      <h3>🎓 Education & Certifications</h3>
      
      <ul>
        <li><strong>Bachelor of Computer Science</strong> - HCMUTE (2020-2024) - GPA: 3.5/4.0</li>
        <li><strong>AWS Certified Developer - Associate (2023)</strong></li>
        <li><strong>Google Analytics Certified (2022)</strong></li>
        <li><strong>Relevant Coursework:</strong> Data Structures, Algorithms, Database Design, Software Engineering</li>
      </ul>
      
      <h3>💡 Tips để CV nổi bật</h3>
      
      <h4>1. Quantify achievements với số liệu</h4>
      <ul>
        <li>❌ "Improved website performance"</li>
        <li>✅ "Reduced page load time by 35% from 3.2s to 2.1s"</li>
      </ul>
      
      <h4>2. Sử dụng action verbs mạnh mẽ</h4>
      <ul>
        <li>Developed, Implemented, Optimized, Designed, Built, Deployed</li>
        <li>Collaborated, Led, Mentored, Analyzed, Troubleshooted</li>
      </ul>
      
      <h4>3. Customize cho từng vị trí</h4>
      <ul>
        <li>Đọc job description kỹ và highlight matching skills</li>
        <li>Reorder technical skills theo priority của job</li>
        <li>Adjust project descriptions để match requirements</li>
      </ul>
      
      <h4>4. ATS-friendly formatting</h4>
      <ul>
        <li>Sử dụng standard section headings (Experience, Education, Skills)</li>
        <li>Avoid images, tables, graphics trong CV</li>
        <li>Use simple fonts: Arial, Calibri, Times New Roman</li>
        <li>Save as PDF và .docx format</li>
      </ul>
      
      <h3>❌ Những lỗi thường gặp cần tránh</h3>
      
      <ol>
        <li><strong>Quá dài:</strong> CV junior nên 1-2 pages, senior max 3 pages</li>
        <li><strong>Thiếu keywords:</strong> Không match với job requirements</li>
        <li><strong>Generic:</strong> Dùng 1 CV cho tất cả positions</li>
        <li><strong>Spelling/Grammar errors:</strong> Proofread nhiều lần</li>
        <li><strong>Outdated technologies:</strong> Focus vào current tech stack</li>
        <li><strong>Thiếu GitHub/Portfolio:</strong> Must-have cho IT positions</li>
        <li><strong>Weak summary:</strong> Không showcase được value proposition</li>
      </ol>
      
      <h3>🔧 Tools hỗ trợ tạo CV</h3>
      
      <h4>Free tools:</h4>
      <ul>
        <li><strong>Canva:</strong> Templates đẹp, easy to use</li>
        <li><strong>Google Docs:</strong> Simple, ATS-friendly</li>
        <li><strong>GitHub Pages:</strong> Tạo online CV/portfolio</li>
      </ul>
      
      <h4>Premium tools:</h4>
      <ul>
        <li><strong>Adobe InDesign:</strong> Professional design</li>
        <li><strong>Figma:</strong> Modern, collaborative design</li>
        <li><strong>LaTeX:</strong> Academic, clean formatting</li>
      </ul>
      
      <h3>📋 CV Review Checklist</h3>
      
      <h4>Content:</h4>
      <ul>
        <li>☑️ Contact information updated và professional</li>
        <li>☑️ Summary statement compelling và relevant</li>
        <li>☑️ Skills match với job requirements</li>
        <li>☑️ Experience có quantified achievements</li>
        <li>☑️ Projects showcase relevant technical skills</li>
        <li>☑️ Education và certifications current</li>
      </ul>
      
      <h4>Format:</h4>
      <ul>
        <li>☑️ Consistent formatting throughout</li>
        <li>☑️ Easy to scan và read</li>
        <li>☑️ Proper spelling và grammar</li>
        <li>☑️ File naming convention: "FirstName_LastName_Position.pdf"</li>
      </ul>
      
      <h3>🎯 Sample CV Template Structure</h3>
      
      <p><strong>Header Section</strong></p>
      <p>John Doe<br/>
      Frontend Developer<br/>
      📧 john.doe@email.com | 📱 +84 123 456 789<br/>
      🔗 linkedin.com/in/johndoe | 💻 github.com/johndoe</p>
      
      <p><strong>Professional Summary</strong><br/>
      [2-3 sentences về experience và expertise]</p>
      
      <p><strong>Technical Skills</strong><br/>
      [Organized by categories, most relevant first]</p>
      
      <p><strong>Professional Experience</strong><br/>
      [Most recent first, with achievements và impact]</p>
      
      <p><strong>Key Projects</strong><br/>
      [3-4 best projects với technical details]</p>
      
      <p><strong>Education & Certifications</strong><br/>
      [Degree, relevant courses, certifications]</p>
      
      <p><em>Lưu ý: CV tốt là CV được customize cho từng vị trí ứng tuyển. Đầu tư thời gian để research company và position để tạo ra bản CV perfect match!</em></p>
    `,
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
    content: `
      <h2>Báo cáo mức lương IT Việt Nam 2024 - Cập nhật mới nhất</h2>
      
      <p>Ngành công nghệ thông tin tiếp tục là một trong những ngành có mức lương cao nhất tại Việt Nam. Báo cáo này tổng hợp dữ liệu từ 500+ công ty và 10,000+ survey responses để đưa ra bức tranh toàn diện về mức lương IT trong năm 2024.</p>
      
      <h3>📊 Tổng quan thị trường lương IT 2024</h3>
      
      <h4>Tăng trưởng chung:</h4>
      <ul>
        <li>Mức lương trung bình tăng <strong>22%</strong> so với 2023</li>
        <li>Bonus EOY trung bình: <strong>2-4 tháng lương</strong></li>
        <li>Tỷ lệ tăng lương: <strong>15-30%</strong> khi switch job</li>
        <li>Remote premium: <strong>+10-20%</strong> so với onsite</li>
      </ul>
      
      <h3>💰 Bảng lương chi tiết theo vị trí</h3>
      
      <h4>🖥️ Frontend Developer</h4>
      <ul>
        <li><strong>Fresher (0-1 năm):</strong> 8-15 triệu VND</li>
        <li><strong>Junior (1-2 năm):</strong> 12-20 triệu VND</li>
        <li><strong>Mid-level (2-4 năm):</strong> 18-30 triệu VND</li>
        <li><strong>Senior (4-6 năm):</strong> 25-45 triệu VND</li>
        <li><strong>Lead/Principal (6+ năm):</strong> 40-70 triệu VND</li>
      </ul>
      
      <h4>⚙️ Backend Developer</h4>
      <ul>
        <li><strong>Fresher (0-1 năm):</strong> 10-16 triệu VND</li>
        <li><strong>Junior (1-2 năm):</strong> 14-22 triệu VND</li>
        <li><strong>Mid-level (2-4 năm):</strong> 20-35 triệu VND</li>
        <li><strong>Senior (4-6 năm):</strong> 30-50 triệu VND</li>
        <li><strong>Lead/Principal (6+ năm):</strong> 45-80 triệu VND</li>
      </ul>
      
      <h4>📱 Mobile Developer</h4>
      <ul>
        <li><strong>Fresher (0-1 năm):</strong> 9-14 triệu VND</li>
        <li><strong>Junior (1-2 năm):</strong> 13-19 triệu VND</li>
        <li><strong>Mid-level (2-4 năm):</strong> 18-32 triệu VND</li>
        <li><strong>Senior (4-6 năm):</strong> 28-48 triệu VND</li>
        <li><strong>Lead (6+ năm):</strong> 42-75 triệu VND</li>
      </ul>
      
      <h4>🚀 DevOps Engineer</h4>
      <ul>
        <li><strong>Junior (1-2 năm):</strong> 15-25 triệu VND</li>
        <li><strong>Mid-level (2-4 năm):</strong> 22-38 triệu VND</li>
        <li><strong>Senior (4-6 năm):</strong> 35-55 triệu VND</li>
        <li><strong>Lead (6+ năm):</strong> 50-85 triệu VND</li>
      </ul>
      
      <h4>📊 Data Scientist/Analyst</h4>
      <ul>
        <li><strong>Fresher (0-1 năm):</strong> 10-16 triệu VND</li>
        <li><strong>Junior (1-2 năm):</strong> 15-24 triệu VND</li>
        <li><strong>Mid-level (2-4 năm):</strong> 22-38 triệu VND</li>
        <li><strong>Senior (4-6 năm):</strong> 35-60 triệu VND</li>
        <li><strong>Lead/Principal (6+ năm):</strong> 55-90 triệu VND</li>
      </ul>
      
      <h4>🎨 UI/UX Designer</h4>
      <ul>
        <li><strong>Fresher (0-1 năm):</strong> 7-12 triệu VND</li>
        <li><strong>Junior (1-2 năm):</strong> 11-18 triệu VND</li>
        <li><strong>Mid-level (2-4 năm):</strong> 16-28 triệu VND</li>
        <li><strong>Senior (4-6 năm):</strong> 25-42 triệu VND</li>
        <li><strong>Lead (6+ năm):</strong> 38-65 triệu VND</li>
      </ul>
      
      <h4>🔒 Cybersecurity Specialist</h4>
      <ul>
        <li><strong>Junior (1-2 năm):</strong> 16-26 triệu VND</li>
        <li><strong>Mid-level (2-4 năm):</strong> 24-40 triệu VND</li>
        <li><strong>Senior (4-6 năm):</strong> 38-65 triệu VND</li>
        <li><strong>Expert (6+ năm):</strong> 60-100 triệu VND</li>
      </ul>
      
      <h4>👨‍💼 Management Positions</h4>
      <ul>
        <li><strong>Team Lead (2-4 năm exp):</strong> 30-50 triệu VND</li>
        <li><strong>Technical Manager (4-6 năm):</strong> 45-70 triệu VND</li>
        <li><strong>Engineering Manager (6+ năm):</strong> 60-100 triệu VND</li>
        <li><strong>CTO/VP Engineering:</strong> 80-200 triệu VND</li>
      </ul>
      
      <h3>🏢 Mức lương theo loại công ty</h3>
      
      <h4>🌟 Tech Giants (Google, Microsoft, Amazon)</h4>
      <ul>
        <li><strong>Software Engineer:</strong> 40-80 triệu VND + stock options</li>
        <li><strong>Senior SWE:</strong> 60-120 triệu VND + stocks</li>
        <li><strong>Principal SWE:</strong> 100-200 triệu VND + stocks</li>
      </ul>
      
      <h4>🚀 Unicorn Startups (Grab, Shopee, Tiki)</h4>
      <ul>
        <li><strong>Software Engineer:</strong> 25-50 triệu VND + equity</li>
        <li><strong>Senior SWE:</strong> 40-75 triệu VND + equity</li>
        <li><strong>Staff SWE:</strong> 65-110 triệu VND + equity</li>
      </ul>
      
      <h4>🏪 Local Tech Companies</h4>
      <ul>
        <li><strong>Software Engineer:</strong> 15-35 triệu VND</li>
        <li><strong>Senior SWE:</strong> 25-55 triệu VND</li>
        <li><strong>Tech Lead:</strong> 40-80 triệu VND</li>
      </ul>
      
      <h4>🏭 Outsourcing Companies</h4>
      <ul>
        <li><strong>Software Engineer:</strong> 12-28 triệu VND</li>
        <li><strong>Senior SWE:</strong> 20-45 triệu VND</li>
        <li><strong>Tech Lead:</strong> 35-65 triệu VND</li>
      </ul>
      
      <h4>🏦 Banking/Finance Tech</h4>
      <ul>
        <li><strong>Software Engineer:</strong> 18-38 triệu VND</li>
        <li><strong>Senior SWE:</strong> 30-58 triệu VND</li>
        <li><strong>Tech Lead:</strong> 45-85 triệu VND</li>
      </ul>
      
      <h3>🌍 So sánh lương theo thành phố</h3>
      
      <h4>🏙️ TP.HCM (Baseline: 100%)</h4>
      <ul>
        <li>Highest salary range</li>
        <li>Most opportunities</li>
        <li>Competitive market</li>
      </ul>
      
      <h4>🏛️ Hà Nội (95-98% of HCM)</h4>
      <ul>
        <li>Slightly lower than HCM</li>
        <li>Government projects premium</li>
        <li>Banking/Finance focus</li>
      </ul>
      
      <h4>🏖️ Đà Nẵng (85-90% of HCM)</h4>
      <ul>
        <li>Lower cost of living</li>
        <li>Growing tech hub</li>
        <li>Better work-life balance</li>
      </ul>
      
      <h4>🌐 Remote (105-115% of HCM)</h4>
      <ul>
        <li>Premium for remote skills</li>
        <li>International clients</li>
        <li>Flexible working conditions</li>
      </ul>
      
      <h3>📈 Factors ảnh hưởng đến mức lương</h3>
      
      <h4>🎓 Education Background</h4>
      <ul>
        <li><strong>University Degree:</strong> Baseline</li>
        <li><strong>Top Universities (HCMUT, HCMUS):</strong> +10-15%</li>
        <li><strong>International Degree:</strong> +15-25%</li>
        <li><strong>Self-taught:</strong> Skills matter more than degree</li>
      </ul>
      
      <h4>🏆 Certifications Impact</h4>
      <ul>
        <li><strong>AWS Certified:</strong> +15-20%</li>
        <li><strong>Google Cloud Professional:</strong> +15-20%</li>
        <li><strong>Azure Certified:</strong> +10-15%</li>
        <li><strong>CISSP (Security):</strong> +20-30%</li>
        <li><strong>PMP (Management):</strong> +10-15%</li>
      </ul>
      
      <h4>🗣️ English Proficiency</h4>
      <ul>
        <li><strong>Basic English:</strong> Baseline</li>
        <li><strong>Good Communication:</strong> +10-15%</li>
        <li><strong>Fluent/Native:</strong> +20-30%</li>
        <li><strong>Technical Writing:</strong> +15-25%</li>
      </ul>
      
      <h4>💼 Industry Experience</h4>
      <ul>
        <li><strong>E-commerce:</strong> +5-10%</li>
        <li><strong>Fintech:</strong> +10-20%</li>
        <li><strong>Gaming:</strong> +5-15%</li>
        <li><strong>Healthcare Tech:</strong> +10-15%</li>
        <li><strong>AI/ML:</strong> +20-30%</li>
      </ul>
      
      <h3>💡 Tips để tăng lương hiệu quả</h3>
      
      <h4>🎯 Short-term (3-6 months)</h4>
      <ol>
        <li><strong>Skill up:</strong> Learn hot technologies (AI, Cloud, DevOps)</li>
        <li><strong>Certifications:</strong> Get recognized certificates</li>
        <li><strong>Side projects:</strong> Build impressive portfolio</li>
        <li><strong>Networking:</strong> Connect với professionals trong ngành</li>
      </ol>
      
      <h4>🚀 Long-term (1-2 years)</h4>
      <ol>
        <li><strong>Job switching:</strong> Avg 20-30% salary increase</li>
        <li><strong>Promotion:</strong> Move to senior/lead positions</li>
        <li><strong>Specialization:</strong> Become expert in niche area</li>
        <li><strong>International:</strong> Target foreign companies</li>
      </ol>
      
      <h3>📋 Salary Negotiation Tips</h3>
      
      <h4>🔍 Research phase:</h4>
      <ul>
        <li>Use Glassdoor, ITviec, VietnamWorks salary data</li>
        <li>Network với people trong same position</li>
        <li>Know market rate cho your skills và experience</li>
      </ul>
      
      <h4>💬 Negotiation tactics:</h4>
      <ul>
        <li><strong>Total compensation:</strong> Base + bonus + benefits + stock</li>
        <li><strong>Non-salary perks:</strong> WFH, flexible hours, learning budget</li>
        <li><strong>Performance-based:</strong> Tie increases to achievements</li>
        <li><strong>Multiple offers:</strong> Create competitive leverage</li>
      </ul>
      
      <h3>🔮 Salary Forecast 2025</h3>
      
      <h4>Expected trends:</h4>
      <ul>
        <li><strong>AI/ML roles:</strong> +25-35% growth</li>
        <li><strong>Cybersecurity:</strong> +20-30% growth</li>
        <li><strong>Cloud engineers:</strong> +15-25% growth</li>
        <li><strong>Remote premium:</strong> Will become standard</li>
        <li><strong>Freelance rates:</strong> Approaching employee salaries</li>
      </ul>
      
      <p><em>Nguồn: Khảo sát từ 500+ công ty IT tại Việt Nam, surveys từ 10,000+ professionals, data từ JobStreet, VietnamWorks, ITviec, TopDev, Glassdoor (Q4/2024)</em></p>
      
      <p><strong>Lưu ý:</strong> Mức lương thực tế có thể thay đổi tùy theo company size, funding stage, và individual performance. Các con số trên chỉ mang tính tham khảo.</p>
    `,
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
    content: `
      <h2>Nhật Bản - Điểm đến IT hấp dẫn cho developer Việt Nam</h2>
      
      <p>Nhật Bản đang là điểm đến hấp dẫn cho nhiều kỹ sư phần mềm Việt Nam với mức lương cao, môi trường làm việc chuyên nghiệp và cơ hội phát triển sự nghiệp bền vững. Báo cáo này cung cấp roadmap chi tiết để pursue career tại đất nước mặt trời mọc.</p>
      
      <h3>🗾 Tổng quan thị trường IT Nhật Bản</h3>
      
      <h4>📊 Nhu cầu nhân lực:</h4>
      <ul>
        <li><strong>Thiếu hụt:</strong> 800,000+ IT engineers đến 2030</li>
        <li><strong>Foreign workers:</strong> 40% companies muốn hire người nước ngoài</li>
        <li><strong>Vietnam ranking:</strong> #2 preferred country (sau India)</li>
        <li><strong>Growth sectors:</strong> AI, IoT, DX (Digital Transformation), Gaming</li>
      </ul>
      
      <h4>💰 Mức lương competitive:</h4>
      <ul>
        <li><strong>Fresh Graduate:</strong> ¥3,000,000 - ¥4,500,000/năm (560-840 triệu VND)</li>
        <li><strong>3-5 years exp:</strong> ¥4,500,000 - ¥7,000,000/năm (840-1,300 triệu VND)</li>
        <li><strong>Senior (5+ years):</strong> ¥7,000,000 - ¥12,000,000/năm (1,300-2,240 triệu VND)</li>
        <li><strong>Lead/Manager:</strong> ¥10,000,000 - ¥20,000,000/năm (1,870-3,740 triệu VND)</li>
      </ul>
      
      <h3>🎯 Vị trí đang hot tại Nhật Bản</h3>
      
      <h4>🔥 Most in-demand positions:</h4>
      
      <h4>1. Web Developer</h4>
      <ul>
        <li><strong>Tech stack:</strong> React, Vue.js, Angular, Node.js</li>
        <li><strong>Salary range:</strong> ¥3.5M - ¥8M</li>
        <li><strong>Companies:</strong> Rakuten, Mercari, SmartNews</li>
      </ul>
      
      <h4>2. Mobile Developer</h4>
      <ul>
        <li><strong>Platforms:</strong> iOS (Swift), Android (Kotlin), Flutter</li>
        <li><strong>Salary range:</strong> ¥4M - ¥9M</li>
        <li><strong>Companies:</strong> CyberAgent, DeNA, Mixi</li>
      </ul>
      
      <h4>3. Data Engineer/Scientist</h4>
      <ul>
        <li><strong>Skills:</strong> Python, SQL, AWS, Machine Learning</li>
        <li><strong>Salary range:</strong> ¥5M - ¥12M</li>
        <li><strong>Companies:</strong> SoftBank, LINE, Yahoo Japan</li>
      </ul>
      
      <h4>4. DevOps/Infrastructure</h4>
      <ul>
        <li><strong>Tools:</strong> AWS, GCP, Docker, Kubernetes</li>
        <li><strong>Salary range:</strong> ¥5M - ¥11M</li>
        <li><strong>Companies:</strong> Wantedly, Freee, Money Forward</li>
      </ul>
      
      <h4>5. Game Developer</h4>
      <ul>
        <li><strong>Engines:</strong> Unity, Unreal Engine, Cocos2d</li>
        <li><strong>Salary range:</strong> ¥4M - ¥10M</li>
        <li><strong>Companies:</strong> Nintendo, Square Enix, Bandai Namco</li>
      </ul>
      
      <h3>🎌 Yêu cầu kỹ năng cần thiết</h3>
      
      <h4>💻 Technical Skills</h4>
      
      <h4>Must-have:</h4>
      <ul>
        <li><strong>Programming:</strong> Java, Python, JavaScript (most popular)</li>
        <li><strong>Web frameworks:</strong> Spring Boot, React, Vue.js</li>
        <li><strong>Database:</strong> MySQL, PostgreSQL, Oracle</li>
        <li><strong>Version control:</strong> Git (mandatory)</li>
        <li><strong>Testing:</strong> Unit testing, automated testing</li>
      </ul>
      
      <h4>Nice-to-have:</h4>
      <ul>
        <li><strong>Cloud platforms:</strong> AWS, GCP, Azure</li>
        <li><strong>Containers:</strong> Docker, Kubernetes</li>
        <li><strong>Agile/Scrum:</strong> Project management methodologies</li>
        <li><strong>AI/ML:</strong> TensorFlow, PyTorch, scikit-learn</li>
      </ul>
      
      <h4>🗣️ Language Requirements</h4>
      
      <h4>Japanese proficiency:</h4>
      <ul>
        <li><strong>N3 level:</strong> Minimum cho most positions</li>
        <li><strong>N2 level:</strong> Comfortable cho daily work</li>
        <li><strong>N1 level:</strong> Leadership positions, client-facing roles</li>
        <li><strong>Business Japanese:</strong> Essential cho long-term success</li>
      </ul>
      
      <h4>English proficiency:</h4>
      <ul>
        <li><strong>Reading technical docs:</strong> Mandatory</li>
        <li><strong>Communication:</strong> Global companies prefer good English</li>
        <li><strong>TOEIC 700+:</strong> Competitive advantage</li>
      </ul>
      
      <h3>📋 Quy trình ứng tuyển step-by-step</h3>
      
      <h4>🎯 Phase 1: Preparation (3-6 months)</h4>
      
      <h4>1. Language preparation:</h4>
      <ul>
        <li>Study Japanese to N3/N2 level</li>
        <li>Practice business Japanese phrases</li>
        <li>Learn technical vocabulary trong Japanese</li>
      </ul>
      
      <h4>2. Technical skills:</h4>
      <ul>
        <li>Master popular tech stack tại Nhật (Java, Spring Boot)</li>
        <li>Build portfolio với Japanese-style projects</li>
        <li>Contribute to open source projects</li>
      </ul>
      
      <h4>3. Cultural knowledge:</h4>
      <ul>
        <li>Understand Japanese work culture (Hou-Ren-So, Kaizen)</li>
        <li>Learn về business etiquette</li>
        <li>Research target companies thoroughly</li>
      </ul>
      
      <h4>🔍 Phase 2: Job Search (1-3 months)</h4>
      
      <h4>Best job platforms:</h4>
      <ul>
        <li><strong>Wantedly:</strong> Startup-focused, English-friendly</li>
        <li><strong>Green:</strong> IT-specific job board</li>
        <li><strong>Bizreach:</strong> Senior positions, headhunting</li>
        <li><strong>Indeed Japan:</strong> Comprehensive listings</li>
        <li><strong>LinkedIn:</strong> International companies</li>
        <li><strong>Gaijinpot Jobs:</strong> Foreigner-friendly positions</li>
      </ul>
      
      <h4>📝 Phase 3: Application Process</h4>
      
      <h4>Japanese-style CV (Rirekisho):</h4>
      <ul>
        <li><strong>Format:</strong> Standardized template với photo</li>
        <li><strong>Handwritten:</strong> Some traditional companies prefer này</li>
        <li><strong>Personal info:</strong> Include age, marital status (legal requirement)</li>
        <li><strong>Motivation letter:</strong> Explain why Japan, why this company</li>
      </ul>
      
      <h4>🎤 Phase 4: Interview Process</h4>
      
      <h4>Typical interview stages:</h4>
      <ol>
        <li><strong>Phone/Video screening (30 mins):</strong> Basic Japanese, motivation</li>
        <li><strong>Technical interview (60-90 mins):</strong> Coding, system design</li>
        <li><strong>HR interview (45 mins):</strong> Cultural fit, career goals</li>
        <li><strong>Final interview (60 mins):</strong> Meet with management team</li>
      </ol>
      
      <h4>Common interview questions:</h4>
      <ul>
        <li>"Naze Nihon ni kimashita ka?" (Why did you come to Japan?)</li>
        <li>"Shougai mokuhyou wa nan desu ka?" (What are your career goals?)</li>
        <li>"Team work no keiken wa?" (Tell us about teamwork experience)</li>
        <li>Technical questions trong Japanese/English</li>
      </ul>
      
      <h3>🛂 Visa Process Guide</h3>
      
      <h4>📄 Types of work visas:</h4>
      
      <h4>1. Engineer/Specialist in Humanities visa</h4>
      <ul>
        <li><strong>Duration:</strong> 1-5 years (renewable)</li>
        <li><strong>Requirements:</strong> University degree OR 10+ years experience</li>
        <li><strong>Sponsor:</strong> Japanese company must sponsor</li>
      </ul>
      
      <h4>2. Highly Skilled Professional visa</h4>
      <ul>
        <li><strong>Point system:</strong> 70+ points (education, experience, salary)</li>
        <li><strong>Benefits:</strong> Path to permanent residency, family support</li>
        <li><strong>Fast track:</strong> PR after 1-3 years (vs normal 10 years)</li>
      </ul>
      
      <h4>📋 Required documents:</h4>
      <ul>
        <li>University diploma (notarized translation)</li>
        <li>Certificate of Eligibility (sponsored by employer)</li>
        <li>Employment contract</li>
        <li>Financial proof</li>
        <li>Health certificate</li>
        <li>Background check</li>
      </ul>
      
      <h3>🏢 Top companies hiring Vietnamese developers</h3>
      
      <h4>🌟 Global Tech Giants:</h4>
      <ul>
        <li><strong>Google Japan:</strong> Competitive salary, English environment</li>
        <li><strong>Microsoft Japan:</strong> Cloud focus, good work-life balance</li>
        <li><strong>Amazon Japan:</strong> E-commerce, AWS opportunities</li>
        <li><strong>Meta Japan:</strong> Social media, VR/AR projects</li>
      </ul>
      
      <h4>🇯🇵 Major Japanese Companies:</h4>
      <ul>
        <li><strong>Rakuten:</strong> E-commerce giant, English-friendly</li>
        <li><strong>SoftBank:</strong> Telecom, AI investments</li>
        <li><strong>NTT Data:</strong> IT consulting, government projects</li>
        <li><strong>Fujitsu:</strong> Enterprise solutions, cloud services</li>
      </ul>
      
      <h4>🚀 Hot Startups:</h4>
      <ul>
        <li><strong>Mercari:</strong> C2C marketplace, global expansion</li>
        <li><strong>SmartNews:</strong> News aggregator, AI-driven</li>
        <li><strong>Freee:</strong> Cloud accounting software</li>
        <li><strong>Money Forward:</strong> Fintech, personal finance</li>
      </ul>
      
      <h4>🎮 Gaming Companies:</h4>
      <ul>
        <li><strong>Nintendo:</strong> Console games, innovative gameplay</li>
        <li><strong>Square Enix:</strong> RPG specialists, Final Fantasy</li>
        <li><strong>Bandai Namco:</strong> Entertainment, mobile games</li>
        <li><strong>Cygames:</strong> Mobile gaming, Granblue Fantasy</li>
      </ul>
      
      <h3>🏙️ Best cities cho IT careers</h3>
      
      <h4>🌆 Tokyo (Best overall)</h4>
      <ul>
        <li><strong>Pros:</strong> Most opportunities, highest salaries, international environment</li>
        <li><strong>Cons:</strong> Expensive living, crowded, high competition</li>
        <li><strong>Average salary:</strong> ¥5M - ¥12M</li>
      </ul>
      
      <h4>🏯 Osaka (Balanced option)</h4>
      <ul>
        <li><strong>Pros:</strong> Lower cost of living, good tech scene, friendly people</li>
        <li><strong>Cons:</strong> Fewer opportunities than Tokyo</li>
        <li><strong>Average salary:</strong> ¥4M - ¥9M</li>
      </ul>
      
      <h4>💡 Fukuoka (Startup hub)</h4>
      <ul>
        <li><strong>Pros:</strong> Government support for startups, affordable, quality of life</li>
        <li><strong>Cons:</strong> Limited to startups, language barrier</li>
        <li><strong>Average salary:</strong> ¥3.5M - ¥7M</li>
      </ul>
      
      <h3>💡 Tips for success tại Nhật Bản</h3>
      
      <h4>🎯 Career development:</h4>
      <ol>
        <li><strong>Master Japanese:</strong> Essential for long-term success</li>
        <li><strong>Understand hierarchy:</strong> Respect senpai-kohai relationships</li>
        <li><strong>Continuous learning:</strong> Stay updated với latest technologies</li>
        <li><strong>Network actively:</strong> Attend tech meetups, conferences</li>
        <li><strong>Consider management track:</strong> Bridge role between Vietnamese và Japanese teams</li>
      </ol>
      
      <h4>🏠 Living in Japan:</h4>
      <ul>
        <li><strong>Housing:</strong> Company-sponsored housing or monthly apartments</li>
        <li><strong>Healthcare:</strong> National Health Insurance (covers 70%)</li>
        <li><strong>Transportation:</strong> Excellent public transport system</li>
        <li><strong>Banking:</strong> Most banks now accept foreigners</li>
        <li><strong>Taxes:</strong> Progressive tax rate 5-45% + local taxes</li>
      </ul>
      
      <h3>📚 Resources để prepare</h3>
      
      <h4>📖 Japanese learning:</h4>
      <ul>
        <li><strong>Genki textbooks:</strong> Structured grammar learning</li>
        <li><strong>Anki/Memrise:</strong> Vocabulary building</li>
        <li><strong>HelloTalk:</strong> Practice với native speakers</li>
        <li><strong>NHK News:</strong> Current events trong simple Japanese</li>
      </ul>
      
      <h4>💻 Technical preparation:</h4>
      <ul>
        <li><strong>Paiza:</strong> Japanese coding challenges</li>
        <li><strong>AtCoder:</strong> Competitive programming</li>
        <li><strong>Qiita:</strong> Japanese tech blog platform</li>
        <li><strong>Tech meetups:</strong> Tokyo Tech Scene, Java Ja Night</li>
      </ul>
      
      <h4>🌐 Community support:</h4>
      <ul>
        <li><strong>Facebook groups:</strong> Vietnamese IT in Japan</li>
        <li><strong>Discord servers:</strong> Tech communities</li>
        <li><strong>LinkedIn groups:</strong> Professional networking</li>
        <li><strong>Local Vietnamese communities:</strong> Cultural support</li>
      </ul>
      
      <h3>⚠️ Common challenges và solutions</h3>
      
      <h4>🗣️ Language barrier:</h4>
      <ul>
        <li><strong>Challenge:</strong> Technical discussions trong Japanese</li>
        <li><strong>Solution:</strong> Prepare technical vocabulary list, practice presentations</li>
      </ul>
      
      <h4>🏢 Work culture:</h4>
      <ul>
        <li><strong>Challenge:</strong> Long working hours, strict hierarchy</li>
        <li><strong>Solution:</strong> Choose international companies, understand expectations</li>
      </ul>
      
      <h4>💰 Cost of living:</h4>
      <ul>
        <li><strong>Challenge:</strong> Expensive housing, especially in Tokyo</li>
        <li><strong>Solution:</strong> Company housing, share houses, suburbs</li>
      </ul>
      
      <h4>🏠 Social integration:</h4>
      <ul>
        <li><strong>Challenge:</strong> Making Japanese friends, cultural differences</li>
        <li><strong>Solution:</strong> Join clubs, volunteer activities, learn cultural norms</li>
      </ul>
      
      <p><strong>Kết luận:</strong> Nhật Bản offers excellent opportunities cho Vietnamese developers với proper preparation. Success requires commitment to language learning, cultural adaptation, và continuous skill development. Với strategic approach và persistent effort, career tại Nhật có thể very rewarding both professionally và personally.</p>
      
      <p><em>Nguồn: JETRO (Japan External Trade Organization), JASSO (Japan Student Services Organization), Japanese Ministry of Justice Immigration data, interviews với 50+ Vietnamese developers working in Japan</em></p>
    `,
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
  
  // Pagination logic
  const articlesPerPage = 3
  const totalPages = Math.ceil(regularArticles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage
  const currentPageArticles = regularArticles.slice(startIndex, endIndex)

  // Reset to page 1 if current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages])

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
                Tất cả tin tức ({regularArticles.length} bài viết)
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
              {currentPageArticles.map((article) => (
                <NewsCard key={article.id} article={article} onArticleClick={handleArticleClick} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 pt-8">
                <button 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${
                      page === currentPage
                        ? 'text-white bg-blue-600 border border-blue-600'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            )}
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