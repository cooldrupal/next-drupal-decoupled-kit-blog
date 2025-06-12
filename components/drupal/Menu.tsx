import { getMenu } from "next-drupal"
import { Link } from "@/components/navigation/Link"

export async function Menu({menu_id, class_name}: any) {
  const menu = await getMenu(menu_id)
  return (
    <nav className={`menu ${menu_id}`}>
    <ul>
      {menu?.items?.map((item) => {
        return (
          <li key={item.id}>
            <Link
              href={item.url}
              className={class_name}
            >
              {item.title}
            </Link>
          </li>
        )
      })}
    </ul>
    </nav>
  )
}
