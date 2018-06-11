function Wheel(element/* : Element*/) {
  this.element = element;
  this.spokes = [];
  this.centeredId = 0;

  this.clearer = document.createElement("div");
  this.clearer.style.clear = "both";

  this.left = null;
  this.centered = null;
  this.right = null;

  // find all spokes
  for (let i = 0; i < element.children.length; i++) {
    let child = element.children[i];

    if (child.classList.length <= 0) {
      continue;
    } else if (child.classList.contains("image-spoke")) {
      this.spokes.push(new Spoke(child, this));
    }
  }

  this.clearAllPositions = function() {
    for (let i = 0; i < this.spokes.length; i++) {
      this.spokes[i].clearPosition();
    }
  }

  this.center = function(id) {
    this.clearAllPositions();

    console.log("ID: " + id);
    if (id == 0) {
      console.log("if");
      this.left = this.spokes[this.spokes.length - 1];
      this.left.left();
    } else {
      console.log("else");
      this.left = this.spokes[id - 1];
      this.left.left();
    }

    this.centered = this.spokes[id];
    this.centered.center();

    if (id == this.spokes.length - 1) {
      this.right = this.spokes[0];
      this.right.right();
    } else {
      this.right = this.spokes[id + 1];
      this.right.right();
    }

    this.centeredId = id;

    this.element.appendChild(this.left.getElement());
    this.element.appendChild(this.right.getElement());
    this.element.appendChild(this.centered.getElement());
    this.element.appendChild(this.clearer);
  }

  this.center(0);
}

Wheel.prototype.next = function() {
  if (this.centeredId + 1 == this.spokes.length) {
    this.center(0);
  } else {
    this.center(this.centeredId + 1);
  }
};

Wheel.prototype.previos = function() {
  if (this.centeredId == 0) {
    this.center(this.spokes.length - 1);
  } else {
    this.center(this.centeredId - 1);
  }
};

function Spoke(element, wheel) {
  this.element = element;
  this.wheel = wheel;
  this.images = [];
  this.position = null;

  // find all images
  for (let i = 0; i < element.children.length; i++) {
    let child = element.children[i];

    if (child.classList.length <= 0) {
      continue;
    } else if (child.classList.contains("image")) {
      this.images.push(new Image(child));
    }
  }

  let that = this;
  this.element.addEventListener("click", function(event) {
    if (that.position == "left") {
      that.wheel.previos();
    } else if (that.position == "right") {
      that.wheel.next();
    }
  }, {passive: true});
}

Spoke.prototype.left = function () {
  if (this.element.className) {
    this.element.className += " left";
  } else {
    this.element.className = "left";
  }
  this.position = "left";
};

Spoke.prototype.right = function () {
  if (this.element.className) {
    this.element.className += " right";
  } else {
    this.element.className = "right";
  }
  this.position = "right";
};

Spoke.prototype.center = function () {
  if (this.element.className) {
    this.element.className += " center";
  } else {
    this.element.className = "center";
  }
  this.position = "center";
};

Spoke.prototype.clearPosition = function () {
  if (!this.element.className) {
    return;
  }
  let classList = this.element.className.split(" ");

  if (classList.includes("left")) {
    classList.splice(classList.indexOf("left"), 1);
  }
  if (classList.includes("right")) {
    classList.splice(classList.indexOf("right"), 1);
  }
  if (classList.includes("center")) {
    classList.splice(classList.indexOf("center"), 1);
  }

  if (classList.length) {
    this.element.className = classList.join(" ");
  } else {
    this.element.className = "";
  }

  this.position = null;
};

Spoke.prototype.getElement = function () {
  return this.element;
};

function Image(element/* : Element*/) {
  this.element = element;

  element.setAttribute("tabindex", "1");
}

function getImageWheels() {
  let imageWheelElements = document.getElementsByClassName("image-wheel");
  let imageWheels = [];

  for (let i = 0; i < imageWheelElements.length; i++) {
    imageWheels.push(new Wheel(imageWheelElements[i]));
  }

  return imageWheels;
}

let imageWheels = getImageWheels();
