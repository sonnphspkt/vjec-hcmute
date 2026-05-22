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
const SEED_DOMAIN = 'vjec-demo.local';
const password = 'demo123';
const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};
const slugify = (text, index) =>
  `${text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}-${index + 1}`;

const companies = [
  ['FPT Software Academy', 'Software', '500+', 'Đào tạo và tuyển dụng Fresher/Intern cho các dự án chuyển đổi số, cloud và AI.', ['Mentor 1-1', 'Lộ trình fresher', 'Dự án quốc tế']],
  ['Bosch Embedded Lab', 'Embedded / Automotive', '500+', 'Trung tâm R&D về automotive, firmware, AUTOSAR và kiểm thử hệ thống nhúng.', ['Lab thiết bị thật', 'Tiếng Anh kỹ thuật', 'Hybrid']],
  ['VNG Cloud Campus', 'Cloud / Platform', '201-500', 'Đội ngũ cloud-native, DevOps, SRE và dữ liệu lớn dành cho sinh viên kỹ thuật.', ['Cloud credit', 'Tech talk', 'Remote linh hoạt']],
  ['TMA Innovation Center', 'AI / Data', '500+', 'Không gian R&D về AI, computer vision, NLP và ứng dụng doanh nghiệp.', ['Research group', 'GPU lab', 'Paper reading']],
  ['Renesas Student Program', 'Semiconductor', '201-500', 'Cơ hội thực tập IC design, embedded software và verification cho sinh viên điện tử.', ['IC training', 'Senior mentor', 'Học bổng']],
  ['KMS Technology', 'Software Testing', '500+', 'Doanh nghiệp phần mềm mạnh về product engineering, automation testing và agile team.', ['Agile team', 'QA academy', 'English club']],
  ['Smart Factory VN', 'Industrial IoT', '51-200', 'Giải pháp IoT công nghiệp, gateway, dashboard vận hành và tích hợp thiết bị nhà máy.', ['Onsite allowance', 'IoT kit', 'Factory tour']],
  ['DataHouse Vietnam', 'Data Engineering', '51-200', 'Xây dựng data platform, analytics engineering và dashboard cho khách hàng quốc tế.', ['Data mentorship', 'Remote', 'BI workshop']],
  ['Momo Tech Talent', 'Fintech', '500+', 'Sản phẩm thanh toán, fraud detection, backend high traffic và mobile engineering.', ['Scale thật', 'Hack day', 'Phúc lợi tốt']],
  ['NashTech Graduate Program', 'Software', '500+', 'Chương trình graduate cho software engineer, business analyst và cloud engineer.', ['Graduate path', 'Global client', 'Code review']],
];

const students = [
  ['Minh An', 'Điện - Điện tử', 'Embedded C, STM32, RTOS, MQTT, Git', 'Embedded Engineer -> Firmware Lead', 82],
  ['Gia Huy', 'Công nghệ thông tin', 'Python, PyTorch, OpenCV, Docker, SQL', 'ML Engineer -> Applied Scientist', 87],
  ['Thu Hà', 'Mạng máy tính', 'Networking, Linux, Wireshark, Python, Ansible', 'Network Engineer -> SRE', 76],
  ['Đức Thịnh', 'Tự động hóa', 'Altium, MATLAB, SPI/I2C, Sensor fusion, Documentation', 'Hardware Engineer -> PCB Specialist', 74],
  ['Mai Chi', 'Công nghệ thông tin', 'Figma, React, Tailwind CSS, HTML/CSS, Usability Testing', 'Product Designer -> Design Engineer', 83],
  ['Quốc Bảo', 'Hệ thống thông tin', 'SQL, Python, dbt, Power BI, Statistics', 'Data Analyst -> Analytics Engineer', 84],
  ['Khánh Linh', 'Cơ điện tử', 'SolidWorks, Arduino, PLC, Control System, Teamwork', 'Automation Engineer -> Robotics Engineer', 79],
  ['Hoàng Nam', 'Kỹ thuật phần mềm', 'TypeScript, Node.js, PostgreSQL, REST API, Docker', 'Backend Engineer -> Platform Engineer', 81],
  ['Bảo Ngọc', 'AI & Data', 'Python, pandas, scikit-learn, Tableau, Storytelling', 'Data Scientist -> Product Analyst', 80],
  ['Tuấn Kiệt', 'An toàn thông tin', 'Linux, Burp Suite, OWASP, Python, Networking', 'Security Analyst -> AppSec Engineer', 78],
  ['Phương Nhi', 'Thiết kế số', 'React Native, UI Design, Firebase, Git, Communication', 'Mobile Developer -> Product Engineer', 77],
  ['Anh Khoa', 'Điện tử viễn thông', 'C/C++, FPGA, Verilog, Signal Processing, MATLAB', 'Digital IC Engineer -> Verification Lead', 75],
  ['Hải Đăng', 'Cloud Computing', 'AWS, Linux, Terraform, Docker, Kubernetes', 'DevOps Engineer -> SRE', 86],
  ['Thanh Trúc', 'Công nghệ thông tin', 'Java, Spring Boot, MySQL, Redis, API Design', 'Java Backend -> Solution Architect', 82],
  ['Nhật Vy', 'Logistics Tech', 'Excel, SQL, Process Mapping, Power BI, English', 'Business Analyst -> Product Owner', 73],
  ['Trọng Nghĩa', 'Game Development', 'Unity, C#, Blender, Game Design, Git', 'Game Developer -> Technical Artist', 72],
  ['Yến Nhi', 'Web Engineering', 'Vue, React, CSS, Accessibility, Testing', 'Frontend Engineer -> Design System Lead', 85],
  ['Long Phạm', 'IoT Systems', 'ESP32, MQTT, Node-RED, InfluxDB, Grafana', 'IoT Engineer -> Edge Platform Lead', 80],
];

