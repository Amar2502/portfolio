'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Share2, Link, Twitter, Facebook, Linkedin, X } from 'lucide-react';

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
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/projectbyid?id=${params.id}`);
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

  const handleShare = async () => {
    const url = window.location.href;
    const title = post?.title || 'Blog Post';

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: post?.excerpt || '',
          url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
        setIsShareMenuOpen(true);
      }
    } else {
      setIsShareMenuOpen(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    setIsShareMenuOpen(false);
  };

  const shareToSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title || 'Blog Post');
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
    setIsShareMenuOpen(false);
  };

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
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date}
                </div>
                <div className="relative">
                  <button
                    onClick={handleShare}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    aria-label="Share post"
                  >
                    <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  
                  {isShareMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                      <button
                        onClick={handleCopyLink}
                        className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Link className="w-4 h-4" />
                        Copy link
                      </button>
                      <button
                        onClick={() => shareToSocial('twitter')}
                        className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Twitter className="w-4 h-4" />
                        Share on Twitter
                      </button>
                      <button
                        onClick={() => shareToSocial('facebook')}
                        className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Facebook className="w-4 h-4" />
                        Share on Facebook
                      </button>
                      <button
                        onClick={() => shareToSocial('linkedin')}
                        className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Linkedin className="w-4 h-4" />
                        Share on LinkedIn
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags && post.tags.map((tag, index) => (
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

      {/* Copied to clipboard toast */}
      {showCopiedToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
          Link copied to clipboard!
        </div>
      )}

      {/* Click outside handler for share menu */}
      {isShareMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsShareMenuOpen(false)}
        />
      )}
    </div>
  );
} 