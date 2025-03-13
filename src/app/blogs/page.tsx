"use client"

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Search, ArrowUpDown, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Define TypeScript interfaces
interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  views?: number;
  coverImage?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      // Simulate loading progress
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        // Build the URL with search parameters
        let url = '/api/blog';
        const searchParams = new URLSearchParams();
        
        if (selectedTag) {
          searchParams.append('tag', selectedTag);
        }
        
        if (searchTerm) {
          searchParams.append('search', searchTerm);
        }
        
        searchParams.append('order', sortOrder);
        
        if (searchParams.toString()) {
          url += `?${searchParams.toString()}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch posts. Status: ${response.status}, Message: ${errorText}`);
        }
        
        let data = await response.json();
        
        // If the response is not an array, try to extract posts from it
        if (!Array.isArray(data)) {
          data = data.posts || [];
        }
        
        setPosts(data);
      } catch (error) {
        console.error('Blog posts fetch error:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [selectedTag, sortOrder]);

  // Use debounce for search term to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== "") {
        // If user has typed a search term, fetch filtered posts
        async function searchPosts() {
          try {
            setLoading(true);
            
            const url = `/api/blog?search=${encodeURIComponent(searchTerm)}`;
            const response = await fetch(url);
            
            if (!response.ok) {
              throw new Error(`Failed to search posts. Status: ${response.status}`);
            }
            
            let data = await response.json();
            
            // If the response is not an array, try to extract posts from it
            if (!Array.isArray(data)) {
              data = data.posts || [];
            }
            
            setPosts(data);
          } catch (error) {
            console.error('Blog posts search error:', error);
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
          } finally {
            setLoading(false);
          }
        }
        
        searchPosts();
      }
    }, 500); // 500ms delay
    
    return () => clearTimeout(timer);
  }, []);

  // Use client-side filtering for quicker response when both tag and search are applied
  const filteredPosts = useMemo(() => {
    if (!searchTerm && !selectedTag) {
      // If no filters, return all posts sorted
      return [...posts].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
    }
    
    return posts
      .filter(post => {
        const matchesSearch = searchTerm === "" || (
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);
        
        return matchesSearch && matchesTag;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [posts, searchTerm, selectedTag, sortOrder]);

  // Get all unique tags for filter dropdown
  const allTags = useMemo(() => {
    return Array.from(new Set(posts.flatMap(post => post.tags)));
  }, [posts]);

  // Featured post (first post in filtered results)
  const featuredPost = filteredPosts[0];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Enhanced Loading Component
  const LoadingComponent = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto mb-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">Loading Blog Posts</h2>
        <Progress value={loadingProgress} className="h-2 mb-2" />
        <p className="text-center text-sm text-muted-foreground">
          {loadingProgress}% Complete
        </p>
        
        <div className="mt-10 flex justify-center">
          <motion.div 
            className="flex items-center gap-2"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2
            }}
          >
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-primary font-medium">Preparing content...</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  // Error Component
  const ErrorComponent = () => (
    <Card className="bg-destructive/10 border-destructive text-center py-10">
      <CardContent>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">😕</div>
          <CardTitle className="text-xl mb-2 text-destructive">{error || 'Failed to load blog posts'}</CardTitle>
          <CardDescription>
            Please try again later or contact support if the problem persists.
          </CardDescription>
        </motion.div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Explore my thoughts, tutorials, and insights on web development, design, and more.
        </p>
      </motion.div>

      {/* Search and filter controls */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" /> Search & Filter
          </CardTitle>
          <CardDescription>Find exactly what you&apos;re looking for</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            <Select
              value={selectedTag || 'all'}
              onValueChange={(value) => setSelectedTag(value === 'all' ? null : value)}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setSortOrder(current => current === 'desc' ? 'asc' : 'desc')}
              className="flex items-center gap-2"
            >
              <span>Sort by Date</span>
              <ArrowUpDown size={16} className={sortOrder === 'desc' ? 'transform rotate-180' : ''} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorComponent />
      ) : filteredPosts.length > 0 ? (
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Featured post */}
          {featuredPost && (
            <motion.div
              variants={item}
              className="mb-8"
            >
              <Card className="overflow-hidden">
                <div className={featuredPost.coverImage ? "grid md:grid-cols-2 gap-6" : ""}>
                  {featuredPost.coverImage && (
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPost.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="bg-secondary/20 text-secondary-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={featuredPost.date}>
                            {new Date(featuredPost.date).toLocaleDateString()}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{Math.ceil(featuredPost.content.length / 1000)} min read</span>
                        </div>
                        {featuredPost.views && (
                          <div className="flex items-center gap-1">
                            👀 {featuredPost.views}
                          </div>
                        )}
                      </div>
                    </div>
                    <Link href={`/blogs/${featuredPost._id}`}>
                      <Button className="w-full">Read Full Article</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Blog grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(1).map((post, index) => (
              <motion.div
                key={post._id || index}
                variants={item}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                  {post.coverImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="bg-secondary/20 text-secondary-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline">+{post.tags.length - 3}</Badge>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2 text-primary">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString()}
                        </time>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{Math.ceil(post.content.length / 1000)} min</span>
                      </div>
                      {post.views && (
                        <div className="flex items-center gap-1">
                          👀 {post.views}
                        </div>
                      )}
                    </div>
                    <Link 
                      href={`/blog/${post._id}`}
                      className="w-full"
                    >
                      <Button variant="secondary" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="text-6xl mb-4">🔍</div>
              <CardTitle className="text-xl mb-2">No posts found</CardTitle>
              <CardDescription>
                Try adjusting your search or filter criteria.
              </CardDescription>
              {searchTerm || selectedTag ? (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTag(null);
                  }}
                >
                  Clear Filters
                </Button>
              ) : null}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}