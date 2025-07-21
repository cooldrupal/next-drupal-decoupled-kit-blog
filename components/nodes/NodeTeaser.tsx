import type { DrupalNode } from "next-drupal"
import { Link } from "@/components/navigation/Link"

interface NodeProps {
  node: DrupalNode
}

export function NodeTeaser({ node, ...props }: NodeProps) {
  return (
    <article {...props}>
      <Link href={node.path.alias}>{node.title}</Link>
    </article>
  )
}
