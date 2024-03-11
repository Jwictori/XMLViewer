export function initializeResizer(){
    const resizer = document.getElementById('resizer');
    const leftPanel = document.getElementById('treeViewer');
    const container = document.getElementById('container');
    let isResizing = false;

    let initialOffsetX = 0; // Initial horizontal offset between the cursor and the right edge of the left panel

    resizer.addEventListener('mousedown', function(e) {
        e.preventDefault();
        isResizing = true;
        
        // Calculate the initial offset
        const startResizerPosX = e.clientX;
        const leftPanelRect = leftPanel.getBoundingClientRect();
        initialOffsetX = startResizerPosX - leftPanelRect.right;
        
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
        // Adjust the calculation to account for the initial offset
        let newFlexBasis = e.clientX - containerRect.left - initialOffsetX;
        // Prevent negative width
        if (newFlexBasis < 0) {
            newFlexBasis = 0;
        }
        leftPanel.style.flexBasis = `${newFlexBasis}px`;
        console.log(`New flex-basis: ${newFlexBasis}px`); // Debugging log
    }
    
}