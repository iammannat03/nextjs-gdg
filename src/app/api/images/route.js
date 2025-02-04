// app/api/upload/route.js
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export const config = {
  api: {
    responseLimit: '8mb',
  },
}

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req, res) {
  const body = await req.json();
  const image = body.image;
  console.log("Uploading image:", image);

  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(image, {
      resource_type: 'auto',
      public_id: image,
      folder: "events",
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    // // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url("shoes", {
    //   fetch_format: "auto",
    //   quality: "auto",
    // });

    // // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url("shoes", {
    //   crop: "auto",
    //   gravity: "auto",
    //   width: 500,
    //   height: 500,
    // });

    return NextResponse.json({
      uploadResult,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
