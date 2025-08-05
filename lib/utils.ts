import { drupal } from "@/lib/drupal"

export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(input: string) {
  return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${input}`
}

export function getPathFromSlug(slug: string[] | string) {
  if (typeof slug !== 'string') {
    slug = `${slug.join("/")}`
  }

  return slug.startsWith('/') ? slug : `/${slug}`;
}

/**
 * Generates a teaser from a given text, similar to Drupal's text_summary() function.
 * @param text - The input text to generate teaser from
 * @param length - Maximum length of the teaser (default: 200)
 * @param suffix - Suffix to append when text is trimmed (default: '...')
 * @returns The generated teaser
 */
export function textSummary(
  text: string,
  length: number = 200,
  suffix: string = '...'
): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  // Remove HTML tags if present
  const cleanText = text.replace(/<[^>]+>/g, '');

  // Trim whitespace
  const trimmedText = cleanText.trim();

  // If text is shorter than requested length, return as is
  if (trimmedText.length <= length) {
    return trimmedText;
  }

  // Find the last space before the cutoff point
  let teaser = trimmedText.substring(0, length);
  const lastSpace = teaser.lastIndexOf(' ');

  // Trim at the last space to avoid cutting words
  if (lastSpace > 0) {
    teaser = teaser.substring(0, lastSpace);
  }

  // Add suffix and return
  return teaser + suffix;
}

export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

type SearchParams = Record<string, string | string[] | undefined>
type Filters = Record<string, string>;

export function filterParams(searchParams: SearchParams): Filters {
  const filters: Filters = {};
  for (const [key, value] of Object.entries(searchParams)) {
    if (key !== 'page' && value !== undefined && value !== '') {
      filters[key] = value.toString();
    }
  }
  return filters;
}

export function entityInfo(type: string) {
  const [entity_type, bundle] = type?.split('--') || []
  return {
    'entity_type': entity_type,
    'bundle': bundle
  };
}

export function getPath(entity: any): string {
  if (!isEmpty(entity.path.alias)) {
    return entity.path.alias;
  }

  const entity_type = entityInfo(entity.type).entity_type.replace('_', '/')
  const entity_id = entity.resourceIdObjMeta.drupal_internal__target_id
  return `/${entity_type}/${entity_id}`
}

export async function getJson(slug: string[] | string) {
  let resource, json
  try {
    resource = await drupal.fetch(absoluteUrl(getPathFromSlug(slug)))
    json = await resource.json()
  } catch (error) {
    console.error(error)
    return null
  }

  return json
}
