# AGENTS.md — Portfolio 工程规范

本文件是本仓库**唯一**的工程规范，也是代码评审与 AI Agent 改动的验收依据。
面向：写代码的人、写内容的人、在本仓库自动改文件的 Agent。

## 1. 这是什么

一个**纯静态的个人作品集站**：用 Markdown 描述作品 → 构建成中英双语静态站 → 部署到 GitHub Pages，对外展示作品简介、功能预览（截图 + 悬停自动播放短视频）与现场演示。

三条不可让步的约束：

| # | 约束 | 为什么 | 违反后果 |
| --- | --- | --- | --- |
| 1 | 产物必须是纯静态文件，可直接拖进 GitHub Pages | 没有服务器、没有运维、没有预算 | 任何 SSR / adapter / Node 运行时都会让部署直接失败 |
| 2 | 加一个作品 = 只写 Markdown + 放素材，不改代码 | 内容更新不能依赖开发者本人 | 一旦发作品要改 `.astro`，站点半年后就废弃 |
| 3 | 中英双语始终成对，任何对外可见内容都有 zh 与 en | 一半语言缺失比没有英文更损害可信度 | 单语文件会造成空白卡片、互跳 404 |

## 2. 技术栈与版本锚点

| 包 | 版本（`package.json` 中精确钉住，**不带** `^` / `~`） | 用途 |
| --- | --- | --- |
| `astro` | `5.18.2` | 静态站框架，全部渲染在构建期完成 |
| `@astrojs/react` | `4.4.2` | 唯一允许的水合岛集成 |
| `react` / `react-dom` | `18.3.1` | 岛运行时 |
| `@types/react` | `18.3.12` | 类型 |
| `@types/react-dom` | `18.3.1` | 类型 |
| `typescript` | `5.7.2` | `strict` + `noUncheckedIndexedAccess` |
| `pnpm` | `9.15.9`（`packageManager` 字段） | 唯一包管理器 |

**允许升级的唯一条件**：同时满足 ① 有安全公告或线上已复现的缺陷；② 只进补丁/次版本；③ `pnpm build` 通过且 `pnpm preview` 手测通过；④ 单独一个 PR 写清理由。
`astro` 主版本升级不属于常规升级，必须另开专项 PR 并在描述里附迁移 diff。

**禁止项**（出现即结构漂移，评审直接拒绝）：

- 引入 UI 组件库：`tailwindcss` / `@mui/*` / `@chakra-ui/*` / `bootstrap` / `antd` / `daisyui`。
- 引入任何外链字体（`fonts.googleapis.com` / `fonts.gstatic.com` / 字体 CDN）；字体只用系统栈。
- 引入新框架（Vue/Svelte/Solid/Qwik/Next/Nuxt…）或额外 Astro 集成（sitemap / mdx / image…），除非另开 PR 并同步更新本文件。
- 开启 `output: 'server'`，或引入 `@astrojs/node|vercel|netlify` 等适配器。
- 把 `astro` 升到 6.x / 7.x，把 `react` 升到 19.x。

## 3. 目录契约