const jobTitles = [
  ['Thực tập sinh Frontend React', 'internship', 'software', 'intern', 'React, JavaScript, Tailwind CSS'],
  ['Junior Backend Node.js', 'full-time', 'software', 'junior', 'Node.js, MongoDB, REST API'],
  ['Firmware Intern STM32/RTOS', 'internship', 'embedded', 'intern', 'C/C++, STM32, RTOS'],
  ['Data Analyst Intern', 'internship', 'data', 'intern', 'SQL, Python, Power BI'],
  ['DevOps Intern Cloud Platform', 'internship', 'software', 'intern', 'Docker, Linux, GitHub Actions'],
  ['QA Automation Engineer', 'full-time', 'software', 'junior', 'JavaScript, Playwright, Testing'],
  ['AI Computer Vision Intern', 'internship', 'ai-ml', 'intern', 'Python, OpenCV, PyTorch'],
  ['Mobile Developer React Native', 'part-time', 'software', 'fresher', 'React Native, Firebase, TypeScript'],
  ['Network Engineer Fresher', 'full-time', 'network', 'fresher', 'Networking, Linux, Wireshark'],
  ['Business Analyst Intern', 'internship', 'management', 'intern', 'Documentation, SQL, Communication'],
  ['Embedded Linux Engineer', 'full-time', 'embedded', 'junior', 'Linux, C, Yocto'],
  ['UI/UX Design Engineer', 'part-time', 'design', 'fresher', 'Figma, React, Usability Testing'],
  ['Robotics Micro Internship', 'internship', 'hardware', 'intern', 'Arduino, Control System, Python'],
  ['Data Engineering Fresher', 'full-time', 'data', 'fresher', 'SQL, Python, dbt'],
  ['Security Analyst Intern', 'internship', 'network', 'intern', 'OWASP, Linux, Burp Suite'],
  ['Cloud SRE Fresher', 'full-time', 'software', 'fresher', 'AWS, Kubernetes, Terraform'],
  ['IC Verification Intern', 'internship', 'hardware', 'intern', 'Verilog, SystemVerilog, MATLAB'],
  ['Full-stack Remote Project', 'remote', 'software', 'junior', 'React, Node.js, PostgreSQL'],
  ['Game Developer Intern Unity', 'internship', 'software', 'intern', 'Unity, C#, Git'],
  ['IoT Gateway Integration Engineer', 'contract', 'embedded', 'junior', 'MQTT, Python, Linux'],
  ['Product Data Intern', 'internship', 'data', 'intern', 'SQL, A/B Testing, Dashboard'],
  ['Automation Tester Part-time', 'part-time', 'software', 'fresher', 'Cypress, JavaScript, API Testing'],
  ['AI Prompt Evaluation Assistant', 'freelance', 'ai-ml', 'fresher', 'Python, English, Data Labeling'],
  ['PLC & SCADA Intern', 'internship', 'hardware', 'intern', 'PLC, SCADA, Electrical Drawing'],
  ['Java Spring Boot Fresher', 'full-time', 'software', 'fresher', 'Java, Spring Boot, MySQL'],
];

