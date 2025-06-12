import { getBlocks } from "@/lib/decoupled_kit"

export async function getBreadcrumb(path: string | string[]) {
  const breadcrumb_blocks = await getBlocks(path, ['breadcrumb'], ['system'])
  let breadcrumb = Object.values(breadcrumb_blocks)[0] ?? null;
  if (breadcrumb) {
    breadcrumb = Object.values(breadcrumb)[0].breadcrumb ?? null
  }

  return breadcrumb
}

