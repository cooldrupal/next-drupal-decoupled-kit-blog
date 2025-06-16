import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"
import { drupal } from "@/lib/drupal"
import { getNode } from "@/lib/node"
import { getBreadcrumb } from "@/lib/breadcrumb"
import { getBlocks } from "@/lib/decoupled_kit"
import { Block } from "@/components/drupal/Block"
import { Node, getNodeTypes } from "@/components/drupal/Node"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { Breadcrumb } from "@/components/drupal/Breadcrumb"

export async function generateMetadata(
  props: NodePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params

  const { slug } = params

  let node
  try {
    node = await getNode(slug)
  } catch (e) {
    // If we fail to fetch the node, don't return any metadata.
    return {}
  }

  return {
    title: node.title,
  }
}

type NodePageParams = {
  slug: string[]
}
type NodePageProps = {
  params: Promise<NodePageParams>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const RESOURCE_TYPES = getNodeTypes()

export async function generateStaticParams(): Promise<NodePageParams[]> {
  const resources = await drupal.getResourceCollectionPathSegments(
    RESOURCE_TYPES,
    {
      // The pathPrefix will be removed from the returned path segments array.
      // pathPrefix: "/blog",
      // The list of locales to return.
      // locales: ["en", "es"],
      // The default locale.
      // defaultLocale: "en",
    }
  )

  return resources.map((resource) => {
    // resources is an array containing objects like: {
    //   path: "/blog/some-category/a-blog-post",
    //   type: "node--article",
    //   locale: "en", // or `undefined` if no `locales` requested.
    //   segments: ["blog", "some-category", "a-blog-post"],
    // }
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
  const menu = await getBlocks('/', ['primary_menu'], ['system'])
  const breadcrumb = await getBreadcrumb(slug, 'page_header')

  return (
    <>
    <Header blocks={blocks?.header} menus={menu?.primary_menu} />
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
