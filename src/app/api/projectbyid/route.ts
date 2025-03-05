import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface BlogPost {
  _id?: ObjectId | string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: string;
  views?: number;
}

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    
    // Validate ID format
    if (!id) {
      return NextResponse.json(
        { error: "Blog post ID is required" },
        { status: 400 }
      );
    }

    // Validate ObjectId
    try {
      new ObjectId(id);
    } catch (idError) {
      return NextResponse.json(
        { error: "Invalid blog post ID format" },
        { status: 400 }
      );
    }

    console.log(`📖 GET /api/blog - Fetching blog post: ${id}`);
    
    const db = await dbConnect();
    const post = await db.collection<BlogPost>('blogs').findOne({ 
      _id: new ObjectId(id) 
    });

    if (!post) {
      console.warn(`❌ Blog post not found: ${id}`);
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Increment view count (optional)
    await db.collection<BlogPost>('blogs').updateOne(
      { _id: new ObjectId(id) },
      { $inc: { views: 1 } }
    );

    console.log(`✅ Successfully fetched blog post: ${id}`);
    return NextResponse.json(post);
  } catch (error) {
    console.error('❌ Error fetching blog post:', error);
    return NextResponse.json(
      { 
        error: "Failed to fetch blog post", 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}