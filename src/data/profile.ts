import type { Lang } from '../i18n/ui';

/**
 * 个人资料 —— **唯一编辑点**。
 *
 * 姓名、角色、一句话定位、城市、邮箱、社交链接、技能、经历、简历段落都在这里，
 * 中英文各一份。改完保存即全站生效（页头 / 首页 Hero / 关于页 / 页脚 / meta 描述）。
 *
 * 不要把这些内容写回 `src/i18n/ui.ts` —— 那里只放界面文案。
 */

export interface SocialLink {
  /** 展示名，例如 `GitHub` */
  label: string;
  /** 账号或地址的简短展示形式 */
  handle: string;
  /** 完整外链，必须以 http(s):// 开头 */
  href: string;
}

export interface SkillGroup {
  /** 分组名，例如 `前端` / `Frontend` */
  label: string;
  items: string[];
}

export interface TimelineEntry {
  /** 年份或区间，例如 `2023 — 至今` */
  period: string;
  title: string;
  org: string;
  description: string;
}

export interface ProfileCopy {
  name: string;
  role: string;
  /** 用于 `<meta name="description">` 与 og:description */
  metaDescription: string;
  /** 首页 Hero 的一句话定位，控制在 46 个字符宽以内会更好排 */
  tagline: string;
  location: string;
  /** 当前状态，例如「目前接受 2026 年 Q2 的合作」 */
  status: string;
  /** 首页 03 / ABOUT 区块用的两段短 bio */
  shortBio: string[];
  /** 关于页用的多段 bio */
  bio: string[];
  skills: SkillGroup[];
  timeline: TimelineEntry[];
}

export interface ProfileData {
  email: string;
  /** 最后更新日期，ISO 格式 `YYYY-MM-DD` */
  lastUpdated: string;
  socials: SocialLink[];
  copy: Record<Lang, ProfileCopy>;
}

