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

  function handleMouseMoveGhost(e) {
    const deltaX = e.clientX - initialPosX;
    let newFlexBasisPreview = Math.max(minWidth, Math.min(container.offsetWidth - minWidth, initialWidth + deltaX));
    let newLeftPosition = container.getBoundingClientRect().left + newFlexBasisPreview;
    
    // Update the position of the ghost divider for visual feedback
    ghostDivider.style.left = `${newLeftPosition}px`; // Follow the cursor horizontally
    ghostDivider.style.top = `${container.offsetTop}px`; // Align with the container vertically

    // Optionally, you can preview the new flex-basis value in the console
    // console.log(`Preview new flex-basis: ${newFlexBasisPreview}px`);
}

}
