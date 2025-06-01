window.addEventListener("DOMContentLoaded" , async function() {
    await fetch("./assets/data/icons.json").then(response => response.json()).then(data => {
        document.getElementById("small-icons").innerHTML = data["small-icons"].map(icon => 
            `<a title="${icon.name}" href="${icon.url}" target="_blank"><img title="${icon.name}" src="./assets/img/icon/${icon.src}"></a>`
        ).join("\n");
        document.getElementById("big-icons").innerHTML = data["big-icons"].map(icon => 
            `<a title="${icon.name}" href="${icon.url}" target="_blank"><img title="${icon.name}" src="./assets/img/icon/${icon.src}"></a>`
        ).join("\n");
    });
});