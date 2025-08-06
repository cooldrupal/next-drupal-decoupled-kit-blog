
export function getMetatag(entity: any) {
  if (entity.metatag) {
    const metaAttributes = entity.metatag
      .filter((item: any) => item.tag === "meta" && item.attributes?.name && item.attributes?.content)
      .reduce((acc: any, item: any) => {
        acc[item.attributes.name] = item.attributes.content;
        return acc;
      }, {} as Record<string, string>);
    return metaAttributes;
  }

  return {};
}
