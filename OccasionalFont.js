// ==UserScript==
// @name         Occasional Font
// @namespace    http://tampermonkey.net/
// @description  Occasionally replace a letter with a specific font to learn braille/morse
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @author       Matthew Zirbel
// @match        *://*/*
// ==/UserScript==

(function() {

	replacable = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

	// SETTINGS
	font = {
		url: 'https://fonts.cdnfonts.com/css/visual-braille',
		name: "VisualBraille"
	}
	const percent = 0.04

	style = {
		backgroundColor: 'inherit',
		color: 'inherit',
    margin: '0 -1px 0 4px',
    padding: '0',
    lineHeight: '1',
    fontFamily: font.name
  }
	const styleTemplate = document.createElement('mark');
  styleTemplate.className = font.name;
  Object.entries(style).forEach(([styleName, styleValue]) => {
    styleTemplate.style[styleName] = styleValue;
  })

	// Add font
	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('type', 'text/css');
	link.setAttribute('href', font.url);
	document.head.appendChild(link);
	
	nodes = textNodes()

	for (let i = 0; i < nodes.length; i++) {
    const textNode = nodes[i];
    const parent = textNode.parentNode;
    const styledNodes = styleLetters(textNode);
    if (styledNodes) {
      if (parent) parent.normalize();
    };
  }

function textNodes() {
  const allTextNodes = [];
  const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (treeWalker.nextNode()) {
    allTextNodes.push(treeWalker.currentNode);
  }
  return allTextNodes
};

function styleLetters(textNode) {
  if (!isAncestorNodeValid(textNode.parentNode)) return;

  let formatIndex = -1
  for (let j=0; j<textNode.textContent.length; j++) {
  	// console.log(textNode.textContent[j])
		if ((Math.random() < percent) && replacable.includes(textNode.textContent[j])) {
			formatIndex = j
			break
		}
	}
	if (formatIndex === -1) {
		return
	}
	// console.log(formatIndex,"/",textNode.textContent.length,":",formatIndex / textNode.textContent.length)
  
  const trimmedTextNode = textNode.splitText(formatIndex);
  const remainingTextNode = trimmedTextNode.splitText(1);
  const styleNode = styleTemplate.cloneNode(true);
  styleNode.appendChild(trimmedTextNode.cloneNode(true));

  const parent = trimmedTextNode.parentNode;
  if (parent) parent.replaceChild(styleNode, trimmedTextNode);

  const otherStyleNodes = styleLetters(remainingTextNode) || [];
  return [ styleNode ].concat(otherStyleNodes);
}

function isAncestorNodeValid (ancestorNode) {
  return (
    (!ancestorNode) ||
    (!ancestorNode.classList || !ancestorNode.classList.contains('CodeMirror')) &&
    (ancestorNode.nodeName !== 'SCRIPT') &&
    (ancestorNode.nodeName !== 'STYLE') &&
    (ancestorNode.nodeName !== 'HEAD') &&
    (ancestorNode.nodeName !== 'TITLE') &&
    (ancestorNode.nodeName !== 'INPUT') &&
    (ancestorNode.nodeName !== 'TEXTAREA') &&
    (ancestorNode.contentEditable !== 'true') &&
    (isAncestorNodeValid(ancestorNode.parentNode))
  );
}

})();