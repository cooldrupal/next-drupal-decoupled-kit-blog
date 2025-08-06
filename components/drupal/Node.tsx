import { nodesMap  } from '@/params/nodes'
import { Node as Default } from "@/components/nodes/Node";
import { Blog } from "@/components/nodes/Blog";
import { BlogTeaser } from "@/components/nodes/BlogTeaser";
import { BasicPage } from "@/components/nodes/BasicPage";

interface NodeProps {
  node: any;
  view?: string;
}

const componentsMap: Record<string, React.ComponentType<NodeProps>> = {
  "node--page": BasicPage,
  "node--blog": Blog,
  "node--blog--teaser": BlogTeaser,
};

export function Node({ node, view }: NodeProps) {
  const data = node.attributes ?? node;
  let node_type = node.type
  if (view) {
    node_type = `${node_type}--${view}`
  }
  const Component = componentsMap[node_type];
  return Component ? <Component node={data} /> : <Default node={data} />;
}

export function getNodeTypes(): string[] {
  return Object.keys(nodesMap());
}
