export function setupXMLFileLoader(callback) {
    const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", event => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(e.target.result, "application/xml");
                callback(xml); // Use the callback to handle the XML
            };
            reader.readAsText(file);
        }
    });
}