const projectSpecs = [
  ['Smart Attendance bằng camera AI', 'ai-ml', 'academic', 'Python, OpenCV, Flask'],
  ['IoT Greenhouse Monitoring', 'iot', 'academic', 'ESP32, MQTT, Node-RED'],
  ['UTE Career DNA Dashboard', 'web', 'hackathon', 'React, Express, MongoDB'],
  ['Ứng dụng tìm teammate đồ án', 'mobile', 'personal', 'React Native, Firebase'],
  ['Hệ thống cảnh báo rung động motor', 'embedded', 'research', 'STM32, FreeRTOS, Grafana'],
  ['Data mart phân tích tuyển dụng', 'data-science', 'academic', 'SQL, dbt, Power BI'],
  ['Game 2D học thuật toán', 'game', 'personal', 'Unity, C#'],
  ['Gateway Modbus sang MQTT', 'iot', 'company', 'Python, Linux, MQTT'],
  ['Portfolio generator cho sinh viên', 'web', 'personal', 'Next.js, Tailwind CSS'],
  ['Robot line follower PID', 'embedded', 'academic', 'Arduino, Control System'],
  ['Bản đồ việc làm thực tập TP.HCM', 'data-science', 'hackathon', 'Python, Leaflet, pandas'],
  ['Ứng dụng quản lý lab thiết bị', 'web', 'academic', 'Vue, Node.js, PostgreSQL'],
  ['Mô phỏng mạng doanh nghiệp CCNA', 'other', 'academic', 'Packet Tracer, VLAN, OSPF'],
  ['Fraud transaction mini model', 'ai-ml', 'research', 'Python, scikit-learn'],
  ['Hệ thống đặt lịch mentor', 'web', 'freelance', 'React, Firebase'],
  ['Thiết kế PCB sensor node', 'embedded', 'academic', 'Altium, ESP32'],
  ['Dashboard năng lượng xưởng', 'iot', 'company', 'InfluxDB, Grafana, MQTT'],
  ['CV ATS checker tiếng Việt', 'ai-ml', 'hackathon', 'NLP, FastAPI, React'],
];

const newsTitles = [
  ['Xu hướng tuyển dụng kỹ sư công nghệ năm 2026', 'market', 'Doanh nghiệp ưu tiên portfolio thật, khả năng học nhanh và kỹ năng triển khai sản phẩm.'],
  ['Checklist CV kỹ thuật trước khi nộp thực tập', 'tips', 'Một trang CV tốt cần project rõ, link GitHub, tech stack và kết quả đo được.'],
  ['Remote work cho sinh viên: cơ hội và rủi ro', 'tips', 'Làm từ xa giúp tích lũy kinh nghiệm sớm nhưng cần kỷ luật giao tiếp và deadline.'],
  ['Micro internship: mô hình thực tập ngắn cho năm nhất, năm hai', 'campus', 'Doanh nghiệp có thể giao bài toán nhỏ trong 1-2 tuần để sinh viên làm quen thực tế.'],
  ['AI/ML intern cần chuẩn bị gì?', 'recruitment', 'Nền tảng toán, pipeline data-train-evaluate và khả năng trình bày thí nghiệm là điểm cộng.'],
  ['Embedded và automotive: nhu cầu nhân lực tăng mạnh', 'market', 'Firmware, RTOS, Linux embedded và kiểm thử hệ thống đang là nhóm kỹ năng có giá trị.'],
  ['Phỏng vấn kỹ thuật: cách kể một project trong 3 phút', 'tips', 'Hãy nói bài toán, vai trò của bạn, quyết định kỹ thuật và kết quả đạt được.'],
  ['Từ đồ án môn học đến portfolio nghề nghiệp', 'campus', 'Một đồ án có README, demo video và kiến trúc rõ có thể trở thành bằng chứng năng lực.'],
  ['Doanh nghiệp cần gì ở sinh viên thực tập?', 'recruitment', 'Thái độ học hỏi, khả năng đọc tài liệu và phản hồi nhanh thường quan trọng không kém kỹ thuật.'],
  ['Data analyst intern: SQL chưa đủ', 'tips', 'Ngoài truy vấn, sinh viên cần hiểu business question, data quality và cách kể insight.'],
  ['Network/SRE: lộ trình từ lab đến production', 'market', 'Linux, troubleshooting, logging và cloud networking là cầu nối từ network truyền thống sang SRE.'],
  ['Quy định đăng tin tuyển dụng minh bạch', 'policy', 'Tin tuyển dụng cần rõ loại công việc, phụ cấp, địa điểm, yêu cầu và phương thức ứng tuyển.'],
  ['Hackathon có giúp tăng cơ hội việc làm?', 'campus', 'Có, nếu bạn ghi rõ vai trò, demo được sản phẩm và rút ra bài học kỹ thuật cụ thể.'],
  ['Kỹ năng tiếng Anh kỹ thuật cho sinh viên UTE', 'tips', 'Đọc docs, viết issue ngắn và trình bày project bằng tiếng Anh là lợi thế lớn.'],
  ['Cloud fresher: Docker, Linux, CI/CD nên học theo thứ tự nào?', 'tips', 'Bắt đầu bằng Linux và Docker, sau đó đến pipeline CI/CD và quan sát hệ thống.'],
  ['Automation testing: cơ hội cho sinh viên thích chất lượng phần mềm', 'recruitment', 'QA automation cần tư duy hệ thống, JS/Python và khả năng mô tả bug rõ ràng.'],
  ['Research & Innovation Hub: kết nối đề tài với doanh nghiệp', 'campus', 'Prototype sinh viên có thể tiếp tục phát triển nếu được mentor và doanh nghiệp phản hồi sớm.'],
  ['Talent DNA: vì sao CV tĩnh chưa đủ?', 'market', 'Career DNA giúp doanh nghiệp nhìn thấy quá trình phát triển, dự án và skill gap của sinh viên.'],
];

