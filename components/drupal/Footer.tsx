import { Block } from "@/components/drupal/Block"
import { Menu } from "@/components/drupal/Menu"

export function Footer({ blocks }: any) {
  return (
    <>
    <Menu menu_id={'footer'} class_name="inline-flex items-center px-6 py-2 border border-blue-600 hover:bg-gray-200" />
    <footer>
      {
        blocks?.length &&
        blocks.map((block: any) => (
          <div key={block?.block_id}>
            <Block block={block} />
          </div>
        ))
      }
    </footer>
    </>
  )
}
