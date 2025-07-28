import { blocksMap } from "@/params/blocks"
import { Link } from "@/components/navigation/Link"
import Image from "next/image"
import { absoluteUrl, formatDate, isEmpty, getPath } from "@/lib/utils"

export function BlogLatest({ block }: any) {
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-4">
                {/* Left column: Image */}
                <div>
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
                </div>

                {/* Right column: main text */}
                <div className="mb-4">
                  <Link href={getPath(row)} className="no-underline hover:text-blue-500">
                    <h3 className="text-2xl">{row.title}</h3>
                  </Link>
                  <div className="mb-4 text-gray-600">
                    <span>{formatDate(row.created)}</span>
                  </div>
                  {row.field_description && (
                    <div
                      dangerouslySetInnerHTML={{ __html: row.field_description }}
                      className="mt-6 font-serif text-xl leading-loose"
                    />
                  )}
                </div>
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
