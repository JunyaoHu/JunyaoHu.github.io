import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import { isBadgeOrShieldImageUrl, normalizeImageSrc } from '../utils/image-utils.ts';

function isWhitespaceText(node) {
	return node.type === 'text' && /^\s*$/.test(node.value);
}

/**
 * 列表项首段中「项目链接 + shields 徽章」包成一行 flex，避免徽章换到下一行或块级排版。
 */
function wrapFirstLinkAndShieldInParagraph(p) {
	const kids = p.children;
	if (!kids?.length) return;

	let aIdx = -1;
	for (let i = 0; i < kids.length; i++) {
		const n = kids[i];
		if (n.type === 'element' && n.tagName === 'a') {
			aIdx = i;
			break;
		}
	}
	if (aIdx < 0) return;

	let imgIdx = -1;
	for (let j = aIdx + 1; j < kids.length; j++) {
		const n = kids[j];
		if (n.type === 'element' && n.tagName === 'img') {
			if (isBadgeOrShieldImageUrl(normalizeImageSrc(n.properties?.src))) {
				imgIdx = j;
				break;
			}
			return;
		}
		if (n.type === 'element') return;
		if (n.type === 'text' && !isWhitespaceText(n)) return;
	}
	if (imgIdx < 0) return;

	for (let k = aIdx + 1; k < imgIdx; k++) {
		const n = kids[k];
		if (!isWhitespaceText(n)) return;
	}

	const slice = kids.slice(aIdx, imgIdx + 1);
	const span = h('span.shield-title-row', slice);
	kids.splice(aIdx, imgIdx - aIdx + 1, span);
}

export default function rehypeShieldTitleRow() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'li') return;
			const firstP = node.children.find((c) => c.type === 'element' && c.tagName === 'p');
			if (firstP) wrapFirstLinkAndShieldInParagraph(firstP);
		});
	};
}
