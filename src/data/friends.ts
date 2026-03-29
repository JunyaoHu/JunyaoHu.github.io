// 友链配置

/** 本站信息（友链互换页左侧展示） */
export type FriendsSiteInfo = {
	name: string;
	desc: string;
	url: string;
	avatar: string;
	email: string;
};

export const friendsSiteInfo: FriendsSiteInfo = {
	name: 'Junyao Hu',
	desc: '胡钧耀',
	url: 'https://junyaohu.github.io/',
	avatar:
		'https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=pOgwDdcAAAAJ',
	email: 'hujunyao0329@gmail.com',
};

/** 可复制的友链字段（左侧列表） */
export const friendsSiteCopyFields: {
	labelZh: string;
	labelEn: string;
	getValue: (s: FriendsSiteInfo) => string;
}[] = [
	{ labelZh: '站点名称', labelEn: 'Site name', getValue: (s) => s.name },
	{ labelZh: '站点描述', labelEn: 'Site description', getValue: (s) => s.desc },
	{ labelZh: '站点链接', labelEn: 'Site URL', getValue: (s) => s.url },
	{ labelZh: '头像链接', labelEn: 'Avatar URL', getValue: (s) => s.avatar },
];

export type FriendsExchangeNote = {
	titleZh: string;
	titleEn: string;
	contentZh: string;
	contentEn: string;
};

export const friendsExchangeNotes: FriendsExchangeNote[] = [
	{
		titleZh: '互换原则',
		titleEn: 'Reciprocity',
		contentZh: '请先将本站添加到您的友链页面，确认后会添加您的友链',
		contentEn: 'Please add this site to your links page first; we will add yours after verification.',
	},
	{
		titleZh: '链接维护',
		titleEn: 'Link maintenance',
		contentZh: '友链网站长期无法访问或内容违规，将会被移除',
		contentEn: 'Links may be removed if the site is unreachable for a long time or violates guidelines.',
	},
	{
		titleZh: '内容要求',
		titleEn: 'Content',
		contentZh: '内容积极向上，不含有任何含色情/反动/暴力等违法违规内容',
		contentEn: 'Positive content only; no illegal or harmful material.',
	},
	{
		titleZh: '站点要求',
		titleEn: 'Site requirements',
		contentZh: '支持 HTTPS，以原创内容为主，能够正常访问且有持续更新',
		contentEn: 'HTTPS preferred; original content; stable access and occasional updates.',
	},
];

/** 邮件/留言申请时使用的模板（可复制，中英对照） */
export const friendsApplicationTemplate = `站点名称 / Site name：
站点描述 / Site description：
站点链接 / Site URL：
头像链接 / Avatar URL：`;

export type FriendsApplicationStep = {
	titleZh: string;
	titleEn: string;
	descriptionZh: string;
	descriptionEn: string;
};

export const friendsApplicationSteps: FriendsApplicationStep[] = [
	{
		titleZh: '添加本站友链',
		titleEn: 'Add this site to your links',
		descriptionZh: '请先在您的网站友链页面添加本站信息，可直接复制左侧各字段',
		descriptionEn: 'Add our site info on your links page first; copy the fields from the left panel.',
	},
	{
		titleZh: '评论区留言 / 发送申请邮件',
		titleEn: 'Comment or email your request',
		descriptionZh: '复制并修改下方模板，通过评论区或邮件发送。',
		descriptionEn: 'Copy and edit the template below, then send it via comment or email.',
	},
	{
		titleZh: '等待审核',
		titleEn: 'Wait for review',
		descriptionZh: '确认信息无误后会尽快添加您的友链',
		descriptionEn: 'We will add your link after we verify the details.',
	},
];

/** 申请说明区块 UI 文案 */
export const friendsApplicationUi = {
	sectionAria: 'Friend link application · 友链申请',
	panelTitleZh: '申请友链',
	panelTitleEn: 'Apply for a friend link',
	notesTitleZh: '注意事项',
	notesTitleEn: 'Notes',
	templateLabelZh: '邮件模板',
	templateLabelEn: 'Email template',
	copyEmail: 'Copy email · 复制邮箱',
	copyTemplate: 'Copy template · 复制模板',
} as const;

export type FriendLink = {
	title: string; // 友链标题
	imgurl: string; // 头像图片URL
	desc: string; // 友链描述
	siteurl: string; // 友链地址
	tags?: string[]; // 标签数组
	weight: number; // 权重，数字越大排序越靠前
	enabled: boolean; // 是否启用
};