export const profile: ProfileData = {
  email: 'hello@example.com',
  lastUpdated: '2026-01-18',
  socials: [
    { label: 'GitHub', handle: '@example', href: 'https://github.com/example' },
    { label: 'Blog', handle: 'example.com/notes', href: 'https://example.com/notes' },
    { label: 'LinkedIn', handle: 'in/example', href: 'https://www.linkedin.com/in/example' },
  ],
  copy: {
    zh: {
      name: '陈默',
      role: '产品工程师 / 前端',
      metaDescription:
        '产品工程师陈默的作品集：把复杂的流程收进可以直接用的界面与工具，记录问题、做法与结果。',
      tagline: '我做产品工程师。把混乱的流程收进界面，让人少走几步路。',
      location: '杭州',
      status: '目前接受 2026 年 Q2 的合作',
      shortBio: [
        '过去六年我在三个小团队里负责「把想清楚的事情做出来」这件事：从检索工具到离线排班，共同点是先把问题缩到一句话能说清，再决定要不要写代码。',
        '技术上偏好静态优先、渐进增强 —— 能用 HTML 解决的就不引入框架。我喜欢能长期运行、不需要人盯着的系统。',
      ],
      bio: [
        '我叫陈默，做产品工程师。过去六年我在三个小团队里负责「把想清楚的事情做出来」这件事，从内部检索工具、门店排班系统，到小团队的发布流水线。',
        '我的工作方式比较像先做减法：先把问题缩到一句话能说清，再决定要不要写代码。很多时候答案是一份更好的文档，或者干脆不做。这个习惯让我的项目数量不多，但每个都能说清为什么做。',
        '技术上我偏好静态优先、渐进增强的方案 —— 能用 HTML 解决的就不引入框架。我喜欢能长期运行、不需要人盯着的系统，也喜欢把这种克制写进界面里：少一点装饰，多一点可读的结构。',
      ],
      skills: [
        { label: '前端', items: ['TypeScript', 'React', 'Astro', 'CSS 架构', '可访问性'] },
        { label: '后端', items: ['Node.js', 'Go', 'Postgres', 'SQLite FTS5', 'Edge Runtime'] },
        { label: '工程', items: ['GitHub Actions', 'Docker', 'CI/CD', '可观测性'] },
        { label: '产品', items: ['问题定义', '信息架构', '可用性测试', '技术写作'] },
      ],
      timeline: [
        {
          period: '2024 — 至今',
          title: '产品工程师',
          org: '独立合作',
          description: '为 3–50 人的团队做内部工具与数据界面，负责从问题定义到上线的完整链路。',
        },
        {
          period: '2021 — 2024',
          title: '前端负责人',
          org: '零售 SaaS',
          description: '带领 3 人前端团队，交付离线优先的门店排班与库存看板，服务 60 家门店。',
        },
        {
          period: '2019 — 2021',
          title: '全栈工程师',
          org: '协作工具创业公司',
          description: '从零搭建文档检索与发布流水线，把团队从每周一次人工发布带到一天十一次。',
        },
      ],
    },
    en: {
      name: 'Mo Chen',
      role: 'Product engineer / frontend',
      metaDescription:
        'Portfolio of Mo Chen, a product engineer who folds tangled processes into interfaces and tools people can actually use.',
      tagline:
        'I am a product engineer. I fold messy processes into interfaces so people walk fewer steps.',
      location: 'Hangzhou, CN',
      status: 'Taking on work for Q2 2026',
      shortBio: [
        'For six years I have been the person in small teams who turns settled thinking into something that runs — internal search, offline scheduling, release pipelines. The common thread: shrink the problem to one sentence, then decide whether code is the answer.',
        'Technically I favour static-first, progressively enhanced work — if HTML solves it, no framework gets added. I like systems that keep running without anyone watching them.',
      ],
      bio: [
        'I am Mo Chen, a product engineer. For six years I have been the person in small teams who turns settled thinking into something that runs: internal search tools, store scheduling systems, small-team release pipelines.',
        'My default move is subtraction — shrink the problem until it fits in one sentence, then decide whether code is the answer. Quite often it is a better document, or nothing at all. The trade-off is a short project list, where every entry can explain why it exists.',
        'Technically I favour static-first, progressively enhanced work: if HTML solves it, no framework gets added. I like systems that keep running without anyone watching, and I try to put that restraint into the interface — less decoration, more readable structure.',
      ],
      skills: [
        { label: 'Frontend', items: ['TypeScript', 'React', 'Astro', 'CSS architecture', 'Accessibility'] },
        { label: 'Backend', items: ['Node.js', 'Go', 'Postgres', 'SQLite FTS5', 'Edge runtime'] },
        { label: 'Engineering', items: ['GitHub Actions', 'Docker', 'CI/CD', 'Observability'] },
        { label: 'Product', items: ['Problem framing', 'Information architecture', 'Usability testing', 'Technical writing'] },
      ],
      timeline: [
        {
          period: '2024 — now',
          title: 'Product engineer',
          org: 'Independent',
          description:
            'Internal tools and data interfaces for teams of 3–50, owning everything from problem framing to launch.',
        },
        {
          period: '2021 — 2024',
          title: 'Frontend lead',
          org: 'Retail SaaS',
          description:
            'Led a frontend team of three shipping offline-first scheduling and inventory boards for 60 stores.',
        },
        {
          period: '2019 — 2021',
          title: 'Full-stack engineer',
          org: 'Collaboration tools startup',
          description:
            'Built document search and the release pipeline from scratch, taking the team from weekly releases to eleven a day.',
        },
      ],
    },
  },
};

/** 按语言取一份资料副本。 */
export function getProfile(lang: Lang): ProfileCopy {
  return profile.copy[lang];
}

/** 邮箱的 `mailto:` 链接（不拼接 base，属于外部协议）。 */
export function mailtoHref(subject?: string): string {
  const base = `mailto:${profile.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

/** 按语言格式化「最后更新」日期，例如 `2026年1月18日` / `18 Jan 2026`。 */
export function formatLastUpdated(lang: Lang): string {
  const date = new Date(`${profile.lastUpdated}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return profile.lastUpdated;
  }
  return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-GB', {
    year: 'numeric',
    month: lang === 'zh' ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
