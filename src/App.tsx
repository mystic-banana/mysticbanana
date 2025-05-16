import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import TarotPage from './pages/TarotPage';
import HoroscopePage from './pages/HoroscopePage';
import CompatibilityPage from './pages/CompatibilityPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Import admin pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogPosts from './pages/admin/BlogPosts';
import BlogEditor from './pages/admin/BlogEditor';
import Users from './pages/admin/Users';

// Import context providers
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tarot" element={<TarotPage />} />
            <Route path="/horoscope" element={<HoroscopePage />} />
            <Route path="/compatibility" element={<CompatibilityPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="blog" element={<BlogPosts />} />
              <Route path="blog/new" element={<BlogEditor />} />
              <Route path="blog/edit/:id" element={<BlogEditor />} />
              <Route path="users" element={<Users />} />
            </Route>
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;