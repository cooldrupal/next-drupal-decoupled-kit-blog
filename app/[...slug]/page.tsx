import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"
import { drupal } from "@/lib/drupal"
import { getNode } from "@/lib/node"
import { getBreadcrumb } from "@/lib/breadcrumb"
import { getBlocks } from "@/lib/decoupled_kit"
import { getMenus } from "@/lib/menu"
import { Block } from "@/components/drupal/Block"
import { Node, getNodeTypes } from "@/components/drupal/Node"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { Breadcrumb } from "@/components/drupal/Breadcrumb"

type NodePageParams = {
  slug: string[]
}
type NodePageProps = {
  params: Promise<NodePageParams>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const RESOURCE_TYPES = getNodeTypes()

export async function generateMetadata(
  props: NodePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params
  const { slug } = params

  let node
  try {
    node = await getNode(slug)
  } catch (error) {
    return {}
  }

  return {
    title: node.title,
  }
}

export async function generateStaticParams(): Promise<NodePageParams[]> {
  const resources = await drupal.getResourceCollectionPathSegments(
    RESOURCE_TYPES,
    {}
  )

  return resources.map((resource) => {
    return {
      slug: resource.segments,
    }
  })
}

export default async function NodePage(props: NodePageProps) {
  const params = await props.params
  const { slug } = params

  let node
  try {
    node = await getNode(slug)
  } catch (error) {
    notFound()
  }

  const blocks = await getBlocks(slug, ['sidebar', 'header', 'footer_top'])
  const menu = await getMenus(slug, ['primary_menu'])
  const breadcrumb = await getBreadcrumb(slug)

  return (
    <>
    <Header blocks={blocks?.header} menus={menu?.primary_menu} />
    <h1 className="mb-4 text-6xl font-black leading-tight text-center">{node.title}</h1>
    <Breadcrumb breadcrumb={breadcrumb} />
    <div className="flex flex-col md:flex-row gap-6">
      <main className="w-full md:w-2/3">
        <Node node={node} />
      </main>

      <aside className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg">
      {
        blocks?.sidebar?.length &&
        blocks.sidebar.map((block: any) => (
          <div key={block?.block_id}>
            <Block block={block} />
          </div>
        ))
      }
      </aside>
    </div>
    <Footer blocks={blocks.footer_top} />
    </>
  );
}
