import type { JsonApiParams } from "next-drupal"

export function nodesMap(type?: string) {
  const map = {
    'node--page': {
      params: {
        include: 'field_featured_image,field_featured_image.field_media_image'
      },
      next: {
        revalidate: 3600,
      },
    },
   'node--blog': {
      params: {
       include: 'field_featured_image,field_featured_image.field_media_image,field_categories,field_tags'
      },
     collection: {
       title: 'Blog',
       path: '/blog',
     }
    },
  } as Record<string, JsonApiParams>;

  return type ? map[type] : map;
}

