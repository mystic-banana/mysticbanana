import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Save,
  ArrowLeft,
  Eye,
  Tag,
  Calendar,
  Globe,
  FileText,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../../lib/supabase';

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  seo_title: string;
  seo_description: string;
  published_at: string | null;
}

const BlogEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [post, setPost] = useState<BlogPost>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    status: 'draft',
    seo_title: '',
    seo_description: '',
    published_at: null
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  
  useEffect(() => {
    if (isEditing) {
      fetchPost();
    }
  }, [id]);
  
  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      if (data) setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setPost(prev => ({ ...prev, tags }));
  };
  
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setPost(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      seo_title: prev.seo_title || title
    }));
  };
  
  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      
      const { title, content, category } = post;
      if (!title || !content || !category) {
        setError('Title, content, and category are required');
        return;
      }
      
      const postData = {
        ...post,
        updated_at: new Date().toISOString()
      };
      
      if (isEditing) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);
          
        if (error) throw error;
      }
      
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      setError('Failed to save post');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/admin/blog')}
            className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-cinzel font-bold">
            {isEditing ? 'Edit Post' : 'New Post'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn btn-outline btn-sm"
          >
            <Eye className="mr-2 h-4 w-4" />
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-accent btn-sm"
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-error/20 text-white border border-error/30 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-white/80 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={post.title}
                  onChange={handleTitleChange}
                  className="input w-full"
                  placeholder="Enter post title"
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-white/80 mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={post.content}
                  onChange={handleChange}
                  rows={12}
                  className="input w-full"
                  placeholder="Write your post content..."
                />
              </div>
              
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-white/80 mb-1">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={post.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="input w-full"
                  placeholder="Write a brief excerpt..."
                />
              </div>
            </div>
          </div>
          
          {/* SEO Settings */}
          <div className="card">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <Globe className="mr-2 h-5 w-5 text-accent" />
              SEO Settings
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-white/80 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={post.slug}
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="post-url-slug"
                />
              </div>
              
              <div>
                <label htmlFor="seo_title" className="block text-sm font-medium text-white/80 mb-1">
                  SEO Title
                </label>
                <input
                  type="text"
                  id="seo_title"
                  name="seo_title"
                  value={post.seo_title}
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="SEO optimized title"
                />
              </div>
              
              <div>
                <label htmlFor="seo_description" className="block text-sm font-medium text-white/80 mb-1">
                  SEO Description
                </label>
                <textarea
                  id="seo_description"
                  name="seo_description"
                  value={post.seo_description}
                  onChange={handleChange}
                  rows={3}
                  className="input w-full"
                  placeholder="Meta description for search engines..."
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Post Settings */}
          <div className="card">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-accent" />
              Post Settings
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-white/80 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={post.status}
                  onChange={handleChange}
                  className="input w-full"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-white/80 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={post.category}
                  onChange={handleChange}
                  className="input w-full"
                >
                  <option value="">Select category</option>
                  <option value="Horoscope">Horoscope</option>
                  <option value="Tarot">Tarot</option>
                  <option value="Astrology">Astrology</option>
                  <option value="Numerology">Numerology</option>
                  <option value="Love & Relationships">Love & Relationships</option>
                  <option value="Spiritual Growth">Spiritual Growth</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-white/80 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  value={post.tags.join(', ')}
                  onChange={handleTagsChange}
                  className="input w-full"
                  placeholder="Enter tags, separated by commas"
                />
              </div>
              
              {post.status === 'published' && (
                <div>
                  <label htmlFor="published_at" className="block text-sm font-medium text-white/80 mb-1">
                    Publish Date
                  </label>
                  <input
                    type="datetime-local"
                    id="published_at"
                    name="published_at"
                    value={post.published_at || ''}
                    onChange={handleChange}
                    className="input w-full"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Featured Image - Coming Soon */}
          <div className="card opacity-60">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <ImageIcon className="mr-2 h-5 w-5 text-accent" />
              Featured Image
            </h2>
            
            <div className="text-center p-6 border-2 border-dashed border-white/20 rounded-lg">
              <ImageIcon className="h-12 w-12 text-white/40 mx-auto mb-2" />
              <p className="text-white/60">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;