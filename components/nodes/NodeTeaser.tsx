import { Link } from "@/components/navigation/Link"

export function NodeTeaser({ node }: any) {
  return (
    <article>
      <Link href={node.path.alias}>
        <span className="mb-4 mt-2 text-xl font-light">{node.title}</span>
      </Link>
    </article>
  )
}
