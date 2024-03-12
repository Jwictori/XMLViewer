export function initializeResizer() {
  const resizer = document.getElementById("resizer");
  const leftPanel = document.getElementById("treeViewer");
  const rightPanel = document.getElementById('d3Visualization');
  const container = document.getElementById("container");
  let isResizing = false;
  let initialPosX = 0;
  let initialWidth = 0;
  let minWidth = 100;
  let ghostDivider;

  /*resizer.addEventListener("mousedown", function (e) {
    e.preventDefault();
    isResizing = true;
    initialPosX = e.clientX;
    initialWidth = leftPanel.offsetWidth; // Capture the initial width

    document.addEventListener("mousemove", debouncedHandleMouseMove);
    document.addEventListener("mouseup", function () {
      isResizing = false;
      document.removeEventListener("mousemove", debouncedHandleMouseMove);
      //console.log("Mouse released, resizing stopped"); // For debug
    });
  });
  */
  resizer.addEventListener('mousedown', function(e) {
    e.preventDefault();
    isResizing = true;
    initialPosX = e.clientX;
    initialWidth = leftPanel.offsetWidth;

    // Create a ghost divider for visual feedback
    ghostDivider = resizer.cloneNode(true);
    ghostDivider.classList.add('ghost-divider');
    container.appendChild(ghostDivider);

    document.addEventListener('mousemove', handleMouseMoveGhost);
    document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', handleMouseMoveGhost);
        isResizing = false;
        leftPanel.style.flexBasis = `${newFlexBasis}px`;
        container.removeChild(ghostDivider); // Remove ghost on mouseup
    });
  });


  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

  /*const debouncedHandleMouseMove = debounce(function(e) {
    if (!isResizing) return;
    // Calculate the new basis
    const deltaX = e.clientX - initialPosX;
    let newFlexBasis = Math.max(minWidth, Math.min(container.offsetWidth - minWidth, initialWidth + deltaX));
    // Directly apply the calculated flex-basis to the left panel
    leftPanel.style.flexBasis = `${newFlexBasis}px`;
    // Adjust the right panel's flex-basis based on the left panel's new size
    rightPanel.style.flexBasis = `${container.offsetWidth - newFlexBasis}px`;
    //console.log(`New flex-basis: ${setFlexBasis}px`); // For debug
  }, 50); // 50 milliseconds delay
  */
  function handleMouseMoveGhost(e) {
    if (!isResizing) return;
    const deltaX = e.clientX - initialPosX;
    let newFlexBasis = Math.max(minWidth, Math.min(container.offsetWidth - minWidth, initialWidth + deltaX));
    ghostDivider.style.left = `${e.clientX}px`; // Update ghost position
  }

}
