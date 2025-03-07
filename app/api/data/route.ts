import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'public/data');

// Ensure data directory and files exist
function ensureDataFilesExist() {
  // Create data directory if it doesn't exist
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const defaultProfile = {
    profiles: [{
      id: '1',
      username: '@username',
      title: 'Digital Creator',
      bio: 'Creating content and sharing knowledge',
      image: '/placeholder-user.jpg'
    }]
  };

  const defaultLinks = {
    links: []
  };

  // Create profiles.json if it doesn't exist
  const profilesPath = path.join(DATA_DIR, 'profiles.json');
  if (!fs.existsSync(profilesPath)) {
    fs.writeFileSync(profilesPath, JSON.stringify(defaultProfile, null, 2));
  }

  // Create links.json if it doesn't exist
  const linksPath = path.join(DATA_DIR, 'links.json');
  if (!fs.existsSync(linksPath)) {
    fs.writeFileSync(linksPath, JSON.stringify(defaultLinks, null, 2));
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

export async function GET() {
  try {
    ensureDataFilesExist();
    const profilesData = await readJSONFile<{ profiles: any[] }>('profiles.json');
    const linksData = await readJSONFile<{ links: any[] }>('links.json');
    
    return NextResponse.json({
      profiles: profilesData.profiles,
      links: linksData.links
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    ensureDataFilesExist();
    const data = await request.json();
    const { profiles, links } = data;
    
    if (profiles) {
      await writeJSONFile('profiles.json', { profiles });
    }
    if (links) {
      await writeJSONFile('links.json', { links });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}