'use strict';
(function () {

  // ---------------------------creating DOM via fragment-----------------------------------------
  var fragment = document.createDocumentFragment();

  var form = document.createElement('form');
  var textarea = document.createElement('textarea');

  form.appendChild(textarea);
  fragment.appendChild(form);

  var keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  for (var i = 0; i < window.keysBD.keys.length; i++) {
    var button = document.createElement('button');
    var keyCod = window.keysBD.keys[i][0];
    button.classList.add('button');
    button.classList.add(keyCod);
    if (keyCod === 27 || keyCod === 9 || keyCod === 20 || keyCod === 17 || keyCod === 18 || keyCod === 46) {
      button.classList.add('--double');
    }
    if (keyCod === 13) {
      button.classList.add('--enter');
    }
    if (keyCod === 16) {
      button.classList.add('--shift');
    }
    if (keyCod === 32) {
      button.classList.add('--space');
    }
    button.innerHTML = window.keysBD.keys[i][1];
    keyboard.appendChild(button);
  }
  fragment.appendChild(keyboard);

  var renderFragment = function (frg) {
    var body = document.querySelector('body');
    body.insertBefore(frg, document.querySelector('script'));
  };

  window.addEventListener('load', function () {
    renderFragment(fragment);
  });

  // ---------------------------------------- button pressing -----------------------------------------------
  var buttons = keyboard.querySelectorAll('button');
  var pressedButtonsCodes = [];

  document.addEventListener('keydown', function (evt) {
    var pressedButtonKeyCode = evt.keyCode;
    pressedButtonsCodes.push(pressedButtonKeyCode);

    for (var k = 0; k < buttons.length; k++) {
      if (Number(buttons[k].classList[1]) === pressedButtonKeyCode) {
        var pressedButton = buttons[k];
      }
    }

    pressedButton.classList.add('--pressed');

    if (pressedButtonsCodes.includes(16) && pressedButtonsCodes.includes(18)) {
      if (buttons[0].innerHTML === 'esc') {
        for (var bt = 0; bt < buttons.length; bt++) {
          buttons[bt].innerHTML = window.keysBD.keys[bt][2];
        }
      } else {
        for (var bb = 0; bb < buttons.length; bb++) {
          buttons[bb].innerHTML = window.keysBD.keys[bb][1];
        }
      }
    }

    var onbuttonUP = function () {
      pressedButton.classList.remove('--pressed');
      pressedButtonsCodes = [];
    };

    document.addEventListener('keyup', onbuttonUP);
  });

  // --------------------------------------------------button clicking ---------------------------------------------
  var text = [];
  for (var h = 0; h < buttons.length; h++) {
    (function (clickedButton) {
      clickedButton.addEventListener('click', function () {

        if (clickedButton.classList[1] === '32') {
          text.push(' ');
        } else if (clickedButton.classList[1] === '13') {
          text.push('\n');
        } else if (clickedButton.classList[1] === '9') {
          text.push('\t');
        } else if (clickedButton.classList[1] === '8') {
          text.pop();
        } else if (clickedButton.classList[1] === '46') {
          text.splice(0, text.length);
        } else {
          text.push(clickedButton.innerText);
        }
        textarea.textContent = text.join('');
      });
    })(buttons[h]);
  }

})();
