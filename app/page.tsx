import { getBlocks } from "@/lib/decoupled_kit"
import { getMenus } from "@/lib/menu"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { Block } from "@/components/drupal/Block"
import type { Metadata } from "next"
import { getNode } from "@/lib/node"
import { Homepage } from "@/components/nodes/Homepage"

export const metadata: Metadata = {
  title: "Drupal CMS Blog",
  description: "A Next.js site powered by a Drupal backend (Decoupled Kit).",
}

export default async function Home() {
  const blocks = await getBlocks('/', ['content_below'])
  const menu = await getMenus('/', ['primary_menu', 'footer_top'])
  const homepage = await getNode('/home')
  return (
    <>
    <Header menus={menu?.primary_menu} />
    <main>
      <Homepage node={homepage} />
      {
        blocks?.content_below?.length &&
        blocks.content_below.map((block: any) => (
          <div key={block?.block_id}>
            <Block block={block} />
          </div>
        ))
      }
    </main>
    <Footer menus={menu?.footer_top} />
    </>
  )
}
