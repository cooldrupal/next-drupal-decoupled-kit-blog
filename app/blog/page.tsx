import { drupal } from "@/lib/drupal"
import { Node } from "@/components/drupal/Node"
import type { Metadata } from "next"
import { isEmpty, filterParams } from "@/lib/utils"
import { getMenus } from "@/lib/menu"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { getBreadcrumb } from "@/lib/breadcrumb"
import { Breadcrumb } from "@/components/drupal/Breadcrumb"
import { PagerMini } from "@/components/drupal/Pager";
import { getPagerLinks } from "@/lib/pager"
import { getTaxonomyTermsCollection } from "@/lib/taxonomy"
import { FilterSelectedForm } from "@/components/forms/FilterSelectedForm"

const slug = 'blog'
const title = 'Blog'

type ViewPageParams = {
  slug: string[]
}

type ViewPageProps = {
  params: Promise<ViewPageParams>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title,
  }
}

export default async function BlogPage1(props: ViewPageProps) {
  const searchParams = await props.searchParams
  const page = parseInt(searchParams?.page?.toString() || '0')
  const fields = filterParams(searchParams)
  const view = await drupal.getView("blog--page_1", {
    params: {
      page: page,
      'views-filter': fields,
    }
  })
  const pagerLinks = getPagerLinks(slug, searchParams, view.meta.count, 15)
  const menu = await getMenus(slug, ['primary_menu', 'footer_top'])
  const breadcrumb = await getBreadcrumb(slug)
  const selects = [
    {
      name: 'field_categories_target_id',
      optionsKey: 'category',
      placeholder: 'Categories',
    },
  ]
  const vocabularies = selects.map(select => select.optionsKey)
  const selectOptions = await getTaxonomyTermsCollection(vocabularies)
  return (
    <>
      <Header menus={menu?.primary_menu} />
      <main className="w-full">
        <h1 className="my-4 text-6xl font-black leading-tight text-center">{title}</h1>
        <Breadcrumb breadcrumb={breadcrumb} delimiter={'>'} />
        <FilterSelectedForm slug={slug} fields={fields} options={selectOptions} selects={selects} />
        {!isEmpty(view.results) && (
          <>
            <ul>
            {view.results.map((row: any) => (
              <li key={row.id}>
                <Node node={row} view='teaser' />
              </li>
            ))}
            </ul>
            {pagerLinks && (<PagerMini links={pagerLinks} page={page} />)}
          </>
         )}
      </main>
      <Footer menus={menu?.footer_top} />
    </>
  );
}
