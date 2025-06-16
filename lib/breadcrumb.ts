import { getBlocks } from "@/lib/decoupled_kit"

export async function getBreadcrumb(path: string | string[], region: string = 'breadcrumb') {
  const breadcrumb_blocks = await getBlocks(path, [region], ['system'])
  let breadcrumb = Object.values(breadcrumb_blocks)[0] ?? null;
  if (breadcrumb) {
    breadcrumb = Object.values(breadcrumb)[0].breadcrumb ?? null
  }

  return breadcrumb
}

