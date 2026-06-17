import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional().default(''),
			// Transform string to Date object
			publishedDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			/** 列表卡片上的分类文案，如「博客指南」 */
			category: z.string().optional().default(''),
			/** 列表卡片底部标签，无需写 # */
			tags: z.array(z.string()).optional().default([]),
			/** 为 false 时不显示该文评论区 */
			comment: z.boolean().optional().default(true),
		}),
});

export const collections = { blog };
