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
import { entityInfo } from "@/lib/utils"
import { nodesMap } from "@/params/nodes"
import { getMetatag } from "@/lib/metatag"

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

  const metatag = getMetatag(node)
  if (metatag) {
    return metatag
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

  const breadcrumb = await getBreadcrumb(slug)

  let node
  try {
    node = await getNode(slug)
  } catch (error) {
    notFound()
  }

  const entity_info = entityInfo(node.type)
  const is_taxonomy = entity_info.entity_type == 'taxonomy_term'

  let blocks, view, hasSidebar
  if (is_taxonomy) {
    const options = {
      params: {
        'views-argument': [node.drupal_internal__tid],
        include: 'field_featured_image.field_media_image',
      }
    }
    view = await drupal.getView("taxonomy_term--page_1", options)

    if (view?.results?.length) {
      const node_options = nodesMap(view.results[0].type)
      if (node_options && node_options.collection) {
        const blog_link = {
          text: node_options.collection.title,
          url: node_options.collection.path,
        }
        if (breadcrumb?.length === 0) {
          breadcrumb?.push(blog_link)
        }
        else {
          breadcrumb?.splice(1, 0, blog_link)
        }
      }
    }
  }
  else {
    if (node.type === 'node--blog') {
      blocks = await getBlocks(slug, ['sidebar'], ['views'], {
        'category_tid': node.field_categories.resourceIdObjMeta.drupal_internal__target_id,
        'current_id': node.drupal_internal__nid,
      })
      hasSidebar = (blocks?.sidebar as any[])?.some(
        (block) => block?.results?.length > 0
      ) ?? false;
    }
  }

  const menu = await getMenus(slug, ['primary_menu', 'footer_top'])

  return (
    <>
    <Header menus={menu?.primary_menu} />
    <h1 className="mb-4 text-6xl font-black leading-tight text-center">{node.title}</h1>
    <Breadcrumb breadcrumb={breadcrumb} delimiter={'>'} />

    {is_taxonomy ? (
      <>
      <h1 className="my-4 text-6xl font-black leading-tight text-center">{node.name}</h1>
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
        {view?.results.map((row: any) => (
          <li key={row.id}>
            <Node node={row} view='teaser' />
          </li>
        ))}
      </ul>
      </>
    ) : (
      <div className={hasSidebar ? 'flex flex-col md:flex-row gap-12' : ''}>
        <main className={hasSidebar ? 'w-full md:w-2/3' : 'w-full'}>
          <Node node={node} />
        </main>

        {hasSidebar && (
          <aside className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg">
            {blocks.sidebar.map((block: any) => (
              <div key={block?.block_id}>
                <Block block={block} />
              </div>
            ))}
          </aside>
        )}
      </div>
    )}
    <Footer menus={menu?.footer_top} />
    </>
  )
}
