import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Clock, Tag, Heart, MessageCircle, Share2, ChevronRight, TrendingUp, BookOpen, Filter } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Building Modern Web Applications with Next.js 14",
    excerpt: "Explore the latest features in Next.js 14 and how they can revolutionize your development workflow with app router, server components, and more.",
    content: "Next.js 14 introduces groundbreaking features that make web development more efficient and powerful. The new App Router provides better performance and developer experience with nested layouts, loading states, and error boundaries built-in. Server Components allow you to render components on the server, reducing client-side JavaScript and improving performance...",
    author: "Sarah Chen",
    authorAvatar: "SC",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Development",
    tags: ["Next.js", "React", "Web Development"],
    likes: 124,
    comments: 23,
    featured: true,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "The Future of AI in Web Development",
    excerpt: "How artificial intelligence is transforming the way we build, test, and deploy web applications in 2024 and beyond.",
    content: "Artificial Intelligence is reshaping web development in unprecedented ways. From automated code generation to intelligent testing frameworks, AI tools are becoming essential for modern developers. This transformation isn't just about productivity—it's about fundamentally changing how we approach problem-solving in software development...",
    author: "Michael Rodriguez",
    authorAvatar: "MR",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "AI & Technology",
    tags: ["AI", "Machine Learning", "Future Tech"],
    likes: 89,
    comments: 15,
    featured: false,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Mastering TypeScript: Advanced Patterns and Best Practices",
    excerpt: "Deep dive into advanced TypeScript patterns that will make your code more robust, maintainable, and type-safe.",
    content: "TypeScript has evolved significantly, offering powerful features that go beyond basic type annotations. Advanced patterns like conditional types, mapped types, and template literal types can transform how you structure your applications. Understanding these concepts is crucial for building scalable, enterprise-grade applications...",
    author: "Emma Thompson",
    authorAvatar: "ET",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Development",
    tags: ["TypeScript", "Programming", "Best Practices"],
    likes: 156,
    comments: 31,
    featured: true,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop"
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt: "A comprehensive guide to choosing between CSS Grid and Flexbox for your layout needs with practical examples.",
    content: "Both CSS Grid and Flexbox are powerful layout systems, but knowing when to use each one can significantly impact your development efficiency and the final result. Grid excels at two-dimensional layouts, while Flexbox is perfect for one-dimensional arrangements. Understanding their strengths helps you make better architectural decisions...",
    author: "David Park",
    authorAvatar: "DP",
    date: "2024-01-08",
    readTime: "5 min read",
    category: "CSS & Design",
    tags: ["CSS", "Layout", "Design"],
    likes: 78,
    comments: 12,
    featured: false,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Building Accessible Web Applications",
    excerpt: "Essential techniques and tools for creating inclusive web experiences that work for everyone.",
    content: "Web accessibility isn't just a legal requirement—it's a moral imperative and good business practice. Building accessible applications ensures that people with disabilities can use your products effectively. This involves semantic HTML, proper ARIA attributes, keyboard navigation, and color contrast considerations...",
    author: "Lisa Wang",
    authorAvatar: "LW",
    date: "2024-01-05",
    readTime: "9 min read",
    category: "Accessibility",
    tags: ["Accessibility", "UX", "Inclusive Design"],
    likes: 92,
    comments: 18,
    featured: false,
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop"
  },
  {
    id: 6,
    title: "React Performance Optimization Techniques",
    excerpt: "Proven strategies to make your React applications faster and more efficient with practical code examples.",
    content: "React applications can become slow without proper optimization. Key techniques include memoization with React.memo, useMemo, and useCallback, code splitting with lazy loading, virtual scrolling for large lists, and proper state management. These optimizations can dramatically improve user experience...",
    author: "James Wilson",
    authorAvatar: "JW",
    date: "2024-01-03",
    readTime: "11 min read",
    category: "Development",
    tags: ["React", "Performance", "Optimization"],
    likes: 143,
    comments: 27,
    featured: true,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
  }
];

const categories = ["All", "Development", "AI & Technology", "CSS & Design", "Accessibility"];

export default function BlogPlatform() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const trendingPosts = [...blogPosts].sort((a, b) => b.likes - a.likes).slice(0, 3);

  const handleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              ← Back to Blog
            </button>
          </div>
        </header>

        <article className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-64 md:h-96 overflow-hidden">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  {selectedPost.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedPost.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedPost.readTime}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {selectedPost.authorAvatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedPost.author}</p>
                  <p className="text-gray-600 text-sm">Full-stack Developer</p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-8 font-light">
                  {selectedPost.excerpt}
                </p>
                <div className="text-gray-800 leading-relaxed space-y-6">
                  {selectedPost.content.split('. ').map((sentence, index) => (
                    <p key={index} className="mb-4">
                      {sentence}{sentence.length > 0 && !sentence.endsWith('.') ? '.' : ''}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleLike(selectedPost.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        likedPosts.has(selectedPost.id)
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedPosts.has(selectedPost.id) ? 'fill-current' : ''}`} />
                      {selectedPost.likes + (likedPosts.has(selectedPost.id) ? 1 : 0)}
                    </button>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessageCircle className="w-5 h-5" />
                      {selectedPost.comments}
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DevBlog
              </h1>
            </div>
            
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore cutting-edge web development, AI innovations, and design trends from industry experts.
          </p>
        </div>

        {/* Featured Posts */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Featured Articles
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map(post => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                onClick={() => setSelectedPost(post)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {post.authorAvatar}
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-900">Categories</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="space-y-6">
              {filteredPosts.map(post => (
                <article
                  key={post.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {post.authorAvatar}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{post.author}</p>
                            <p className="text-gray-500 text-sm">Developer</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(post.id);
                            }}
                            className={`flex items-center gap-1 hover:text-red-500 transition-colors ${
                              likedPosts.has(post.id) ? 'text-red-500' : ''
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                            {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                          </button>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {post.comments}
                          </span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending Posts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Trending
              </h3>
              <div className="space-y-4">
                {trendingPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="flex gap-3 cursor-pointer group"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Heart className="w-3 h-3" />
                        {post.likes}
                        <MessageCircle className="w-3 h-3" />
                        {post.comments}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-blue-100 mb-4 text-sm">Get the latest articles delivered to your inbox.</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-green-500" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'AI', 'CSS', 'JavaScript', 'Web Development', 'UI/UX'].map(tag => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}