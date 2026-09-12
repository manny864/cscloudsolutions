import { Plugin } from 'unified';
import { Root } from 'mdast';
import { visit } from 'unist-util-visit';

/**
 * Plugin remark para eliminar IDs de ancla en formato {#id}
 * Convierte "## Título {#id}" a "## Título"
 */
export const remarkRemoveAnchorIds: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'heading', (node) => {
      if (node.children && node.children.length > 0) {
        const lastChild = node.children[node.children.length - 1];

        if (lastChild.type === 'text') {
          // Eliminar patrón {#...} del final del texto
          lastChild.value = lastChild.value.replace(/\s*\{#[^}]*\}\s*$/, '');
        }
      }
    });
  };
};
