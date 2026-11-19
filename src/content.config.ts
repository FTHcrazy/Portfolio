import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 作品集合。
 *
 * 目录约定：`src/content/works/<lang>/<slug>.md`
 *   - entry.id 形如 `zh/sample-01`
 *   - 语言 = id 的第一段，slug = 剩余部分
 * 中英文**必须同名**，slug 由此天然对齐，`switchLangPath` 才能正确互跳。
 */
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    /** 一句话卖点，详情页标题下方使用 */
    tagline: z.string(),
    /** 列表卡片用的短描述，控制在 60 字以内 */
    summary: z.string(),
    year: z.number(),
    /** 排序权重，越小越靠前，默认 99 */
    order: z.number().default(99),
    /** 是否进入首页 FEATURED 区块 */
    featured: z.boolean().default(false),
    role: z.string().optional(),
    duration: z.string().optional(),
    stack: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    /** 相对 public 的路径，例如 'media/covers/sample-01.svg'（严禁以斜杠开头） */
    cover: z.string(),
    coverAlt: z.string().default(''),
    demo: z
      .object({
        poster: z.string().optional(),
        video: z.string().optional(),
        url: z.string().optional(),
        note: z.string().optional(),
      })
      .optional(),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          caption: z.string().optional(),
          video: z.string().optional(),
        })
      )
      .default([]),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { works };
