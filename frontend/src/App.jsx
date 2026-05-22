import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import StudentProjects from './pages/student/Projects';
import StudentApplications from './pages/student/Applications';
import JobsPage from './pages/jobs/JobsPage';
import JobDetailPage from './pages/jobs/JobDetailPage';
import ProjectsShowcase from './pages/projects/ProjectsShowcase';
import ProjectDetailPage from './pages/projects/ProjectDetailPage';
import CompanyDashboard from './pages/company/Dashboard';
import CompanyJobs from './pages/company/Jobs';
import CompanyCandidates from './pages/company/Candidates';
import CompanyAnalytics from './pages/company/Analytics';
import CompaniesPage from './pages/CompaniesPage';
import NotFound from './pages/NotFound';
import AboutVisionPage from './pages/thesis/AboutVisionPage';
import CareerDnaConceptPage from './pages/thesis/CareerDnaConceptPage';
import AiEnginePage from './pages/thesis/AiEnginePage';
import ShowcaseEcosystemPage from './pages/thesis/ShowcaseEcosystemPage';
import RemoteWorkPage from './pages/thesis/RemoteWorkPage';
import MicroInternshipPage from './pages/thesis/MicroInternshipPage';
import ResearchHubPage from './pages/thesis/ResearchHubPage';
import AcademicNetworkPage from './pages/thesis/AcademicNetworkPage';
import DifferentiationPage from './pages/thesis/DifferentiationPage';
import UniversityAnalyticsPage from './pages/thesis/UniversityAnalyticsPage';
import BusinessModelPage from './pages/thesis/BusinessModelPage';
import Vision2030Page from './pages/thesis/Vision2030Page';
import StrategicConclusionPage from './pages/thesis/StrategicConclusionPage';
import HelpGuidePage from './pages/thesis/HelpGuidePage';
import NewsPage from './pages/news/NewsPage';
import NewsArticlePage from './pages/news/NewsArticlePage';
import TalentPage from './pages/talent/TalentPage';
import TalentDetailPage from './pages/talent/TalentDetailPage';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute';
import DashboardRedirect from './components/DashboardRedirect';
import useAuthStore from './store/authStore';

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  useEffect(() => {
    const init = () => useAuthStore.getState().initialize();
    if (useAuthStore.persist.hasHydrated()) {
      init();
      return undefined;
    }
    return useAuthStore.persist.onFinishHydration(init);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0F1424',
              color: '#E8EAED',
              border: '1px solid rgba(0, 102, 255, 0.3)',
            },
            success: {
              iconTheme: {
                primary: '#00D4FF',
                secondary: '#0F1424',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF3B30',
                secondary: '#0F1424',
              },
            },
          }}
        />
        
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/projects" element={<ProjectsShowcase />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsArticlePage />} />
            <Route path="/talent" element={<TalentPage />} />
            <Route path="/talent/:id" element={<TalentDetailPage />} />
            <Route path="/about" element={<AboutVisionPage />} />
            <Route path="/career-dna" element={<CareerDnaConceptPage />} />
            <Route path="/ai-engine" element={<AiEnginePage />} />
            <Route path="/showcase-ecosystem" element={<ShowcaseEcosystemPage />} />
            <Route path="/remote-work" element={<RemoteWorkPage />} />
            <Route path="/micro-internship" element={<MicroInternshipPage />} />
            <Route path="/research-hub" element={<ResearchHubPage />} />
            <Route path="/network" element={<AcademicNetworkPage />} />
            <Route path="/compare" element={<DifferentiationPage />} />
            <Route path="/university-analytics" element={<UniversityAnalyticsPage />} />
            <Route path="/packages" element={<BusinessModelPage />} />
            <Route path="/vision-2030" element={<Vision2030Page />} />
            <Route path="/strategy-conclusion" element={<StrategicConclusionPage />} />
            <Route path="/help" element={<HelpGuidePage />} />
          </Route>

          <Route path="/ai-matching" element={<Navigate to="/ai-engine" replace />} />

          {/* Alias for bookmarks / reverse proxies expecting /dashboard */}
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* Student Dashboard Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout userType="student" />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="projects" element={<StudentProjects />} />
            <Route path="applications" element={<StudentApplications />} />
            <Route path="saved-jobs" element={<div>Saved Jobs</div>} />
          </Route>

          {/* Company Dashboard Routes */}
          <Route
            path="/company"
            element={
              <ProtectedRoute allowedRoles={['company']}>
                <DashboardLayout userType="company" />
              </ProtectedRoute>
            }
          >
            <Route index element={<CompanyDashboard />} />
            <Route path="jobs" element={<CompanyJobs />} />
            <Route path="candidates" element={<CompanyCandidates />} />
            <Route path="analytics" element={<CompanyAnalytics />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
