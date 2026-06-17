/** 主页文案与列表数据，按需修改 */

import avatarImage from '@assets/avatar.jpg';
import wechatQr from '@assets/wechat.png';

export const homeHero = {
	name: 'Junyao Hu',
	nameZh: '胡钧耀',
	tagline: 'I have a little dream to chase, and I have a long way to go.',
	updated: 'Last updated: 2026-06-17',
	/** 头像：换图时改 import 路径或文件名 */
	avatar: avatarImage,
};

export type SocialLink = {
	name: string;
	icon: string;
	url: string;
	/** 为 true 时在浏览器新标签页打开（如站内资源链接默认不会新开） */
	openInNewTab?: boolean;
};

export const socialLinks: SocialLink[] = [
	{
		name: 'GitHub',
		icon: 'fa7-brands:github',
		url: 'https://github.com/JunyaoHu',
	},
	{
		name: 'Google Scholar',
		icon: 'fa7-solid:graduation-cap',
		url: 'https://scholar.google.com/citations?user=pOgwDdcAAAAJ',
	},
	{
		name: 'Email',
		icon: 'fa7-solid:envelope',
		url: 'mailto:hujunyao0329@gmail.com',
	},
	{
		name: 'LinkedIn',
		icon: 'fa7-brands:linkedin',
		url: 'https://www.linkedin.com/in/junyao-hu/',
	},
	{
		name: 'WeChat',
		url: wechatQr.src,
		icon: 'fa7-brands:weixin',
		openInNewTab: true,
	},
];

/** 新闻类别：只允许这些 key，emoji 与展示文案由 NEWS_CATEGORY_META 推导 */
export const NEWS_CATEGORY_META = {
	accepted: { emoji: '😋', label: 'Accepted' },
	activity: { emoji: '💼', label: 'Activity' },
	study: { emoji: '✒️', label: 'Study' },
} as const;

export type NewsCategory = keyof typeof NEWS_CATEGORY_META;

export type NewsItem = {
	date: string;
	category: NewsCategory;
	text?: string;
	html?: string;
};

export const newsItems: NewsItem[] = [
	{
		date: '2026-03-26',
		category: 'accepted',
		text: 'A paper was accepted to CVPR 2026 Workshop CVEU.',
	},
	{
		date: '2026-02-23',
		category: 'accepted',
		text: 'A paper was accepted to CVPR 2026.',
	},
	{
		date: '2025-06-06',
		category: 'activity',
		html: 'I attended <a href="http://valser.org/2025">VALSE 2025</a> (Zhuhai, China).',
	},
	{
		date: '2025-04-19',
		category: 'activity',
		html: 'I attended <a href="https://amc.hkust.edu.hk/events/1st-hkust-ai-film-festival">First AMC AI Film Festival</a> (Hongkong, China).',
	},
	{
		date: '2025-03-08',
		category: 'accepted',
		html: 'A film was selected as Finalist at <a href="https://amc.hkust.edu.hk/events/1st-hkust-ai-film-festival">First AMC AI Film Festival</a>.',
	},
	{
		date: '2024-05-05',
		category: 'activity',
		html: 'I attended <a href="http://valser.org/2024">VALSE 2024</a> (Chongqing, China).',
	},
	{
		date: '2024-02-27',
		category: 'accepted',
		html: 'A paper was accepted to CVPR 2024, and I was honored as one of <a href="https://x.com/CVPR/status/1793616950314369239">Outstanding Reviewers</a> (top 2%).',
	},
	{
		date: '2023-07-15',
		category: 'study',
		html: 'I ended my undergraduate life at <a href="https://www.cumt.edu.cn/">China University of Mining and Technology (CUMT)</a>, thanks to all teachers and friends around me, especially my parents.',
	},
	{
		date: '2023-06-10',
		category: 'activity',
		html: 'I attended <a href="http://valser.org/2023">VALSE 2023</a> (Wuxi, China).',
	},
];

/** 显示在论文列表上方的说明（如 # / * 含义）；论文条目在 `src/data/papers.ts` */
export const publicationsGlobalNote =
	'Note: # = Equal Contribution, * = Corresponding Author.';

/** 完整论文列表页 */
export const publicationsMoreHref = '/publication';

export const commentsPlaceholder =
	'评论未启用。';

