/**
 * Tailwind / @tailwindcss/typography 主题扩展
 * 由 src/styles/global.css 顶部的 @config 引入
 */
/** @type {import('tailwindcss').Config} */
export default {
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						// 关闭 typography 默认在行内 code 两侧画的反引号（见插件 styles.js）
						'code::before': { content: 'none' },
						'code::after': { content: 'none' },
						// 关闭引用块两侧自动加的弯引号（blockquote + ::before/::after）
						blockquote: {
							quotes: 'none',
						},
						'blockquote p:first-of-type::before': { content: 'none' },
						'blockquote p:last-of-type::after': { content: 'none' },
					},
				},
			},
		},
	},
};
