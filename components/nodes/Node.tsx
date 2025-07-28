export function Node({ node }: any) {
  return (
    <article>
      {node.body?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.body?.processed }}
          className="mt-6 font-serif text-xl leading-loose"
        />
      )}
    </article>
  )
}
