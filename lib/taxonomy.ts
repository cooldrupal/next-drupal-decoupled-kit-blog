import { drupal } from "@/lib/drupal"

export async function getTaxonomyTerms(vocabulary: string) {
  const resourceId = 'taxonomy_term--' + vocabulary
  let resource = null
  try {
    resource = await drupal.getResourceCollection(resourceId, {
      params: {
        sort: "name",
      },
    })
  }
  catch (error) {
    console.error(`Error getting menu "${resourceId}": `, error)
    return null
  }

  const items = resource?.map(
    (item: any) => ({
      id: item.drupal_internal__tid,
      name: item.name,
    })
  )

  return items
}

