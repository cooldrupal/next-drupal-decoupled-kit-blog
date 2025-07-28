import Image from "next/image"
import { absoluteUrl, formatDate, isEmpty, getPath } from "@/lib/utils"
import type { DrupalNode } from "next-drupal"
import { Link } from "@/components/navigation/Link"

interface ArticleProps {
  node: DrupalNode
}

export function Blog({ node, ...props }: ArticleProps) {
  return (
    <article {...props}>
      <div className="mb-4 text-gray-600">
        <span>{formatDate(node.created)}</span>
      </div>
      {node.field_featured_image?.field_media_image && (
        <figure className="relative w-full aspect-[5/2]">
          <Image
            src={absoluteUrl(node.field_featured_image.field_media_image.uri.url)}
            fill
            sizes="(min-width: 1000px) 1300px, (min-width: 700px) 1000px, (min-width: 500px) 704px, 100vw"
            alt={node.field_featured_image.field_media_image.resourceIdObjMeta.alt || ""}
            priority
            className="object-cover"
          />
          {node.field_featured_image.field_media_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_featured_image.field_media_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {!isEmpty(node.field_categories) && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <div className="font-bold">Category:</div>
          <span>
            <Link href={getPath(node.field_categories)}>
              <span className="mb-2 text-blue-600 hover:underline">{node.field_categories.name}</span>
            </Link>
          </span>
        </div>
      )}
      {!isEmpty(node.field_tags) && (
        <>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <div className="font-bold">Tags:</div>
            {node.field_tags.map((item: any) => (
              <span key={item.id}>
                <Link href={getPath(item)}>
                  <span className="mb-2 text-blue-600 hover:underline">{item.name}</span>
                </Link>
              </span>
            ))}
          </div>
        </>
      )}
      {node.field_content?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.field_content?.processed }}
          className="mt-6 font-serif text-xl leading-loose"
        />
      )}
    </article>
  )
}
