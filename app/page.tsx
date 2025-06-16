import { getBlocks } from "@/lib/decoupled_kit"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { Block } from "@/components/drupal/Block"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NextJs for Drupal (Decoupled Kit)",
  description: "A Next.js site powered by a Drupal backend (Decoupled Kit).",
}

export default async function Home() {
  const blocks = await getBlocks('/', ['content_top', 'header', 'footer_top'])
  const menu = await getBlocks('/', ['primary_menu'], ['system'])

  return (
    <>
    <Header blocks={blocks?.header} menus={menu?.primary_menu} />
    <main>
      {
        blocks?.content?.length &&
        blocks.content.map((block: any) => (
          <div key={block?.block_id}>
            <Block block={block} />
          </div>
        ))
      }
    </main>
    <Footer blocks={blocks?.footer_top} />
    </>
  )
}
