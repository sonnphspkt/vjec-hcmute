import { prisma } from './prisma'

export async function mockPayment(
  jobPostId: string,
  amount: number
): Promise<"SUCCESS" | "FAILED"> {
  // Tạo payment record với status PENDING
  await prisma.payment.create({
    data: {
      jobPostId,
      amount,
      status: 'PENDING'
    }
  })

  // Giả lập thanh toán thành công sau 1s (90% thành công)
  return new Promise((resolve) => {
    setTimeout(async () => {
      const success = Math.random() > 0.1 // 90% success rate
      const status = success ? "SUCCESS" : "FAILED"
      
      // Cập nhật payment status
      await prisma.payment.updateMany({
        where: { jobPostId },
        data: { status }
      })
      
      resolve(status)
    }, 1000)
  })
}

export async function getPaymentHistory(employerId: string) {
  return await prisma.payment.findMany({
    where: {
      jobPost: {
        employerId
      }
    },
    include: {
      jobPost: {
        select: {
          title: true,
          createdAt: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
} 