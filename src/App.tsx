import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LandingLayout from './layouts/LandingLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/landing/Home';
import ServicesPage from './pages/landing/ServicesPage';
import CaseStudiesPage from './pages/landing/CaseStudiesPage';
import InsightsPage from './pages/landing/InsightsPage';
import NewsDetailPage from './pages/landing/NewsDetailPage';
import ContactPage from './pages/landing/Contact';
import CommunityPage from './pages/landing/CommunityPage';
import Products from './pages/landing/Products';
import Dashboard from './pages/admin/Dashboard';
import LoginAdmin from './pages/admin/LoginAdmin';
import CreateArticle from './pages/admin/CreateArticle';
import EditArticle from './pages/admin/EditArticle';
import { UnderConstruction } from './pages/admin/UnderConstruction';
import ProtectedRoute from './components/ProtectedRoute';
import { useDocumentMeta } from './hooks/useDocumentMeta';
import { ROUTE_PATHS } from './utils/routeConstants';

function App() {
  const location = useLocation();

  // Update document title and meta tags when language changes
  useDocumentMeta();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <Routes>
      {/* Admin Portal Routes */}
      {/*
       * IMPORTANT: /admin/login must be INSIDE ProtectedRoute, not a sibling.
       * React Router v6 matches routes by prefix — if /admin/login is a sibling of
       * /admin (ProtectedRoute), the router matches /admin/* first and redirects
       * /admin/login to itself, creating an infinite loop.
       *
       * By nesting /admin/login as a child of ProtectedRoute, the router first
       * checks the more-specific path /admin/login before the parent catches it.
       * LoginAdmin itself renders without the Outlet so the layout is irrelevant.
       */}
      <Route path={ROUTE_PATHS.admin} element={<ProtectedRoute />}>
        <Route path="login" element={<LoginAdmin />} />
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to={ROUTE_PATHS.adminArticles} replace />} />
          <Route path="articles" element={<Dashboard />} />
          <Route path="articles/create" element={<CreateArticle />} />
          <Route path="articles/edit/:id" element={<EditArticle />} />
          <Route path="scheduled" element={<UnderConstruction />} />
          <Route path="contributors" element={<UnderConstruction />} />
          <Route path="trash" element={<UnderConstruction />} />
          <Route path="settings" element={<UnderConstruction />} />
        </Route>
      </Route>

      {/* Landing Pages Routes */}
      <Route element={<LandingLayout />}>
        {/* Home Route */}
        <Route path={ROUTE_PATHS.home.vi} element={<Home />} />
        <Route path={ROUTE_PATHS.home.en} element={<Home />} />

        {/* Services Routes */}
        <Route path={ROUTE_PATHS.services.vi} element={<ServicesPage />} />
        <Route path={ROUTE_PATHS.services.en} element={<ServicesPage />} />

        {/* Case Studies Routes */}
        <Route path={ROUTE_PATHS.caseStudies.vi} element={<CaseStudiesPage />} />
        <Route path={ROUTE_PATHS.caseStudies.en} element={<CaseStudiesPage />} />

        {/* Insights/News Routes */}
        <Route path={ROUTE_PATHS.news.vi} element={<InsightsPage />} />
        <Route path={ROUTE_PATHS.news.en} element={<InsightsPage />} />
        <Route path={ROUTE_PATHS.newsDetail.vi} element={<NewsDetailPage />} />
        <Route path={ROUTE_PATHS.newsDetail.en} element={<NewsDetailPage />} />

        {/* Contact Routes */}
        <Route path={ROUTE_PATHS.contact.vi} element={<ContactPage />} />
        <Route path={ROUTE_PATHS.contact.en} element={<ContactPage />} />

        {/* Community Routes */}
        <Route path={ROUTE_PATHS.community.vi} element={<CommunityPage />} />
        <Route path={ROUTE_PATHS.community.en} element={<CommunityPage />} />

        {/* Products Routes */}
        <Route path={ROUTE_PATHS.products.vi} element={<Products />} />
        <Route path={ROUTE_PATHS.products.en} element={<Products />} />
      </Route>
    </Routes>
  );
}

export default App;
