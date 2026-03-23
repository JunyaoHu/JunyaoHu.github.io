// @ts-check

import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { defineConfig } from 'astro/config';
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeMermaid from 'rehype-mermaid';
import rehypeComponents from "rehype-components";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import katex from "katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import rehypeCallouts from "rehype-callouts";
// import parseDirectiveNode from "remark-directive-rehype";
import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype.js";
import { GithubCardComponent } from "./src/plugins/rehype-component-github-card.mjs";
import { pluginLanguageBadge } from "expressive-code-language-badge"; /* Language Badge */
import { pluginCollapsible } from "expressive-code-collapsible"; /* Collapsible */
import mdx from '@astrojs/mdx';
import rehypeEmailProtection from "./src/plugins/rehype-email-protection.mjs";
import rehypeExternalLinks from "rehype-external-links";
import rehypeFigure from './src/plugins/rehype-figure.mjs';
import rehypeSpoiler from './src/plugins/rehype-spoiler.mjs';
import { remarkImageGrid } from "./src/plugins/remark-image-grid.js";

const site_url = 'https://junyaohu.github.io';

// https://astro.build/config
export default defineConfig({
	site: site_url,
	integrations: [
		sitemap(),
		icon({
			include: {
				"material-symbols": ["*"],
				"fa7-brands": ["*"],
				"fa7-regular": ["*"],
				"fa7-solid": ["*"],
				"simple-icons": ["*"],
				mdi: ["*"],
			},
		}),
		expressiveCode({
			themes: ["one-light", "one-dark-pro"],
			useDarkModeMediaQuery: false,
			themeCssSelector: (theme) => `[data-theme='${theme.name}']`,
			plugins: [
				pluginLanguageBadge(),
				pluginCollapsibleSections(),
				pluginLineNumbers(),
				pluginCollapsible(),
			],
			defaultProps: {
				wrap: false,
				overridesByLang: {
					shellsession: {
						showLineNumbers: false,
					},
				},
			},
			styleOverrides: {
				borderRadius: "0.75rem",
				codeFontSize: "0.875rem",
				codeFontFamily:
					"'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
				codeLineHeight: "1.5rem",
				frames: {},
				textMarkers: {
					delHue: "0",
					insHue: "180",
					markHue: "250",
				},
				languageBadge: {
					fontSize: "0.75rem",
					fontWeight: "bold",
					borderRadius: "0.25rem",
					opacity: "1",
					borderWidth: "0px",
					borderColor: "transparent",
				},
			},
			frames: {
				showCopyToClipboardButton: true,
			},
		}),
		mdx(),
	],
	markdown: {
	// 	// Shiki 会先处理代码块；若不排除 mermaid，会变成高亮 HTML，rehype-mermaid 就识别不到 language-mermaid
		// syntaxHighlight: {
		// 	type: 'shiki',
	// 		excludeLangs: ['mermaid'],
		// },
		remarkPlugins:
			[
				remarkMath,
				remarkImageGrid,
				remarkDirective, 
				parseDirectiveNode
			],
		rehypePlugins: [
			[rehypeKatex, { katex, strict: false }],
			[rehypeCallouts, { theme: "obsidian" }],
			rehypeSlug,
			// 		rehypeMermaid,
			rehypeFigure,
			// [rehypeExternalLinks, { siteUrl: site_url }],
			// [rehypeEmailProtection, { method: "base64" }], 
			[
				rehypeComponents,
				{
					components: {
						github: GithubCardComponent,
					},
				},
			],
			rehypeSpoiler,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					properties: {
						className: ["anchor"],
					},
					content: {
						type: "element",
						tagName: "span",
						properties: {
							className: ["anchor-icon"],
							"data-pagefind-ignore": true,
						},
						children: [
							{
								type: "text",
								value: "#",
							},
						],
					},
				},
			],
		]
	},
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	},
});
