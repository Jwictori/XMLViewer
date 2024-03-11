export function initializeResizer() {
    const resizer = document.getElementById('resizer');
    const leftPanel = document.getElementById('treeViewer');
    const container = document.getElementById('container');
    let isResizing = false;
    let initialPosX = 0;
    let initialWidth = 0;

    resizer.addEventListener('mousedown', function(e) {
        e.preventDefault();
        isResizing = true;
        initialPosX = e.clientX;
        initialWidth = leftPanel.offsetWidth;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', function() {
            isResizing = false;
            document.removeEventListener('mousemove', handleMouseMove);
        });
    });

    function handleMouseMove(e) {
        if (!isResizing) return;
        const deltaX = e.clientX - initialPosX;
        let newWidth = initialWidth + deltaX;

        // Implement minimum and maximum width constraints
        const minWidth = 100; // Minimum width in pixels
        const maxWidth = container.offsetWidth - 100; // Example maximum width constraint
        newWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);

        leftPanel.style.width = `${newWidth}px`;
    }
}
