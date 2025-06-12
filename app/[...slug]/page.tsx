import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"
import { drupal } from "@/lib/drupal"
import { getBreadcrumb } from "@/lib/breadcrumb"
import { getPathFromSlug } from "@/lib/utils"
import type { DrupalNode } from "next-drupal"
import { getBlocks } from "@/lib/decoupled_kit"
import { Block } from "@/components/drupal/Block"
import { Node, getNodeTypes } from "@/components/drupal/Node"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { Breadcrumb } from "@/components/drupal/Breadcrumb"
import { nodesMap } from "@/params/nodes"

async function getNode(slug: string[]) {
  const path = getPathFromSlug(slug)

  const translatedPath = await drupal.translatePath(path)
  if (!translatedPath) {
    throw new Error("Resource not found", { cause: "NotFound" })
  }

  const type = translatedPath.jsonapi?.resourceName!
  const uuid = translatedPath.entity.uuid
  const params = nodesMap(type)?.params ?? {}

  const resource = await drupal.getResource<DrupalNode>(type, uuid, {
    params,
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  })

  if (!resource) {
    throw new Error(
      `Failed to fetch resource: ${translatedPath?.jsonapi?.individual}`,
      {
        cause: "DrupalError",
      }
    )
  }

  return resource
}

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
  const breadcrumb = await getBreadcrumb(slug)

  return (
    <>
    <Header blocks={blocks.header} />
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
