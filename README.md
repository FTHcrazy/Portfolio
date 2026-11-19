# Portfolio — 个人作品集

一个「工程档案册」气质的个人作品集：作品简介、功能预览（截图 + 悬停自动播放的短视频）、
现场演示入口。纯静态输出，可直接部署到 GitHub Pages，中英双语，零 UI 框架、零外链字体。

技术栈固定为 **Astro 5.18.2 + React 18（单一筛选岛）+ TypeScript strict + 手写 CSS**。

> 本文件只做**上手引导**。工程规范（目录契约、路由与 i18n 规则、素材规范、样式规范、
> 构建与自检、漂移检测命令）的唯一产地是 **[`AGENTS.md`](./AGENTS.md)**；
> 两者冲突时以 `AGENTS.md` 为准。

---

## 本地开发

```bash
pnpm install     # 安装依赖
pnpm dev         # 本地开发服务器 http://localhost:4321
pnpm check       # astro check：类型 + Astro 诊断
pnpm build       # 构建到 dist/
pnpm preview     # 预览构建产物
```

`pnpm check` 与 `pnpm build` 是并列必跑项，两者都 0 error 才算通过。
包管理器固定为 pnpm 9.15.9（见 `package.json` 的 `packageManager` 字段）。

---

## 怎么加一个作品

### 第 1 步：建两个同名 md

中英文各一个，**文件名必须完全一致**，slug 由文件名决定，两种语言由此天然对齐：

```
src/content/works/zh/my-project.md
src/content/works/en/my-project.md
```

只写其中一种语言不会报错，但另一种语言的列表里会缺这一项。

### 第 2 步：填 frontmatter

字段定义在 `src/content.config.ts`，逐项说明：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | ✅ | 作品标题，列表与详情页大标题共用 |
| `tagline` | ✅ | 一句话卖点，显示在详情页标题下方 |
| `summary` | ✅ | 列表卡片描述，写短一点（上限见 `AGENTS.md` §6） |
| `year` | ✅ | 年份，显示在目录行与卡片元信息 |
| `order` | — | 排序权重，越小越靠前 |
| `featured` | — | 是否进首页 `02 / FEATURED`，建议只开 2 个 |
| `role` / `duration` | — | 你的角色 / 项目周期，详情页元数据表 |
| `stack` | — | 技术栈数组，目录行用 ` · ` 连接，参与搜索匹配 |
| `tags` | — | 标签数组，`/works` 筛选 chips 的来源；中英文各写各的 |
| `cover` | ✅ | 封面路径，**不以 `/` 开头**，例如 `media/covers/my-project.webp` |
| `coverAlt` | — | 封面替代文字，留空则回退为 `title` |
| `demo` | — | 现场演示：`{ poster, video, url, note }`，见下 |
| `gallery` | — | 功能预览：`[{ src, caption?, video? }]`，填了 `video` 的格子渲染为悬停视频 |
| `links` | — | 外部链接：`[{ label, href }]` |
| `draft` | — | `true` 时构建期完全跳过（列表 / 详情 / 首页都不出现） |

演示区三种形态：

- 有 `demo.url` → 渲染 16:10 iframe + 「新窗口打开」按钮；
- 只有 `demo.video` → 渲染悬停自动播放的短片 + 「演示可预约 / 本地运行」说明；
- 都没有 → 只显示说明文案 + 约演示的邮件按钮，不会出现假按钮。

**加悬停短视频**：把 mp4 放进 `public/media/demo/<slug>.mp4`，md 里填
`demo.video: media/demo/<slug>.mp4` —— 这两侧必须同时存在，否则 `AGENTS.md` §9
的孤儿素材检测会报「引用了但文件不存在」。

### 第 3 步：放素材

`public/media/` 下三个目录，分工固定（写进 md 的路径**不带前导 `/`**）：

- `covers/` — 封面图，列表卡片与详情页头部用
- `demo/` — hover 自动播放的短视频，只放视频
- `gallery/` — 详情页画廊图，以及与它配对的画廊视频

尺寸、格式、体积上限、ffmpeg 命令与 GitHub 红线**只写在 `AGENTS.md` §6**，此处不重复。

命名规则：文件名即 slug（`<slug>.<ext>`，如 `sample-01.webp`），同一作品的画廊多张用
`<slug>-a`、`<slug>-b`。

