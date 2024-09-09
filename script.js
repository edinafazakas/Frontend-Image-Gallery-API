async function fetchImagesJSON() {
    const response = await fetch('https://picsum.photos/v2/list');
    const image = await response.json();
    return image;
  }
  
  fetchImagesJSON().then(image => {
    console.log(image);
  });