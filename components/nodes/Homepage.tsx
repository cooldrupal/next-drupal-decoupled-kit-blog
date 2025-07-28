import Image from "next/image"
import { absoluteUrl } from "@/lib/utils"

export function Homepage({ node, ...props }: any) {
  return (
    <article {...props}>
      {node.field_featured_image.field_media_image && (
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
      {node.field_content?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.field_content?.processed }}
          className="mt-6 font-serif text-xl leading-loose"
        />
      )}
    </article>
  )
}
