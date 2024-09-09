async function fetchImagesJSON() {
    const response = await fetch('https://picsum.photos/v2/list');
    const images = await response.json();
    return images;
}

fetchImagesJSON().then(images => {
    const imageGrid = document.getElementById('imageGrid');
    images.forEach(image => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.innerHTML = `
            <img src="${image.download_url}" alt="${image.author}">
            <h2>${image.author}</h2>
            <p>Width: ${image.width}</p>
            <p>Height: ${image.height}</p>
            <a href="${image.url}" target="_blank">View URL</a>
        `;
        imageGrid.appendChild(gridItem);
    });
});