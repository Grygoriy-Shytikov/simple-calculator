'use strict';

function keyboardPressEffect(event, obj) {
  for (let key in obj) {
    if (obj[key][1] === event) {
      obj[key][0].classList.add('active');
      setTimeout(function () {
        obj[key][0].classList.remove('active');
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
  let c = 10;
  let res = ((+a * c) + (+b * c)) / c;
  res = +res.toFixed(10);
  return String(res);
}

function sub(a, b) {
  let c = 10;
  let res = ((+a * c) - (+b * c)) / c;
  res = +res.toFixed(10);
  return String(res);
}

function mult(a, b) {
  let c = 10;
  let d = 100;
  let res = ((+a * c) * (+b * c)) / d;
  return String(res);
}

function div(a, b) {
  let c = 10;
  let res = ((+a * c) / (+b * c)) / 1;
  res = +res.toFixed(100);
  return String(res);
}

export {
  formatNumber,
  keyboardPressEffect,
  add,
  sub,
  mult,
  div
};
