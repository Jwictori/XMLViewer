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
        leftPanel.style.flexBasis = `${leftWidth}px`; // Adjust this line
        console.log(`New flex-basis: ${leftWidth}px`);
    }
}