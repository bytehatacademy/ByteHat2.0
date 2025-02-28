import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { toastService } from "../components/ToastContainer";
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  status: string;
  image: string;
}

const Admin = () => {
  // State for blogs and courses
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State for editing
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Admin credentials (in a real app, this would be handled securely on a server)
  const adminUsername = "admin";
  const adminPassword = "bytehat2025"; // Change this to something secure

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedBlogs = localStorage.getItem('bytehat_blogs');
    const storedCourses = localStorage.getItem('bytehat_courses');

    // If no data in localStorage, load from hardcoded data
    if (!storedBlogs) {
      // Import from BlogPost.tsx
      import('../pages/BlogPost').then((module) => {
        const initialBlogs = module.default.blogPosts || [];
        // Add IDs if they don't exist
        const blogsWithIds = initialBlogs.map((blog: any, index: number) => ({
          ...blog,
          id: blog.id || `blog-${index + 1}`
        }));
        setBlogs(blogsWithIds);
        localStorage.setItem('bytehat_blogs', JSON.stringify(blogsWithIds));
      }).catch(err => {
        console.error("Error loading blogs:", err);
        setBlogs([]);
      });
    } else {
      setBlogs(JSON.parse(storedBlogs));
    }

    if (!storedCourses) {
      // Import from Courses.tsx
      import('../pages/Courses').then((module) => {
        const initialCourses = module.default.courses || [];
        // Add IDs if they don't exist
        const coursesWithIds = initialCourses.map((course: any, index: number) => ({
          ...course,
          id: course.id || `course-${index + 1}`
        }));
        setCourses(coursesWithIds);
        localStorage.setItem('bytehat_courses', JSON.stringify(coursesWithIds));
      }).catch(err => {
        console.error("Error loading courses:", err);
        setCourses([]);
      });
    } else {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  // Handle authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (username === adminUsername && password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('bytehat_admin_auth', 'true');
    } else {
      toastService.show('Invalid credentials', { type: 'error' });
    }
  };

  // Save blogs to localStorage
  const saveBlogs = (updatedBlogs: Blog[]) => {
    localStorage.setItem('bytehat_blogs', JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
  };

  // Save courses to localStorage
  const saveCourses = (updatedCourses: Course[]) => {
    localStorage.setItem('bytehat_courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
  };

  // Add a new blog
  const addBlog = () => {
    const newBlog: Blog = {
      id: `blog-${Date.now()}`,
      title: 'New Blog Post',
      excerpt: 'Enter excerpt here...',
      content: '<p>Enter content here...</p>',
      author: 'Your Name',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80',
      category: 'Category',
      slug: `new-blog-post-${Date.now()}`
    };

    setEditingBlog(newBlog);
  };

  // Add a new course
  const addCourse = () => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: 'New Course',
      description: 'Enter description here...',
      duration: '8 weeks',
      level: 'Beginner',
      status: 'Enroll Now',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80'
    };

    setEditingCourse(newCourse);
  };

  // Update blog
  const updateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const updatedBlog: Blog = {
      ...editingBlog,
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      author: formData.get('author') as string,
      date: formData.get('date') as string,
      image: formData.get('image') as string,
      category: formData.get('category') as string,
      slug: formData.get('slug') as string
    };

    const existingIndex = blogs.findIndex(blog => blog.id === updatedBlog.id);
    let updatedBlogs;

    if (existingIndex >= 0) {
      updatedBlogs = [...blogs];
      updatedBlogs[existingIndex] = updatedBlog;
    } else {
      updatedBlogs = [...blogs, updatedBlog];
    }

    saveBlogs(updatedBlogs);
    setEditingBlog(null);
    toastService.show('Blog saved successfully!', { type: 'success' });
  };

  // Update course
  const updateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const updatedCourse: Course = {
      ...editingCourse,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      duration: formData.get('duration') as string,
      level: formData.get('level') as string,
      status: formData.get('status') as string,
      image: formData.get('image') as string
    };

    const existingIndex = courses.findIndex(course => course.id === updatedCourse.id);
    let updatedCourses;

    if (existingIndex >= 0) {
      updatedCourses = [...courses];
      updatedCourses[existingIndex] = updatedCourse;
    } else {
      updatedCourses = [...courses, updatedCourse];
    }

    saveCourses(updatedCourses);
    setEditingCourse(null);
    toastService.show('Course saved successfully!', { type: 'success' });
  };

  // Delete blog
  const deleteBlog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const updatedBlogs = blogs.filter(blog => blog.id !== id);
      saveBlogs(updatedBlogs);
      toastService.show('Blog deleted successfully!', { type: 'success' });
    }
  };

  // Delete course
  const deleteCourse = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const updatedCourses = courses.filter(course => course.id !== id);
      saveCourses(updatedCourses);
      toastService.show('Course deleted successfully!', { type: 'success' });
    }
  };

  // Edit blog
  const editBlog = (blog: Blog) => {
    setEditingBlog(blog);
  };

  // Edit course
  const editCourse = (course: Course) => {
    setEditingCourse(course);
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-20 pb-16 bg-gray-900">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | ByteHat Academy</title>
      </Helmet>

      <div className="pt-20 pb-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button 
              onClick={() => {
                setIsAuthenticated(false);
                localStorage.removeItem('bytehat_admin_auth');
              }}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>

          <Tabs defaultValue="blogs" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
            </TabsList>

            {/* Blog Posts Tab */}
            <TabsContent value="blogs">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Blog Posts</h2>
                <button onClick={addBlog} className="btn-primary flex items-center">
                  <Plus className="h-4 w-4 mr-2" /> Add New Blog
                </button>
              </div>

              {/* Blog Editor */}
              {editingBlog && (
                <div className="card mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">
                      {editingBlog.id.includes('new') ? 'Create New Blog' : 'Edit Blog'}
                    </h3>
                    <button onClick={() => setEditingBlog(null)} className="text-gray-400 hover:text-white">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <form onSubmit={updateBlog} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={editingBlog.title}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
                      <input
                        type="text"
                        name="slug"
                        defaultValue={editingBlog.slug}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                        <input
                          type="text"
                          name="category"
                          defaultValue={editingBlog.category}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
                        <input
                          type="text"
                          name="author"
                          defaultValue={editingBlog.author}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                        <input
                          type="text"
                          name="date"
                          defaultValue={editingBlog.date}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                      <input
                        type="text"
                        name="image"
                        defaultValue={editingBlog.image}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                      <textarea
                        name="excerpt"
                        defaultValue={editingBlog.excerpt}
                        rows={2}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Content (HTML)</label>
                      <textarea
                        name="content"
                        defaultValue={editingBlog.content}
                        rows={10}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
                        required
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="btn-primary flex items-center">
                        <Save className="h-4 w-4 mr-2" /> Save Blog
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Blog List */}
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div key={blog.id} className="card flex flex-col md:flex-row gap-4">
                    <div 
                      className="w-full md:w-1/4 h-32 bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: `url(${blog.image})` }}
                    ></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        {blog.category} • {blog.date} • {blog.author}
                      </p>
                      <p className="text-gray-300 mb-4 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editBlog(blog)}
                          className="btn-secondary flex items-center"
                        >
                          <Pencil className="h-4 w-4 mr-2" /> Edit
                        </button>
                        <button
                          onClick={() => deleteBlog(blog.id)}
                          className="btn-danger flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Courses</h2>
                <button onClick={addCourse} className="btn-primary flex items-center">
                  <Plus className="h-4 w-4 mr-2" /> Add New Course
                </button>
              </div>

              {/* Course Editor */}
              {editingCourse && (
                <div className="card mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">
                      {editingCourse.id.includes('new') ? 'Create New Course' : 'Edit Course'}
                    </h3>
                    <button onClick={() => setEditingCourse(null)} className="text-gray-400 hover:text-white">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <form onSubmit={updateCourse} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={editingCourse.title}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                        <input
                          type="text"
                          name="duration"
                          defaultValue={editingCourse.duration}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
                        <input
                          type="text"
                          name="level"
                          defaultValue={editingCourse.level}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                        <input
                          type="text"
                          name="status"
                          defaultValue={editingCourse.status}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                      <input
                        type="text"
                        name="image"
                        defaultValue={editingCourse.image}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                      <textarea
                        name="description"
                        defaultValue={editingCourse.description}
                        rows={4}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="btn-primary flex items-center">
                        <Save className="h-4 w-4 mr-2" /> Save Course
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Courses List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className="card">
                    <div className="flex gap-4 mb-4">
                      <div 
                        className="w-24 h-24 bg-cover bg-center rounded-lg"
                        style={{ backgroundImage: `url(${course.image})` }}
                      ></div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        <p className="text-sm text-gray-400">
                          {course.duration} • {course.level} • {course.status}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editCourse(course)}
                        className="btn-secondary flex items-center"
                      >
                        <Pencil className="h-4 w-4 mr-2" /> Edit
                      </button>
                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="btn-danger flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Admin;