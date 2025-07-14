import { drupal } from "@/lib/drupal"
import { nodesMap } from "@/params/nodes"
import { getPathFromSlug } from "@/lib/utils"
import type { DrupalNode } from "next-drupal"

export async function getNode(slug: string | string[]) {
  const path = getPathFromSlug(slug)

  const translatedPath = await drupal.translatePath(path)
  if (!translatedPath) {
    throw new Error("Resource not found", { cause: "NotFound" })
  }

  const type = translatedPath.jsonapi?.resourceName!
  const uuid = translatedPath.entity.uuid

  const params = nodesMap(type)?.params ?? {}
  const resource = await drupal.getResource<DrupalNode>(type, uuid, {
    params,
  })

  if (!resource) {
    throw new Error(
      `Failed to fetch resource: ${translatedPath?.jsonapi?.individual}`,
      {
        cause: "DrupalError",
      }
    )
  }

  return resource
}

