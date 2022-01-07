'use strict';

import {
  keyboardPressEffect,
  formatNumber,
  add,
  sub,
  mult,
  div,
} from './functions.js';

// Theme-togler --------------------------------------------------------

const theme = document.querySelector('.theme-light');
const toggler = document.querySelector('#theme-toggler');

toggler.addEventListener('click', () => {
  theme.classList.toggle('theme-dark');
});

// Calculator ----------------------------------------------------------

const allKeys = {
  reset: [document.querySelector('#reset'), 'Escape'],
  delete1: [document.querySelector('#delete'), 'Delete'],
  delete2: [document.querySelector('#delete'), 'Backspace'],
  percent: [document.querySelector('#percent'), ''],
  changeSign: [document.querySelector('#change-sign'), ''],
  add: [document.querySelector('#add'), '+'],
  sub: [document.querySelector('#sub'), '-'],
  mult: [document.querySelector('#mult'), '*'],
  div: [document.querySelector('#div'), '/'],
  result: [document.querySelector('#result'), 'Enter'],
  dot: [document.querySelector('#dot'), '.'],
  num0: [document.querySelector('#num0'), '0'],
  num1: [document.querySelector('#num1'), '1'],
  num2: [document.querySelector('#num2'), '2'],
  num3: [document.querySelector('#num3'), '3'],
  num4: [document.querySelector('#num4'), '4'],
  num5: [document.querySelector('#num5'), '5'],
  num6: [document.querySelector('#num6'), '6'],
  num7: [document.querySelector('#num7'), '7'],
  num8: [document.querySelector('#num8'), '8'],
  num9: [document.querySelector('#num9'), '9'],
};

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const actionSymbols = ['+', '-', 'X', '*', '/'];
const actionNames = ['NumpadAdd', 'NumpadSubtract', 'NumpadMultiply', 'NumpadDivide', 'Escape', 'Delete', 'Backspace', 'Enter', 'NumpadEnter'];

const monitorResult = document.querySelector('#monitor-result');
const monitorX = document.querySelector('#monitor-X');
const monitorY = document.querySelector('#monitor-Y');
const monitorAction = document.querySelector('#monitor-action');
const monitorFinish = document.querySelector('#monitor-finish');

let x = '0';
let y = '0';
let sign = '';
let finish = false;

monitorResult.textContent = '0';

function reset() {
  x = '0';
  y = '0';
  sign = '';
  finish = false;

  monitorResult.textContent = '0';
  monitorX.textContent = '';
  monitorY.textContent = '';
  monitorAction.textContent = '';
  monitorFinish.textContent = '';
}

function enterNumber(number) {
  if (y === '0' && sign === '') {
    if (x === '0' && number !== '.') {
      x = number;
    } else if (x.includes('.') && number === '.') {
      x += '';
    } else {
      if (x.length < 21) {
        x += number;
      }
    }

    monitorResult.textContent = formatNumber(x);
  } else if (x !== '0' && (number !== '.' || event.code !== '') && finish) {
    y = number;
    finish = false;
    monitorResult.textContent = formatNumber(y);
  } else {
    if (y === '0' && number !== '.') {
      y = number;
    } else if (y.includes('.') && number === '.') {
      y += '';
    } else {
      if (y.length < 21) {
        y += number;
      }
    }

    monitorResult.textContent = formatNumber(y);
  }
}

function enterSign(action) {
  if (y === '0') {
    sign = action;

    monitorX.textContent = formatNumber(x);
    monitorAction.textContent = sign;
    monitorResult.textContent = '0';

    return;
  } else {
    sign = action;
    monitorAction.textContent = sign;
    enterFinish()
  }
}

function enterFinish() {
  if (monitorAction.textContent === '') {
    monitorResult.textContent = formatNumber(x);
  } else {
    if (y === '0') {
      y = x;
    };

    monitorX.textContent = formatNumber(x);
    monitorY.textContent = formatNumber(y);
    monitorFinish.textContent = '=';

    switch (sign) {
      case "+":
        x = add(x, y);
        break;
      case "-":
        x = sub(x, y);
        break;
      case "*":
        x = mult(x, y);
        break;
      case "X":
        x = mult(x, y);
        break;
      case "/":
        if (y === '0') {
          monitorResult.textContent = 'Error';
          setTimeout(function () {
            reset();
          }, 1000);
          return;
        }
        x = div(x, y);
        break;
    }

    finish = true;
    monitorResult.textContent = formatNumber(x);
  }
}

function enterDelete() {
  if (y === '0' && monitorAction.textContent === '') {
    if (x.length !== 1) {
      x = x.slice(0, -1);
    } else {
      x = '0';
    }

    monitorResult.textContent = formatNumber(x);
  } else if (monitorAction.textContent !== '' && y === '0') {
    monitorAction.textContent = '';
    monitorX.textContent = '';
    monitorResult.textContent = formatNumber(x);

  } else {
    if (y.length !== 1) {
      y = y.slice(0, -1);
    } else {
      y = '0';
    }

    monitorY.textContent = '';
    monitorFinish.textContent = '';
    monitorResult.textContent = formatNumber(y);
  }
}

function enterChangeSign() {
  if (y === '0') {
    x = String(-(+x));
    monitorResult.textContent = formatNumber(x);
  } else {
    y = String(-(+y));
    monitorResult.textContent = formatNumber(y);
  }
}

function enterPercent() {
  if (monitorX !== '' && monitorAction !== '' && monitorFinish !== '=') {
    y = String((+y * +x) / 100);
    monitorY.textContent = formatNumber(y);
    monitorResult.textContent = formatNumber(y);
  } else {
    return;
  }
}

// Use monitor ---------------------------------------------------------

document.querySelector('#reset').onclick = reset;

document.querySelector('.calc__btn-container').onclick = (event) => {
  if (!event.target.classList.contains('calc__btn')) return;
  if (event.target.id === 'reset') return;

  monitorResult.textContent = '';
  const key = event.target.textContent;

  if (digits.includes(key)) {
    enterNumber(key);
  }

  if (actionSymbols.includes(key)) {
    enterSign(key);
  }

  if (key === '←') {
    enterDelete();
  }

  if (key === '=') {
    enterFinish();
  }

  if (key === '+/-') {
    enterChangeSign();
  }

  if (key === '%') {
    enterPercent();
  }
}

// Use keyboard --------------------------------------------------------

document.addEventListener('keydown', function (event) {
  if (digits.includes(event.key)) {
    keyboardPressEffect(event.key, allKeys);
  } else if (actionNames.includes(event.code)) {
    keyboardPressEffect(event.key, allKeys);
  }

  if (event.key === 'Escape') {
    reset();
  }

  if (digits.includes(event.key)) {
    enterNumber(event.key);
  }

  if (actionSymbols.includes(event.key)) {
    enterSign(event.key);
  }

  if (event.key === 'Delete' || event.key === 'Backspace') {
    enterDelete();
  }

  if (event.key === 'Enter') {
    enterFinish();
  }
});