| 路径 | 放什么 | 禁止放什么 |
| --- | --- | --- |
| `astro.config.mjs` `tsconfig.json` `package.json` `.gitignore` `README.md` | 工程配置与文档 | 业务代码、组件、素材 |
| `.github/workflows/deploy.yml` | 唯一部署入口 | 第二个部署 workflow |
| `public/favicon.svg` `public/robots.txt` | 站点级静态文件 | — |
| `public/media/covers/` | 封面图（纯图片），构建期零处理 | 视频 |
| `public/media/gallery/` | 详情页画廊静帧与与它配对的画廊视频 | 封面 |
| `public/media/demo/` | hover 自动播放的短视频（`.mp4` / `.webm`） | 图片 |
| `src/content.config.ts` | `works` 集合 schema 的**唯一**产地 | 在别处再定义一份 schema 或字段校验 |
| `src/content/works/{zh,en}/*.md` | 作品正文与 frontmatter | 其它集合、非 md 文件 |
| `src/i18n/ui.ts` | 界面文案字典（中英两套完整 key） | 组件里硬编码界面文案 |
| `src/i18n/utils.ts` | `getLangFromUrl` / `useTranslations` / `localizePath` / `assetUrl` / `switchLangPath` | 业务逻辑、数据请求 |
| `src/data/profile.ts` | 个人资料**唯一编辑点**（姓名、简介、社交链接） | 组件里写死个人信息 |
| `src/layouts/BaseLayout.astro` | 唯一 `<html>/<head>/<body>` 宿主，含 `lang`、hreflang、meta | 第二个 layout 重复实现 head |
| `src/components/*.astro` | 可复用视觉单元（`MediaFrame`、`WorkCard`、`SiteHeader`…） | import views / pages |
| `src/components/react/*.tsx` | **只放需要状态的交互岛**（当前唯一：`WorksExplorer.tsx`） | 纯展示组件（用 `.astro`） |
| `src/views/*.astro` | 页面级组合，接收 `lang` prop | 被其它 view 引用 |
| `src/pages/` | **薄壳路由**：`getStaticPaths` + 渲染对应 view | 业务 UI、`<section>`、`<h1>`、布局样式 |
| `src/styles/{tokens,base,components}.css` | 令牌 / 重置与排版 / 组件类 | 单组件私有样式（写在 `.astro` 的 scoped style） |

四条铁律，违反即返工：

1. **pages 只做薄壳** —— pages 里出现 `<section>`/`<h1>`/布局 class 就是漂移。理由：路由要能被"换语言/换 slug"零成本复制，业务一变就得改两遍。
2. **views 只被 pages 引用** —— view 之间互相 import 会形成隐式页面依赖，改一个页面炸三个；共用部分抽到 `components/`。
3. **components 不 import views / pages** —— 反向依赖会让组件无法独立预览与测试。
4. **一律相对导入，禁止路径别名** —— Astro 下 `tsconfig` 的 `paths` 要真正生效还得挂一个 Vite 解析插件，收益不抵这层配置面；`../../i18n/utils` 的长度是可接受的。

## 4. 路由与 i18n 规则

| 页面 | zh（默认，无前缀） | en | 薄壳文件（两语言各一份） |
| --- | --- | --- | --- |
| 首页 | `/` | `/en/` | `src/pages/index.astro` / `src/pages/en/index.astro` |
| 作品列表 | `/works/` | `/en/works/` | `src/pages/works/index.astro` / `src/pages/en/works/index.astro` |
| 作品详情 | `/works/<slug>/` | `/en/works/<slug>/` | 同名，`slug` 由内容集合生成 |
| 关于 | `/about/` | `/en/about/` | `src/pages/about.astro` / `src/pages/en/about.astro` |

- 站内链接只允许 `localizePath('works/', lang)` 生成（**签名是 `(path, lang)`，禁止调换** —— 两个参数都是 `string`，TypeScript 抓不到错序，照错序写会静默生成 `/en/works/` 这种错链接）；素材路径只允许 `assetUrl('media/covers/x.webp')` 生成。二者内部已拼好 `import.meta.env.BASE_URL`。
- **尾斜杠是硬约束，三条同时成立**：(a) `astro.config.mjs` 必须设 `trailingSlash: 'always'`；(b) `localizePath()` 恒产出以 `/` 结尾的路径，首页就是 `BASE_URL` 本身（`/` 或 `/repo/`）；(c) `<link rel="canonical">`、`hreflang` alternates、`og:url` 恒为**带尾斜杠的绝对 URL**。理由：`/works` 与 `/works/` 若都能访问、都能被索引，就是一式两份互相稀释排名，且 hreflang 会指向一个非规范地址。
- **禁止在 `src/` 任何位置写死根路径**：`href="/works/"`、`src="/media/..."` 在项目站（`/repo/`）下一律 404。
- 新增页面必须一次改三处：`src/views/X.astro`（接收 `lang`）+ `src/pages/X.astro` + `src/pages/en/X.astro`，并在 `BaseLayout` 输出的 `hreflang` 列表里成对登记。只做单语言 = 结构漂移。
- 新增任何界面文案必须同时在 `ui.ts` 的 `zh` 与 `en` 补 key，且两边 key 集合完全一致；缺 key 时页面会直接把 key 字符串渲染出来。
- 语言只从 URL 推导（`getLangFromUrl(Astro.url)`）；组件不接收语言开关，只接收解析好的 `lang` 与已翻译字符串。
- md 里素材字段写相对路径（`media/covers/x.webp`，**不带前导 `/`**），渲染时必须过 `assetUrl()`。

