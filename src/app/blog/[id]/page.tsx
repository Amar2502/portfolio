'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: string;
}

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
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
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600 dark:text-gray-400">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600 dark:text-red-400">
            {error || 'Blog post not found'}
          </div>
        </div>
      </div>
    );
  }

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
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {post.date}
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
            <a
              href="/blog"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to all posts
            </a>
          </div>
        </motion.div>
      </article>
    </div>
  );
} 