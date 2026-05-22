require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const User = require('../models/User.model');
const StudentProfile = require('../models/StudentProfile.model');
const CompanyProfile = require('../models/CompanyProfile.model');
const Job = require('../models/Job.model');
const Project = require('../models/Project.model');
const Application = require('../models/Application.model');
const NewsArticle = require('../models/NewsArticle.model');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ute-job-platform';

const DEMO_STUDENT_EMAILS = Array.from({ length: 6 }, (_, i) => `dna.demo${i + 1}@ute-job.demo`);

const SEED_EMAILS = [
  'student@ute.edu.vn',
  'company@example.com',
  'company.iot@ute-job.demo',
  ...DEMO_STUDENT_EMAILS,
];

async function purgeSeedAccounts(emails) {
  const users = await User.find({ email: { $in: emails } });
  for (const u of users) {
    const sp = await StudentProfile.findOne({ user: u._id });
    if (sp) {
      await Application.deleteMany({ student: sp._id });
      await Project.deleteMany({ student: sp._id });
      await StudentProfile.deleteOne({ _id: sp._id });
    }
    const cp = await CompanyProfile.findOne({ user: u._id });
    if (cp) {
      const jobs = await Job.find({ company: cp._id }).select('_id');
      const jobIds = jobs.map((j) => j._id);
      if (jobIds.length) await Application.deleteMany({ job: { $in: jobIds } });
      await Job.deleteMany({ company: cp._id });
      await CompanyProfile.deleteOne({ _id: cp._id });
    }
    await User.deleteOne({ _id: u._id });
  }
}