## 5. BASE 路径铁律

GitHub Pages 项目站在 `https://<owner>.github.io/<repo>/` 提供服务，构建 base 为 `/<repo>/`。因此：

- 写死 `/media/a.webp` 的请求会打到域名根，**全站图片与内链 404**；而本地 `pnpm dev`（base=`/`）完全正常 —— 这是本项目最容易在合并后才暴露的故障。
- `import.meta.env.BASE_URL` **已自带首尾斜杠**（`/` 或 `/portfolio/`）。拼接直接写 `` `${BASE_URL}media/a.webp` ``，不要再补 `/`（双斜杠会让部分路径在 Pages 上失效）。
- **尾斜杠同理必须钉死**：`trailingSlash: 'always'`、`localizePath()` 结尾恒有 `/`、canonical / `hreflang` / `og:url` 恒为带尾斜杠的绝对 URL（见第 4 节）。Pages 对 `/works` 与 `/works/` 都能返回 200，不钉死就是两份可索引内容。
- React 岛内**禁止读 `import.meta.env`**：岛要能脱离 Astro 单独渲染/测试，环境缺失时会静默拼出 `undefined/media/...`。base 相关的 URL 一律由 `.astro` 侧算好，通过 props 传入。
- base 与 site 由 CI 依仓库名判定：仓库名为 `<owner>.github.io` → `/`，否则 `/<repo>/`；本地用 `BASE_PATH` / `SITE_URL` 覆盖。
- 本地必须验子路径：`BASE_PATH=/portfolio/ pnpm build && pnpm preview`，并访问带 `/portfolio/` 前缀的地址。只验 `/` 视为未验证。

## 6. 内容与素材规范

字段以 `src/content.config.ts` 为准，本表只解释用法：

| 字段 | 必填 | 含义与用法 |
| --- | --- | --- |
| `title` | ✅ | 作品名，列表与详情标题 |
| `tagline` | ✅ | 一句话卖点，详情页标题下方 |
| `summary` | ✅ | 列表卡片短描述，≤ 60 字 |
| `year` | ✅ | 数字年份，用于展示与排序 |
| `order` | 默认 `99` | 越小越靠前；列表、首页都按它排 |
| `featured` | 默认 `false` | 进入首页 FEATURED 区块 |
| `role` / `duration` | — | 详情页「角色 / 周期」元信息 |
| `stack[]` / `tags[]` | 默认 `[]` | 技术栈与标签；`tags` 同时驱动列表筛选 |
| `cover` | ✅ | 封面路径，相对 `public`，**不带前导 `/`** |
| `coverAlt` | 默认 `''` | 封面替代文本；留空视为 a11y 缺陷 |
| `demo{poster,video,url,note}` | — | 现场演示块：poster 图 / 悬停自动播视频 / 外链 / 说明 |
| `gallery[{src,caption,video}]` | 默认 `[]` | 详情页功能预览；某项带 `video` 即渲染为悬停自动播 |
| `links[{label,href}]` | 默认 `[]` | 外部链接（案例复盘、仓库、文章） |
| `draft` | 默认 `false` | `true` 时**不进构建产物**（列表/详情/首页全部过滤） |

