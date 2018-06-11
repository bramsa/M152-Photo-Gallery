const imageGallery = {};

imageGallery.imageSource = document.getElementById("image-source");
imageGallery.viewport = document.getElementById("viewport");
imageGallery.images = [];
imageGallery.imageSelectors = [];
imageGallery.selectedIndex = -1;
imageGallery.controls = {}; // new object
imageGallery.controls.next = document.createElement("div");
imageGallery.controls.previous = document.createElement("div");

imageGallery.update = function() {
  for (let i = 0; i < imageGallery.images.length; i++) {
    imageGallery.images[i].classList.remove("selected");
    imageGallery.imageSelectors[i].classList.remove("selected");
  }
  imageGallery.images[imageGallery.selectedIndex].classList.add("selected");
  imageGallery.imageSelectors[imageGallery.selectedIndex].classList.add("selected");
};

imageGallery.next = function() {
  if (imageGallery.selectedIndex + 1 != imageGallery.images.length) {
    imageGallery.selectedIndex++;
    imageGallery.update();
  } else {
    // do nothing
  }
};

imageGallery.previous = function() {
  if (imageGallery.selectedIndex != 0) {
    imageGallery.selectedIndex--;
    imageGallery.update();
  } else {
    // do nothing
  }
};

imageGallery.select = function(id) {
  imageGallery.selectedIndex = id;
  imageGallery.update();
};

// initialisation
(function() {
  const imageSource = imageGallery.imageSource;

  const clearer = document.createElement("div");
  clearer.style.clear = "both";
  imageSource.appendChild(clearer);

  const controlNext = imageGallery.controls.next;
  controlNext.className = "control-next";
  controlNext.onclick = imageGallery.next;
  imageGallery.viewport.appendChild(controlNext);

  const controlPrevious = imageGallery.controls.previous;
  controlPrevious.className = "control-previous";
  controlPrevious.onclick = imageGallery.previous;
  imageGallery.viewport.appendChild(controlPrevious);

  for (let i = 0; i < imageSource.children.length; i++) {
    const child = imageSource.children[i];

    if (child.classList.contains("image")) {
      const image = child.cloneNode(true);
      imageGallery.images.push(image);
      imageGallery.viewport.appendChild(image);

      const id = imageGallery.imageSelectors.push(child) - 1;
      child.onclick = function() {
        imageGallery.select(id);
      }
    }
  }

  if (imageGallery.images.length >= 1) {
    imageGallery.selectedIndex = 0;
    imageGallery.update();
  }
})();
