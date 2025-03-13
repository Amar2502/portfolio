"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: string;
}

export default function BlogPostDetail() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blogbyid/?id=${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }
        const data = await response.json();
        setPost({
          ...data,
          date: new Date(data.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
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
      <div className="min-h-screen bg-gray-50 dark:bg-background py-20">
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
      <div className="min-h-screen bg-gray-50 dark:bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600 dark:text-red-400">
            {error || "Blog post not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background py-20">
      <article className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {post.date}
              </div>
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={async () => {
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: `🚀 Check out this blog: ${post.title}`,
                          text: `${post.excerpt}\n\n🔗 Read more here:`,
                          url: window.location.href,
                        });
                      } catch (err) {
                        if (err instanceof Error && err.name !== "AbortError") {
                          console.error("Error sharing:", err);
                        }
                      }
                    } else {
                      // Fallback for browsers that don't support Web Share API
                      navigator.clipboard.writeText(
                        `🚀 Check out this blog: ${post.title}\n\n${post.excerpt}\n🔗 Read more here: ${window.location.href}`
                      );
                      alert("Link copied to clipboard!");
                    }
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shrink-0 cursor-pointer"
                  aria-label="Share this post"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-center"></div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blogs"
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