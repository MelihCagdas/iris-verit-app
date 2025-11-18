import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const getUploadDir = () => {
  if (process.env.VERCEL) {
    return '/tmp/uploads';
  }
  return join(process.cwd(), 'uploads');
};

export async function ensureUploadDir() {
  const dir = getUploadDir();
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
  return dir;
}

export async function saveFile(buffer: Buffer, filename: string): Promise<string> {
  const uploadDir = await ensureUploadDir();
  const filepath = join(uploadDir, filename);
  await writeFile(filepath, buffer);
  // Only files saved under the project root can be served; when using /tmp the URL
  // is informational but still stored for reference.
  return process.env.VERCEL ? filename : `/uploads/${filename}`;
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function isValidResumeFile(filename: string): boolean {
  const ext = getFileExtension(filename);
  return ['pdf', 'doc', 'docx'].includes(ext);
}