占位 `.svg` 可以入库且必须构建通过，它是脚手架产物、不是交付形态；
**上线前替换为 `.webp`（1600 × 1000）并同步改 md 里的路径**。

### 第 4 步：写正文

三段式小标题，中文 `## 背景 / ## 我做了什么 / ## 结果`，
英文 `## Context / ## What I built / ## Outcome`。

---

## 改个人信息

**只改 `src/data/profile.ts`。** 姓名、角色、一句话定位、城市、邮箱、社交链接、
技能分组、工作经历、bio 段落、最后更新日期都在那里，中英文各一份，改完全站生效
（页头、首页 Hero、关于页、页脚、meta 描述）。

`src/i18n/ui.ts` 只放**界面文案**（按钮、标题、提示语），不放个人事实。

## 改配色 / 排版

**只改 `src/styles/tokens.css`。** 纸色、墨色、朱砂强调色、字体栈、版心宽度、
字号尺度全部是 CSS 变量：

```css
--paper: #f6f4ee;   --ink: #14130f;   --accent: #b0392a;
--maxw: 1180px;     --pad: clamp(20px, 5vw, 64px);
```

组件样式在 `src/styles/components.css`（Astro 组件与 React 岛共用同一套类名），
基础排版与版心在 `src/styles/base.css`。

---

## 部署到 GitHub Pages（三步）

1. **建仓库并 push**：`main` 分支推到 GitHub。仓库名随意，`<owner>.github.io` 或任意项目名都可以。
2. **Settings → Pages → Source 选 `GitHub Actions`**（不要选 "Deploy from a branch"）。
3. **等 Actions 变绿**：`Deploy to GitHub Pages` 跑完后，站点地址在 deploy 步骤里给出。

`.github/workflows/deploy.yml` 已自动处理两种仓库形态：

| 仓库类型 | 线上地址 | base 路径（自动） |
| --- | --- | --- |
| 用户站 `<owner>.github.io` | `https://<owner>.github.io/` | `/` |
| 项目站 `<owner>/<repo>` | `https://<owner>.github.io/<repo>/` | `/<repo>/` |

判定逻辑读 `github.event.repository.name`，无需改代码；本地构建时这两个变量缺省为
`/` 与 `https://example.github.io`，也可以手动覆盖：

```bash
BASE_PATH=/my-repo/ SITE_URL=https://me.github.io pnpm build
BASE_PATH=/portfolio/ pnpm build && pnpm preview   # 子路径场景必验
```

**子路径安全**：站内链接与静态资源都经 `src/i18n/utils.ts` 的
`localizePath()` / `assetUrl()` / `switchLangPath()` 拼接（读 `import.meta.env.BASE_URL`），
源码里不存在写死的 `/works`、`/media/x.png`。React 岛内不读 `import.meta.env`，
所有路径由父级 Astro 组件算好后作为 props 传入。

---

## 已知限制

- **`og:image` 目前指向 SVG 占位封面**，微信 / 微博 / X 都不解析 SVG，分享卡片会没图。
  上线前换一张 1200×630 的 png 截图，并改 `BaseLayout.astro` 的 `ogImage` 默认值。
- **`theme-color` meta 已被移除**。它无法从 CSS 变量取值，写死就必然与 `--paper`
  形成两处同值硬编码，属于永久性漂移源（`AGENTS.md` §7 禁止硬编码颜色），而它只影响
  移动端地址栏着色，收益不抵维护成本。若将来要恢复，必须先把该色值抽成单一常量、
  再由 CSS 生成，不允许直接在 `<meta>` 里写 hex。
- **`demo.url` 指向的站点若设了 `X-Frame-Options` / `frame-ancestors`，iframe 会白屏**，
  此时只能靠「新窗口打开」按钮 —— 由被嵌入方决定，不能绕过。
- **演示视频依赖浏览器允许静音自动播放**；被拒绝时自动降级为 `poster` 静态图。
- 素材红线（单文件上限、站点总量、LFS 限制）见 `AGENTS.md` §6。

## 后续可以加

- 访问统计（Plausible / Umami，属外链脚本，须先改 `AGENTS.md` §2 的禁止项）
- 暗色模式（tokens 已是变量，加一组 `prefers-color-scheme` 覆盖即可）
- `@astrojs/sitemap` + 手写 RSS（同上，须先改 §2）
- 作品详情页的「相关内容」区块
