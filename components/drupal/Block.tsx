import { blocksMap } from "@/params/blocks";
import { Block as DefaultBlock } from "@/components/blocks/Block";
import { BlogLatest } from "@/components/blocks/BlogLatest";
import { BlogRelated } from "@/components/blocks/BlogRelated";

interface BlockProps {
  block: any;
}

const componentsMap: Record<string, React.ComponentType<BlockProps>> = {
  BlogLatest,
  BlogRelated,
};

export function Block({ block }: BlockProps) {
  const options = blocksMap(block.block_id);
  const component = options?.component;

  const Component = component && componentsMap[component];

  return Component ? <Component block={block} /> : <DefaultBlock block={block} />;
}
