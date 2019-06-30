var math = require('./math');
var photos = photos || {};
var photoAlbum;
photos.config = {
  timeTween: 5100,
  timeTween2: 5000,
};

photos.allPhotos = {
  background: ['background4', 'background6'],
  removeAll: function() {
    photoAlbum = document.querySelector('.photo-album');
    for (var i = 0; i < this.background.length; i++) {
      photoAlbum.classList.remove(this.background[i]);
    }
  },

  addRandomPhotos: function() {
    if (!photos.allPhotos.removeAll) {
      photos.allPhotos.removeAll();
      console.log('removing all');
    }
    console.log(this.removeAll());
    var numberOfBg = this.background.length;
    var randomNumber = math.getRandomNumber(1, numberOfBg);
    var selected = this.background[randomNumber - 1];
    photoAlbum = document.querySelector('.photo-album');
    photoAlbum.classList.add(selected);
  },

  deleteBg: function() {
    photoAlbum = document.querySelector('.screen-boxcontrol3');
    photoAlbum.classList.add('background0');

    var deleteBg2 = (function() {
      var executed = false;
      return function() {
        if (!executed) {
          console.log('not excuted');
          executed = true;
          photoAlbum.classList.remove('background0');
        }
      };
    })();
    deleteBg2();
  },
  deleteAndPost: function() {
    setTimeout(() => {
      photos.allPhotos.deleteBg();
      photos.allPhotos.removeAll();
      console.log('deleting bg');
      if (photos.allPhotos.worshiping) {
        (function() {
          setTimeout(() => {
            console.log('worshiping counting down 5secs');
            var thinkingBubble = document.querySelector('.thinking-bubble');
            thinkingBubble.parentElement.removeChild(thinkingBubble);
            console.log('removing child thinking bubble');
          }, photos.config.timeTween);
        })();
      }
    }, photos.config.timeTween2);

    var id = setInterval(() => {
      photos.allPhotos.addRandomPhotos();
      if (photos.allPhotos.addRandomPhotos) {
        photos.allPhotos.worshiping();
        window.clearInterval(id);
        console.log('stop');
      }
    }, photos.config.timeTween2);
  },

  worshiping: function() {
    this.deleteAndPost();
    var createBubble = getSingle(createDiv());
    console.log('worship');
    return createBubble();
  },
  checkingPhotos() {
    if (
      document.documentElement.contains(document.querySelector('.photo-album'))
    ) {
      console.log('photo true');
      photos.allPhotos.deleteAndPost();
    } else {
    }
  },
  photoAlbum: '<div class="photo-album"></div>',
  openPhoto() {
    var screenBc3 = document.createElement('article');
    screenBc3.className = 'screen-boxcontrol3';
    $('.photo-app').on('click', function() {
      var screenBc = document.querySelector('.screen-boxcontrol');
      screenBc.appendChild(screenBc3);
      screenBc3.innerHTML = photos.allPhotos.photoAlbum;
      console.log('screenboxcontrol3');
      photos.allPhotos.checkingPhotos();
    });
  },
};

const worship0 = ['哦哦!!好美啊!', '真...真可愛!', '雨珊實在是太可愛拉!!'];
var createDiv = function() {
  var div;
  return function() {
    if (!div) {
      console.log('!div', !div);
      div = document.createElement('div');
      div.className = 'thinking-bubble';
      div.innerHTML = worship0[Math.floor(worship0.length * Math.random())];
      var shanLiChatApp = document.querySelector('.shan-li-chat-app');
      shanLiChatApp.appendChild(div);
      div.style.top = Math.floor(250 * Math.random()) + 'px';
      div.style.left = Math.floor(510 * Math.random()) + 'px';
      return div;
    }
  };
};
var getSingle = function(fn) {
  var result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  };
};
module.exports = photos;
