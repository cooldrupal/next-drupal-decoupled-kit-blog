import { Block } from "@/components/drupal/Block"
import { Menu } from "@/components/drupal/Menu"

export function Header({ blocks, menus }: any) {
  return (
    <header className="p-4">
      {
        menus?.length &&
        menus.map((menu: any) => (
          <Menu
            key={menu.id}
            menu_id={menu.id}
          />
        ))
      }
      {
        blocks?.length &&
        blocks.map((block: any) => (
          <div key={block?.block_id}>
            <Block block={block} />
          </div>
        ))
      }
    </header>
  )
}
