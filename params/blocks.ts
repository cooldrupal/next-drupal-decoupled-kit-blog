
export function blocksMap(id?: string) {
  const map = {
    'blog--latest': {
      params: {
        include: 'field_featured_image,field_featured_image.field_media_image',
      },
      next: {
        revalidate: 3600,
      },
      title: 'Latest blog posts',
      component: 'BlogLatest',
    },
    'blog--related': {
      params: {
        include: 'field_featured_image,field_featured_image.field_media_image',
        'views-argument': ['***CATEGORY_TID', '***CURRENT_ID'],
      },
      next: {
        revalidate: 3600,
      },
      title: 'Related blog posts',
      component: 'BlogRelated',
    },
  } as Record<string, any>;

  return id ? map[id] : map;
}

