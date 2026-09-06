import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dirPath = searchParams.get('path');
  
  if (!dirPath) {
    return NextResponse.json({ error: 'Path parameter required' }, { status: 400 });
  }

  try {
    // Security check - only allow paths under public/dosyalar
    const publicDir = path.join(/*turbopackIgnore: true*/ process.cwd(), 'public');
    const fullPath = path.resolve(publicDir, dirPath.replace(/^\/+/, ''));
    const relativeCheck = path.relative(publicDir, fullPath);
    
    if (!relativeCheck.startsWith('dosyalar') || relativeCheck.includes('..')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 403 });
    }

    const stats = await fs.stat(fullPath);
    
    if (stats.isDirectory()) {
      const items = await fs.readdir(fullPath);
      const fileList = [];
      
      for (const item of items) {
        // Use string template to avoid broad pattern warning from path.join
        const itemPath = `${fullPath}${path.sep}${item}`;
        const itemStats = await fs.stat(itemPath);
        
        if (itemStats.isFile() && (item.endsWith('.pdf') || item.endsWith('.html'))) {
          fileList.push({
            name: item,
            path: `/${dirPath}/${item}`,
            isFile: true,
            size: itemStats.size
          });
        } else if (itemStats.isDirectory()) {
          fileList.push({
            name: item,
            path: `/api/files?path=${dirPath}/${item}`,
            isFile: false
          });
        }
      }
      
      fileList.sort((a, b) => {
        if (a.isFile !== b.isFile) {
          return a.isFile ? 1 : -1; // Directories first
        }
        return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
      });
      
      return NextResponse.json({
        type: 'directory',
        path: dirPath,
        items: fileList
      });
    } else if (stats.isFile() && (fullPath.endsWith('.pdf') || fullPath.endsWith('.html'))) {
      // Return the file directly
      return NextResponse.json({
        type: 'file',
        path: `/${dirPath}`,
        name: path.basename(fullPath)
      });
    }
    
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 });
  }
}
