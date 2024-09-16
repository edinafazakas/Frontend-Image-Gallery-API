async function fetchImages() {
    const response = await fetch('https://picsum.photos/v2/list');
    return await response.json();
}

function createGridItem(image, container) {
    const item = document.createElement('div');
    item.className = 'grid-item';
    item.dataset.author = image.author;
    item.innerHTML = `
        <img src="${image.download_url}" alt="${image.author}">
        <h2>${image.author}</h2>
        <p>Width: ${image.width}</p>
        <p>Height: ${image.height}</p>
        <a href="${image.url}">View URL</a>
    `;
    console.log(image)
    container.appendChild(item);
}

function populateDropdown(images, dropdown) {
    const authors = new Set(images.map(img => img.author));
    
    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        option.text = author;
        dropdown.appendChild(option);
    });
}

function filterGrid(author) {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(function(item) {
        if (item.dataset.author === author) {
            item.style.display = 'block'; //show the item
        } else {
            item.style.display = 'none'; //hide it
        }
    });
}

function setupDropdownFilter(dropdown) {
    dropdown.addEventListener('change', () => filterGrid(dropdown.value));
}

async function initializeGallery() {
    const imageGrid = document.getElementById('imageGrid');
    const imageDropdown = document.getElementById('imageDropdown');
    
    const images = await fetchImages();
    images.forEach(image => createGridItem(image, imageGrid));
    populateDropdown(images, imageDropdown);
    setupDropdownFilter(imageDropdown);
}

initializeGallery();