export type FriendsPageConfig = {
	/** 是否显示互换说明（本站信息、申请步骤、注意事项） */
	showCustomContent?: boolean;
	showComment?: boolean; // 是否显示评论区，默认 true
	randomizeSort?: boolean; // 是否打乱排序，如果为 true，将忽略 weight，随机排序
};

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	showCustomContent: true,
	showComment: true,
	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: true,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "Shumin Zhu",
		imgurl: "https://avatars.githubusercontent.com/u/110874739?v=4",
		desc: "朱淑敏",
		siteurl: "https://github.com/FST-ZHUSHUMIN",
		tags: ["@PolyU"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Wenda Shi",
		imgurl: "https://wendashi.github.io/images/android-chrome-512x512.png",
		desc: "石闻达",
		siteurl: "https://wendashi.github.io/",
		tags: ["@PolyU"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Yuheng Feng",
		imgurl: "https://avatars.githubusercontent.com/u/80461352?v=4",
		desc: "冯煜恒",
		siteurl: "https://github.com/Yuheng-Feng",
		tags: ["@PolyU"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Jiayu Zhu",
		imgurl: "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31n1mchsjl86g49k5mcv1o1tiqibusq8",
		desc: "朱佳瑜",
		siteurl: "https://www.xiaohongshu.com/user/profile/59413e1c6a6a6942134307b2",
		tags: ["@PolyU"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Tian Ye",
		imgurl: "https://owen718.github.io/profile/2026-03-11_200754_546.jpg",
		desc: "叶田",
		siteurl: "https://owen718.github.io/",
		tags: ["@HKUST-GZ"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Shitong Shao",
		imgurl: "https://shaoshitong.github.io/images/85086735.jpg",
		desc: "邵世通",
		siteurl: "https://shaoshitong.github.io/",
		tags: ["@HKUST-GZ"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Yingqing He",
		imgurl: "https://yingqinghe.github.io/myassets/mypic.jpg",
		desc: "何盈庆",
		siteurl: "https://yingqinghe.github.io/",
		tags: ["@HKUST"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Yazhou Xing",
		imgurl: "https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=bKIUDxUAAAAJ&citpid=3",
		desc: "邢亚洲",
		siteurl: "https://yzxing87.github.io/",
		tags: ["@HKUST"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Zhicheng Zhang",
		imgurl: "https://zzcheng.top/assets/img/profile.png",
		desc: "张知诚，非常好师兄",
		siteurl: "https://zzcheng.top",
		tags: ["@NKU"],
		weight: 1, 
		enabled: true, 
	},{
        title: "liuxin29",
        imgurl: "https://xinliu29.github.io/images/xinliu.jpg",
        desc: "刘鑫",
        siteurl: "https://xinliu29.github.io/",
		tags: ["@NKU"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Shihao Zhou",
		imgurl: "https://joshyzhou.github.io/images/rounded_self_shihaozhou.png",
		desc: "周世豪",
		siteurl: "https://joshyzhou.github.io/",
		tags: ["@NKU"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Pancheng Zhao",
		imgurl: "https://zhaopancheng.top/images/profile.jpg",
		desc: "赵攀诚",
		siteurl: "https://zhaopancheng.top/",
		tags: ["@NKU"],
		weight: 1, 
		enabled: true, 
	},{
		title: "exped123",
		imgurl: "https://exped1230.github.io/images/jgl.jpg",
		desc: "贾国力->THU",
		siteurl: "https://exped1230.github.io/",
		tags: ["@NKU"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Changsong Wen",
		imgurl: "https://downdric.github.io/self-photo.jpg",
		desc: "文长崧->SJTU",
		siteurl: "https://downdric.github.io",
		tags: ["@NKU"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Weicheng Wang",
		imgurl: "https://avatars.githubusercontent.com/u/81733044?v=4",
		desc: "汪炜澄",
		siteurl: "https://github.com/wei-cheng777",
		tags: ["@NKU"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Rong Qin",
		imgurl: "https://qinrong-nku.github.io/qr.jpg",
		desc: "秦荣",
		siteurl: "https://qinrong-nku.github.io/",
		tags: ["@NKU"],
		weight: 1, 
		enabled: true, 
	},{
		title: "ZhaoChenxi-nku",
		imgurl: "https://avatars.githubusercontent.com/u/126676716?v=4",
		desc: "赵晨曦",
		siteurl: "https://github.com/ZhaoChenxi-nku",
		tags: ["@NKU"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Lishen Qu",
		imgurl: "https://qulishen.github.io/images/zipai.jpg",
		desc: "瞿立燊",
		siteurl: "https://github.com/qulishen",
		tags: ["@NKU"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Yunheng Li",
		imgurl: "https://lyhisme.github.io/images/bio/android-chrome-512x512.png",
		desc: "李运恒@VCIP，非常好室友",
		siteurl: "https://lyhisme.github.io/",
		tags: ["@NKU"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Theoyu Blog",
		imgurl: "https://theoyu.top/avatar.jpg",
		desc: "很有思考深度",
		siteurl: "https://theoyu.top/",
		tags: ["@CUMT"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Chunyang Li",
		imgurl: "https://lichunyang.top/images/self.jpg",
		desc: "秋月学姐~",
		siteurl: "http://lichunyang.top",
		tags: ["@CUMT"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Tim's Blog",
		imgurl: "https://www.zair.top/img/logo.png",
		desc: "20级大数据专业",
		siteurl: "https://www.zair.top/",
		tags: ["@CUMT"],
		weight: 1, 
		enabled: true, 
	},{
		title: "Hongkun Luo",
		imgurl: "https://files.seeusercontent.com/2026/03/28/r7Qr/logo.jpg",
		desc: "罗宏昆 20级测绘工程专业",
		siteurl: "https://luohongkun.top/scholar/",
		tags: ["@CUMT"],
		weight: 1,
		enabled: true,
	},{
		title: "Zhicheng Deng",
		imgurl: "https://avatars.githubusercontent.com/u/90995599?v=4",
		desc: "邓智城",
		siteurl: "https://dddddzc.github.io/",
		tags: ["@UESTC"],
		weight: 1,
		enabled: true,
	}
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
