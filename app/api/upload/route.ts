import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploaded-images');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}${path.extname(file.name)}`;
    const filepath = path.join(UPLOAD_DIR, filename);
    
    await writeFile(filepath, buffer);
    
    return NextResponse.json({ 
      path: `/uploaded-images/${filename}`
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save image' }, { status: 500 });
  }
}