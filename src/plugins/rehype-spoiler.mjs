import { visit } from 'unist-util-visit';

/**
 * 为 remark 指令生成的 <spoiler> 增加可聚焦性，触屏点击即可展开（配合 global.css 的 :focus / :focus-within）。
 */
export default function rehypeSpoiler() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'spoiler') return;
			node.properties = node.properties || {};
			node.properties.tabIndex = 0;
			node.properties.role = 'button';
			const label = '剧透内容，点击或悬停显示';
			node.properties['aria-label'] = label;
			node.properties.title = label;
			const existing = node.properties.className;
			const add = 'md-spoiler';
			if (Array.isArray(existing)) {
				if (!existing.includes(add)) existing.push(add);
			} else if (typeof existing === 'string' && existing) {
				node.properties.className = [existing, add];
			} else {
				node.properties.className = [add];
			}
		});
	};
}
