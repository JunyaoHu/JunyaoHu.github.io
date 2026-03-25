/**
 * 全部论文数据：在首页展示 `featured: true` 的条目；/publication/ 展示本数组排序后的全部。
 * `sortOrder` 越大越靠前；未设时用 `year`。
 *
 * 站内 PDF / 演示图等请放在 `public/paper/...`，链接写以 `/` 开头的路径（勿用 `@assets/`，
 * 该别名只对 `import` 生效，写在 href/src 字符串里浏览器无法解析）。
 *
 * 无演示图：省略 `demo` 字段，或不要写空字符串（`src` 为空则视为无 demo）。
 */

export type PaperAuthor = {
	name: string;
	url?: string;
	equalContrib?: boolean;
	corresponding?: boolean;
};

export type PaperLink = {
	label: string;
	href: string;
	icon?: string;
};

export type Paper = {
	venue?: string;
	title: string;
	authors: PaperAuthor[];
	tldr?: string;
	links: PaperLink[];
	demo?: { src: string; alt: string };
	featured: boolean;
	year?: number;
	sortOrder?: number;
};

function comparePapers(a: Paper, b: Paper) {
	const y = (b.year ?? 0) - (a.year ?? 0);
	if (y !== 0) return y;
	return (b.sortOrder ?? 0) - (a.sortOrder ?? 0);
}

