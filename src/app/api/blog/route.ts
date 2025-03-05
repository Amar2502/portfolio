import { NextResponse } from "next/server";
import BlogModel from "@/models/blog.models"; // Adjust path if needed
import { dbConnect } from "@/lib/db"; // Ensure correct path

// 📌 GET: Fetch all blogs
export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");

    let query = BlogModel.find().sort({ date: -1 });

    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        query = query.limit(parsedLimit);
      }
    }

    const blogs = await query;

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching blogs", error }, { status: 500 });
  }
}

// 📌 POST: Create a new blog
export async function POST(req: Request) {
  try {
    await dbConnect();
    const { title, content, excerpt, tags } = await req.json();

    if (!title || !content || !excerpt || !tags) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newBlog = new BlogModel({ title, content, excerpt, tags });
    await newBlog.save();

    return NextResponse.json({ message: "Blog created successfully", blog: newBlog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating blog", error }, { status: 500 });
  }
}
