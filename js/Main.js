import { setupXMLFileLoader } from './XMLLoader.js';
import { buildTree } from './TreeBuilder.js';
import { initializeSearchFeature } from './SearchFeature.js';
import { initializeExpandCollapse } from './ExpandCollapse.js';

document.addEventListener("DOMContentLoaded", () => {

    setupXMLFileLoader((xml) => {
        const treeContainer = document.getElementById("treeContainer");
        treeContainer.innerHTML = ''; // Clear existing tree
        buildTree(xml.documentElement, treeContainer);
    });
    initializeSearchFeature();
    initializeExpandCollapse();
}); 