function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

// check whether it's exceeding the window.innerHeight, innerWidth or not
function isExceeding(element, direction) {
  const elementRect = element.getBoundingClientRect();

  if (direction == "Down") {
    return window.innerHeight - (elementRect.top + element.height) < 50;
  } else if (direction == "Up") {
    return elementRect.top < 50;
  } else if (direction == "Right") {
    return window.innerWidth - (elementRect.left + element.width) < 50;
  } else if (direction == "Left") {
    return elementRect.left < 50;
  }
}

const init = () => {
  moveCoin();
  // 'h1' is score text
  const scoreH1 = document.querySelector("h1");
  let score = 0;
  window.addEventListener("keyup", function (e) {
    // get avatar position
    const avatarRect = avatar.getBoundingClientRect();

    if (e.key === "ArrowDown" || e.key === "Down") {
      // if the avatar is expected to exceed when he moves, he will move not 50px but until the end of the window.
      if (isExceeding(avatar, "Down")) {
        moveVertical(
          avatar,
          this.innerHeight - (avatarRect.top + avatarRect.height)
        );
      } else {
        moveVertical(avatar, 50);
      }
    } else if (e.key === "ArrowUp" || e.key === "Up") {
      if (isExceeding(avatar, "Up")) {
        moveVertical(avatar, -avatarRect.top);
      } else {
        moveVertical(avatar, -50);
      }
    } else if (e.key === "ArrowRight" || e.key === "Right") {
      if (isExceeding(avatar, "Right")) {
        moveHorizontal(
          avatar,
          this.innerWidth - (avatarRect.left + avatarRect.width)
        );
      } else {
        moveHorizontal(avatar, 50);
      }
    } else if (e.key === "ArrowLeft" || e.key === "Left") {
      if (isExceeding(avatar, "Left")) {
        moveHorizontal(avatar, -avatarRect.left);
      } else {
        moveHorizontal(avatar, -50);
      }
    }

    // once he touch the coin, score will be added
    if (isTouching(avatar, coin)) {
      score += 1;
      scoreH1.textContent = `SCORE:${score}`;
      moveCoin();
    }
  });
};

const moveVertical = (element, amount) => {
  const currTop = extractPos(element.style.top);
  element.style.top = `${currTop + amount}px`;
};

const moveHorizontal = (element, amount) => {
  const currLeft = extractPos(element.style.left);
  element.style.left = `${currLeft + amount}px`;
};

const extractPos = (position) => {
  if (!position) return 100;
  return parseInt(position.slice(0, -2));
};

const moveCoin = () => {
  const coinRect = coin.getBoundingClientRect();
  const x = Math.floor(Math.random() * window.innerWidth) - coin.width;
  const y = Math.floor(Math.random() * window.innerHeight) - coin.width;
  if (x >= 0) {
    coin.style.left = `${x}px`;
  } else {
    coin.style.left = `${x + coin.width}`;
  }

  if (y >= 0) {
    coin.style.top = `${y}px`;
  } else {
    coin.style.top = `${y + coin.width}`;
  }
};

init();
