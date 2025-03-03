"use client"

import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
}

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const readingTime = Math.ceil(post.content.length / 1000); // Rough estimate: 1000 chars per minute

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6 sm:mb-8 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </a>

          {/* Article Header */}
          <header className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{post.tags.join(', ')}</span>
              </div>
            </div>

            <div className="prose dark:prose-invert prose-lg sm:prose-xl max-w-none">
              <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose dark:prose-invert prose-lg max-w-none
              prose-headings:scroll-mt-20
              prose-a:text-blue-600 dark:prose-a:text-blue-400
              prose-img:rounded-lg prose-img:shadow-lg
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
              prose-code:text-blue-600 dark:prose-code:text-blue-400
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500
              prose-table:border-collapse prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700 prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700
              sm:prose-base md:prose-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Tagged with
            </h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <a
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </main>
  );
} 