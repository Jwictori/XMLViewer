export function initializeResizer() {
  const resizer = document.getElementById("resizer");
  const leftPanel = document.getElementById("treeViewer");
  const rightPanel = document.getElementById('d3Visualization');
  const container = document.getElementById("container");
  let isResizing = false;
  let initialPosX = 0;
  let initialWidth = 0;
  let minWidth = 100;

  resizer.addEventListener("mousedown", function (e) {
    e.preventDefault();
    isResizing = true;
    initialPosX = e.clientX;
    initialWidth = leftPanel.offsetWidth;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", function () {
      isResizing = false;
      document.removeEventListener("mousemove", handleMouseMove);
      //console.log("Mouse released, resizing stopped");
    });
  });

  function handleMouseMove(e) {
    if (!isResizing) return;
    // Calculate the new basis
    const deltaX = e.clientX - initialPosX;
    let newFlexBasis = initialWidth + deltaX;
    let setFlexBasis = 0;
    if (newFlexBasis <= minWidth) {
      setFlexBasis = minWidth;
    } else if (newFlexBasis >= container.offsetWidth - minWidth) {
      setFlexBasis = container.offsetWidth - minWidth;
    } else {
      setFlexBasis = initialWidth + deltaX;
    }
    //console.log(`New flex-basis: ${setFlexBasis}px`);
    leftPanel.style.flexBasis = `${setFlexBasis}px`;
    rightPanel.style.flexBasis = `${container.offsetWidth - setFlexBasis}px`;
  }
}
