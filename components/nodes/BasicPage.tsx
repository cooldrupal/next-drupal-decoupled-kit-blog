import type { DrupalNode } from "next-drupal"

interface BasicPageProps {
  node: DrupalNode
}

export function BasicPage({ node, ...props }: BasicPageProps) {
  return (
    <article {...props}>
      {node.field_content?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.field_content?.processed }}
          className="mt-6 font-serif text-xl leading-loose"
        />
      )}
    </article>
  )
}
