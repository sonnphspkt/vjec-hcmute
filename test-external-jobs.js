// Test script for external job import
// Run with: node test-external-jobs.js

const API_BASE = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'http://localhost:3000'

// Demo external jobs data
const demoJobs = {
  TOPCV: [
    {
      title: 'Frontend Developer React',
      description: 'Tuyển dụng Frontend Developer có kinh nghiệm React, Next.js. Làm việc tại TP.HCM, lương 15-25 triệu.',
      salary: '15-25 triệu VND',
      country: 'Vietnam',
      jobType: 'FULLTIME',
      category: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript'],
      externalId: 'topcv-12345',
      originalUrl: 'https://topcv.vn/job/12345',
      employerId: null // Will need real employer ID
    },
    {
      title: 'Backend Developer Node.js',
      description: 'Cần Backend Developer Node.js, Express, MongoDB. Remote work friendly. Lương competitive.',
      salary: '18-30 triệu VND', 
      country: 'Vietnam',
      jobType: 'FULLTIME',
      category: 'Backend',
      skills: ['Node.js', 'Express', 'MongoDB'],
      externalId: 'topcv-12346',
      originalUrl: 'https://topcv.vn/job/12346',
      employerId: null
    }
  ],
  VIETNAMWORKS: [
    {
      title: 'Full-Stack Developer',
      description: 'Tuyển Full-Stack Developer cho startup fintech. Tech stack: React, Node.js, PostgreSQL.',
      salary: '20-35 triệu VND',
      country: 'Vietnam', 
      jobType: 'FULLTIME',
      category: 'Full-stack',
      skills: ['React', 'Node.js', 'PostgreSQL'],
      externalId: 'vnw-98765',
      originalUrl: 'https://vietnamworks.com/job/98765',
      employerId: null
    }
  ],
  INDEED: [
    {
      title: 'DevOps Engineer',
      description: 'Looking for DevOps Engineer with AWS, Docker, Kubernetes experience. Work with international team.',
      salary: '25-40 triệu VND',
      country: 'Vietnam',
      jobType: 'FULLTIME', 
      category: 'DevOps',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      externalId: 'indeed-55555',
      originalUrl: 'https://indeed.com/job/55555',
      employerId: null
    }
  ]
}

async function getFirstEmployerId() {
  try {
    const response = await fetch(`${API_BASE}/api/employers`)
    const data = await response.json()
    
    if (data.employers && data.employers.length > 0) {
      return data.employers[0].id
    }
    
    console.log('❌ No employers found. Creating demo employer...')
    return null
  } catch (error) {
    console.error('Error fetching employers:', error)
    return null
  }
}

async function importJobsForSource(source, jobs) {
  try {
    console.log(`\n🔄 Importing ${jobs.length} jobs from ${source}...`)
    
    const response = await fetch(`${API_BASE}/api/jobs/external`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: source,
        jobs: jobs
      })
    })

    const result = await response.json()
    
    if (response.ok) {
      console.log(`✅ ${source}: ${result.message}`)
      console.log(`   Imported: ${result.imported}/${result.total} jobs`)
    } else {
      console.log(`❌ ${source}: ${result.error}`)
    }
    
    return result
    
  } catch (error) {
    console.error(`❌ ${source} import failed:`, error)
    return { error: error.message }
  }
}

async function testExternalJobsAPI() {
  console.log('🚀 Testing External Jobs API')
  console.log(`API Base: ${API_BASE}`)
  
  // Get first employer ID for demo jobs
  const employerId = await getFirstEmployerId()
  
  if (!employerId) {
    console.log('❌ Cannot import jobs without employer. Please create an employer first.')
    return
  }
  
  console.log(`✅ Using employer ID: ${employerId}`)
  
  // Update all demo jobs with employer ID
  for (const source in demoJobs) {
    demoJobs[source] = demoJobs[source].map(job => ({
      ...job,
      employerId: employerId
    }))
  }
  
  // Import jobs from each source
  const results = {}
  for (const [source, jobs] of Object.entries(demoJobs)) {
    results[source] = await importJobsForSource(source, jobs)
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  // Get stats
  console.log('\n📊 Getting external jobs stats...')
  try {
    const statsResponse = await fetch(`${API_BASE}/api/jobs/external`)
    const stats = await statsResponse.json()
    
    if (statsResponse.ok) {
      console.log('✅ External Jobs Stats:')
      console.log(`   Total External Jobs: ${stats.totalExternalJobs}`)
      console.log('   Source Breakdown:')
      stats.sourceBreakdown.forEach(stat => {
        console.log(`     ${stat.source}: ${stat.count} jobs`)
      })
    } else {
      console.log('❌ Failed to get stats:', stats.error)
    }
  } catch (error) {
    console.error('❌ Stats request failed:', error)
  }
  
  console.log('\n🎉 Test completed!')
  console.log('\n🔗 Admin Dashboard: ${API_BASE}/admin/external-jobs')
}

// Run the test
testExternalJobsAPI().catch(console.error) 