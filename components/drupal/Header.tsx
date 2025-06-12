import { Block } from "@/components/drupal/Block"
import { Menu } from "@/components/drupal/Menu"

export function Header({blocks}: any) {
  return (
    <>
    <Menu menu_id={'main'} class_name="inline-flex items-center px-6 py-2 border border-gray-600 rounded-full hover:bg-gray-100" />
    <header>
      {
        blocks?.length &&
        blocks.map((block: any) => (
          <div key={block?.block_id}>
            <Block block={block} />
          </div>
        ))
      }
    </header>
    </>
  )
}
