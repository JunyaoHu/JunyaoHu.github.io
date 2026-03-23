/** Twikoo 评论：https://twikoo.js.org/ */

/** 与 `src/styles/twikoo.css` 配对；勿用 `twikoo.all.min.js`，否则会重复一套样式 */
export const TWIKOO_CDN = `https://cdn.jsdelivr.net/npm/twikoo@1.7.4/dist/twikoo.min.js`;
export const PUBLIC_TWIKOO_ENV_ID = "https://blog-comment-nvoz-8o7dxhfbd-junyaohus-projects.vercel.app/"
export const PUBLIC_TWIKOO_REGION = "ap-shanghai";
export const PUBLIC_TWIKOO_LANG = "en";

export type TwikooConfig =
	| { enabled: false }
	| { enabled: true; envId: string; region?: string; lang?: string };

/**
 * 在 `.env` 中设置 `PUBLIC_TWIKOO_ENV_ID`（腾讯云环境 ID）后启用。
 * 可选：`PUBLIC_TWIKOO_REGION`（如云函数在 `ap-shanghai`）。
 */
export function getTwikooConfig(): TwikooConfig {
	const raw = PUBLIC_TWIKOO_ENV_ID;
	const envId = typeof raw === 'string' ? raw.trim() : '';
	if (!envId) return { enabled: false };

	const reg = PUBLIC_TWIKOO_REGION;
	const region = typeof reg === 'string' && reg.trim() ? reg.trim() : undefined;

	const langValue = PUBLIC_TWIKOO_LANG;
	const lang = typeof langValue === 'string' && langValue.trim() ? langValue.trim() : undefined;
	return { enabled: true, envId, region, lang };
}
