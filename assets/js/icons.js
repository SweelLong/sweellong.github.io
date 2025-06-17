window.addEventListener("DOMContentLoaded" , async function() {
    await fetch("https://cdn.jsdelivr.net/gh/SweelLong/sweellong.github.io@main/assets/data/icons.json").then(response => response.json()).then(data => {
        document.getElementById("small-icons").innerHTML = data["small-icons"].map(icon => 
            `<a title="${icon.name}" href="${icon.url}" target="_blank"><img title="${icon.name}" src="https://cdn.jsdelivr.net/gh/SweelLong/sweellong.github.io@main/assets/img/icon/${icon.src}?v=${new Date().getTime()}"></a>`
        ).join("\n");
        document.getElementById("big-icons").innerHTML = data["big-icons"].map(icon => 
            `<a title="${icon.name}" href="${icon.url}" target="_blank"><img title="${icon.name}" src="https://cdn.jsdelivr.net/gh/SweelLong/sweellong.github.io@main/assets/img/icon/${icon.src}?v=${new Date().getTime()}"></a>`
        ).join("\n");
    });
});