async function fetchImagesJSON() {
    const response = await fetch('https://picsum.photos/v2/list');
    const images = await response.json();
    return images;
}

fetchImagesJSON().then(images => {
    const imageGrid = document.getElementById('imageGrid');
    images.forEach(image => {
        console.log(image)
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.innerHTML = `
            <img src="${image.download_url}" alt="${image.author}">
            <h2>${image.author}</h2>
            <p>Width: ${image.width}</p>
            <p>Height: ${image.height}</p>
            <a href="${image.url}">View URL</a>
        `;
        imageGrid.appendChild(gridItem);

        const option = document.createElement('option');
        option.value = image.download_url;
        option.text = image.author;
        imageDropdown.appendChild(option);
    });

    imageDropdown.addEventListener('change', function() {
        const selectedImage = this.value;
        const gridItems = document.querySelectorAll('.grid-item img');
        gridItems.forEach(img => {
            if (img.src === selectedImage) {
                img.parentElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});