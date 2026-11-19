/**
 * 界面文案字典 —— 唯一的多语言文案编辑点。
 *
 * 约定：
 * - key 用 `区块.用途` 命名，扁平字符串。
 * - 中文（zh）是基准，新增 key 必须同时补齐 en。
 * - 这里只放**界面文案**；作品内容在 src/content/works/，个人资料在 src/data/profile.ts。
 */

export const languages = {
  zh: '中文',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'zh';

export const ui = {
  zh: {
    // 通用（姓名 / 角色 / 定位等个人资料在 src/data/profile.ts）
    'site.skipToContent': '跳到主要内容',
    'nav.works': '作品',
    'nav.about': '关于',
    'nav.home': '首页',
    'nav.primary': '主导航',
    'lang.switchLabel': '切换语言',
    'lang.other': 'EN',
    'lang.self': 'ZH',
    'footer.contactHeading': '聊聊你的项目',
    'footer.contactHint': '一般两个工作日内回信。',
    'footer.social': '社交',
    'footer.rights': '保留所有权利',
    'footer.updated': '最后更新',
    'footer.builtWith': '静态构建 · Astro',

    // 首页
    'home.kicker': 'PORTFOLIO / 2026',
    'home.selected.number': '01',
    'home.selected.title': 'SELECTED WORKS',
    'home.selected.note': '按时间倒序，点任意一行进入详情。',
    'home.featured.number': '02',
    'home.featured.title': 'FEATURED',
    'home.featured.note': '挑一个细看：从问题，到做出来，到结果。',
    'home.about.number': '03',
    'home.about.title': 'ABOUT',
    'home.about.more': '更多关于我',
    'home.allWorks': '查看全部作品',

    // 作品索引
    'works.title': '作品',
    'works.lead':
      '做过的产品与工具。点开一个，能看到它解决的问题、用起来的样子，以及最后留下什么。',
    'works.count': '项',
    'works.filterLabel': '按标签筛选',
    'works.all': '全部',
    'works.searchLabel': '搜索作品',
    'works.searchPlaceholder': '标题、技术栈或描述…',
    'works.resultCount': '共 {n} 项',
    'works.empty': '没有匹配的作品。试试清空关键词或换一个标签。',
    'works.clear': '清空筛选',
    'works.year': '年份',

    // 详情页
    'work.backToWorks': '全部作品',
    'work.meta.role': '角色',
    'work.meta.duration': '周期',
    'work.meta.stack': '技术栈',
    'work.meta.links': '链接',
    'work.preview.number': '01',
    'work.preview.title': '功能预览',
    'work.preview.note': '点任意一图放大，← → 翻页，Esc 关闭。',
    'work.demo.number': '02',
    'work.demo.title': '现场演示',
    'work.demo.openNew': '新窗口打开演示',
    'work.demo.iframeTitle': '现场演示',
    'work.nav.prev': '上一个',
    'work.nav.next': '下一个',
    'work.nav.label': '作品导航',
    'work.gallery.figure': '图',
    'work.lightbox.close': '关闭',
    'work.lightbox.prev': '上一张',
    'work.lightbox.next': '下一张',

    // 关于
    'about.title': '关于',
    'about.skills.number': '01',
    'about.skills.title': 'SKILLS',
    'about.timeline.number': '02',
    'about.timeline.title': 'EXPERIENCE',
    'about.contact.number': '03',
    'about.contact.title': 'CONTACT',
    'about.contact.note': '邮件最快。合作、提问、或者只是聊聊都可以。',

    // 404
    '404.title': '页面不存在',
    '404.lead': '这个地址没有内容 —— 可能是链接过期，也可能是我改过路径。',
    '404.back': '回到首页',
    '404.suggest': '或者从这几个作品开始',
    '404.otherLang': 'English site →',
  },

  en: {
    // General (name / role / positioning live in src/data/profile.ts)
    'site.skipToContent': 'Skip to main content',
    'nav.works': 'Works',
    'nav.about': 'About',
    'nav.home': 'Home',
    'nav.primary': 'Primary',
    'lang.switchLabel': 'Switch language',
    'lang.other': 'ZH',
    'lang.self': 'EN',
    'footer.contactHeading': 'Tell me about your project',
    'footer.contactHint': 'I usually reply within two working days.',
    'footer.social': 'Elsewhere',
    'footer.rights': 'All rights reserved',
    'footer.updated': 'Last updated',
    'footer.builtWith': 'Statically built · Astro',

    // Home
    'home.kicker': 'PORTFOLIO / 2026',
    'home.selected.number': '01',
    'home.selected.title': 'SELECTED WORKS',
    'home.selected.note': 'Newest first. Open any row for the full write-up.',
    'home.featured.number': '02',
    'home.featured.title': 'FEATURED',
    'home.featured.note': 'One to read closely: problem, build, outcome.',
    'home.about.number': '03',
    'home.about.title': 'ABOUT',
    'home.about.more': 'More about me',
    'home.allWorks': 'All works',

    // Works index
    'works.title': 'Works',
    'works.lead':
      'Products and tools I have built. Open one to see the problem it solves, what it is like to use, and what it left behind.',
    'works.count': 'projects',
    'works.filterLabel': 'Filter by tag',
    'works.all': 'All',
    'works.searchLabel': 'Search works',
    'works.searchPlaceholder': 'Title, stack, or summary…',
    'works.resultCount': '{n} shown',
    'works.empty': 'Nothing matches. Try clearing the keyword or picking another tag.',
    'works.clear': 'Clear filters',
    'works.year': 'Year',

    // Work detail
    'work.backToWorks': 'All works',
    'work.meta.role': 'Role',
    'work.meta.duration': 'Duration',
    'work.meta.stack': 'Stack',
    'work.meta.links': 'Links',
    'work.preview.number': '01',
    'work.preview.title': 'Function preview',
    'work.preview.note': 'Click any image to enlarge. Arrow keys page, Esc closes.',
    'work.demo.number': '02',
    'work.demo.title': 'Live demo',
    'work.demo.openNew': 'Open demo in a new window',
    'work.demo.iframeTitle': 'Live demo',
    'work.nav.prev': 'Previous',
    'work.nav.next': 'Next',
    'work.nav.label': 'Work navigation',
    'work.gallery.figure': 'Fig',
    'work.lightbox.close': 'Close',
    'work.lightbox.prev': 'Previous image',
    'work.lightbox.next': 'Next image',

    // About
    'about.title': 'About',
    'about.skills.number': '01',
    'about.skills.title': 'SKILLS',
    'about.timeline.number': '02',
    'about.timeline.title': 'EXPERIENCE',
    'about.contact.number': '03',
    'about.contact.title': 'CONTACT',
    'about.contact.note': 'Email is fastest — for work, questions, or just to talk.',

    // 404
    '404.title': 'Page not found',
    '404.lead': 'Nothing lives at this address — the link may be stale, or I moved the path.',
    '404.back': 'Back to home',
    '404.suggest': 'Or start from one of these',
    '404.otherLang': '中文站点 →',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh'];
