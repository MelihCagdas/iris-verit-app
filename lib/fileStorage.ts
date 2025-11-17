import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const UPLOAD_DIR = join(process.cwd(), 'uploads');

export async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export async function saveFile(file: File, filename: string): Promise<string> {
  await ensureUploadDir();
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filepath = join(UPLOAD_DIR, filename);
  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function isValidResumeFile(filename: string): boolean {
  const ext = getFileExtension(filename);
  return ['pdf', 'doc', 'docx'].includes(ext);
}

