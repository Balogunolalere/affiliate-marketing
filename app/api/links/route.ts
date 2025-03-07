import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'public/data');

// Ensure data directory and files exist
function ensureLinksFileExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const linksPath = path.join(DATA_DIR, 'links.json');
  if (!fs.existsSync(linksPath)) {
    fs.writeFileSync(linksPath, JSON.stringify({ links: [] }, null, 2));
  }
}

async function readJSONFile<T>(filename: string): Promise<T> {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    throw new Error(`File ${filename} not found`);
  }
  const data = await fs.promises.readFile(filepath, 'utf-8');
  return JSON.parse(data);
}

async function writeJSONFile<T>(filename: string, data: T): Promise<void> {
  const filepath = path.join(DATA_DIR, filename);
  await fs.promises.writeFile(filepath, JSON.stringify(data, null, 2));
}

interface Link {
  id: string;
  title: string;
  url: string;
  image?: string;
  profileId: string;
  order: number;
}

export async function GET(request: Request) {
  try {
    ensureLinksFileExists();
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId');
    
    const data = await readJSONFile<{ links: Link[] }>('links.json');
    const links = profileId 
      ? data.links.filter(link => link.profileId === profileId)
      : data.links;
      
    return NextResponse.json(links);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching links' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const link: Link = await request.json();
    const data = await readJSONFile<{ links: Link[] }>('links.json');
    const links = data.links;
    
    const index = links.findIndex(l => l.id === link.id);
    if (index >= 0) {
      links[index] = link;
    } else {
      links.push(link);
    }
    
    await writeJSONFile('links.json', { links });
    return NextResponse.json(link);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error saving link' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const data = await readJSONFile<{ links: Link[] }>('links.json');
    const links = data.links.filter(link => link.id !== id);
    
    await writeJSONFile('links.json', { links });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting link' },
      { status: 500 }
    );
  }
}