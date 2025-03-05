'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: string;
  views?: number;
}

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!params.id) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/projectbyid/?id=${params.id}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch blog post. Status: ${response.status}, Message: ${errorText}`);
        }
        
        const data = await response.json();
        setPost({
          ...data,
          date: new Date(data.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        });
      } catch (err) {
        console.error('Blog post fetch error:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.id]);

  // Loading Component
  const LoadingComponent = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="spinner animate-spin text-4xl">🌀</div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading blog post...</p>
      </motion.div>
    </div>
  );

  // Error Component
  const ErrorComponent = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl text-red-600 dark:text-red-400 mb-4">
          {error || 'Blog Post Not Found'}
        </h2>
        <Link 
          href="/blog" 
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Return to Blog
        </Link>
      </motion.div>
    </div>
  );

  if (loading) return <LoadingComponent />;
  if (error || !post) return <ErrorComponent />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <article className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date}
                </div>
                {post.views && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {post.views} views
                  </div>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to all posts
            </Link>
          </div>
        </motion.div>
      </article>
    </div>
  );
}