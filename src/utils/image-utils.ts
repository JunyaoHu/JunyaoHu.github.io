/**
 * 外链图片是否加 referrerpolicy="no-referrer"，减轻部分防盗链 403。
 * 相对路径、data:/blob: 不处理。
 */

/** hast 中 img.src 可能是 string 或 string[] */
export function normalizeImageSrc(src: unknown): string {
	if (src == null) return '';
	if (Array.isArray(src)) return src.join('');
	return String(src);
}

export function shouldAddNoReferrer(src: string | undefined | null): boolean {
	if (src == null || typeof src !== 'string') return false;
	const s = src.trim();
	if (!s || s.startsWith('data:') || s.startsWith('blob:')) return false;
	if (s.startsWith('/') || s.startsWith('./') || s.startsWith('../')) return false;
	return /^https?:\/\//i.test(s);
}