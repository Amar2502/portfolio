"use client"

import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowUpDown } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  views?: number;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch('/api/blog');
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch posts. Status: ${response.status}, Message: ${errorText}`);
        }
        
        const data = await response.json();
        
        // Ensure we're getting the posts from the pagination response
        const posts = data.posts || data;
        
        setPosts(posts);
        
        // Extract unique tags with proper type casting
        const tags = Array.from(new Set(posts.flatMap((post: BlogPost) => post.tags))) as string[];
        setAllTags(tags);
      } catch (error) {
        console.error('Blog posts fetch error:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Use useMemo for performance optimization
  const filteredPosts = useMemo(() => {
    return posts
      .filter(post => {
        const matchesSearch = 
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);
        
        return matchesSearch && matchesTag;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [posts, searchTerm, selectedTag, sortOrder]);

  // Loading Component
  const LoadingComponent = () => (
    <div className="text-center py-10 text-gray-600 dark:text-gray-400">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-block"
      >
        <div className="animate-spin text-4xl mb-4">🌀</div>
        <p>Loading blog posts...</p>
      </motion.div>
    </div>
  );

  // Error Component
  const ErrorComponent = () => (
    <div className="text-center py-10 text-red-600 dark:text-red-400">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-6xl mb-4">😕</div>
        <p className="text-xl">{error || 'Failed to load blog posts'}</p>
      </motion.div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
            Blog Posts
            {filteredPosts.length > 0 && (
              <span className="text-base text-gray-500 ml-4">
                ({filteredPosts.length} posts)
              </span>
            )}
          </h1>

          {/* Rest of your existing code remains the same */}
          
          {loading ? (
            <LoadingComponent />
          ) : error ? (
            <ErrorComponent />
          ) : filteredPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
                >
                  <div className="p-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2">
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString()}
                        </time>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{Math.ceil(post.content.length / 1000)} min read</span>
                      </div>
                      {post.views && (
                        <div className="flex items-center gap-1">
                          👀 {post.views}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post._id}`}
                    className="block px-6 py-3 bg-gray-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    Read More
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-600 dark:text-gray-400">
              No posts found matching your criteria.
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}