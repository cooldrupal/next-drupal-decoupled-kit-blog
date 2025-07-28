
export function menusMap(id?: string) {
  const map = {
    'main': {
      list_class: "flex flex-wrap sm:flex-nowrap justify-center sm:justify-end gap-4 w-full sm:w-auto text-center",
      item_class: "w-1/2 sm:w-auto",
      link_class: "text-2xl text-gray-600 hover:text-blue-500 font-semibold"
    },
    'footer': {
      list_class: "flex flex-wrap sm:flex-nowrap justify-center sm:justify-end gap-4 w-full sm:w-auto text-center",
      item_class: "w-1/2 sm:w-auto",
      link_class: "text-red-500 hover:underline"
    },
  } as Record<string, any>;

  return id ? map[id] : map;
}

