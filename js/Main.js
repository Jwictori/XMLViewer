import { setupXMLFileLoader } from './XMLLoader.js';
import { buildTree } from './TreeBuilder.js';
import { initializeSearchFeature } from './SearchFeature.js';
import { initializeExpandCollapse } from './ExpandCollapse.js';
import { initializeResizer } from './Resizer.js';
import { initializeD3Visualization } from './D3Visualization.js';

document.addEventListener("DOMContentLoaded", () => {

    setupXMLFileLoader((xml) => {
        const treeContainer = document.getElementById("treeContainer");
        treeContainer.innerHTML = ''; // Clear existing tree
        buildTree(xml.documentElement, treeContainer);
    });
    initializeSearchFeature();
    initializeExpandCollapse();
    initializeResizer();
    initializeD3Visualization();

    document.getElementById("toggleConfigurator").addEventListener("click", toggleConfigurator);

    function toggleConfigurator() {
        const configurator = document.getElementById("relation-configurator");
        if (configurator.style.display === "none") {
            configurator.style.display = "block";
        } else {
            configurator.style.display = "none";
        }
    }

}); 