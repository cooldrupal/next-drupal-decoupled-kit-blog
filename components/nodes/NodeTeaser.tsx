import type { DrupalNode } from "next-drupal"
import { Link } from "@/components/navigation/Link"
import { getPath } from "@/lib/utils"

interface NodeProps {
  node: DrupalNode
}

export function NodeTeaser({ node, ...props }: NodeProps) {
  return (
    <article {...props}>
      <Link href={getPath(node)}>{node.title}</Link>
    </article>
  )
}