const demoProfiles = [
  {
    email: DEMO_STUDENT_EMAILS[0],
    firstName: 'Minh',
    lastName: 'An',
    bio: 'Đam mê lập trình nhúng và RTOS; từng làm đồ án điều khiển IoT qua MQTT.',
    major: 'Điện – Điện tử',
    skills: [
      { name: 'C/C++', category: 'language', level: 'advanced' },
      { name: 'STM32', category: 'tool', level: 'intermediate' },
      { name: 'RTOS', category: 'technical', level: 'intermediate' },
      { name: 'MQTT', category: 'technical', level: 'beginner' },
      { name: 'Git', category: 'tool', level: 'intermediate' },
    ],
    careerDNA: {
      strengths: ['Tư duy hệ thống thấp tầng', 'Đọc datasheet kiên nhẫn'],
      weaknesses: ['Viết tài liệu kỹ thuật tiếng Anh'],
      recommendations: ['Thử FreeRTOS trên board mới', 'Đóng góp open-source firmware'],
      careerPath: 'Embedded Engineer → Firmware Lead',
      marketValue: 78,
      skillGaps: [
        { skill: 'Linux driver', importance: 'important', marketDemand: 72 },
        { skill: 'Automotive safety', importance: 'nice-to-have', marketDemand: 55 },
      ],
      lastAnalyzed: new Date(),
    },
  },
  {
    email: DEMO_STUDENT_EMAILS[1],
    firstName: 'Gia Huy',
    lastName: 'Trần',
    bio: 'Nghiên cứu CNN nhẹ cho edge AI; thích Python và notebook tái lập được.',
    major: 'Công nghệ thông tin',
    skills: [
      { name: 'Python', category: 'language', level: 'advanced' },
      { name: 'PyTorch', category: 'framework', level: 'intermediate' },
      { name: 'OpenCV', category: 'framework', level: 'intermediate' },
      { name: 'SQL', category: 'language', level: 'beginner' },
      { name: 'Docker', category: 'tool', level: 'beginner' },
    ],
    careerDNA: {
      strengths: ['Toán xác suất', 'Thử nghiệm mô hình có kiểm chứng'],
      weaknesses: ['Triển khai production scale'],
      recommendations: ['Kaggle structured data', 'MLOps cơ bản với MLflow'],
      careerPath: 'ML Engineer → Applied Scientist',
      marketValue: 85,
      skillGaps: [
        { skill: 'LLM fine-tuning', importance: 'critical', marketDemand: 88 },
        { skill: 'Cloud GPU ops', importance: 'important', marketDemand: 70 },
      ],
      lastAnalyzed: new Date(),
    },
  },
  {
    email: DEMO_STUDENT_EMAILS[2],
    firstName: 'Thu Hà',
    lastName: 'Lê',
    bio: 'Thích lab mạng và bảo mật; có chứng chỉ CCNA (đang học).',
    major: 'Công nghệ kỹ thuật điện tử – viễn thông',
    skills: [
      { name: 'Networking', category: 'technical', level: 'advanced' },
      { name: 'Linux', category: 'tool', level: 'intermediate' },
      { name: 'Wireshark', category: 'tool', level: 'intermediate' },
      { name: 'Python', category: 'language', level: 'beginner' },
      { name: 'Ansible', category: 'tool', level: 'beginner' },
    ],
    careerDNA: {
      strengths: ['Khắc phục sự cố có phương pháp', 'Vẽ topology rõ ràng'],
      weaknesses: ['Automation pipeline phức tạp'],
      recommendations: ['Lab Kubernetes networking', 'Đọc RFC quan trọng (TCP/TLS)'],
      careerPath: 'Network Engineer → SRE (infra)',
      marketValue: 71,
      skillGaps: [
        { skill: 'Kubernetes', importance: 'important', marketDemand: 80 },
        { skill: 'Cloud networking', importance: 'critical', marketDemand: 82 },
      ],
      lastAnalyzed: new Date(),
    },
  },
  {
    email: DEMO_STUDENT_EMAILS[3],
    firstName: 'Đức Thịnh',
    lastName: 'Phạm',
    bio: 'Thiết kế mạch in và test hiệu năng nguồn; thích làm prototype nhỏ gọn.',
    major: 'Kỹ thuật điều khiển & Tự động hóa',
    skills: [
      { name: 'Altium', category: 'tool', level: 'intermediate' },
      { name: 'MATLAB', category: 'language', level: 'intermediate' },
      { name: 'SPI/I2C debug', category: 'technical', level: 'advanced' },
      { name: 'Sensor fusion', category: 'technical', level: 'beginner' },
      { name: 'Documentation', category: 'soft_skill', level: 'intermediate' },
    ],
    careerDNA: {
      strengths: ['Kiểm tra EMC có quy trình', 'Làm việc với xưởng gia công'],
      weaknesses: ['RF layout'],
      recommendations: ['Khóa RF cơ bản', 'Simulation HFSS/AWR giới thiệu'],
      careerPath: 'Hardware Engineer → PCB/RF specialist',
      marketValue: 73,
      skillGaps: [
        { skill: 'Signal integrity', importance: 'important', marketDemand: 68 },
        { skill: 'Compliance testing', importance: 'nice-to-have', marketDemand: 52 },
      ],
      lastAnalyzed: new Date(),
    },
  },
  {
    email: DEMO_STUDENT_EMAILS[4],
    firstName: 'Mai Chi',
    lastName: 'Hoàng',
    bio: 'UI/UX cho web sinh viên; ưu tiên accessibility và design system.',
    major: 'Công nghệ thông tin',
    skills: [
      { name: 'Figma', category: 'tool', level: 'advanced' },
      { name: 'React', category: 'framework', level: 'intermediate' },
      { name: 'Tailwind CSS', category: 'framework', level: 'intermediate' },
      { name: 'HTML/CSS', category: 'language', level: 'advanced' },
      { name: 'Usability testing', category: 'soft_skill', level: 'intermediate' },
    ],
    careerDNA: {
      strengths: ['Copywriting UI ngắn gọn', 'Prototype nhanh'],
      weaknesses: ['Motion design nâng cao'],
      recommendations: ['Design token trong codebase', 'User test định kỳ'],
      careerPath: 'Product Designer → Design Engineer',
      marketValue: 80,
      skillGaps: [
        { skill: 'Design systems at scale', importance: 'important', marketDemand: 74 },
        { skill: 'Frontend perf', importance: 'nice-to-have', marketDemand: 62 },
      ],
      lastAnalyzed: new Date(),
    },
  },
  {
    email: DEMO_STUDENT_EMAILS[5],
    firstName: 'Quốc Bảo',
    lastName: 'Võ',
    bio: 'Phân tích dữ liệu vận hành và dashboard KPI; SQL + storytelling.',
    major: 'Công nghệ thông tin',
    skills: [
      { name: 'SQL', category: 'language', level: 'advanced' },
      { name: 'Python', category: 'language', level: 'intermediate' },
      { name: 'dbt', category: 'tool', level: 'beginner' },
      { name: 'Power BI', category: 'tool', level: 'intermediate' },
      { name: 'Statistics', category: 'technical', level: 'intermediate' },
    ],
    careerDNA: {
      strengths: ['Đặt câu hỏi đúng cho dữ liệu', 'Trình bày insight rõ'],
      weaknesses: ['Streaming real-time'],
      recommendations: ['Apache Spark intro', 'Experiment A/B trong product'],
      careerPath: 'Data Analyst → Analytics Engineer',
      marketValue: 82,
      skillGaps: [
        { skill: 'Spark/Flink', importance: 'important', marketDemand: 76 },
        { skill: 'Data quality frameworks', importance: 'critical', marketDemand: 71 },
      ],
      lastAnalyzed: new Date(),
    },
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);

  await NewsArticle.deleteMany({});
  await purgeSeedAccounts(SEED_EMAILS);

  const studentUser = await User.create({
    email: 'student@ute.edu.vn',
    password: 'student123',
    role: 'student',
    isVerified: true,
  });

  const companyUser = await User.create({
    email: 'company@example.com',
    password: 'company123',
    role: 'company',
    isVerified: true,
  });

  const companyIotUser = await User.create({
    email: 'company.iot@ute-job.demo',
    password: 'company123',
    role: 'company',
    isVerified: true,
  });

  for (const ep of DEMO_STUDENT_EMAILS) {
    await User.create({
      email: ep,
      password: 'demo123',
      role: 'student',
      isVerified: true,
    });
  }

  const studentProfile = await StudentProfile.create({
    user: studentUser._id,
    firstName: 'UTE',
    lastName: 'Sinh viên',
    phone: '0900000000',
    bio: 'Sinh viên kỹ thuật đam mê phát triển phần mềm và IoT.',
    location: { city: 'TP.HCM', country: 'Vietnam' },
    education: [
      {
        university: 'Đại học Sư phạm Kỹ thuật TP.HCM',
        major: 'Công nghệ thông tin',
        degree: 'Bachelor',
        startYear: 2022,
        endYear: 2026,
        status: 'studying',
      },
    ],
    skills: [
      { name: 'JavaScript', category: 'language', level: 'intermediate' },
      { name: 'React', category: 'framework', level: 'intermediate' },
      { name: 'Node.js', category: 'framework', level: 'beginner' },
      { name: 'Git', category: 'tool', level: 'intermediate' },
      { name: 'REST API', category: 'technical', level: 'beginner' },
    ],
    careerDNA: {
      strengths: ['Học nhanh', 'Làm việc nhóm'],
      weaknesses: ['Tiếng Anh thuyết trình'],
      recommendations: ['Luyện thêm TypeScript', 'Tham gia hackathon'],
      careerPath: 'Full-stack intern → Software engineer',
      marketValue: 72,
      lastAnalyzed: new Date(),
    },
  });

  for (const spec of demoProfiles) {
    const u = await User.findOne({ email: spec.email });
    await StudentProfile.create({
      user: u._id,
      firstName: spec.firstName,
      lastName: spec.lastName,
      phone: `090${String(Math.floor(1000000 + Math.random() * 8999999))}`,
      bio: spec.bio,
      isDemoProfile: true,
      location: { city: 'TP.HCM', country: 'Vietnam' },
      education: [
        {
          university: 'Đại học Sư phạm Kỹ thuật TP.HCM',
          major: spec.major,
          degree: 'Bachelor',
          startYear: 2021,
          endYear: 2026,
          status: 'studying',
        },
      ],
      skills: spec.skills,
      careerDNA: spec.careerDNA,
      socialLinks: {
        github: 'https://github.com',
        portfolio: 'https://example.com',
      },
    });
  }

  const companyProfile = await CompanyProfile.create({
    user: companyUser._id,
    companyName: 'UTE Tech Partner',
    description: 'Doanh nghiệp công nghệ đồng hành cùng sinh viên UTE.',
    industry: 'Software',
    size: '51-200',
    email: 'hr@utetech.example',
    address: { city: 'TP.HCM', country: 'Vietnam' },
  });

  const companyIot = await CompanyProfile.create({
    user: companyIotUser._id,
    companyName: 'Smart Factory VN',
    description: 'Giải pháp IoT công nghiệp và nhúng cho nhà máy.',
    industry: 'Embedded / IoT',
    size: '11-50',
    email: 'careers@smartfactory.example',
    address: { city: 'Bình Dương', country: 'Vietnam' },
  });

  const daysAgo = (n) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d;
  };

  await Job.create([
    {
      company: companyProfile._id,
      title: 'Thực tập sinh Frontend (React)',
      description:
        'Tham gia phát triển sản phẩm web nội bộ, làm việc cùng mentor có kinh nghiệm.',
      responsibilities: ['Viết component React', 'Tích hợp API REST', 'Viết unit test cơ bản'],
      requirements: ['Biết HTML/CSS/JS', 'Đã học React cơ bản', 'Tiếng Anh đọc tài liệu'],
      type: 'internship',
      category: 'software',
      level: 'intern',
      location: { city: 'TP.HCM', country: 'Vietnam', isRemote: false },
      salary: { min: 3000000, max: 5000000, currency: 'VND', isNegotiable: true, isPublic: true },
      requiredSkills: [
        { name: 'React', level: 'beginner', importance: 'required' },
        { name: 'JavaScript', level: 'intermediate', importance: 'required' },
      ],
      benefits: ['Có mentor', 'Giấy xác nhận thực tập'],
      status: 'published',
      publishedAt: daysAgo(2),
      isFeatured: true,
      tags: ['react', 'intern', 'ute'],
    },
    {
      company: companyProfile._id,
      title: 'Junior Backend (Node.js)',
      description: 'Phát triển API và hỗ trợ triển khai microservices.',
      responsibilities: ['Thiết kế REST API', 'Tối ưu truy vấn DB', 'Code review'],
      requirements: ['Node.js', 'MongoDB hoặc SQL', 'Git'],
      type: 'full-time',
      category: 'software',
      level: 'junior',
      location: { city: 'TP.HCM', country: 'Vietnam', isRemote: true },
      salary: { min: 12000000, max: 18000000, currency: 'VND', isNegotiable: true, isPublic: true },
      requiredSkills: [
        { name: 'Node.js', level: 'intermediate', importance: 'required' },
        { name: 'MongoDB', level: 'beginner', importance: 'preferred' },
      ],
      benefits: ['BHXH đủ', 'Làm remote linh hoạt'],
      status: 'published',
      publishedAt: daysAgo(5),
      tags: ['nodejs', 'backend'],
    },
    {
      company: companyIot._id,
      title: 'Firmware Intern (STM32 / RTOS)',
      description:
        'Phát triển firmware thu thập dữ liệu cảm biến, giao tiếp RS485 và MQTT.',
      responsibilities: ['Debug UART/I2C', 'Viết driver cảm biến', 'Tham gia review code'],
      requirements: ['C/C++', 'Kiến thức vi điều khiển', 'RTOS là một lợi thế'],
      type: 'internship',
      category: 'embedded',
      level: 'intern',
      location: { city: 'Bình Dương', country: 'Vietnam', isRemote: false },
      salary: { min: 3500000, max: 5500000, currency: 'VND', isNegotiable: true, isPublic: true },
      requiredSkills: [
        { name: 'C', level: 'intermediate', importance: 'required' },
        { name: 'Embedded C', level: 'intermediate', importance: 'required' },
      ],
      benefits: ['Xe đưa đón khu công nghiệp', 'Mentor senior'],
      status: 'published',
      publishedAt: daysAgo(1),
      isUrgent: true,
      tags: ['embedded', 'stm32', 'intern'],
    },
    {
      company: companyIot._id,
      title: 'IoT Integration Engineer',
      description: 'Triển khai gateway IoT, đồng bộ dữ liệu lên cloud và giám sát.',
      responsibilities: ['Cấu hình edge gateway', 'Viết script Python', 'Hỗ trợ onsite'],
      requirements: ['Linux shell', 'MQTT', 'Python'],
      type: 'full-time',
      category: 'hardware',
      level: 'junior',
      location: { city: 'Đồng Nai', country: 'Vietnam', isRemote: false },
      salary: { min: 14000000, max: 19000000, currency: 'VND', isNegotiable: true, isPublic: true },
      requiredSkills: [
        { name: 'Python', level: 'intermediate', importance: 'required' },
        { name: 'Networking', level: 'beginner', importance: 'preferred' },
      ],
      benefits: ['Đào tạo chứng chỉ vendor', 'Team kỹ thuật mạnh'],
      status: 'published',
      publishedAt: daysAgo(7),
      tags: ['iot', 'python'],
    },
    {
      company: companyProfile._id,
      title: 'Data Analyst Intern',
      description: 'Hỗ trợ làm dashboard nội bộ và báo cáo KPI hàng tuần.',
      responsibilities: ['Truy vấn SQL', 'Làm báo cáo Power BI', 'Kiểm tra chất lượng dữ liệu'],
      requirements: ['SQL', 'Excel/Google Sheet', 'Tư duy logic'],
      type: 'internship',
      category: 'data',
      level: 'intern',
      location: { city: 'TP.HCM', country: 'Vietnam', isRemote: true },
      salary: { min: 4000000, max: 6000000, currency: 'VND', isNegotiable: true, isPublic: true },
      requiredSkills: [
        { name: 'SQL', level: 'intermediate', importance: 'required' },
        { name: 'Python', level: 'beginner', importance: 'preferred' },
      ],
      benefits: ['Remote linh hoạt', 'Coach analytics'],
      status: 'published',
      publishedAt: daysAgo(3),
      tags: ['data', 'sql', 'intern'],
    },
    {
      company: companyProfile._id,
      title: 'QA Engineer (Automation)',
      description: 'Xây dựng test tự động cho API và web.',
      responsibilities: ['Viết test Playwright/Cypress', 'Tích hợp CI', 'Báo cáo bug'],
      requirements: ['Kiến thức web', 'JavaScript', 'Tư duy kiểm thử'],
      type: 'full-time',
      category: 'software',
      level: 'junior',
      location: { city: 'TP.HCM', country: 'Vietnam', isRemote: false },
      salary: { min: 13000000, max: 17000000, currency: 'VND', isNegotiable: true, isPublic: true },
      requiredSkills: [
        { name: 'JavaScript', level: 'intermediate', importance: 'required' },
        { name: 'Testing', level: 'beginner', importance: 'required' },
      ],
      benefits: ['Khóa ISTQB nội bộ', 'Bonus dự án'],
      status: 'published',
      publishedAt: daysAgo(10),
      tags: ['qa', 'automation'],
    },
    {
      company: companyProfile._id,
      title: 'DevOps Intern',
      description: 'Hỗ trợ pipeline CI/CD và triển khai Docker.',
      responsibilities: ['Viết Dockerfile', 'Chạy GitHub Actions', 'Quan sát log'],
      requirements: ['Linux cơ bản', 'Git', 'Docker là lợi thế'],
      type: 'internship',
      category: 'software',
      level: 'intern',
      location: { city: 'TP.HCM', country: 'Vietnam', isRemote: true },
      salary: { min: 3500000, max: 5000000, currency: 'VND', isNegotiable: true, isPublic: true },
      requiredSkills: [
        { name: 'Docker', level: 'beginner', importance: 'preferred' },
        { name: 'Linux', level: 'beginner', importance: 'required' },
      ],
      benefits: ['Mentor DevOps senior', 'Chứng chỉ cloud (ưu tiên)'],
      status: 'published',
      publishedAt: daysAgo(4),
      tags: ['devops', 'docker', 'intern'],
    },
    {
      company: companyIot._id,
      title: 'Machine Learning Intern (Computer Vision)',
      description: 'Thử nghiệm mô hình nhận diện lỗi trên dây chuyền (dataset nội bộ).',
      responsibilities: ['Tiền xử lý ảnh', 'Huấn luyện model nhẹ', 'Đánh giá độ chính xác'],
      requirements: ['Python', 'OpenCV hoặc PyTorch cơ bản'],
      type: 'internship',
      category: 'ai-ml',
      level: 'intern',
      location: { city: 'TP.HCM', country: 'Vietnam', isRemote: false },
      salary: { min: 4500000, max: 7000000, currency: 'VND', isNegotiable: true, isPublic: true },
      requiredSkills: [
        { name: 'Python', level: 'intermediate', importance: 'required' },
        { name: 'PyTorch', level: 'beginner', importance: 'preferred' },
      ],
      benefits: ['GPU lab', 'Paper reading group'],
      status: 'published',
      publishedAt: daysAgo(6),
      tags: ['ai', 'cv', 'intern'],
    },
  ]);

  await Project.create({
    student: studentProfile._id,
    title: 'UTE Job — prototype',
    description: 'Giao diện và API demo cho nền tảng việc làm sinh viên kỹ thuật.',
    category: 'web',
    type: 'academic',
    technologies: [
      { name: 'React', category: 'framework' },
      { name: 'Express', category: 'framework' },
    ],
    demoUrl: 'http://localhost:5173',
    sourceCodeUrl: 'https://github.com',
    tags: ['react', 'career'],
    status: 'completed',
    isPublic: true,
  });

  await NewsArticle.insertMany([
    {
      title: 'Xu hướng tuyển dụng kỹ sư tại Việt Nam 2026',
      slug: 'xu-huong-tuyen-dung-ky-su-2026',
      excerpt:
        'Doanh nghiệp ưu tiên kỹ năng thực chiến, portfolio GitHub và khả năng làm việc đa môi trường (onsite/hybrid/remote).',
      content: `Nhiều nhà tuyển dụng cho biết hồ sơ có project rõ ràng, có README và video demo ngắn sẽ được xem trước.\n\nSinh viên nên chuẩn bị: (1) một repo “flagship” thể hiện kiến trúc; (2) log quyết định kỹ thuật trong README; (3) kinh nghiệm teamwork qua club/hackathon.\n\nUTE Job Platform khuyến khích gắn showcase project ngay trên hồ sơ Career DNA để nhà tuyển dụng hiểu nhanh năng lực.`,
      category: 'market',
      tags: ['thị trường', '2026'],
      readTimeMinutes: 5,
      publishedAt: daysAgo(1),
    },
    {
      title: 'Phỏng vấn thực tập kỹ thuật: chuẩn bị gì trong 30 phút?',
      slug: 'phong-van-thuc-tap-ky-thuat-chuan-bi-gi',
      excerpt:
        'Khung STAR cho kỹ thuật: Tình huống – Task – Action – Result, kèm một ví dụ bug đã xử lý.',
      content: `Ở vòng screening, recruiter thường hỏi về project khó nhất và vai trò của bạn.\n\nHãy chọn một case có số liệu: giảm latency bao nhiêu %, tiết kiệm thời gian bao lâu.\n\nTránh liệt kê công nghệ rời rạc; hãy kể một câu chuyện có đầu có cuối.`,
      category: 'tips',
      tags: ['phỏng vấn', 'thực tập'],
      readTimeMinutes: 4,
      publishedAt: daysAgo(2),
    },
    {
      title: 'CV kỹ thuật: tránh 5 lỗi khiến ATS và nhà tuyển dụng bỏ qua',
      slug: 'cv-ky-thuat-loi-ats',
      excerpt:
        'File PDF có text chọn được, tiêu đề rõ ràng, liên kết portfolio ở đầu trang.',
      content: `Lỗi thường gặp: ảnh chụp màn hình code thay vì link repo; không ghi tech stack theo dự án; không có mốc thời gian.\n\nNên có một khối “Impact” với 3 bullet đo lường được.\n\nVới sinh viên, một trang là đủ nếu thông tin dày và có liên kết kiểm chứng.`,
      category: 'tips',
      tags: ['cv', 'ats'],
      readTimeMinutes: 6,
      publishedAt: daysAgo(3),
    },
    {
      title: 'Mức lương thực tập TP.HCM: kỳ vọng và thực tế',
      slug: 'luong-thuc-tap-tphcm-ky-vong',
      excerpt:
        'Mức phụ cấp phụ thuộc ngành (software/data cao hơn), quy mô công ty và số giờ onsite.',
      content: `Sinh viên nên quan tâm học được gì: quy trình review, chuẩn coding, exposure production.\n\nKhi đàm phán, hãy hỏi rõ mentor, scope task và khả năng offer full-time sau thực tập.\n\nNền tảng minh họa các tin tuyển dụng để bạn so sánh điều kiện một cách minh bạch hơn.`,
      category: 'market',
      tags: ['lương', 'thực tập'],
      readTimeMinutes: 5,
      publishedAt: daysAgo(4),
    },
    {
      title: 'Làm remote khi còn đi học: lưu ý pháp lý và quản lý thời gian',
      slug: 'lam-remote-khi-con-di-hoc',
      excerpt:
        'Thỏa thuận giờ overlap với team, giao tiếp bất đồng bộ có quy ước, và giữ GPA ổn định.',
      content: `Remote đòi hỏi kỹ năng tự quản lý cao. Hãy dùng calendar khối thời gian cho trường và cho công việc.\n\nNếu là freelance nhỏ, ghi rõ deliverable và deadline để tránh conflict kỳ thi.\n\nUTE Job có trang Remote Work trong đề án — áp dụng nguyên tắc “visibility” khi làm việc phân tán.`,
      category: 'tips',
      tags: ['remote', 'sinh viên'],
      readTimeMinutes: 5,
      publishedAt: daysAgo(5),
    },
    {
      title: 'Kỹ năng mềm trong phỏng vấn kỹ thuật: không chỉ là “giao tiếp tốt”',
      slug: 'ky-nang-mem-phong-van-ky-thuat',
      excerpt:
        'Feedback có cấu trúc, đặt câu hỏi đúng, và thể hiện học hỏi khi không biết.',
      content: `Người phỏng vấn đánh giá cách bạn suy nghĩ khi bị challenge.\n\nThử script: “Em chưa gặp case này, em sẽ phân rã thành các giả thuyết và kiểm chứng theo thứ tự…”.\n\nĐiều này quan trọng không kém coding challenge.`,
      category: 'tips',
      tags: ['soft skill'],
      readTimeMinutes: 4,
      publishedAt: daysAgo(6),
    },
    {
      title: 'Ngành mạng – viễn thông: cơ hội thực tập tại các nhà mạng và tích hợp',
      slug: 'mang-vien-thong-co-hoi-thuc-tap',
      excerpt:
        'Lab chứng chỉ (CCNA/CCNP), automation Ansible và hiểu logging là điểm cộng.',
      content: `Ngoài lý thuyết OSI, sinh viên nên có lab VLAN, routing cơ bản và troubleshoot có checklist.\n\nDoanh nghiệp thường cần người chịu được ca và onsite — thể hiện thái độ học hỏi và an toàn lao động.\n\nCareer DNA giúp ghi nhận chứng chỉ và dự án lab như một phần năng lực thể hiện.`,
      category: 'recruitment',
      tags: ['network', 'thực tập'],
      readTimeMinutes: 5,
      publishedAt: daysAgo(7),
    },
    {
      title: 'AI/ML: sinh viên Việt Nam nên bắt đầu từ đâu?',
      slug: 'ai-ml-bat-dau-tu-dau',
      excerpt:
        'Nền toán + code + một pipeline hoàn chỉnh (data → train → evaluate) quan trọng hơn buzzword.',
      content: `Hãy chọn một bài toán nhỏ có metric rõ: ví dụ phân loại ảnh 3 lớp.\n\nTránh chỉ chạy notebook copy; hãy đóng gói inference đơn giản và ghi README.\n\nNền tảng khuyến khích gắn project AI vào showcase và mapping skill gaps trên Career DNA.`,
      category: 'campus',
      tags: ['ai', 'ml'],
      readTimeMinutes: 6,
      publishedAt: daysAgo(8),
    },
    {
      title: 'Quy định & đạo đức khi đăng tin tuyển dụng trên nền tảng',
      slug: 'quy-dinh-dang-tin-tuyen-dung',
      excerpt:
        'Tin phải trung thực về vị trí, không phân biệt; thông tin liên hệ rõ ràng.',
      content: `Doanh nghiệp đăng tin nên mô tả chính xác loại hợp đồng (thực tập/part-time/full-time).\n\nSinh viên báo cáo tin sai hoặc lừa đảo qua kênh hỗ trợ của trường/nền tảng.\n\nUTE Job hướng tới minh bạch và an toàn cho ứng viên.`,
      category: 'policy',
      tags: ['quy định', 'minh bạch'],
      readTimeMinutes: 3,
      publishedAt: daysAgo(9),
    },
  ]);

  // eslint-disable-next-line no-console
  console.log(
    'Seed OK — student@ute.edu.vn / student123 | company@example.com / company123 | demo DNA: dna.demo1@ute-job.demo … / demo123'
  );
  await mongoose.disconnect();
}

seed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
