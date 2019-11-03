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

  document.addEventListener('keydown', function (evt) {
    var pressedButtonKeyCode = evt.keyCode;

    for (var k = 0; k < buttons.length; k++) {
      if (Number(buttons[k].classList[1]) === pressedButtonKeyCode) {
        var pressedButton = buttons[k];
      }
    }
    pressedButton.classList.add('--pressed');
    var onbuttonUP = function () {
      pressedButton.classList.remove('--pressed');
    };
    document.addEventListener('keyup', onbuttonUP);
  });

})();
