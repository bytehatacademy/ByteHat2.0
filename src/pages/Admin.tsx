import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { toastService } from "../components/ToastContainer";
import { Pencil, Trash2, Plus, Save, X, Shield, Lock, Cloud, Code, Terminal, Brain } from 'lucide-react';

interface Blog {
  id: number; // Changed to number for database compatibility
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
  id: number; // Changed to number for database compatibility
  title: string;
  description: string;
  duration: string;
  level: string;
  status: string;
  image: string;
  icon_name: string; // Added icon_name for database storage
  icon: React.ReactNode; // Added icon for display
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

  // Placeholder for database interaction (replace with actual database calls)
  const db = {
    getAllBlogs: async () => { /* Replace with actual database query */ return []; },
    createBlogPost: async (blog: Blog) => { /* Replace with actual database insertion */ console.log("Creating blog:", blog); },
    getAllCourses: async () => { /* Replace with actual database query */ return []; },
    createCourse: async (course: Course) => { /* Replace with actual database insertion */ console.log("Creating course:", course); },
  };


  // Load data from database on component mount
  useEffect(() => {
    const fetchData = async () => {
      try{
        const blogsData = await db.getAllBlogs();
        setBlogs(blogsData);
        const coursesData = await db.getAllCourses();
        const coursesWithIcons = coursesData.map(course => ({
          ...course,
          icon: getIconByName(course.icon_name)
        }));
        setCourses(coursesWithIcons);
      } catch(error) {
        console.error("Error fetching data:", error);
        toastService.show('Error fetching data', { type: 'error' });
      }
    }
    fetchData();

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

  // Add a new blog
  const addBlog = async () => {
    const newBlog: Blog = {
      id: 0, // Placeholder ID, will be assigned by the database
      title: 'New Blog Post',
      excerpt: 'Enter excerpt here...',
      content: '<p>Enter content here...</p>',
      author: 'Your Name',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80',
      category: 'Category',
      slug: `new-blog-post-${Date.now()}`
    };

    try {
      await db.createBlogPost(newBlog);
      toastService.show('Blog saved successfully!', { type: 'success' });
      // Refresh blog list (replace with actual database fetch)
    } catch (error) {
      console.error("Error adding blog:", error);
      toastService.show('Error adding blog', { type: 'error' });
    }

  };

  // Add a new course
  const addCourse = async () => {
    const getIconName = () => {
      switch (editingCourse?.category) {
        case 'Ethical Hacking': return 'Shield';
        case 'Cloud Security': return 'Cloud';
        case 'DevSecOps': return 'Code';
        case 'Advanced': return 'Terminal';
        case 'Specialized': return 'Brain';
        default: return 'Lock';
      }
    };

    const newCourse: Course = {
      id: 0, // Placeholder ID
      title: 'New Course',
      description: 'Enter description here...',
      duration: '8 weeks',
      level: 'Beginner',
      status: 'Enroll Now',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80',
      icon_name: getIconName(),
      icon: getIconByName(getIconName())
    };

    try {
      await db.createCourse(newCourse);
      toastService.show('Course saved successfully!', { type: 'success' });
      // Refresh course list (replace with actual database fetch)
    } catch (error) {
      console.error("Error adding course:", error);
      toastService.show('Error adding course', { type: 'error' });
    }

  };

  // Update blog (replace with actual database update)
  const updateBlog = async (e: React.FormEvent) => {
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

    try{
      //await db.updateBlog(updatedBlog);
      toastService.show('Blog updated successfully!', { type: 'success' });
    } catch (error) {
      console.error("Error updating blog:", error);
      toastService.show('Error updating blog', { type: 'error' });
    }
  };

  // Update course (replace with actual database update)
  const updateCourse = async (e: React.FormEvent) => {
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
      image: formData.get('image') as string,
      icon_name: editingCourse.icon_name // Maintain icon name
    };

    try {
      //await db.updateCourse(updatedCourse);
      toastService.show('Course updated successfully!', { type: 'success' });
    } catch (error) {
      console.error("Error updating course:", error);
      toastService.show('Error updating course', { type: 'error' });
    }

  };

  // Delete blog (replace with actual database deletion)
  const deleteBlog = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        //await db.deleteBlog(id);
        toastService.show('Blog deleted successfully!', { type: 'success' });
        // Refresh blog list
      } catch (error) {
        console.error("Error deleting blog:", error);
        toastService.show('Error deleting blog', { type: 'error' });
      }
    }
  };

  // Delete course (replace with actual database deletion)
  const deleteCourse = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        //await db.deleteCourse(id);
        toastService.show('Course deleted successfully!', { type: 'success' });
        // Refresh course list
      } catch (error) {
        console.error("Error deleting course:", error);
        toastService.show('Error deleting course', { type: 'error' });
      }
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

  const getIconByName = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="h-12 w-12 text-accent" />;
      case 'Lock': return <Lock className="h-12 w-12 text-accent" />;
      case 'Cloud': return <Cloud className="h-12 w-12 text-accent" />;
      case 'Code': return <Code className="h-12 w-12 text-accent" />;
      case 'Terminal': return <Terminal className="h-12 w-12 text-accent" />;
      case 'Brain': return <Brain className="h-12 w-12 text-accent" />;
      default: return <Shield className="h-12 w-12 text-accent" />;
    }
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
                      {editingBlog.id === 0 ? 'Create New Blog' : 'Edit Blog'}
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
                      {editingCourse.id === 0 ? 'Create New Course' : 'Edit Course'}
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
                      <div>
                        {course.icon}
                      </div>
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