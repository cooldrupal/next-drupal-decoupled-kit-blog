import { nodesMap  } from '@/params/nodes'
import { Node as Default } from "@/components/nodes/Node";
import { Article } from "@/components/nodes/Article";
import { BasicPage } from "@/components/nodes/BasicPage";

interface NodeProps {
  node: any;
}

const componentsMap: Record<string, React.ComponentType<NodeProps>> = {
  "node--page": BasicPage,
  "node--article": Article,
};

export function Node({ node }: NodeProps) {
  const Component = componentsMap[node.type];
  return Component ? <Component node={node} /> : <Default node={node} />;
}

export function getNodeTypes(): string[] {
  return Object.keys(nodesMap());
}
