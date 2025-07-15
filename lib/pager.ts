
export interface PagerLinks {
  first?: string;
  last?: string;
  next?: string;
  prev?: string;
  pages: Record<number, string>;
  over?: boolean;
}

export function getPagerLinks(slug: string, current_page: number, total_count: number, page_count: number = 10): PagerLinks | null {
  if (total_count <= page_count) {
    return null;
  }

  const links: PagerLinks = { pages: {} }

  const total_pages = Math.ceil(total_count / page_count)
  const last_page = total_pages - 1

  links.first = `/${slug}`
  links.last = `/${slug}?page=${last_page}`

  if (current_page > 0) {
    const prev_page = current_page - 1
    links.prev = prev_page == 0 ? links.first : `/${slug}?page=${prev_page}`
  }
  if (current_page < last_page) {
    links.next = `/${slug}?page=${current_page + 1}`
  }

  const pager_pages = total_pages > 9 ? 9 : total_pages;
  for (let page = 0; page < pager_pages; page++) {
    links.pages[page + 1] = page == 0 ? links.first : `/${slug}?page=${page}`
  }

  links.over = total_pages > pager_pages

  return links;
}