- **slug 规则**：文件名即 URL。只允许小写字母、数字、连字符：`sample-01` ✅，`Sample_01` ❌。改名等于换 URL，必须同步排查外部引用。
- **双语成对**：`zh/<slug>.md` 与 `en/<slug>.md` 必须同名同存。entry id 形如 `zh/sample-01`，语言取第一段、slug 取其余；这是 `switchLangPath` 能互跳的前提。
- **尺寸与格式**：封面与画廊均 16:10（1600×1000），上线用 `.webp`，单张 ≤ 300 KB。**占位 `.svg` 允许入库，且必须构建通过** —— 它是脚手架产物，不是交付形态；上线前替换为 `.webp`（1600×1000）并同步改 md 里的路径。占位与真图共存期间构建必须一直是绿的。
- **素材命名**：文件名即 slug，`<slug>.<ext>`；同一作品的画廊多张用 `<slug>-a`、`<slug>-b`。slug 只用小写字母、数字、连字符，不加大写、下划线、空格、`works-` 之类前缀（目录已经表达了用途，前缀只会让 md 里的路径变长）。
- **视频**：H.264 mp4、无音轨、≤ 5 MB、6–12 秒；播放必须带 `muted` + `loop` + `playsinline` + `poster` + `preload="none"`。**超过 5 MB 不许进仓库**，改用 `demo.url` 外链（YouTube / B 站 / 对象存储）。
- **红线**：GitHub 单文件 ≤ 100 MB，Pages 站点总量建议 < 1 GB，**Pages 不支持 Git LFS** —— 提交 LFS 指针文件会导致线上 404。
- 截图必须脱敏，不含真实用户数据。

**三个素材目录的分工**（均在 `public/media/` 下，写进 md 时路径不带前导 `/`）：

- `covers/` → 封面图，列表卡片与详情页头部用；字段 `cover`（`demo.poster` 可复用同一张）。只放图。
- `demo/` → hover 自动播放的短视频；字段 `demo.video`。只放视频，不放图片。目录空时根本不入库（git 不跟踪空目录），**第一个 mp4 落进去它才真正存在**；不要放 `.gitkeep` 占位（会被第 9 节 9b 报成未引用素材）。
- `gallery/` → 详情页画廊静帧与跟它配对的画廊视频；字段 `gallery[].src` / `gallery[].video`。放图与其配对视频。
- 素材规范的唯一产地是本文件：不要在 `public/` 下或项目 `README.md` 里复制尺寸、格式、体积上限这些数字——副本一定会过期且没人会去改它。

## 7. 样式规范

设计概念「工程档案册」：直角、1px 描边分隔、无阴影、等宽小标题、两位编号分区，朱砂色只用于编号/链接/引用块。

| 令牌 | 用途 |
| --- | --- |
| `--paper` / `--paper-raised` | 页面底色 / 卡片与代码块底色 |
| `--ink` / `--ink-2` / `--ink-3` | 正文 / 次要说明 / 元信息与占位 |
| `--line` | 所有 1px 描边与分隔线（唯一允许的描边色） |
| `--accent` / `--accent-soft` | 朱砂强调 / 引用块与标签底色 |
| `--font-sans` / `--font-mono` | 正文 / 编号、小标题、代码 |
| `--maxw` / `--pad` | 内容最大宽度 / 页面左右内边距 |

- **禁止硬编码颜色**：`.astro`、`.tsx`、`components.css` 里出现 `#rrggbb` / `rgb()` 即漂移。例外仅两处：`tokens.css` 的令牌定义、`public/` 内的 SVG 素材。
- **禁止 `!important`**：需要它就说明选择器分层错了，改类名而不是加压。
- **禁止在 `.tsx` 里写业务外观**（布局、间距、颜色、字号）。岛只负责状态，外观类来自 `components.css`。
- 移动端断点只准 `900px` 与 `720px`（`max-width`）；新增断点必须先改本节。
- 必须处理 `@media (prefers-reduced-motion: reduce)`：关闭 hover 视频自动播与所有位移/淡入过渡，视频保留 poster 静态展示。
- 焦点必须可见：`:focus-visible` 要有明确轮廓，禁止裸 `outline: none`。

## 8. 组件与水合规则

**新增 React 岛的准入条件**（满足其一才允许，否则用 `.astro`）：① 需要局部状态（筛选、展开、拖拽）；② 需要事件驱动的 DOM 逻辑（键盘导航、观察器）；③ 纯 CSS 无法实现（如多值组合筛选）。

