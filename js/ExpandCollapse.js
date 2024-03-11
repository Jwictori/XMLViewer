export function initializeExpandCollapse() {

    const expandAllBtn = document.getElementById("expandAll");
    const collapseAllBtn = document.getElementById("collapseAll");

    expandAllBtn.addEventListener("click", () => toggleAll(true));
    collapseAllBtn.addEventListener("click", () => toggleAll(false));

    function toggleAll(expand) {
        document.querySelectorAll('.children').forEach(child => child.classList.toggle("hidden", !expand));
        document.querySelectorAll('.toggle').forEach(toggle => toggle.textContent = expand ? '[-]' : '[+]');
    }
    
}