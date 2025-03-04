import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    console.log('📖 GET /api/blog - Fetching blog post:', id);
    
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