- 不满足则一律用 `.astro`；一次性交互（详情页 lightbox）用原生 `<dialog>` + 内联脚本，**不引入 React**。
- 每个岛必须显式声明 `client:*` 策略并在注释里写明理由。默认 `client:visible`（进视口才加载）；只有首屏必须立即响应输入才用 `client:load`；禁止 `client:only`（会丢服务端渲染出的静态内容）。
- `MediaFrame` 是**唯一**媒体渲染入口（封面、画廊、演示视频、悬停自动播）。页面与 view 里禁止裸写 `<img>` / `<video>` —— 否则尺寸、懒加载、`poster`、`muted` 等属性会在各页面不一致。
- 岛必须无 JS 可降级：筛选的初始结果由构建期渲染（`client:visible` 的 SSR 输出即完整列表），JS 只做增强。
- 岛不接收语言开关，只接收 `lang` 与已翻译字符串。

## 9. 构建与自检

```bash
pnpm install          # 首次 / 依赖变更后
pnpm dev              # 本地开发，http://localhost:4321
pnpm check            # astro check：类型 + Astro 诊断，必须 0 error
pnpm build            # 产物在 dist/，必须 0 error
pnpm preview          # 预览构建产物（验证 base 的唯一方式）
BASE_PATH=/portfolio/ pnpm build && pnpm preview   # 子路径场景必做
```

`pnpm check` 与 `pnpm build` 是**并列必跑项**，两者都 0 error 才算通过。`astro build` 不做类型检查，只跑 build 等于没验类型。**`pnpm check` 报错就修代码或修类型**，禁止删掉 `check` 脚本、禁止整片 `@ts-ignore` / `@ts-expect-error` 压过去来"绕开"——那只是把错误挪到运行时。它依赖 `@astrojs/check` + `typescript`，两者必须是 `devDependencies` 里的精确版本（同第 2 节）；`pnpm check` 报 "command not found / 未安装" 就是依赖漏了，补依赖而不是把这条从本节删掉。

**漂移检测**：提交前逐条运行，**任何一条有输出都视为结构漂移**，必须修掉或在 PR 里明示为例外。

```bash
# 1) 写死根路径（应无输出）
grep -rnE '(href|src)="/' src | grep -vE '="/(/|https?:)'
# 2) 外链字体（应无输出）
grep -rnE 'fonts\.(googleapis|gstatic)\.com' src public
# 3) 被禁依赖（应无输出）
grep -niE '(tailwind|@mui|chakra|bootstrap|antd)' package.json
# 4) 双语缺对（应无输出）
diff <(ls src/content/works/zh) <(ls src/content/works/en)
# 5) 图片缺 alt（应无输出）；-z 让整个文件当一条记录，跨行 <img> 也能整体命中
grep -rzoE '<img[^>]*>' src | tr '\n' ' ' | tr '\0' '\n' | grep -v 'alt='
# 6) pages 里写了业务 UI（应无输出）
grep -rnE '<(section|h1)' src/pages
# 7) 页面/view 里裸写媒体标签（应无输出）
grep -rnE '<(img|video)' src/pages src/views
# 8) 硬编码颜色（应无输出；只扫 .astro/.tsx，.css 令牌定义不受影响）
grep -rnE '#[0-9a-fA-F]{3,8}' src --include='*.astro' --include='*.tsx'
# 9) 孤儿素材，双向报告（素材新增/删除后必跑；纯 grep+find+comm，不依赖 node_modules）
#    引用侧 = md frontmatter 里的 cover / demo.poster|video / gallery[].src|video
#    实际侧 = public/media 下真实存在的文件
# 9a) 引用了但不存在的文件（应无输出）
comm -23 <(grep -rhoE '(cover|poster|video|src): *media/[^[:space:]]+' src/content/works | sed -E 's/^[a-z]+: *//' | sort -u) \
         <(find public/media -type f | sed 's|^public/||' | sort -u)
# 9b) 存在但没人引用的文件（应无输出）
comm -13 <(grep -rhoE '(cover|poster|video|src): *media/[^[:space:]]+' src/content/works | sed -E 's/^[a-z]+: *//' | sort -u) \
         <(find public/media -type f | sed 's|^public/||' | sort -u)
```

第 5 条命中即为真缺 `alt`，多行标签不会再误报（旧版逐行 grep 的误报已消除）；但注释里出现的 `<img>` 字样同样会被计入，改注释措辞，**不要为它加白名单**。
第 4、9 条用 bash 进程替换（Git Bash 是约定 shell）；第 9 条抓两类静默故障：md 写了素材路径但文件没提交（线上 404，构建不报错）、素材提交了却没人引用（`dist/` 多一份无用文件），双向都要看。
**新增规则必须同时新增（或扩展）一条检测命令**；只写规则不加检测，视为规则未落地。

