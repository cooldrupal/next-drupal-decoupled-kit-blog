import { nodesMap  } from '@/params/nodes'
import { Node as Default } from "@/components/nodes/Node";
import { Article } from "@/components/nodes/Article";
import { BasicPage } from "@/components/nodes/BasicPage";

interface NodeProps {
  node: any;
  view?: string;
}

const componentsMap: Record<string, React.ComponentType<NodeProps>> = {
  "node--page": BasicPage,
  "node--article": Article,
};

export function Node({ node, view }: NodeProps) {
  let node_type = node.type
  if (view) {
    node_type = `${node_type}--${view}`
  }
  const Component = componentsMap[node_type];
  return Component ? <Component node={node} /> : <Default node={node} />;
}

export function getNodeTypes(): string[] {
  return Object.keys(nodesMap());
}
