export function initializeResizer(){
    const resizer = document.getElementById('resizer');
    const leftPanel = document.getElementById('treeViewer');
    const container = document.getElementById('container');
    let isResizing = false;

    resizer.addEventListener('mousedown', function(e) {
        e.preventDefault();
        isResizing = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', function() {
            isResizing = false;
            document.removeEventListener('mousemove', handleMouseMove);
            console.log("Mouse released, resizing stopped"); // Debugging log
        });
    });

    function handleMouseMove(e) {
        if (!isResizing) return;
        const containerRect = container.getBoundingClientRect();
        const leftWidth = e.clientX - containerRect.left; // New width of the left panel
        leftPanel.style.width = `${leftWidth}px`;
        console.log(`New width: ${leftWidth}px`); // Debugging log
    }
}