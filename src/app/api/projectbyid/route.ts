import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log('📖 GET /api/blog/[id] - Fetching blog post by ID:', id);

    if (!id) {
      console.warn('❌ Validation failed: Missing blog post ID');
      return NextResponse.json(
        { error: "Blog post ID is required" },
        { status: 400 }
      );
    }

    const db = await dbConnect();
    const post = await db.collection('blogs').findOne({ 
      _id: new ObjectId(id) 
    });

    if (!post) {
      console.warn('❌ Blog post not found');
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    console.log('✅ Successfully fetched blog post');
    return NextResponse.json(post);
  } catch (error) {
    console.error('❌ Error fetching blog post:', error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
} 