import { blocksMap } from "@/params/blocks"
import { Link } from "@/components/navigation/Link"
import { getPath } from "@/lib/utils"

export function Block({ block }: any) {
  const options = blocksMap(block.block_id)

  if (block.provider === 'block_content') {
    return (
      <div className="mb-6">
        {options?.title && <h2 className="text-xl">{options.title}</h2>}
        <div
          dangerouslySetInnerHTML={{ __html: block.body?.processed }}
          className="mt-6 text-m leading-loose"
        />
      </div>
    )
  }

  if (block.provider === 'views') {
    const rows = block.results;
    if (!rows || rows.length === 0) {
      return null
    }

    return (
      <>
        <div className="my-6">
        {options?.title && <h2 className="text-2xl pb-2 mb-2">{options?.title}</h2>}
        <ul>
          {rows.map((row: any, index: number) => (
            <li key={index}>
              <Link href={getPath(row)} className="no-underline hover:text-blue-500">
                <h3>{row.title}</h3>
              </Link>
              {row.body?.processed && (
                <div
                  dangerouslySetInnerHTML={{ __html: row.body?.processed }}
                  className="mt-6 font-serif text-xl leading-loose"
                />
              )}
            </li>
          ))}
        </ul>
        </div>
      </>
    )
  }

  return null
}
