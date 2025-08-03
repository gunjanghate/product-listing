import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
    try {
        const { file } = await req.json();
        const uploaded = await cloudinary.uploader.upload(file, {
            folder: "products",
        });
        return NextResponse.json({ url: uploaded.secure_url });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}
