var obj = require('./getall');
import * as Hammer from 'hammerjs';
var $ = require('jquery');
module.exports.original = function() {
  var awakeFirstSection = obj.get('.awake-first-section');
  awakeFirstSection.insertAdjacentHTML(
    'afterbegin',
    '<div class="click-box"><div class="hand-boxcontrol"><div class="star1"></div><div class="star2"></div><div class="star3"></div><div class="star4"></div><div class="star5"></div><div class="star6"></div><div class="star7"></div><div class="star8"></div><div class="star9"></div><div class="star10"></div><div class="hand-thumb"><div class="hand-thumb2"></div></div><div class="hand-finger"><div class="hand-finger2"><div class="hand-finger3"></div></div><div class="hand-middle-finger"><div class="hand-middle-finger2"><div class="hand-middle-finger3"></div></div></div><div class="hand-four-finger"><div class="hand-four-finger2"><div class="hand-four-finger3"></div></div></div><div class="hand-small-thumb"><div class="hand-small-thumb2"><div class="hand-small-thumb3"></div></div></div></div></div></div>',
  );
  var clickBx = obj.get('.click-box'),
    handT = obj.get('.hand-thumb'),
    handT2 = obj.get('.hand-thumb2'),
    handF = obj.get('.hand-finger'),
    handF2 = obj.get('.hand-finger2'),
    handF3 = obj.get('.hand-finger3'),
    handMf = obj.get('.hand-middle-finger'),
    handMf2 = obj.get('.hand-middle-finger2'),
    handMf3 = obj.get('.hand-middle-finger3'),
    handFf = obj.get('.hand-four-finger'),
    handFf2 = obj.get('.hand-four-finger2'),
    handFf3 = obj.get('.hand-four-finger3'),
    handSt = obj.get('.hand-small-thumb'),
    handSt2 = obj.get('.hand-small-thumb2'),
    handSt3 = obj.get('.hand-small-thumb3'),
    handBc = obj.get('.hand-boxcontrol'),
    handBpos = obj.get('.hand-back-position');
  clickBx.style.zIndex = '999999';

  function handChange() {
    handBc.classList.add('handboxcontrol1');
    handT2.classList.add('handthumb2');
    handMf.classList.add('handmiddlefinger1');
    handMf2.classList.add('handmiddlefinger2');
    handMf3.classList.add('handmiddlefinger3');
    handFf.classList.add('handfourfinger1');
    handFf2.classList.add('handfourfinger2');
    handFf3.classList.add('handfourfinger3');
    handSt.classList.add('handsmallthumb1');
    handSt2.classList.add('handsmallthumb2');
    handSt3.classList.add('handsmallthumb3');
  }

  function handChange2() {
    handMf.classList.add('handmiddlefinger1-s');

    handMf2.classList.add('handmiddlefinger2-s');

    handMf3.classList.add('handmiddlefinger3-s');

    handFf.classList.add('handfourfinger1-s');

    handFf2.classList.add('handfourfinger2-s');

    handFf3.classList.add('handfourfinger3-s');
  }

  function handOrigin() {
    handBc.classList.remove('handboxcontrol1');
    handMf.classList.remove('handmiddlefinger1');
    handMf2.classList.remove('handmiddlefinger2');
    handMf3.classList.remove('handmiddlefinger3');
    handFf.classList.remove('handfourfinger1');
    handFf2.classList.remove('handfourfinger2');
    handFf3.classList.remove('handfourfinger3');
    handSt.classList.remove('handsmallthumb1');
    handSt2.classList.remove('handsmallthumb2');
    handSt3.classList.remove('handsmallthumb3');
  }
  (function() {
    setTimeout(handChange(), 5000);
    if (handChange) {
      console.log('handchange');
      setTimeout(handOrigin(), 5000);
      if (handOrigin) {
        console.log('handorigin');
        setTimeout(handChange2(), 5000);
        if (handChange2) {
          console.log('handchange2');
          setTimeout(handOrigin(), 5000);
          if (handOrigin) {
            console.log('handorigin');
            setTimeout(handChange(), 5000);
          }
        }
      }
    }

    return;
  })();
};
module.exports.moveHands = function() {
  var hammer = new Hammer.Manager(document.querySelector('.click-box'));

  hammer.add(
    new Hammer.Pan({
      direction: Hammer.DIRECTION_ALL,
      threshold: 0,
    }),
  );
  hammer.on('pan', handleDrag);
  var pos1 = 0;
  var pos2 = 0;
  var pos3 = 0;
  var pos4 = 0;
  var isDragging = false;
  var PADDING = 1;
  var rect;
  var viewport = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  };

  function handleDrag(e) {
    if (!isDragging) {
      console.log('!isdraging', isDragging);
      isDragging = true;
      rect = clickBox.getBoundingClientRect();
      pos3 = e.deltaX;
      pos4 = e.deltaY;
    }
    viewport.bottom = window.innerHeight - PADDING;
    viewport.left = PADDING;
    viewport.right = window.innerWidth - PADDING;
    viewport.top = PADDING;

    pos1 = pos3 - e.deltaX;
    pos2 = pos4 - e.deltaY;
    pos3 = e.deltaX;
    pos4 = e.deltaY;

    var newLeft = clickBox.offsetLeft - pos1;
    var newTop = clickBox.offsetTop - pos2;
    if (
      newLeft < viewport.left ||
      newTop < viewport.top ||
      newLeft + rect.width > viewport.right ||
      newTop + rect.height > viewport.bottom
    ) {
      //donothing
    } else {
      //set clickBox to new position
      clickBox.style.top = clickBox.offsetTop - pos2 + 'px';
      clickBox.style.left = clickBox.offsetLeft - pos1 + 'px';
      console.log(pos1, pos2, pos3, pos4);

      detectCollision();
    }
    if (e.isFinal) {
      console.log('isfinal');
      isDragging = false;
    }
  }
  var clickBox = document.querySelector('.click-box');
  var shanLiBc = document.querySelector('.shan-li-boxcontrol');
  var shanBtn = document.querySelector('.shan-btn');
  var cw, ch, cx, cy, sw, sh, sx, sy;
  var shanLiBcObject = Object.assign(shanLiBc);
  function detectCollision() {
    cw = clickBox.offsetWidth;
    ch = clickBox.offsetHeight;
    cx = clickBox.offsetLeft;
    cy = clickBox.offsetTop;
    sw = shanLiBc.offsetWidth;
    sh = shanLiBc.offsetHeight;
    sx = shanLiBc.offsetLeft;
    sy = shanLiBc.offsetTop;
    if (cx + cw > sx && cx < sx + sw && cy + ch > sy && cy < sy + sh) {
      var transform = window.getComputedStyle(shanLiBc);
      var translateY = transform.getPropertyValue('transform');
      var value = translateY
        .split('(')[1]
        .split(')')[0]
        .split(',');
      console.log('collision');
      clickBox.appendChild(shanLiBc);
      shanLiBc.style.top = 170 + '%';
      handGrab();
      clickBox.onclick = function() {
        console.log('clicked');
        if (clickBox.contains(shanLiBc)) {
          shanLiBc.style.transform = 'translatey(400px)';
        }

        setTimeout(function() {
          clickBox.removeChild(shanLiBc);
          shanBtn.appendChild(shanLiBc);
          shanLiBc.style.top = '79%';
          shanLiBc.style.transform = 'translatey(0px)';
          handNotGrab();
        }, 1000);
      };
    } else {
    }
  }
  function handGrab() {
    $('.hand-finger3').addClass('handfinger3z');
    $('hand-finger2').addClass('handfinger2z');
    $('.hand-thumb2').addClass('handthumb2z');
    $('.hand-boxcontrol').addClass('handboxcontrolz');
  }
  function handNotGrab() {
    $('.hand-finger3').removeClass('handfinger3z');
    $('hand-finger2').removeClass('handfinger2z');
    $('.hand-thumb2').removeClass('handthumb2z');
    $('.hand-boxcontrol').removeClass('handboxcontrolz');
  }
};
