import { NextResponse } from "next/server";
import BlogModel from "@/models/blog.models"; // Ensure correct path
import { dbConnect } from "@/lib/db";
import { URL } from "url";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching blog", error }, { status: 500 });
  }
}
