import { Link } from "@/components/navigation/Link"
import { getPath, absoluteUrl, formatDate } from "@/lib/utils"
import Image from "next/image"

export function BlogTeaser({ node }: any) {
  return (
    <article className="mt-2 mb-8">
      <Link href={getPath(node)} className="underline font-semibold text-blue-600 hover:no-underline">
        <h3 className="text-xl">{node.title}</h3>
      </Link>
      <div className="text-gray-600">
        <span>{formatDate(node.created)}</span>
      </div>
      {node.field_featured_image?.field_media_image && (
        <Link href={getPath(node)}>
          <figure className="relative w-full aspect-[5/2]">
            <Image
              src={absoluteUrl(node.field_featured_image.field_media_image.uri.url)}
              fill
              sizes="(min-width: 1000px) 1300px, (min-width: 700px) 1000px, (min-width: 500px) 704px, 100vw"
              alt={node.field_featured_image.field_media_image.resourceIdObjMeta.alt || node.title}
              priority
              className="object-cover"
            />
            {node.field_featured_image.field_media_image.resourceIdObjMeta.title && (
              <figcaption className="py-2 text-sm text-center text-gray-600">
                {node.field_featured_image.field_media_image.resourceIdObjMeta.title}
              </figcaption>
            )}
          </figure>
        </Link>
      )}
      {node.field_description && (
        <div
          dangerouslySetInnerHTML={{ __html: node.field_description }}
          className="font-serif text-xl leading-loose"
        />
      )}
    </article>
  )
}
