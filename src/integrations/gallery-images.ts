import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { galleryConfig } from '../data/gallery';
import { buildAllGalleryImages } from '../utils/galleryImages';

const OPT_DIR = path.join(process.cwd(), 'public', 'gallery-opt');

export function galleryImagesIntegration(): AstroIntegration {
	return {
		name: 'gallery-images',
		hooks: {
			/** 在复制 public/ 之前生成缩略图，确保 dist 能包含 gallery-opt */
			'astro:build:start': async () => {
				const albumIds = galleryConfig.albums.map((album) => album.id);
				await buildAllGalleryImages(albumIds);
			},
			/** 页面 SSG 可能再次更新 gallery-opt，构建结束时同步到 dist */
			'astro:build:done': async ({ dir }) => {
				try {
					await fs.access(OPT_DIR);
				} catch {
					return;
				}
				const outDir = fileURLToPath(dir);
				const dest = path.join(outDir, 'gallery-opt');
				await fs.cp(OPT_DIR, dest, { recursive: true, force: true });
			},
		},
	};
}
