import { blocksMap } from "@/params/blocks";
import { Block as DefaultBlock } from "@/components/blocks/Block";
import { BlueBlock } from "@/components/blocks/BlueBlock";

interface BlockProps {
  block: any;
}

const componentsMap: Record<string, React.ComponentType<BlockProps>> = {
  BlueBlock,
};

export function Block({ block }: BlockProps) {
  const options = blocksMap(block.block_id);
  const component = options?.component;

  const Component = component && componentsMap[component];

  return Component ? <Component block={block} /> : <DefaultBlock block={block} />;
}
