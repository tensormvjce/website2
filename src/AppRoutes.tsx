import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingAnimation from './components/LoadingAnimation';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const Events = lazy(() => import('./pages/Events'));
const Projects = lazy(() => import('./pages/Projects'));
const Teams = lazy(() => import('./pages/Teams'));
const About = lazy(() => import('./pages/About'));
const JoinClub = lazy(() => import('./pages/JoinClub'));
const Login = lazy(() => import('./pages/Login'));

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const EventDetails = lazy(() => import('./pages/EventDetails'));
const BlogDetails = lazy(() => import('./pages/BlogDetails'));
const Posts = lazy(() => import('./pages/Posts'));

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingAnimation onLoadingComplete={() => {}} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetails />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/about" element={<About />} />
          <Route path="/join" element={<JoinClub />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Admin Route */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default AppRoutes;
