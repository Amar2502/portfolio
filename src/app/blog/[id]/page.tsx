import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from './blog-post-content';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const post = await fetchPost(params.id);
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: `${post.title} | Amar Pandey's Blog`,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: ['Amar Pandey'],
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
      }
    }
  } catch (error) {
    return {
      title: 'Blog Post Not Found',
      description: `The requested blog post could not be found, ${error}`,
    }
  }
}

async function fetchPost(id: string) {
  try {
    const res = await fetch(`/api/blog?id=${id}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

export default async function BlogPost({ params, searchParams }: PageProps) {
  try {
    const post = await fetchPost(params.id);
    return <BlogPostContent post={post} />;
  } catch (error) {
    console.log("error", error);    
    console.log("searchParams", searchParams);    
    notFound();
  }
} 