function splitName(fullName) {
  const parts = fullName.split(' ');
  return { firstName: parts.slice(0, -1).join(' '), lastName: parts.at(-1) };
}

function skillDocs(skills) {
  return skills.split(', ').map((name, index) => ({
    name,
    category: index === 0 ? 'language' : index === 1 ? 'framework' : 'technical',
    level: index < 2 ? 'intermediate' : 'beginner',
    yearsOfExperience: index < 2 ? 1 : 0,
    endorsements: 3 + index,
  }));
}

async function purgeRichSeed() {
  const users = await User.find({ email: new RegExp(`@${SEED_DOMAIN.replace('.', '\\.')}$`) });
  const studentIds = [];
  const companyIds = [];
  for (const user of users) {
    const student = await StudentProfile.findOne({ user: user._id });
    if (student) studentIds.push(student._id);
    const company = await CompanyProfile.findOne({ user: user._id });
    if (company) companyIds.push(company._id);
  }

  const jobIds = (await Job.find({ company: { $in: companyIds } }).select('_id')).map((j) => j._id);
  if (jobIds.length) await Application.deleteMany({ job: { $in: jobIds } });
  if (studentIds.length) await Application.deleteMany({ student: { $in: studentIds } });
  await Job.deleteMany({ company: { $in: companyIds } });
  await Project.deleteMany({ student: { $in: studentIds } });
  await CompanyProfile.deleteMany({ _id: { $in: companyIds } });
  await StudentProfile.deleteMany({ _id: { $in: studentIds } });
  await User.deleteMany({ _id: { $in: users.map((u) => u._id) } });
  await NewsArticle.deleteMany({});
}

