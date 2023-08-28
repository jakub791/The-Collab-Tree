for (const file of modInfo.modFiles) {
    const script = document.createElement("script");
    script.src = `js/${file}`;
    document.head.appendChild(script);
}
