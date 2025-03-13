"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: string;
  coverImage: string;
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
      <div className="min-h-screen bg-gray-100 dark:bg-background flex items-center justify-center">
        <div className="text-center text-gray-700 dark:text-gray-300">
          Loading...
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-background flex items-center justify-center">
        <div className="text-center text-red-500 dark:text-red-400">
          {error || "Blog post not found"}
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-6xl mx-auto p-1 border-2 bg-gray-100 dark:bg-background rounded-lg shadow-lg overflow-hidden">
      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={post.title}
          className="w-full object-cover rounded-md"
        />
      )}
      <div className="p-6 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-end">
            {post.date}
          </div>

          <div className="flex justify-between">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {post.title}
            </h1>
            <div className="mt-6 flex">
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
                    navigator.clipboard.writeText(
                      `🚀 Check out this blog: ${post.title}\n\n${post.excerpt}\n🔗 Read more here: ${window.location.href}`
                    );
                    alert("Link copied to clipboard!");
                  }
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer"
              >
                Share
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>
        <div className="mt-8 text-center">
          <Link
            href="/blogs"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
}
