import { drupal } from "@/lib/drupal"
import { getPathFromSlug } from "@/lib/utils"
import { getNode } from "@/lib/node"

export async function getEntity(type: string, uuid: string, params?: any) {
  return await drupal.getResource(type, uuid, { params })
}

export async function getEntityByPath(slug: string | string[], params?: any) {
  const path = getPathFromSlug(slug)
  let entity
  try {
    entity = await getNode(path, params)
  } catch (error) {
    console.error(error)
    return null
  }

  entity.label = entity.title ?? entity.name
  return entity
}


