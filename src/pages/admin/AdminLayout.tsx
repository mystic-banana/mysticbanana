import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import { 
  Settings, 
  Users, 
  FileText, 
  BarChart, 
  Shield, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, logout } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();

  // Check if user is admin
  const isAdmin = user?.role === 'admin' || user?.role === 'editor';

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <BarChart className="w-5 h-5" /> },
    { path: '/admin/users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { path: '/admin/blog', label: 'Blog Posts', icon: <FileText className="w-5 h-5" /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full bg-surface/95 backdrop-blur-lg w-64 border-r border-white/10 transform transition-transform duration-300 z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-accent" />
              <span className="ml-2 font-cinzel font-bold">Admin Panel</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-accent/20 text-accent'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-8 border-t border-white/10">
            <button
              onClick={logout}
              className="flex items-center space-x-3 px-4 py-2 w-full text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top Bar */}
        <div className="bg-surface/50 backdrop-blur-md border-b border-white/10">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white/60 hover:text-white lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-white/60">Logged in as </span>
                <span className="text-white font-medium">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;