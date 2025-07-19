import { drupal } from "@/lib/drupal"

export type Taxonomy = {
  id: string | number;
  name: string;
};

export async function getTaxonomyTermsCollection(vocabularies: string[]) {
  const fields: Record<string, Taxonomy[] | null> = {}
  for (const vocab of vocabularies) {
    fields[vocab] = await getTaxonomyTerms(vocab);
  }
  return fields
}

export async function getTaxonomyTerms(vocabulary: string) {
  const resourceId = 'taxonomy_term--' + vocabulary
  const limit = 50
  let offset = 0
  let allItems: any[] = []

  try {
    while (true) {
      const page = await drupal.getResourceCollection(resourceId, {
        params: {
          sort: 'name',
          'page[limit]': limit,
          'page[offset]': offset,
        },
      })

      if (!page || page.length === 0) {
        break
      }

      const items = page.map((item: any) => ({
        id: item.drupal_internal__tid,
        name: item.name,
      }))

      allItems = allItems.concat(items)

      if (page.length < limit) {
        break
      }

      offset += limit
    }
  } catch (error) {
    console.error(`Error getting taxonomy terms for "${resourceId}": `, error)
    return null
  }

  return allItems
}

