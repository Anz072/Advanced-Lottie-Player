function update(instance, properties, context) {
  if (instance.data.runOnce == false) {
    let rendertype = "canvas";

    switch (properties.animationrender) {
      case "SVG":
        rendertype = "svg";
        break;
      case "HTML":
        rendertype = "html";
        break;
      case "CANVAS":
        rendertype = "canvas";
        break;
      default:
    }
    let loop23 = true;

    if (!properties.loop) {
      loop23 = false;
    }

    var container = document.getElementById(instance.data.animationContainerID);

    var animation = lottie.loadAnimation({
      container: container,
      renderer: rendertype,
      loop: loop23,
      autoplay: false,
      path: properties.lottiejson,
    });

    instance.data.animation = animation;

    animation.setSpeed(properties.animationspeed);

    container.style.backgroundColor = properties.backgroundcolor;

    if (properties.animationdirection == "forwards") {
      animation.setDirection(1);
    } else {
      animation.setDirection(-1);
    }
    if (properties.autoplay) {
      animation.play();
    }

    animation.addEventListener("complete", function () {  
      instance.triggerEvent("onanimationend");
    });

    instance.data.runOnce = true;
  }
}
