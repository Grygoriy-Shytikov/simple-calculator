'use strict';

function keyboardPressEffect(event, obj) {
  for (let key in obj) {
    if (obj[key][1] === event) {
      obj[key][0].classList.toggle('active');
      setTimeout(function () {
        obj[key][0].classList.toggle('active');
      }, 100);
    }
  }
}

function formatNumber(str) {
  function format(str) {
    if (str === 'Infinity') {
      return str;
    }

    let result = ''
    let step = 3;
    if (str.length >= 4) {
      for (let i = str.length - 1; i >= 0; i--) {
        if (str[i] !== '.') {
          if (step === 0 && str[i] !== '-') {
            result += ' ';
            result += str[i]
            step = 2;
          } else {
            result += str[i];
            step -= 1;
          }
        }
      }
    } else {
      return str;
    }

    return result.split('').reverse().join('');
  }

  let arr = [];

  if (str.includes('.')) {
    arr = str.split('.');
    return format(arr[0]) + '.' + arr[1];
  } else {
    return format(str);
  }
}

function add(a, b) {
  return String(((+a * 1000) + (+b * 1000)) / 1000);
}

function sub(a, b) {
  return String(((+a * 1000) - (+b * 1000)) / 1000);
}

function mult(a, b) {
  return String(((+a * 1000) * (+b * 1000)) / 1000000);
}

function div(a, b) {
  return String(((+a * 1000000) / (+b * 1000000)) / 1);
}

export {
  formatNumber,
  keyboardPressEffect,
  add,
  sub,
  mult,
  div
};
