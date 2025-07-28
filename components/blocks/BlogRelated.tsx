import { blocksMap } from "@/params/blocks"
import { Link } from "@/components/navigation/Link"
import Image from "next/image"
import { absoluteUrl, getPath } from "@/lib/utils"

export function BlogRelated({ block }: any) {
  const options = blocksMap(block.block_id)

  if (block.provider === 'views') {
    const rows = block.results;
    if (!rows || rows.length === 0) {
      return null
    }

    return (
      <>
        <div className="my-6">
          {options?.title && <h2 className="font-bold text-4xl pb-2 mb-2 pl-[36px] border-l-[6px] border-blue-400">{options?.title}</h2>}
        <ul>
          {rows.map((row: any, index: number) => (
            <li key={index}>
              <div className="mt-4">
                <Link href={getPath(row)} className="no-underline hover:text-blue-500">
                  <h3 className="text-xl text-blue-600 hover:underline">{row.title}</h3>
                </Link>
                {row.field_featured_image?.field_media_image && (
                  <Link href={getPath(row)}>
                    <figure className="relative w-full aspect-[5/2]">
                      <Image
                        src={absoluteUrl(row.field_featured_image.field_media_image.uri.url)}
                        fill
                        sizes="(min-width: 1000px) 1300px, (min-width: 700px) 1000px, (min-width: 500px) 704px, 100vw"
                        alt={row.field_featured_image.field_media_image.resourceIdObjMeta.alt || row.title}
                        priority
                        className="object-cover"
                      />
                      {row.field_featured_image.field_media_image.resourceIdObjMeta.title && (
                        <figcaption className="py-2 text-sm text-center text-gray-600">
                          {row.field_featured_image.field_media_image.resourceIdObjMeta.title}
                        </figcaption>
                      )}
                    </figure>
                  </Link>
                )}
                {row.field_description && (
                  <div
                    dangerouslySetInnerHTML={{ __html: row.field_description }}
                    className="font-serif"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
        </div>
      </>
    )
  }

  return null
}
