import Form from 'next/form';
import type { Taxonomy } from "@/lib/taxonomy"

type SelectConfig = {
  name: string,
  optionsKey: string,
  placeholder: string,
};

type FilterSelectedFormProps = {
  slug: string,
  fields: Record<string, string>,
  options: Record<string, Taxonomy[] | null>,
  selects: SelectConfig[],
};

export function FilterSelectedForm({ slug, fields, options, selects }: FilterSelectedFormProps) {
  return (
    <Form action={`/${slug}`}>
      <div className="grid grid-cols-[1fr_1fr_auto] gap-4 mb-8 mt-8 items-center">
        {selects.map((select) => {
          const selectOptions = options[select.optionsKey as keyof typeof options];
          return (
            <select
              key={select.name}
              name={select.name}
              defaultValue={fields[select.name as keyof typeof fields]}
              className="min-w-[150px] border rounded px-3 py-2"
            >
              <option value="">{select.placeholder}</option>
              {selectOptions?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          );
        })}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap"
        >
          Apply
        </button>
      </div>
    </Form>
  );
}
