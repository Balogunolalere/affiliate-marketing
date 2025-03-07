import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'public/data');

// Ensure data directory and files exist
function ensureProfilesFileExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const profilesPath = path.join(DATA_DIR, 'profiles.json');
  if (!fs.existsSync(profilesPath)) {
    const defaultProfile = {
      profiles: [{
        id: '1',
        username: '@username',
        title: 'Digital Creator',
        bio: 'Creating content and sharing knowledge',
        image: '/placeholder-user.jpg'
      }]
    };
    fs.writeFileSync(profilesPath, JSON.stringify(defaultProfile, null, 2));
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

interface Profile {
  id: string;
  username: string;
  title?: string;
  bio?: string;
  image?: string;
}

export async function GET() {
  try {
    ensureProfilesFileExists();
    const data = await readJSONFile<{ profiles: Profile[] }>('profiles.json');
    return NextResponse.json(data.profiles);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching profiles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const profile: Profile = await request.json();
    const data = await readJSONFile<{ profiles: Profile[] }>('profiles.json');
    const profiles = data.profiles;
    
    const index = profiles.findIndex(p => p.id === profile.id);
    if (index >= 0) {
      profiles[index] = profile;
    } else {
      profiles.push(profile);
    }
    
    await writeJSONFile('profiles.json', { profiles });
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error saving profile' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const data = await readJSONFile<{ profiles: Profile[] }>('profiles.json');
    const profiles = data.profiles.filter(profile => profile.id !== id);
    
    await writeJSONFile('profiles.json', { profiles });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting profile' },
      { status: 500 }
    );
  }
}