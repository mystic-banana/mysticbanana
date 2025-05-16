import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users as UsersIcon,
  Search,
  Filter,
  Star,
  MoreVertical,
  Mail,
  Ban,
  Crown,
  Clock,
  ChevronDown,
  Loader2,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../../lib/supabase';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*, readings(count)')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleBanUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to ban this user?')) return;
    
    try {
      // In a real app, you'd call Supabase Auth API to disable the user
      // For now, we'll just log it
      console.log('Banning user:', userId);
      
      // Log the action
      await supabase.from('admin_audit_log').insert({
        action: 'BAN_USER',
        table_name: 'profiles',
        record_id: userId,
      });
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesSubscription = subscriptionFilter === 'all' || 
                               (subscriptionFilter === 'premium' && user.is_premium) ||
                               (subscriptionFilter === 'free' && !user.is_premium);
    
    return matchesSearch && matchesSubscription;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-cinzel font-bold flex items-center">
            <UsersIcon className="mr-3 h-6 w-6 text-accent" />
            Users
          </h1>
          <p className="text-white/70 mt-1">
            Manage and monitor user accounts
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-sm text-white/60">
            Total Users: <span className="text-white font-medium">{users.length}</span>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <select
                value={subscriptionFilter}
                onChange={(e) => setSubscriptionFilter(e.target.value)}
                className="input pr-10 appearance-none"
              >
                <option value="all">All Users</option>
                <option value="premium">Premium</option>
                <option value="free">Free</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Users List */}
      <div className="bg-surface/50 rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center p-8">
            <User className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">No users found</h3>
            <p className="text-white/60">
              {searchTerm || subscriptionFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'No users have registered yet'}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-background/40">
                <th className="py-3 px-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">User</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Readings</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Joined</th>
                <th className="py-3 px-4 text-center text-xs font-medium text-white/60 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-white/60" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium flex items-center">
                          {user.name || 'Anonymous User'}
                          {user.is_premium && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent">
                              <Crown className="w-3 h-3 mr-1" />
                              Premium
                            </span>
                          )}
                        </div>
                        <div className="text-white/60 text-sm">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/20 text-success">
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <div className="font-medium">{user.readings?.[0]?.count || 0}</div>
                      <div className="text-white/60">Total readings</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <div className="font-medium">
                        {format(new Date(user.created_at), 'MMM d, yyyy')}
                      </div>
                      <div className="text-white/60">
                        {format(new Date(user.created_at), 'h:mm a')}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        title="Send Email"
                      >
                        <Mail className="h-4 w-4 text-white/60" />
                      </button>
                      <button 
                        onClick={() => handleBanUser(user.id)}
                        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        title="Ban User"
                      >
                        <Ban className="h-4 w-4 text-error" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;