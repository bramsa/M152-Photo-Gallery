function ImageTile(main, surroundings) {
  this.main = main;
  this.surroundings = surroundings;
}

ImageTile.prototype.registerListener = function() {
  let classPrefix = "";
  if (this.surroundings.length == 3) { // is in a corner
    classPrefix = "corner";
  } else if (this.surroundings.length == 5) { // is at the border
    classPrefix = "border";
  } else if (this.surroundings.length == 8) { // is in the middle
    classPrefix = "middle";
  }

  let classNameMain = classPrefix + "-main";
  let classNameSurrounder = classPrefix + "-surrounder";

  let main = this.main;
  let surroundings = this.surroundings;

  main.addEventListener("mouseover", function(event) {
    if (main.className) {
      main.className += " " + classNameMain;
    } else {
      main.className = classNameMain;
    }

    for (let i in surroundings) {
      if (surroundings[i].className) {
        surroundings[i].className += " " + classNameSurrounder;
      } else {
        surroundings[i].className = classNameSurrounder;
      }
    }
  }, {passive: true});

  main.onmouseout = function(event) {
    if (main.className) {
      let pieces = main.className.split(" ");
      if (pieces.length <= 1) {
        main.className = "";
      } else {
        pieces.splice(pieces.indexOf(classNameMain), 1);
        main.className = pieces.join(" ");
      }
    }

    for (let i in surroundings) {
      if (surroundings[i].className) {
        let pieces = surroundings[i].className.split(" ");
        if (pieces.length <= 1) {
          surroundings[i].className = "";
        } else {
          pieces.splice(pieces.indexOf(classNameSurrounder), 1)
          surroundings[i].className = pieces.join(" ");
        }
      }
    }
  };
}

var imageContainers = document.getElementsByClassName("image-container");

var imageTiles = [];
console.log(imageContainers);

for (let i in imageContainers) {
  if (i == "item") {
    break;
  }
  let imageContainer = imageContainers[i];
  console.log(imageContainer);
  console.log(imageContainer.children);
  console.log(imageContainer.children[0]);
  console.log(imageContainer.children[1]);
  imageTiles.push(new ImageTile(imageContainer.children[0], [imageContainer.children[1], imageContainer.children[3], imageContainer.children[4]]));
  imageTiles.push(new ImageTile(imageContainer.children[1], [imageContainer.children[0], imageContainer.children[2], imageContainer.children[3], imageContainer.children[4], imageContainer.children[5]]));
  imageTiles.push(new ImageTile(imageContainer.children[2], [imageContainer.children[1], imageContainer.children[4], imageContainer.children[5]]));
  imageTiles.push(new ImageTile(imageContainer.children[3], [imageContainer.children[0], imageContainer.children[1], imageContainer.children[4], imageContainer.children[6], imageContainer.children[7]]));
  imageTiles.push(new ImageTile(imageContainer.children[4], [imageContainer.children[0], imageContainer.children[1], imageContainer.children[2], imageContainer.children[3], imageContainer.children[5], imageContainer.children[6], imageContainer.children[7], imageContainer.children[8]]));
  imageTiles.push(new ImageTile(imageContainer.children[5], [imageContainer.children[1], imageContainer.children[2], imageContainer.children[4], imageContainer.children[7], imageContainer.children[8]]));
  imageTiles.push(new ImageTile(imageContainer.children[6], [imageContainer.children[3], imageContainer.children[4], imageContainer.children[7]]));
  imageTiles.push(new ImageTile(imageContainer.children[7], [imageContainer.children[3], imageContainer.children[4], imageContainer.children[5], imageContainer.children[6], imageContainer.children[8]]));
  imageTiles.push(new ImageTile(imageContainer.children[8], [imageContainer.children[4], imageContainer.children[5], imageContainer.children[7]]));
}

imageTiles.forEach(function(imageTile) {imageTile.registerListener();});
