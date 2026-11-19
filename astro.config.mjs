// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

/**
 * GitHub Pages 部署关键变量：
 * - BASE_PATH 必须以 / 开头并以 / 结尾（用户站为 `/`，项目站为 `/repo-name/`）
 * - SITE_URL 不带结尾斜杠（用于 sitemap / og:url 等绝对地址拼接）
 * 两者均可通过环境变量覆盖，CI 中由 .github/workflows/deploy.yml 自动判定。
 */
const BASE_PATH = process.env.BASE_PATH ?? '/';
const SITE_URL = process.env.SITE_URL ?? 'https://example.github.io';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  // 尾斜杠钉死为 'always'：/works 与 /works/ 在 Pages 上都返回 200，
  // 不钉死就是一式两份可索引内容（AGENTS.md §4 / §5）
  trailingSlash: 'always',
  build: {
    // 输出 /works/index.html 形式的目录索引，GitHub Pages 静态托管友好
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [react()],
  vite: {
    build: {
      // 站点极轻量，关闭不必要的预加载轮询
      cssCodeSplit: false,
    },
  },
});
