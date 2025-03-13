"use client";

import { useState, useEffect } from "react";
  import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, } from "@/components/ui/card";
import LoadingAnimation from "@/components/LoadingAnimation";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => (prev >= 100 ? 100 : prev + 5));
      }, 150);
      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch("/api/blog");
        if (!response.ok) throw new Error(`Failed to fetch posts. Status: ${response.status}`);
        let data = await response.json();
        if (!Array.isArray(data)) data = data.posts || [];
        setPosts(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Blogs</h1>
        <p className="text-lg text-muted-foreground">Explore insights, tutorials, and development stories.</p>
      </motion.div>

      {loading ? (
        <LoadingAnimation/>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : posts.length > 0 ? (
        <div className="grid gap-6">
          {posts[0] && (
            <Card className="w-full">
              {posts[0].coverImage && (
                <div className="relative h-80">
                  <Image src={posts[0].coverImage} alt={posts[0].title} fill className="object-cover" />
                </div>
              )}
              <CardContent className="p-6">
                <h2 className="text-3xl font-bold text-primary mb-2">{posts[0].title}</h2>
                <p className="text-muted-foreground mb-4">{posts[0].excerpt}</p>
                <Link href={`/blogs/${posts[0]._id}`} className="text-primary font-medium hover:underline">Read More →</Link>
              </CardContent>
            </Card>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <Card key={post._id}>
                {post.coverImage && (
                  <div className="relative h-40">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                  </div>
                )}
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold text-primary mb-2">{post.title}</h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Link href={`/blogs/${post._id}`} className="text-primary font-medium hover:underline">Read More →</Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No blog posts available.</p>
      )}
    </div>
  );
}
