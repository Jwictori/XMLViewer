import { setupXMLFileLoader } from './XMLLoader.js';
import { buildTree } from './TreeBuilder.js';
import { initializeSearchFeature } from './SearchFeature.js';
import { initializeExpandCollapse } from './ExpandCollapse.js';
import { initializeResizer } from './Resizer.js';
import { initializeD3Visualization } from './D3Visualization.js';

document.addEventListener("DOMContentLoaded", () => {

    const addCriteria = document.getElementById("addCriteria");
    const applyConfiguration = document.getElementById("applyConfiguration");

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
    addCriteria.addEventListener("click", addCriteriaFunc);
    applyConfiguration.addEventListener("click", applyConfigurationFunc);

    function toggleConfigurator() {
        const configurator = document.getElementById("relation-configurator");
        const iconDown = document.querySelector(".icon-down");
        const iconUp = document.querySelector(".icon-up");
        if (configurator.classList.contains("hidden")) {
           configurator.classList.remove("hidden");
           iconDown.classList.add("hidden");
           iconUp.classList.remove("hidden");
        } else {
           configurator.classList.add("hidden");
           iconDown.classList.remove("hidden");
           iconUp.classList.add("hidden");
        }
     }

    function addCriteriaFunc() {

    }

    function applyConfigurationFunc() {

    }

}); 