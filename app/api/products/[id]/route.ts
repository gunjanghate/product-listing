import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.pathname.match(/\/api\/products\/([^/]+)/)?.[1];
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to delete product", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.match(/\/api\/products\/([^/]+)/)?.[1];
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const data = await req.json();
    await connectDB();
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to update product", error: error.message },
      { status: 500 }
    );
  }
}