import { defaultLang, languages, ui, type Lang, type UIKey } from './ui';

/**
 * i18n 工具集。
 *
 * 核心约束：站点可能部署在 `https://user.github.io/<repo>/` 这种子路径下，
 * 因此**任何**站内链接与静态资源路径都必须经过本文件的助手函数拼接，
 * 绝不能出现以 `/` 开头的写死路径。
 *
 * `import.meta.env.BASE_URL` 由 Astro 依据 `base` 配置注入，且**始终以 `/` 结尾**
 * （例如 `/` 或 `/portfolio/`），这让拼接变得安全简单。
 */

/** 构建期注入的 base 路径，保证以 `/` 开头且以 `/` 结尾。 */
const BASE_URL: string = import.meta.env.BASE_URL;

/** 判断是否为外部链接（http(s)、mailto、tel、协议相对、锚点）。 */
export function isExternalHref(href: string): boolean {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href);
}

/** 去掉首部的所有斜杠，得到可安全拼接的相对片段。 */
function stripLeadingSlashes(value: string): string {
  return value.replace(/^\/+/, '');
}

/** 把多个路径片段拼起来，并压掉重复斜杠（保留 `https://` 中的 `//`）。 */
function joinUrl(...parts: string[]): string {
  const joined = parts.join('');
  return joined.replace(/(^|[^:])\/{2,}/g, '$1/');
}

/**
 * 从 URL 推断当前语言。
 *
 * 中文在根路径（`/`、`/works/`），英文带 `/en/` 前缀（`/en/`、`/en/works/`）。
 * 会先剥掉 base 前缀，避免仓库名恰好叫 `en` 之类的极端情况误判。
 */
export function getLangFromUrl(url: URL): Lang {
  let rest = url.pathname;

  if (BASE_URL !== '/') {
    rest = rest.startsWith(BASE_URL) ? rest.slice(BASE_URL.length) : rest;
  }
  rest = stripLeadingSlashes(rest);

  const first = rest.split('/')[0] ?? '';
  if (first === 'en' || first === 'zh') {
    return first;
  }
  return defaultLang;
}

/**
 * 取当前语言的文案函数。
 *
 * - 缺失 key 时回落到默认语言，再回落为 key 本身，保证界面永不渲染 `undefined`。
 * - 支持 `{name}` 形式的占位符插值。
 */
export function useTranslations(lang: Lang): (
  key: UIKey,
  vars?: Record<string, string | number>
) => string {
  const table = ui[lang];
  const fallback = ui[defaultLang];

  return function t(key: UIKey, vars?: Record<string, string | number>): string {
    const raw = (table as Record<string, string>)[key] ?? (fallback as Record<string, string>)[key] ?? key;
    if (!vars) {
      return raw;
    }
    return raw.replace(/\{(\w+)\}/g, (match, name: string) => {
      const value = vars[name];
      return value === undefined ? match : String(value);
    });
  };
}

/**
 * 把「语言内路径」转成站内绝对路径（含 base 前缀）。
 *
 * 尾斜杠是硬约束（AGENTS.md §4）：返回值**恒以 `/` 结尾**，
 * 首页就是 `BASE_URL` 本身（`/` 或 `/repo/`）。
 *
 * @param path 语言内相对路径，不带语言前缀、不带首斜杠：
 *             首页传 `''`，其余传 `'works/'`、`'about/'`、`'works/sample-01/'`。
 * @param lang 目标语言。
 * @returns 例如 `/`、`/portfolio/`、`/portfolio/en/works/sample-01/`。
 */
export function localizePath(path: string, lang: Lang = defaultLang): string {
  const clean = stripLeadingSlashes(path).replace(/\/+$/, '');
  const prefix = lang === defaultLang ? '' : `${lang}/`;
  const joined = joinUrl(BASE_URL, prefix, clean);
  return joined.endsWith('/') ? joined : `${joined}/`;
}

/**
 * 静态资源地址（`public/` 下的文件）。
 *
 * @param path 相对 `public/` 的路径，例如 `media/covers/sample-01.svg`。
 */
export function assetUrl(path: string): string {
  if (isExternalHref(path)) {
    return path;
  }
  return joinUrl(BASE_URL, stripLeadingSlashes(path));
}

/**
 * 语言切换链接：保留当前页面（含详情页 slug），只替换语言前缀。
 * 返回值同样恒以 `/` 结尾，与 `localizePath` 保持一致。
 *
 * `/portfolio/works/sample-01/` → `/portfolio/en/works/sample-01/`
 * `/portfolio/en/about/`       → `/portfolio/about/`
 */
export function switchLangPath(url: URL, targetLang: Lang): string {
  let rest = url.pathname;

  if (BASE_URL !== '/') {
    rest = rest.startsWith(BASE_URL) ? rest.slice(BASE_URL.length) : rest;
  }
  rest = stripLeadingSlashes(rest);

  // 剥掉已有的语言前缀
  if (rest === 'en' || rest === 'zh') {
    rest = '';
  } else if (rest.startsWith('en/') || rest.startsWith('zh/')) {
    rest = rest.slice(3);
  }
  rest = stripLeadingSlashes(rest);

  const prefix = targetLang === defaultLang ? '' : `${targetLang}/`;
  const joined = joinUrl(BASE_URL, prefix, rest);
  const next = joined.endsWith('/') ? joined : `${joined}/`;

  // 页面内锚点与查询串保留，语言不应让人丢失当前位置
  return `${next}${url.search}${url.hash}`;
}

/** 语言切换时「另一个语言」的语言码。 */
export function otherLang(lang: Lang): Lang {
  return lang === 'zh' ? 'en' : 'zh';
}

/** 校验任意字符串是否为受支持的语言码。 */
export function isLang(value: string): value is Lang {
  return Object.prototype.hasOwnProperty.call(languages, value);
}

/** 全部语言码，按 `ui` 中的声明顺序。 */
export const allLangs = Object.keys(languages) as Lang[];

/** 内容集合 entry.id（`zh/sample-01`）→ 语言。 */
export function langFromEntryId(id: string): Lang {
  const first = id.split('/')[0] ?? '';
  return isLang(first) ? first : defaultLang;
}

/** 内容集合 entry.id（`zh/sample-01`）→ slug（`sample-01`）。 */
export function slugFromEntryId(id: string): string {
  const parts = id.split('/');
  return parts.length > 1 ? parts.slice(1).join('/') : id;
}

/** `<html lang>` 需要的 BCP 47 标签。 */
export function htmlLang(lang: Lang): string {
  return lang === 'zh' ? 'zh-CN' : 'en';
}
