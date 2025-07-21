import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Fetch all articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const published = searchParams.get('published')

    const where: any = {}
    
    if (category && category !== 'Tất cả') {
      where.category = category
    }
    
    if (featured === 'true') {
      where.featured = true
    }
    
    if (published !== 'false') {
      where.published = true
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: {
        publishedAt: 'desc'
      }
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

// POST - Create new article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      excerpt, 
      content, 
      image, 
      category, 
      author, 
      featured = false,
      published = false 
    } = body

    // Validation
    if (!title || !excerpt || !content || !category || !author) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const article = await prisma.article.create({
      data: {
        title,
        excerpt,
        content,
        image,
        category,
        author,
        featured,
        published
      }
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
} 