## 10. 变更流程（Checklist）

**新增一个作品**
1. `src/content/works/zh/<slug>.md` 写 frontmatter + 正文。
2. `src/content/works/en/<slug>.md` 同名文件，字段一一对应。
3. 素材按第 6 节的分工放：封面进 `covers/`、悬停短视频进 `demo/`、画廊图与画廊视频进 `gallery/`，路径写进 md（不带前导 `/`）。
4. 需要动态预览时再加 ≤ 5 MB 的 mp4 与 poster；否则只填 `demo.url`。
5. `pnpm check` 与 `pnpm build` 均 0 error + 第 9 节 9 条检测全绿。
6. 用 `content/<slug>` 分支单独提交（素材与代码分开）。

**新增一个页面**
1. `src/views/X.astro` 接收 `lang` prop，只用 components 组合。
2. `src/pages/X.astro` 与 `src/pages/en/X.astro` 两个薄壳，各自传 `lang`。
3. `src/i18n/ui.ts` 补齐两个语言的文案 key。
4. 在 `BaseLayout` 的 hreflang 列表中成对登记。
5. 需要导航入口时改 `SiteHeader`（不是改 pages）。
6. 第 9 节检测全绿。

**新增一个语言**
1. `astro.config.mjs` 的 `i18n.locales` 加 locale。
2. `src/i18n/utils.ts` 的 `Lang` 类型与 `assetUrl`/`switchLangPath` 分支同步。
3. `src/i18n/ui.ts` 补完整 key 集合（缺一个就会漏文案）。
4. `src/content/works/<lang>/` 全量同名 md。
5. `src/pages/<lang>/` 全部薄壳。
6. 第 9 节检测全绿（第 4 条需同步改语言目录）。

**改配色 / 排版**
1. 只改 `src/styles/tokens.css`。
2. 检查 `components.css` 与 `.astro` scoped style 内无硬编码颜色。
3. 用对比度工具确认正文 ≥ 4.5:1、大字 ≥ 3:1。
4. 第 9 节第 8 条检测全绿。

**升级依赖**
1. 单独分支 `chore/deps-<pkg>`。
2. 改 `package.json`，保持精确版本（不加 `^`/`~`）。
3. `pnpm install` 后 `pnpm build` + `pnpm preview` 手测列表页、详情页、筛选、lightbox。
4. 第 9 节检测全绿 + 记录构建体积变化。
5. PR 描述写清升级理由与回滚方式。

## 11. 提交与协作

- 分支：`feat/<scope>`、`fix/<scope>`、`content/<slug>`、`chore/<scope>`。
- **一次提交只做一类事**：素材与代码分开提交，样式重构与内容更新不要混在一个 commit。
- 提交信息说明「做了什么 + 为什么」，不写 "update"/"fix bug" 这类无信息量描述。
- PR 描述必须附第 9 节「漂移检测」的结果（全绿就写"9 条全绿"）与 `pnpm check` + `pnpm build` 结论。
- 单人维护也至少保留可回溯的提交粒度；合并前自检不过不许合。

## 12. 已知限制（不进当前范围）

| 限制 | 影响 | 后续可加 |
| --- | --- | --- |
| `og:image` 现为 SVG | 微信/微博/X 不解析 SVG，分享卡片无图 | 补 1200×630 png |
| 无访问统计 | 不知道哪些作品被看 | Plausible / Umami（外链脚本，须先改第 2 节） |
| 无暗色模式 | 夜间阅读偏亮 | 加 `prefers-color-scheme` 令牌组，只改 `tokens.css` |
| 无 RSS / sitemap | 无法订阅、收录较差 | 加 `@astrojs/sitemap` + 手写 rss（须先改第 2 节） |
| 无站内搜索 | 作品多了只能靠标签筛选 | 静态索引方案，暂不做 |

---

**本文件优先级**：与 `README.md` 冲突时以本文件为准（`README.md` 只做上手引导）；新增规则必须同步落到第 9 节的「漂移检测」命令。
