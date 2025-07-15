export interface PagerLinks {
  first?: string;
  last?: string;
  next?: string;
  prev?: string;
  pages: Record<number, string>;
  over?: boolean;
}

export function getPagerLinks(
  slug: string,
  searchParams: Record<string, any>,
  total_count: number,
  page_count: number = 10
): PagerLinks | null {
  const current_page = parseInt(searchParams?.page?.toString() || '0');

  if (total_count <= page_count) {
    return null;
  }

  const links: PagerLinks = { pages: {} };

  const total_pages = Math.ceil(total_count / page_count);
  const last_page = total_pages - 1;

  const buildUrl = (page: number | null): string => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(searchParams)) {
      if (key === 'page') continue;
      if (value !== undefined) {
        params.append(key, value.toString());
      }
    }

    if (page !== null && page > 0) {
      params.set('page', page.toString());
    }

    const queryString = params.toString();
    return queryString ? `/${slug}?${queryString}` : `/${slug}`;
  };

  links.first = buildUrl(0);
  links.last = buildUrl(last_page);

  if (current_page > 0) {
    const prev_page = current_page - 1;
    links.prev = buildUrl(prev_page);
  }

  if (current_page < last_page) {
    links.next = buildUrl(current_page + 1);
  }

  const pager_pages = total_pages > 9 ? 9 : total_pages;
  for (let page = 0; page < pager_pages; page++) {
    links.pages[page + 1] = buildUrl(page);
  }

  links.over = total_pages > pager_pages;

  return links;
}