export const papers: Paper[] = [
	{
		venue: 'CVPR26W CVEU',
		title:
			'DRA-MTransfer: Physically Realistic Video Motion Transfer with Dual-Grained Re-Adaptation',
		featured: false,
		year: 2026,
		sortOrder: 10,
		authors: [
			{ name: "Guoli Jia", url: "https://scholar.google.cz/citations?&user=A6V0JDAAAAAJ"},
			{ name: "Zhiyuan Ma", url: "https://ponymzy.github.io/"},
			{ name: "Junyao Hu"},
			{ name: "Xinwei Long", url: "https://scholar.google.com/citations?&user=gSA_egQAAAAJ"},
			{ name: "Kai Tian", url: "https://c3i.ee.tsinghua.edu.cn/author/%E7%94%B0%E9%94%B4/"},
			{ name: "Kaikai Zhao", url: "https://scholar.google.com/citations?user=hDGrCp8AAAAJ"},
			{ name: "Zhaoxiang Liu", url: "https://scholar.google.com/citations?user=L4OXOs0AAAAJ"},
			{ name: "Kai Wang", url: "https://scholar.google.com/citations?user=CFUQLCAAAAAJ"},
			{ name: "Shiguo Lian", url: "https://www.researchgate.net/profile/Shiguo-Lian"},
			{ name: "Bowen Zhou", url: "https://scholar.google.com/citations?user=h3Nsz6YAAAAJ", corresponding: true },
		],
		tldr:
			'DRA-MTransfer leverages dual-grained re-adaptation to unlock motion priors in video diffusion models, enhancing physical realism in motion transfer while maintaining fidelity and coherence.',
		links: [],
	},
	{
		venue: 'CVPR26',
		title:
			'Garments2Look: A Multi-Reference Dataset for High-Fidelity Outfit-Level Virtual Try-On with Clothing and Accessories',
		featured: true,
		year: 2026,
		sortOrder: 10,
		authors: [
			{ name: 'Junyao Hu'},
			{ name: 'Zhongwei Cheng', url: 'https://scholar.google.com/citations?user=ayN-dVwAAAAJ' },
			{ name: 'Waikeung Wong', url: 'https://research.polyu.edu.hk/en/persons/wai-keung-wong-2/' },
			{
				name: 'Xingxing Zou',
				url: 'https://scholar.google.com/citations?user=UhnQA3UAAAAJ',
				corresponding: true,
			},
		],
		tldr:
			'Garments2Look, the first outfit-level VTON dataset with 80K pairs, 40 categories, rich annotations, tests SOTA models and reveals their limitations in layering/styling.',
		links: [
			{ label: 'Paper', href: 'https://arxiv.org/abs/2603.14153', icon: '📃' },
			{ label: '中译版', href: '/paper/cvpr26-garments2look/chinese.pdf', icon: '📃' },
			{ label: 'Code', href: 'https://github.com/ArtmeScienceLab/Garments2Look', icon: '📦' },
			{ label: 'Project', href: 'https://artmesciencelab.github.io/Garments2Look/', icon: '⚒️' },
		],
		demo: { src: '/paper/cvpr26-garments2look/show.gif', alt: 'Garments2Look demo' },
	},
	{
		venue: 'arXiv25',
		title: 'Emotion-Director: Bridging Affective Shortcut in Emotion-Oriented Image Generation',
		featured: false,
		year: 2025,
		sortOrder: 10,
		authors: [
			{ name: 'Guoli Jia', url: 'https://scholar.google.cz/citations?&user=A6V0JDAAAAAJ', equalContrib: true },
			{ name: 'Junyao Hu', equalContrib: true },
			{ name: 'Xinwei Long', url: 'https://scholar.google.com/citations?&user=gSA_egQAAAAJ'},
			{ name: 'Kai Tian', url: 'https://c3i.ee.tsinghua.edu.cn/author/%E7%94%B0%E9%94%B4/'},
			{ name: 'Kaiyan Zhang', url: 'https://iseesaw.github.io/'},
			{ name: 'KaiKai Zhao', url: 'https://scholar.google.com/citations?user=hDGrCp8AAAAJ'},
			{ name: 'Ning Ding', url: 'https://www.stingning.cn/'},
			{ name: 'Bowen Zhou', url: 'https://scholar.google.com/citations?user=h3Nsz6YAAAAJ', corresponding: true },
		],
		tldr:
			'Emotion-Director enhances text-to-image emotion control via a collaborative diffusion model, prompt rewriting agent, synthetic emotion data, and improved DPO fine-tuning.',
		links: [
			{ label: 'Paper', href: 'https://arxiv.org/abs/2512.19479', icon: '📃' },
		],
		demo: { src: '/paper/arxiv25-emotion-director/show.jpg', alt: 'Emotion-Director demo' },
	},
	{
		venue: 'CVPR24',
		title: 'ExtDM: Distribution Extrapolation Diffusion Model for Video Prediction',
		featured: false,
		year: 2024,
		sortOrder: 10,
		authors: [
			{ name: 'Zhicheng Zhang', url: 'https://zzcheng.top/', equalContrib: true },
			{ name: 'Junyao Hu', equalContrib: true },
			{ name: 'Wentao Cheng', url: 'https://wtchengcv.github.io/', corresponding: true },
			{ name: 'Danda Paudel', url: 'https://people.ee.ethz.ch/~paudeld/' },
			{ name: 'Jufeng Yang', url: 'https://cv.nankai.edu.cn/' },
		],
		tldr:
			'We present ExtDM, a new diffusion model that extrapolates video content from current frames by accurately modeling distribution shifts towards future frames.',
		links: [
			{ label: 'Paper', href: '/paper/cvpr24-extdm/paper.pdf', icon: '📃' },
			{ label: '中译版', href: '/paper/cvpr24-extdm/chinese.pdf', icon: '📃' },
			{ label: 'Code', href: 'https://github.com/nku-zhichengzhang/ExtDM', icon: '📦' },
			{ label: 'Project', href: 'https://zzcheng.top/ExtDM', icon: '⚒️' },
			{ label: 'Poster', href: '/paper/cvpr24-extdm/poster.pdf', icon: '📊' },
			{ label: 'Slide', href: '/paper/cvpr24-extdm/slide.pdf', icon: '📅' },
			{ label: 'Video (Bilibili)', href: 'https://www.bilibili.com/video/BV1dC411E72q', icon: '🎞️' },
		],
		demo: { src: '/paper/cvpr24-extdm/show.gif', alt: 'ExtDM demo' },
	},
];

export function getFeaturedPapers(): Paper[] {
	return papers.filter((p) => p.featured).sort(comparePapers);
}

export function getAllPapersSorted(): Paper[] {
	return [...papers].sort(comparePapers);
}

/** 有有效演示图 URL 时才为 true（可省略 `demo` 或留空 `src` 表示无图） */
export function paperHasDemoMedia(paper: Paper): boolean {
	const src = paper.demo?.src;
	return typeof src === 'string' && src.trim().length > 0;
}
