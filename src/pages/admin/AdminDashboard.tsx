import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart as ChartIcon, 
  Users, 
  FileText, 
  TrendingUp,
  Star,
  UserPlus,
  ScrollText,
  DollarSign
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

const AdminDashboard: React.FC = () => {
  // Sample data - replace with real data from your API
  const userStats = [
    { name: 'Jan', total: 120, premium: 45 },
    { name: 'Feb', total: 180, premium: 65 },
    { name: 'Mar', total: 250, premium: 95 },
    { name: 'Apr', total: 310, premium: 125 },
  ];

  const readingStats = [
    { name: 'Jan', tarot: 450, horoscope: 680, compatibility: 230 },
    { name: 'Feb', tarot: 520, horoscope: 740, compatibility: 280 },
    { name: 'Mar', tarot: 610, horoscope: 820, compatibility: 340 },
    { name: 'Apr', tarot: 680, horoscope: 950, compatibility: 420 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-cinzel font-bold">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <button className="btn btn-outline btn-sm">
            Export Report
          </button>
          <button className="btn btn-accent btn-sm">
            New Blog Post
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            title: 'Total Users', 
            value: '3,120', 
            change: '+12%',
            icon: <Users className="w-5 h-5" />,
            color: 'text-accent'
          },
          { 
            title: 'Premium Users', 
            value: '865', 
            change: '+8%',
            icon: <Star className="w-5 h-5" />,
            color: 'text-amber-500'
          },
          { 
            title: 'Total Readings', 
            value: '15.2K', 
            change: '+24%',
            icon: <ScrollText className="w-5 h-5" />,
            color: 'text-emerald-500'
          },
          { 
            title: 'Revenue', 
            value: '$12,450', 
            change: '+18%',
            icon: <DollarSign className="w-5 h-5" />,
            color: 'text-purple-500'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-surface/50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.color} bg-white/10 p-2 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-emerald-500">{stat.change}</span>
              <span className="text-white/60 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-surface/50 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <ChartIcon className="w-5 h-5 text-accent mr-2" />
            User Growth
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30,30,60,0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="total" name="Total Users" fill="rgba(255,215,0,0.8)" />
                <Bar dataKey="premium" name="Premium Users" fill="rgba(80,200,120,0.8)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reading Types Chart */}
        <div className="bg-surface/50 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <FileText className="w-5 h-5 text-accent mr-2" />
            Reading Analytics
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readingStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30,30,60,0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="tarot" 
                  name="Tarot Readings"
                  stroke="#FFD700" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="horoscope" 
                  name="Horoscope Readings"
                  stroke="#50C878" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="compatibility" 
                  name="Compatibility Checks"
                  stroke="#9F7AEA" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface/50 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="pb-3 text-white/60">User</th>
                <th className="pb-3 text-white/60">Action</th>
                <th className="pb-3 text-white/60">Type</th>
                <th className="pb-3 text-white/60">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { user: 'John Doe', action: 'New Registration', type: 'User', date: '2 mins ago' },
                { user: 'Alice Smith', action: 'Premium Upgrade', type: 'Payment', date: '15 mins ago' },
                { user: 'Bob Wilson', action: 'Tarot Reading', type: 'Reading', date: '1 hour ago' },
                { user: 'Emma Davis', action: 'Compatibility Check', type: 'Reading', date: '2 hours ago' },
              ].map((activity, index) => (
                <tr key={index} className="border-b border-white/5">
                  <td className="py-3">{activity.user}</td>
                  <td className="py-3">{activity.action}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activity.type === 'User' ? 'bg-accent/20 text-accent' :
                      activity.type === 'Payment' ? 'bg-emerald-500/20 text-emerald-500' :
                      'bg-purple-500/20 text-purple-500'
                    }`}>
                      {activity.type}
                    </span>
                  </td>
                  <td className="py-3 text-white/60">{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;