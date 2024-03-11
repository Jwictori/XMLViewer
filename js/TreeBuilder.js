function buildTree(node, container, level = 0) {
    if (node.nodeType === 3 && node.textContent.trim() === '') return; // Skip empty text nodes

    const div = document.createElement('div');
    div.classList.add('node');
    div.style.marginLeft = "20px";

    const textContent = node.nodeType === 3 ? node.textContent.trim() : node.nodeName;
    const textSpan = document.createElement('span');
    textSpan.textContent = textContent;

    // Apply bold style only to text nodes
    if (node.nodeType === 3) {
        textSpan.style.fontWeight = 'bold';
    }   

    div.appendChild(textSpan);

    if (node.childNodes.length) {
        const toggle = document.createElement('span');
        toggle.textContent = '[+]';
        toggle.className = 'toggle';
        div.insertBefore(toggle, textSpan);

        const childrenContainer = document.createElement('div');
        childrenContainer.classList.add('children', 'hidden');
        Array.from(node.childNodes).forEach(child => buildTree(child, childrenContainer, level + 1));
        div.appendChild(childrenContainer);

        toggle.addEventListener('click', () => {
            childrenContainer.classList.toggle('hidden');
            toggle.textContent = childrenContainer.classList.contains('hidden') ? '[+]' : '[-]';
        });
    }
    container.appendChild(div);
}

export {buildTree};