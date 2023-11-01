function initialize(instance, context) {
  function generateUUID() {
    let uuid = "",
      i,
      random;
    for (i = 0; i < 32; i++) {
      random = (Math.random() * 16) | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += "-";
      }
      uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(
        16
      );
    }
    return uuid;
  }

  // Create the animation container
  var animationContainer = document.createElement("div");
  animationContainer.style.width = "100%";
  animationContainer.style.height = "100%";
  instance.data.animationContainerID = generateUUID();
  animationContainer.id = instance.data.animationContainerID;
  instance.canvas[0].appendChild(animationContainer);

  //set initial vars
  instance.data.runOnce = false;
  instance.data.firstEvent = false;
  instance.data.mark = 0;

  //trigger initial event
  instance.triggerEvent("onanimationstart");
}
