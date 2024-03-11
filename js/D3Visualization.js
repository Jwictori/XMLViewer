export function initializeD3Visualization() {
    // Select the container where the visualization will be rendered
    const svg = d3.select("#d3-container")
        .append("svg")
        .attr("width", 600)
        .attr("height", 400);

    // Sample data
    const dataset = [100, 200, 300, 400, 500];

    // Bind data and create bars
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 60)
        .attr("y", d => 400 - d)
        .attr("width", 50)
        .attr("height", d => d)
        .attr("fill", "steelblue");
}
