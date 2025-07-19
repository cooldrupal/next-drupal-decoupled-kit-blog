import { getBlocks } from "@/lib/decoupled_kit"

export async function getMenus(
  path: string | string[],
  regions: string[] = [],
  providers: string[] = ['system'],
  params: Record<string, any> | null = null,
) {
  return getBlocks(path, regions, providers, params)
}
