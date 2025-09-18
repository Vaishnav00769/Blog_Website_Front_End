import React, { useState, useEffect } from 'react';
import { User, PenTool, LogOut, Plus, Trash2, Edit3, Menu, X } from 'lucide-react';

const API_BASE = 'https://blog-website-back-end.onrender.com';

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [currentView, setCurrentView] = useState('blogs');
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile();
      fetchBlogs();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE}/blogs`);
      const blogsData = await response.json();
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCurrentView('blogs');
    setMobileMenuOpen(false);
  };

  const handleNavClick = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  if (!user) {
    return <AuthComponent onLogin={setUser} onBlogsUpdate={fetchBlogs} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <PenTool className="text-indigo-600" size={28} />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">BlogSpace</h1>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setCurrentView('blogs')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'blogs'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                All Blogs
              </button>
              <button
                onClick={() => setCurrentView('create')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'create'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Write Blog
              </button>
              <button
                onClick={() => setCurrentView('profile')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'profile'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                My Profile
              </button>
            </nav>

            {/* Desktop User info + Logout */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User size={20} className="text-gray-500" />
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="space-y-2">
                <button
                  onClick={() => handleNavClick('blogs')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'blogs'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  All Blogs
                </button>
                <button
                  onClick={() => handleNavClick('create')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'create'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  Write Blog
                </button>
                <button
                  onClick={() => handleNavClick('profile')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'profile'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  My Profile
                </button>
                
                {/* Mobile User info */}
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg mt-4">
                  <User size={20} className="text-gray-500" />
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </div>
                
                {/* Mobile Logout */}
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-2 text-left px-4 py-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {currentView === 'blogs' && (
          <BlogsList blogs={blogs} onBlogsUpdate={fetchBlogs} currentUser={user} />
        )}
        {currentView === 'create' && (
          <CreateBlog onBlogsUpdate={fetchBlogs} onViewChange={setCurrentView} />
        )}
        {currentView === 'profile' && <Profile user={user} />}
      </main>
    </div>
  );
}

function AuthComponent({ onLogin, onBlogsUpdate }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login
        const formDataObj = new FormData();
        formDataObj.append('username', formData.email);
        formDataObj.append('password', formData.password);

        const response = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          body: formDataObj
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.access_token);
          
          // Fetch user profile
          const profileResponse = await fetch(`${API_BASE}/me`, {
            headers: { 'Authorization': `Bearer ${data.access_token}` }
          });
          const userData = await profileResponse.json();
          onLogin(userData);
          onBlogsUpdate();
        } else {
          setError('Invalid credentials');
        }
      } else {
        // Signup
        const response = await fetch(`${API_BASE}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setIsLogin(true);
          setError('Account created! Please login.');
          setFormData({ email: '', password: '', name: '' });
        } else {
          const errorData = await response.json();
          setError(errorData.detail || 'Signup failed');
        }
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <PenTool className="mx-auto text-indigo-600 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-gray-900">BlogSpace</h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Welcome back!' : 'Join our community'}
          </p>
        </div>

        <div className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ email: '', password: '', name: '' });
            }}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BlogsList({ blogs, onBlogsUpdate, currentUser }) {
  const deleteBlog = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        onBlogsUpdate();
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Latest Blogs</h2>
        <div className="text-gray-600">{blogs.length} posts</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <article key={blog.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h3>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>By {blog.author?.name || 'Anonymous'}</span>
                </div>
              </div>
              
              {blog.author_id === currentUser.id && (
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                  title="Delete blog"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
            
            <div className="text-gray-700 leading-relaxed">
              {blog.content.length > 200 
                ? `${blog.content.substring(0, 200)}...` 
                : blog.content
              }
            </div>
          </article>
        ))}

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <PenTool size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No blogs yet. Be the first to write one!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CreateBlog({ onBlogsUpdate, onViewChange }) {
  const [blogData, setBlogData] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(blogData)
      });

      if (response.ok) {
        setBlogData({ title: '', content: '' });
        onBlogsUpdate();
        onViewChange('blogs');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border p-8">
        <div className="flex items-center space-x-3 mb-8">
          <Edit3 className="text-indigo-600" size={28} />
          <h2 className="text-3xl font-bold text-gray-900">Write New Blog</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={blogData.title}
              onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
              placeholder="Enter your blog title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={blogData.content}
              onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
              rows="15"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="Write your blog content here..."
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Blog'}
            </button>
            <button
              onClick={() => onViewChange('blogs')}
              className="w-full sm:w-auto bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Profile({ user }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="bg-indigo-100 p-4 rounded-full">
            <User size={32} className="text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
            <p className="text-gray-600">Manage your account information</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <div className="px-4 py-3 bg-gray-50 border rounded-lg text-gray-900">
              {user.name}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="px-4 py-3 bg-gray-50 border rounded-lg text-gray-900">
              {user.email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
            <div className="px-4 py-3 bg-gray-50 border rounded-lg text-gray-500 font-mono text-sm">
              #{user.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;