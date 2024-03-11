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
            console.log("Mouse released, resizing stopped");
        });
    });

    function handleMouseMove(e) {
        if (!isResizing) return;
        // Calculate the new basis
        const deltaX = e.clientX - initialPosX;
        const newFlexBasis = Math.max(initialWidth + deltaX, minWidth); // Apply a minimum width directly here
        console.log(`New flex-basis: ${newFlexBasis}px`);
        leftPanel.style.flexBasis = `${newFlexBasis}px`;
    }
}
