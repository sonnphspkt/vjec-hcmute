import { PrismaClient, Role } from '@prisma/client'
import { hashPassword } from '../src/lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Bắt đầu seed database...')

  // Tạo Admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@vjec.edu.vn' },
    update: {},
    create: {
      email: 'admin@vjec.edu.vn',
      password: await hashPassword('admin123'),
      fullName: 'Administrator VJEC',
      role: Role.ADMIN,
    },
  })
  console.log('✅ Tạo admin user:', adminUser.email)

  // Tạo Employer user
  const employerUser = await prisma.user.upsert({
    where: { email: 'employer@company.com' },
    update: {},
    create: {
      email: 'employer@company.com',
      password: await hashPassword('employer123'),
      fullName: 'Nguyễn Văn Tuyển Dụng',
      role: Role.EMPLOYER,
    },
  })
  console.log('✅ Tạo employer user:', employerUser.email)

  // Tạo Employer Profile
  await prisma.employerProfile.upsert({
    where: { userId: employerUser.id },
    update: {},
    create: {
      userId: employerUser.id,
      company: 'Công ty TNHH Công nghệ ABC',
      verified: true,
    },
  })
  console.log('✅ Tạo employer profile cho:', employerUser.email)

  // Tạo Student user
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@student.com' },
    update: {},
    create: {
      email: 'student@student.com',
      password: await hashPassword('student123'),
      fullName: 'Trần Thị Sinh Viên',
      role: Role.STUDENT,
    },
  })
  console.log('✅ Tạo student user:', studentUser.email)

  // Tạo Student Profile
  await prisma.studentProfile.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      major: 'Kỹ thuật phần mềm',
      skills: JSON.stringify(['JavaScript', 'TypeScript', 'React', 'Node.js']),
      resumeUrl: null,
    },
  })
  console.log('✅ Tạo student profile cho:', studentUser.email)

  // Tạo một số job posts mẫu
  const jobPost1 = await prisma.jobPost.create({
    data: {
      title: 'Frontend Developer',
      description: 'Tuyển dụng Frontend Developer có kinh nghiệm React/Next.js',
      salary: '15-25 triệu VND',
      country: 'Vietnam',
      jobType: 'FULLTIME',
      category: 'Công nghệ thông tin',
      skills: JSON.stringify(['React', 'TypeScript', 'CSS', 'JavaScript']),
      employerId: (await prisma.employerProfile.findUnique({
        where: { userId: employerUser.id }
      }))!.id,
      approved: false, // Chưa được duyệt - để admin duyệt
    },
  })
  console.log('✅ Tạo job post:', jobPost1.title)

  const jobPost2 = await prisma.jobPost.create({
    data: {
      title: 'Backend Developer - Nhật Bản',
      description: 'Cơ hội làm việc tại Nhật Bản cho Backend Developer Java/Spring Boot',
      salary: '2000-3000 USD',
      country: 'Japan',
      jobType: 'FULLTIME',
      category: 'Công nghệ thông tin',
      skills: JSON.stringify(['Java', 'Spring Boot', 'MySQL', 'Docker']),
      employerId: (await prisma.employerProfile.findUnique({
        where: { userId: employerUser.id }
      }))!.id,
      approved: true, // Đã được duyệt
    },
  })
  console.log('✅ Tạo job post:', jobPost2.title)

  console.log('🎉 Seed database hoàn thành!')
  console.log('\n📋 Thông tin đăng nhập:')
  console.log('👑 Admin: admin@vjec.edu.vn / admin123')
  console.log('🏢 Employer: employer@company.com / employer123') 
  console.log('🎓 Student: student@student.com / student123')
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 