async function seedRich() {
  await mongoose.connect(MONGODB_URI);
  await purgeRichSeed();

  const companyProfiles = [];
  for (let i = 0; i < companies.length; i += 1) {
    const [companyName, industry, size, description, benefits] = companies[i];
    const user = await User.create({
      email: `company${i + 1}@${SEED_DOMAIN}`,
      password,
      role: 'company',
      isVerified: true,
    });
    const company = await CompanyProfile.create({
      user: user._id,
      companyName,
      description,
      industry,
      size,
      website: `https://example.com/${companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      email: `hr${i + 1}@${SEED_DOMAIN}`,
      address: { city: i % 3 === 0 ? 'TP.HCM' : i % 3 === 1 ? 'Bình Dương' : 'Đồng Nai', country: 'Vietnam' },
      benefits,
      culture: 'Ưu tiên học hỏi, review minh bạch, mentor kỹ thuật và sản phẩm có tác động thực tế.',
      isVerified: i < 7,
      stats: { totalJobs: 0, activeJobs: 0, totalHires: 8 + i, profileViews: 120 + i * 19 },
    });
    companyProfiles.push(company);
  }

  const studentProfiles = [];
  for (let i = 0; i < students.length; i += 1) {
    const [fullName, major, skills, careerPath, marketValue] = students[i];
    const name = splitName(fullName);
    const user = await User.create({
      email: `student${i + 1}@${SEED_DOMAIN}`,
      password,
      role: 'student',
      isVerified: true,
    });
    const student = await StudentProfile.create({
      user: user._id,
      ...name,
      phone: `09${String(20000000 + i * 13457).slice(0, 8)}`,
      bio: `${fullName} đang xây dựng Career DNA theo hướng ${careerPath}. Có project thực tế, thích học qua phản hồi doanh nghiệp và mentor.`,
      avatar: `demo-avatar-${(i % 6) + 1}.png`,
      isDemoProfile: true,
      location: { city: 'TP.HCM', country: 'Vietnam' },
      education: [{ university: 'Đại học Sư phạm Kỹ thuật TP.HCM', major, degree: 'Bachelor', startYear: 2021 + (i % 3), endYear: 2026, gpa: 7.2 + (i % 6) * 0.25, status: 'studying' }],
      skills: skillDocs(skills),
      experience: [{ company: companyProfiles[i % companyProfiles.length].companyName, position: 'Project collaborator', type: i % 2 ? 'internship' : 'freelance', startDate: daysAgo(160 + i), isCurrent: i % 4 === 0, description: 'Tham gia sprint nhỏ, làm task có review và demo cuối kỳ.', technologies: skills.split(', ').slice(0, 3) }],
      certifications: [{ name: ['CCNA Introduction', 'AWS Cloud Practitioner Prep', 'Google Data Analytics Intro', 'React Practical Workshop'][i % 4], issuer: 'UTE Career Center', issueDate: daysAgo(60 + i) }],
      careerDNA: {
        strengths: skills.split(', ').slice(0, 2).map((s) => `Mạnh về ${s}`),
        weaknesses: ['Cần thêm trải nghiệm production'],
        recommendations: ['Hoàn thiện README project', 'Tham gia micro internship', 'Bổ sung chứng chỉ ngắn hạn'],
        careerPath,
        marketValue,
        skillGaps: [
          { skill: ['Cloud deployment', 'Technical English', 'Testing automation', 'System design'][i % 4], importance: i % 3 === 0 ? 'critical' : 'important', marketDemand: 65 + (i % 5) * 6 },
          { skill: ['Documentation', 'Security basics', 'Data modeling', 'CI/CD'][i % 4], importance: 'nice-to-have', marketDemand: 55 + (i % 4) * 7 },
        ],
        lastAnalyzed: new Date(),
      },
      socialLinks: { github: 'https://github.com', linkedin: 'https://linkedin.com', portfolio: 'https://example.com/portfolio' },
      resume: { url: 'https://example.com/resume.pdf', uploadDate: daysAgo(10), fileName: `${fullName.replace(/\s+/g, '-')}-CV.pdf` },
      preferences: { jobTypes: ['internship', 'remote'], preferredLocations: ['TP.HCM', 'Remote'], willingToRelocate: false },
      stats: { profileViews: 30 + i * 8, applicationsSubmitted: i % 6, projectsPublished: 1 + (i % 3), endorsementsReceived: 4 + i },
      completionPercentage: 82 + (i % 5) * 3,
    });
    studentProfiles.push(student);
  }

  const jobDocs = jobTitles.map(([title, type, category, level, skills], i) => ({
    company: companyProfiles[i % companyProfiles.length]._id,
    title,
    slug: slugify(title, i),
    description: `${title} dành cho sinh viên/kỹ sư trẻ muốn tham gia dự án thật, có mentor và review định kỳ.`,
    responsibilities: ['Tham gia sprint kỹ thuật', 'Viết tài liệu ngắn cho phần mình phụ trách', 'Demo kết quả cuối tuần'],
    requirements: skills.split(', ').map((s) => `Có nền tảng ${s}`),
    type,
    category,
    level,
    location: { city: i % 4 === 0 ? 'Remote' : i % 4 === 1 ? 'TP.HCM' : i % 4 === 2 ? 'Bình Dương' : 'Đồng Nai', country: 'Vietnam', isRemote: type === 'remote' || i % 5 === 0 },
    salary: { min: 3500000 + i * 350000, max: 7000000 + i * 550000, currency: 'VND', isNegotiable: true, isPublic: i % 3 !== 0 },
    requiredSkills: skillDocs(skills).map((s, idx) => ({ name: s.name, level: s.level, importance: idx < 2 ? 'required' : 'preferred' })),
    benefits: ['Mentor kỹ thuật', 'Giấy xác nhận/Offer nếu phù hợp', 'Review portfolio'],
    applicationDeadline: daysAgo(-20 - i),
    numberOfOpenings: 1 + (i % 4),
    status: 'published',
    publishedAt: daysAgo(i + 1),
    views: 80 + i * 13,
    applications: i % 7,
    isFeatured: i < 8,
    isUrgent: i % 6 === 0,
    tags: skills.toLowerCase().split(', '),
  }));
  await Job.insertMany(jobDocs);

  for (let i = 0; i < companyProfiles.length; i += 1) {
    const activeJobs = jobDocs.filter((job) => String(job.company) === String(companyProfiles[i]._id)).length;
    companyProfiles[i].stats.totalJobs = activeJobs;
    companyProfiles[i].stats.activeJobs = activeJobs;
    await companyProfiles[i].save();
  }

  await Project.insertMany(projectSpecs.map(([title, category, type, techs], i) => ({
    student: studentProfiles[i % studentProfiles.length]._id,
    title,
    slug: slugify(title, i),
    description: `${title} là project demo có mô tả bài toán, công nghệ, kết quả và hướng phát triển để doanh nghiệp đánh giá năng lực thực tế của sinh viên.`,
    category,
    type,
    thumbnail: `demo-project-${(i % 8) + 1}.png`,
    demoUrl: 'https://example.com/demo',
    sourceCodeUrl: 'https://github.com/example/project',
    documentUrl: 'https://example.com/docs',
    technologies: techs.split(', ').map((name, idx) => ({ name, category: idx === 0 ? 'language' : idx === 1 ? 'framework' : 'tool' })),
    team: [{ name: `${studentProfiles[i % studentProfiles.length].firstName} ${studentProfiles[i % studentProfiles.length].lastName}`, role: 'Lead', profile: studentProfiles[i % studentProfiles.length]._id }],
    startDate: daysAgo(120 + i),
    endDate: daysAgo(15 + i),
    status: 'completed',
    isAcademic: type === 'academic' || type === 'research',
    course: type === 'academic' ? 'Đồ án chuyên ngành' : undefined,
    semester: 'HK2 2025-2026',
    grade: ['A', 'B+', 'A-'][i % 3],
    achievements: [{ title: 'Demo day', description: 'Trình bày prototype và nhận phản hồi từ mentor/doanh nghiệp.', date: daysAgo(10 + i) }],
    awards: i % 5 === 0 ? ['Top project showcase'] : [],
    views: 90 + i * 21,
    isPublic: true,
    isFeatured: i < 9,
    tags: techs.toLowerCase().split(', '),
  })));

  await NewsArticle.insertMany(newsTitles.map(([title, category, excerpt], i) => ({
    title,
    slug: slugify(title, i),
    excerpt,
    content: `${excerpt}\n\nBài viết minh họa cho UTE Job Platform, tập trung vào dữ liệu nghề nghiệp, Career DNA, project showcase và kết nối doanh nghiệp.\n\nSinh viên nên cập nhật hồ sơ thường xuyên, gắn project có minh chứng và theo dõi skill gap để chuẩn bị tốt hơn cho phỏng vấn.`,
    category,
    tags: [category, 'career-dna', 'ute'],
    readTimeMinutes: 3 + (i % 4),
    isPublished: true,
    publishedAt: daysAgo(i + 1),
  })));

  console.log(`Rich seed OK: ${companies.length} companies, ${students.length} talents, ${jobTitles.length} jobs, ${projectSpecs.length} projects, ${newsTitles.length} news.`);
  await mongoose.disconnect();
}

seedRich().catch((err) => {
  console.error(err);
  process.exit(1);
});
