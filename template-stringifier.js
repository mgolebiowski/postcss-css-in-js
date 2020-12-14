'use strict';

const Stringifier = require('postcss/lib/stringifier');

class TemplateStringifier extends Stringifier {
	literal(node) {
		if (node.nodes && node.nodes.length) {
			node.nodes.forEach((root) => {
				this.builder(root.raws.beforeStart, root, 'beforeStart');

				if (root.type !== 'root') {
					this.stringify(root);
				} else {
					this.body(root);

					if (root.raws.after) this.builder(root.raws.after);
				}

				this.builder(root.raws.afterEnd, root, 'afterEnd');
			});
		} else {
			this.builder(node.text, node);
		}

		if (node.raws.ownSemicolon) {
			this.builder(node.raws.ownSemicolon, node, 'end');
		}
	}
}

module.exports = TemplateStringifier;
