import { useMemo, useState } from 'react';

/**
 * 单个作品在筛选岛中的数据结构。
 * `href` / `cover` 已由父级 Astro 组件算好（含 BASE_URL 前缀），
 * 岛内**不读** `import.meta.env`，保证子路径部署与 SSR 一致。
 */
export interface WorkItem {
  slug: string;
  href: string;
  /** 两位编号，例如 `01` */
  index: string;
  title: string;
  summary: string;
  year: number;
  tags: string[];
  stack: string[];
  cover: string;
  coverAlt: string;
}

export interface WorksExplorerLabels {
  filterLabel: string;
  all: string;
  searchLabel: string;
  searchPlaceholder: string;
  /** 含 `{n}` 占位符的结果计数模板 */
  resultCount: string;
  empty: string;
  clear: string;
}

interface Props {
  items: WorkItem[];
  labels: WorksExplorerLabels;
}

/**
 * /works 的筛选岛：多选标签 chips + 关键词搜索 + aria-live 结果计数。
 *
 * 样式全部来自全局 `src/styles/components.css`（与 Astro 的 `WorkCard.astro`
 * 共用同一套 `.work-card*` 类名），本文件不写任何 CSS 或 inline style。
 */
export default function WorksExplorer({ items, labels }: Props): JSX.Element {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');

  const allTags = useMemo<string[]>(() => {
    const set = new Set<string>();
    for (const item of items) {
      for (const tag of item.tags) {
        set.add(tag);
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
  }, [items]);

  const tagCounts = useMemo<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    for (const item of items) {
      for (const tag of item.tags) {
        counts[tag] = (counts[tag] ?? 0) + 1;
      }
    }
    return counts;
  }, [items]);

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo<WorkItem[]>(() => {
    return items.filter((item) => {
      const tagsOk = activeTags.every((tag) => item.tags.includes(tag));
      if (!tagsOk) {
        return false;
      }
      if (normalizedQuery === '') {
        return true;
      }
      const haystack = [item.title, item.summary, item.stack.join(' '), item.tags.join(' '), String(item.year)]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [items, activeTags, normalizedQuery]);

  const toggleTag = (tag: string): void => {
    setActiveTags((previous) =>
      previous.includes(tag) ? previous.filter((value) => value !== tag) : [...previous, tag]
    );
  };

  const clearAll = (): void => {
    setActiveTags([]);
    setQuery('');
  };

  const countText = labels.resultCount.replace('{n}', String(filtered.length));

  /** 只有一个作品时筛选与搜索无从可选，留一排「全部 1 / … 1」的空控件只是噪音 */
  const showControls = items.length > 1;

  return (
    <div className="explorer">
      {showControls && (
        <>
          <div className="explorer__controls">
            <div className="explorer__group">
              <span className="explorer__label meta" id="works-filter-label">
                {labels.filterLabel}
              </span>
              <div className="chips" role="group" aria-labelledby="works-filter-label">
                <button
                  type="button"
                  className="chip"
                  aria-pressed={activeTags.length === 0}
                  onClick={() => setActiveTags([])}
                >
                  {labels.all}
                  <span className="chip__count">{items.length}</span>
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="chip"
                    aria-pressed={activeTags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    <span className="chip__count">{tagCounts[tag] ?? 0}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="explorer__group" role="search">
              <label className="explorer__label meta" htmlFor="works-search">
                {labels.searchLabel}
              </label>
              <input
                id="works-search"
                className="explorer__input"
                type="search"
                name="q"
                value={query}
                placeholder={labels.searchPlaceholder}
                autoComplete="off"
                onChange={(event) => setQuery(event.currentTarget.value)}
              />
            </div>
          </div>

          <p className="explorer__count meta" aria-live="polite">
            {countText}
          </p>
        </>
      )}

      {filtered.length > 0 ? (
        <ul className="explorer__grid">
          {filtered.map((item) => (
            <li key={item.slug}>
              <article className="work-card">
                <a className="work-card__link" href={item.href}>
                  <div className="work-card__media">
                    <img
                      className="work-card__img"
                      src={item.cover}
                      alt={item.coverAlt}
                      loading="lazy"
                      decoding="async"
                      width={1600}
                      height={1000}
                    />
                  </div>
                  <div className="work-card__body">
                    <p className="work-card__meta meta">
                      <span>{item.index}</span>
                      <span>{item.year}</span>
                    </p>
                    <h3 className="work-card__title">{item.title}</h3>
                    <p className="work-card__summary">{item.summary}</p>
                    <ul className="work-card__tags">
                      {item.tags.map((tag) => (
                        <li key={tag} className="tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </a>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="explorer__empty">
          <p>{labels.empty}</p>
          <button type="button" className="btn btn--ghost" onClick={clearAll}>
            {labels.clear}
          </button>
        </div>
      )}
    </div>
  );
}
