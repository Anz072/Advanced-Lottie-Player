//Pause event
function Pause(instance, properties, context) {
  instance.data.animation.pause();
}

//Animation start event
function play_animation(instance, properties, context) {
  instance.data.animation.play();
}

//Animation stop event
function stop_animation(instance, properties, context) {
  instance.data.animation.stop();
  instance.triggerEvent("onanimationend");
}

//Pick time to start from
function start_from(instance, properties, context) {
  instance.data.animation.goToAndPlay(properties.startfrom, true);
}

//Pick time to stop after
function stop_after(instance, properties, context) {
  instance.data.animation.goToAndStop(properties.endat, true);
  instance.triggerEvent("onanimationend");
}

//Reverse how animation is played
function reverse_animation(instance, properties, context) {
  if (instance.data.firstEvent == false) {
    instance.data.firstEvent = true;
    if (properties.animationdirection == "forwards") {
      instance.data.mark = -1;
    } else {
      instance.data.mark = 1;
    }
    instance.data.animation.setDirection(instance.data.mark);
  } else {
    if (instance.data.mark == 1) {
      instance.data.mark = -1;
    } else {
      instance.data.mark = 1;
    }
    instance.data.animation.setDirection(instance.data.mark);
  }
}

//change animation speed
function change_animation_speed(instance, properties, context) {
  instance.data.animation.setSpeed(properties.animationspeed1);
}

//start at specified time and play to specified time
function play_from_to(instance, properties, context) {
  let playFrom = properties.from * 30;
  let playTo = properties.to * 30;
  instance.data.animation.playSegments([playFrom, playTo], true);
  animation.addEventListener("complete", function () {
    instance.triggerEvent("onanimationend");
  });
}

//loop animation
function set_autoplay(instance, properties, context) {
  if (properties.autoplay) {
    instance.data.animation.loop = true;
    instance.data.animation.play();
  } else {
    instance.data.animation.loop = false;
    animation.addEventListener("complete", function () {
      instance.triggerEvent("onanimationend");
    });
  }
}

//change animation file event
function change_source(instance, properties, context) {
  var container = document.getElementById(instance.data.animationContainerID);
  instance.data.animation.destroy();
  var animation = bodymovin.loadAnimation({
    container: container,
    path: properties.lottie_json,
    renderer: "canvas",
    loop: true,
    autoplay: true,
  });
  instance.data.animation = animation;
}

//change background color of animation container
function change_background(instance, properties, context) {
  var container = document.getElementById(instance.data.animationContainerID);
  container.style.backgroundColor = properties.color;
}
