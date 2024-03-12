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
  let newFlexBasis;

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

    // Create the ghost divider
    ghostDivider = resizer.cloneNode(true);
    ghostDivider.style.position = 'absolute';
    ghostDivider.classList.add('ghost-divider');
    ghostDivider.style.height = `${container.offsetHeight}px`; // Match the container's height
    ghostDivider.style.zIndex = '100'; // Ensure it's above other content   
    document.body.appendChild(ghostDivider); // Append to body to ensure it's not confined by any container

    document.addEventListener('mousemove', handleMouseMoveGhost);
  });
  document.addEventListener('mouseup', function(e) {
    if (!isResizing) return;
    document.removeEventListener('mousemove', handleMouseMoveGhost);
    
    const deltaX = e.clientX - initialPosX;
    let finalFlexBasis = Math.max(minWidth, Math.min(container.offsetWidth - minWidth, initialWidth + deltaX));

    leftPanel.style.flexBasis = `${finalFlexBasis}px`;
    rightPanel.style.flexBasis = `${container.offsetWidth - finalFlexBasis}px`;

    document.body.removeChild(ghostDivider); // Remove the ghost divider
    isResizing = false;
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
    const deltaX = e.clientX - initialPosX;
    //let newFlexBasisPreview = initialWidth + deltaX;
    
    // Update the position of the ghost divider for visual feedback
    ghostDivider.style.left = `${e.clientX}px`; // Follow the cursor horizontally
    ghostDivider.style.top = `${container.offsetTop}px`; // Align with the container vertically

    // Optionally, you can preview the new flex-basis value in the console
    // console.log(`Preview new flex-basis: ${newFlexBasisPreview}px`);
}

}
