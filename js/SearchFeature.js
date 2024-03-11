export function initializeSearchFeature(){
    const searchInput = document.getElementById("searchInput");
    const treeContainer = document.getElementById("treeContainer");

    searchInput.addEventListener("input", debounce(() => {
        const query = searchInput.value.trim().toLowerCase();
        performSearch(query);
    }, 300));

    function performSearch(query) {
        clearHighlights();

        if (!query) return;

        // Expand nodes that contain the search query and highlight the query text
        const spans = treeContainer.querySelectorAll('span:not(.toggle)');
        spans.forEach(span => {
            if (span.textContent.toLowerCase().includes(query)) {
                highlightText(span, query);
                // Walk up the DOM tree to expand all parent ".children" containers
                let parent = span.closest('.node');
                while (parent && parent !== treeContainer) {
                    const childrenContainer = parent.querySelector('.children');
                    if (childrenContainer) {
                        childrenContainer.classList.remove('hidden');
                    }
                    const toggle = parent.querySelector('.toggle');
                    if (toggle) {
                        toggle.textContent = '[-]'; // Safely update only if toggle exists
                    }
                    parent = parent.parentElement.closest('.node'); // Move up to the next parent node
                }
            }
        });
    }


    function highlightText(span, query) {
        const innerHTML = span.textContent.replace(new RegExp(query, 'gi'), match => `<mark>${match}</mark>`);
        span.innerHTML = innerHTML;
    }

    function clearHighlights() {
        document.querySelectorAll('.node > span').forEach(span => {
            span.innerHTML = span.textContent; // Remove any <mark> tags
        });
        // Reset the tree to its initial collapsed state
        document.querySelectorAll('.children').forEach(child => child.classList.add('hidden'));
        document.querySelectorAll('.toggle').forEach(toggle => toggle.textContent = '[+]');
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        };
    }    
}
