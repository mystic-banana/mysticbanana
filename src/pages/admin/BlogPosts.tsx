import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Clock,
  Tag,
  User,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../../lib/supabase';

const BlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          admin_users (
            id,
            role
          )
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Log the action
      await supabase.from('admin_audit_log').insert({
        action: 'DELETE',
        table_name: 'blog_posts',
        record_id: id,
      });
      
      // Refresh posts
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  const categories = Array.from(new Set(posts.map(post => post.category)));
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-cinzel font-bold">Blog Posts</h1>
        <a href="/admin/blog/new" className="btn btn-accent btn-sm flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </a>
      </div>
      
      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input pr-10 appearance-none"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
            </div>
            
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input pr-10 appearance-none"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Posts List */}
      <div className="bg-surface/50 rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center p-8">
            <FileText className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">No posts found</h3>
            <p className="text-white/60">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Create your first blog post to get started'}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-background/40">
                <th className="py-3 px-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Title</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Category</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Author</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Date</th>
                <th className="py-3 px-4 text-center text-xs font-medium text-white/60 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-white/5">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-white/60 text-sm truncate max-w-xs">
                        {post.excerpt || post.content.substring(0, 100)}...
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-white">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'published' ? 'bg-success/20 text-success' :
                      post.status === 'draft' ? 'bg-warning/20 text-warning' :
                      'bg-white/20 text-white'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-white/60" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">Admin User</div>
                        <div className="text-xs text-white/60">{post.admin_users?.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-white/60">
                    {format(new Date(post.created_at), 'MMM d, yyyy')}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4 text-white/60" />
                      </button>
                      <button 
                        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4 text-white/60" />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-error" />
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

export default BlogPosts;