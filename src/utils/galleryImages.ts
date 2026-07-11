import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export const GALLERY_IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);
export const GALLERY_OPT_URL_PREFIX = '/gallery-opt';

const GALLERY_ROOT = path.join(process.cwd(), 'public', 'gallery');
const OPT_ROOT = path.join(process.cwd(), 'public', 'gallery-opt');

const THUMB_MAX_WIDTH = 720;
const FULL_MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;

export type GalleryImageVariant = {
	original: string;
	thumb: string;
	full: string;
};

export function listGalleryImageFiles(albumId: string): string[] {
	const dir = path.join(GALLERY_ROOT, albumId);
	if (!fs.existsSync(dir)) return [];
	return fs
		.readdirSync(dir)
		.filter((f) => {
			if (f.startsWith('.')) return false;
			return GALLERY_IMAGE_EXTS.has(path.extname(f).toLowerCase());
		})
		.sort();
}

export function resolveCoverFilename(cover: string | undefined, files: string[]): string | undefined {
	if (cover && files.includes(cover)) return cover;
	const coverFile = files.find(
		(f) => path.basename(f, path.extname(f)).toLowerCase() === 'cover',
	);
	if (coverFile) return coverFile;
	return files[0];
}

async function isStale(outPath: string, srcMtimeMs: number) {
	try {
		const outStat = await fsPromises.stat(outPath);
		return outStat.mtimeMs < srcMtimeMs;
	} catch {
		return true;
	}
}

export async function buildGalleryImageVariant(
	albumId: string,
	filename: string,
): Promise<GalleryImageVariant> {
	const originalUrl = `/gallery/${albumId}/${filename}`;
	const srcPath = path.join(GALLERY_ROOT, albumId, filename);
	const ext = path.extname(filename).toLowerCase();
	const base = path.basename(filename, ext);
	const outDir = path.join(OPT_ROOT, albumId);
	const thumbPath = path.join(outDir, `${base}.thumb.webp`);
	const fullPath = path.join(outDir, `${base}.webp`);
	const thumbUrl = `${GALLERY_OPT_URL_PREFIX}/${albumId}/${base}.thumb.webp`;
	const fullUrl = `${GALLERY_OPT_URL_PREFIX}/${albumId}/${base}.webp`;

	if (ext === '.gif') {
		return { original: originalUrl, thumb: originalUrl, full: originalUrl };
	}

	await fsPromises.mkdir(outDir, { recursive: true });
	const srcMtimeMs = (await fsPromises.stat(srcPath)).mtimeMs;

	if (await isStale(thumbPath, srcMtimeMs)) {
		await sharp(srcPath)
			.rotate()
			.resize({ width: THUMB_MAX_WIDTH, withoutEnlargement: true })
			.webp({ quality: WEBP_QUALITY, effort: 4 })
			.toFile(thumbPath);
	}

	if (await isStale(fullPath, srcMtimeMs)) {
		await sharp(srcPath)
			.rotate()
			.resize({ width: FULL_MAX_WIDTH, withoutEnlargement: true })
			.webp({ quality: WEBP_QUALITY, effort: 4 })
			.toFile(fullPath);
	}

	return { original: originalUrl, thumb: thumbUrl, full: fullUrl };
}

export async function buildAlbumGalleryImages(albumId: string): Promise<GalleryImageVariant[]> {
	const files = listGalleryImageFiles(albumId);
	return Promise.all(files.map((filename) => buildGalleryImageVariant(albumId, filename)));
}
