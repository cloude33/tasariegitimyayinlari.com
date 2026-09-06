import { NextResponse } from 'next/server';
import path from 'path';
import { checkAuth } from '@/lib/auth';
import { readSolutions, writeSolutionsAtomic } from '@/lib/solutionsStore';

const dataPath = path.join(process.cwd(), 'src/data/solutions.json');

export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }
  try {
    const data = await readSolutions(dataPath);
    return NextResponse.json(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return NextResponse.json({});
    }
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }
  try {
    const newData = await request.json();
    await writeSolutionsAtomic(dataPath, newData);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save data: ' + error.message },
      { status: 500 }
    );
  }
}
