var GoogleMapsLoader = require('google-maps');
import * as photos from './photo.js';
var yushanLiImg = require('../images/yushan-img.jpg');

var judo = require('./judoAct');

// import { Constraint } from 'cannon';
var Link = require('./lib/algorithm');
var userTalking = require('./userTalking');
var cpuMessaging = require('./cpuTalking');
var path = require('path');
var matrix = require('./matrix');
var hand = require('./hands');
const loadGoogleMapsApi = require('load-google-maps-api');
var shanApp = shanApp || {};

shanApp = {
  arr: [],

  arrPush(el) {
    return shanApp.arr.push(el);
  },
  arrShift: null,
  arrSlice: null,
  arrPop(el) {
    return shanApp.arr.pop(el);
  },
  excuter: false,
  shanBtn: document.querySelector('.shan-btn'),
  friends: [],
  loveFriends: [],

  line:
    '<div class="line-setting-boxcontrol"><div class="friends">好友<p class="friends-total"></p></div><div class="add-friend"></div><div class="search-friends"></div><div class="setting"></div></div><article class="five-section"><div class="sec-friends"><span class="friends-bubble"></span><div class="under-line1 display"></div></div><div class="sec-talk"><span class="talk-bubble"></span><div class="under-line2"></div></div><div class="sec-post"><span class="post-bubble"></span><div class="under-line3"></div></div><div class="sec-today"><span class="today-bubble"></span><div class="under-line4"></div></div><div class="sec-setting"><span class="setting-bubble"></span><div class="under-line5"></div></div></article><article class="big-wrap"><article class="line-wrap"></article><article class="line-wrap2">2</article><article class="line-wrap3">3</article><article class="line-wrap4">4</article><article class="line-wrap5">5</article></article>',

  conversation:
    '<article class="upper"><div class="battery"></div><div class="camera-out"><div class="camera"></div></div></article><div class="screen-original"></div><article class="screen-boxcontrol"><video class="video"></video><div class="time-now"><p class="hour-now"></p><p class="two-dot">:</p><p class="minutes-now"></p><p class="two-dot-2">:</p><p class="seconds-now"></p><p class="session"></p></div><div class="year-now"><p class="month-now"></p><p class="dates-now"></p><p class="days-now"></p></div><div class="updates"><p></p></div><div id="map"></div><section class="line-app"></section><section class="photo-app"></section></article><article class="bottom-bar-boxcontrol"><div class="back"></div><div class="five-points"></div><div class="sqaure"></div></article>',

  shanChatApp: function() {
    var self = this;
    document
      .querySelector('.shan-btn')
      .insertAdjacentHTML(
        'afterbegin',
        '<article class="shan-li-chat-app"></article>',
      );
    var shanLiChatApp = document.querySelector('.shan-li-chat-app');
    shanLiChatApp.innerHTML = this.conversation;
    shanLiChatApp.insertAdjacentHTML(
      'afterbegin',
      '<div class="slide-boxcontrol"><div class="slide-down"><span class="tips pos3">滑動關起</span></div></div><span class="tips pos4">按著拖曳</span>',
    );
    var ArticleBc2 = document.createElement('article');
    ArticleBc2.className = 'screen-boxcontrol2';
    var lineArticle = document.createElement('article');
    lineArticle.className = 'line';

    var screenBc = document.querySelector('.screen-boxcontrol');

    $('.line-app').on('click', function() {
      console.log('clicked');

      screenBc.appendChild(ArticleBc2);
      lineArticle.innerHTML = self.line;

      ArticleBc2.appendChild(lineArticle);
      self.arrPush(ArticleBc2);
      self.arrPush(lineArticle);

      var togglemenu = new checking('.five-section', shanApp.toggleMenu);
      togglemenu.start();

      var linewrap = new checking('.line-wrap', shanApp.lineWrap);
      linewrap.start();

      var lineprofilebox = new checking('.line', shanApp.lineProfileBox);
      lineprofilebox.start();

      var lineprofile = new checking('.profile-box', shanApp.lineProfile);
      lineprofile.start();

      var linewrapmylovetoggle = new checking(
        '.line-wrap',
        shanApp.lineWrapMyloveToggle,
      );
      linewrapmylovetoggle.start();

      var linefriend = new checking('.line-wrap', shanApp.lineFriend);
      linefriend.start();

      var profiletoggle = new checking(
        '.profile-toggle',
        shanApp.profileToggle,
      );
      profiletoggle.start();

      var lineaddingfriend = new checking(
        '.line-setting-boxcontrol',
        shanApp.lineAddingFriend,
      );
      lineaddingfriend.start();

      var linecall = new checking('.profile-phone', shanApp.lineCall);
      linecall.start();

      var messagebox = new checking('.profile-box', shanApp.messageBox);
      messagebox.start();

      var videochat = new checking('.profile-box', shanApp.videoChat);
      videochat.start();

      var checkingphotos = new checking('.line', shanApp.checkingPhotos);
      checkingphotos.start();

      var mobileback = new checking('.screen-boxcontrol', shanApp.mobileBack);
      mobileback.start();

      console.log('line-app clicked', self.arr);
      if (self.arr.length >= 3) {
        console.log('self arrpush >= 2', self.arr);
      }
    });

    console.log('line-app');
    console.log('shanchatapp');

    function timeStart() {
      var time = document.querySelectorAll(
        '.hour-now,.minutes-now,.seconds-now,.month-now,.dates-now,.days-now',
      );
      var session = document.querySelector('.session');
      var date = new Date();
      var h = date.getHours();
      var m = date.getMinutes();
      var s = date.getSeconds();
      var mon = date.getMonth() + 1;
      var dates = date.getDate();
      var days = date.getDay();
      switch (days) {
        case 1:
          time[5].innerHTML = '星期一';
          break;
        case 2:
          time[5].innerHTML = '星期二';
          break;
        case 3:
          time[5].innerHTML = '星期三';
          break;
        case 4:
          time[5].innerHTML = '星期四';
          break;
        case 5:
          time[5].innerHTML = '星期五';
          break;
        case 6:
          time[5].innerHTML = '星期六';
          break;
        case 0:
          time[5].innerHTML = '星期日';
          break;
      }
      session.innerHTML = '上午';
      if (h == 0) {
        h = 12;

        console.log('AM');
      }
      if (h > 12) {
        h = h - 12;
        session.innerHTML = '下午';
        console.log('PM');
      }
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
      time[0].innerHTML = h;
      time[1].innerHTML = m;
      time[2].innerHTML = s;
      time[3].innerHTML = mon + '月';
      time[4].innerHTML = dates + '日';
    }
    setInterval(timeStart, 1000);
  },
  toggleMenu() {
    // const sec = [
    //   'secFriends','secTalk','secPost','secToday','secSetting'
    // ]
    const backgroundP = [
      '17px -713px',
      '-74px -713px',
      '-173px -713px',
      '-288px -713px',
      '-412px -713px',
    ];
    const backgroundPs = [
      '-29px -713px',
      '-124px -713px',
      '-233px -713px',
      '-352px -713px',
      '-484px -713px',
    ];
    var posLeft = ['1px', '273px', '526px', '819px', '1092px'];
    var backgroundPosition =
      'WebkitBackgroundPosition' ||
      'MozBackgroundPosition' ||
      'backgroundPosition' ||
      'msBackgroundPosition' ||
      'OBackgroundPosition';

    var secFriends = document.querySelector('.sec-friends'),
      secTalk = document.querySelector('.sec-talk'),
      secPost = document.querySelector('.sec-post'),
      secToday = document.querySelector('.sec-today'),
      secSetting = document.querySelector('.sec-setting');

    secFriends.style.cssText = 'background-position:17px -713px;';

    secFriends.onclick = function() {
      console.log('clicked');
      var bigWrap = document.querySelector('.big-wrap');
      bigWrap.style.left = '0px';
      let friend = backgroundP.filter(menu => {
        let temp = {};
        temp = {
          menu,
        };
        console.log(temp);
        return menu === '17px -713px';
      });
      let secf = friend.toString();
      this.style.backgroundPosition = secf;
      const under1 = document.querySelector('.under-line1');
      under1.classList.add('display');
      var underLine1 = document.querySelectorAll(
        '.under-line2,.under-line3,.under-line4,.under-line5',
      );

      for (var i = 0; i < underLine1.length; i++) {
        underLine1[i].classList.remove('display');
      }

      secTalk.style.backgroundPosition = backgroundPs[1];
      secPost.style.backgroundPosition = backgroundPs[2];
      secToday.style.backgroundPosition = backgroundPs[3];
      secSetting.style.backgroundPosition = backgroundPs[4];
    };
    secTalk.onclick = function() {
      var bigWrap = document.querySelector('.big-wrap');
      bigWrap.style.left = '-271px';
      let talk = backgroundP.filter(menu => {
        let temp = {};
        temp = {
          menu,
        };
        console.log(temp);
        return menu === '-74px -713px';
      });
      let secT = talk.toString();
      this.style.backgroundPosition = secT;
      const under2 = document.querySelector('.under-line2');
      under2.classList.add('display');
      var underLine2 = document.querySelectorAll(
        '.under-line1,.under-line3,.under-line4,.under-line5',
      );

      for (var i = 0; i < underLine2.length; i++) {
        underLine2[i].classList.remove('display');
      }

      secFriends.style.backgroundPosition = backgroundPs[0];
      secPost.style.backgroundPosition = backgroundPs[2];
      secToday.style.backgroundPosition = backgroundPs[3];
      secSetting.style.backgroundPosition = backgroundPs[4];
    };
    secPost.onclick = function() {
      var bigWrap = document.querySelector('.big-wrap');
      bigWrap.style.left = '-542px';
      let post = backgroundP.filter(menu => {
        let temp = {};
        temp = {
          menu,
        };
        return menu === '-173px -713px';
      });
      let secpost = post.toString();
      this.style.backgroundPosition = secpost;
      const under3 = document.querySelector('.under-line3');
      under3.classList.add('display');
      var underLine3 = document.querySelectorAll(
        '.under-line1,.under-line2,.under-line4,.under-line5',
      );

      for (var i = 0; i < underLine3.length; i++) {
        underLine3[i].classList.remove('display');
      }

      secFriends.style.backgroundPosition = backgroundPs[0];
      secTalk.style.backgroundPosition = backgroundPs[1];
      secToday.style.backgroundPosition = backgroundPs[3];
      secSetting.style.backgroundPosition = backgroundPs[4];
    };
    secToday.onclick = function() {
      var bigWrap = document.querySelector('.big-wrap');
      bigWrap.style.left = '-813px';
      let today = backgroundP.filter(menu => {
        let temp = {};
        temp = {
          menu,
        };
        return menu === '-288px -713px';
      });
      let sectoday = today.toString();
      this.style.backgroundPosition = sectoday;
      const under4 = document.querySelector('.under-line4');
      under4.classList.add('display');
      var underLine4 = document.querySelectorAll(
        '.under-line1,.under-line2,.under-line3,.under-line5',
      );

      for (var i = 0; i < underLine4.length; i++) {
        underLine4[i].classList.remove('display');
      }

      secTalk.style.backgroundPosition = backgroundPs[1];
      secPost.style.backgroundPosition = backgroundPs[2];
      secFriends.style.backgroundPosition = backgroundPs[0];
      secSetting.style.backgroundPosition = backgroundPs[4];
    };
    secSetting.onclick = function() {
      var bigWrap = document.querySelector('.big-wrap');
      bigWrap.style.left = '-1084px';
      let setting = backgroundP.filter(menu => {
        let temp = {};
        temp = {
          menu,
        };
        return menu === '-412px -713px';
      });
      let secsetting = setting.toString();
      this.style.backgroundPosition = secsetting;
      const under5 = document.querySelector('.under-line5');
      under5.classList.add('display');
      var underLine5 = document.querySelectorAll(
        '.under-line1,.under-line2,.under-line3,.under-line4',
      );

      for (var i = 0; i < underLine5.length; i++) {
        underLine5[i].classList.remove('display');
      }

      secTalk.style.backgroundPosition = backgroundPs[1];
      secPost.style.backgroundPosition = backgroundPs[2];
      secToday.style.backgroundPosition = backgroundPs[3];
      secFriends.style.backgroundPosition = backgroundPs[0];
    };
  },

  lineWrap: function() {
    var userBox =
      '<div class="user-box"><span class="img-circle"><img class="giveId"></span><div class="name"></div><div class="status"></div></div>';
    var myloveBox =
      '<div class="mylove-box"><div class="mylove-bar">我的最愛<span class="love-number"></span><span class="mylove-click"></span><div class="toggle-arrow">ᐃ</div><div class="love-friend-box"><span class="love-friend-click"></span><span class="img-circle-friend"><img class="loveId"></span><div class="love-name"></div><div class="love-status"></div></<div></div></div>';
    var lineWrapper = document.querySelector('.line-wrap');

    lineWrapper.innerHTML = userBox;
    var userB = document.querySelector('.user-box');
    userB.insertAdjacentHTML('afterend', myloveBox);
    console.log('linewrapper');
    shanApp.lineWrapUserConfig(
      'Indie Game Dev',
      'https://www.yushan-li.com',
      require('../images/judo-face-cut.png'),
    );
    shanApp.lineWrapMyloveConfig(
      'Yushan Li',
      '做事要警慎小心。不要圖一時之利',
      require('../images/yushan-img.jpg'),
    );
  },

  lineWrapUserConfig: function(user, theStatus, selectImg) {
    var name = document.querySelector('.name');
    name.innerHTML = user;
    var status = document.querySelector('.status');
    status.innerHTML = theStatus;
    var giveId = document.querySelector('.giveId');
    giveId.src = selectImg;
  },
  lineWrapMyloveConfig(love, theStatus, selectImg) {
    var loveName = document.querySelector('.love-name');
    loveName.innerHTML = love;
    var loveStatus = document.querySelector('.love-status');
    loveStatus.innerHTML = theStatus;
    var loveId = document.querySelector('.loveId');
    loveId.src = selectImg;
  },
  lineWrapMyloveToggle() {
    const myLoveBox = document.querySelector('.mylove-box'),
      toggleArrow = document.querySelector('.toggle-arrow'),
      myLoveClick = document.querySelector('.mylove-click'),
      loveFriendBox = document.querySelector('.love-friend-box');
    var click = 0;
    myLoveClick.onclick = function() {
      console.log('togglearrow clicked');
      click++;
      return (function() {
        console.log('returned');
        if (click === 3) click = 1;
        switch (click) {
          case 1:
            toggleArrow.innerHTML = 'ᐁ';
            myLoveBox.style.height = '25px';
            loveFriendBox.style.height = '0px';
            console.log(click);
            break;
          case 2:
            toggleArrow.innerHTML = 'ᐃ';
            myLoveBox.style.height = '60px';
            loveFriendBox.style.height = '41px';
            console.log(click);
            break;
          default:
            toggleArrow.innerHTML = '';
        }
      })();
    };
  },
  lineFriend() {
    var lineFriendTotal = document.querySelector('.line-friend-total');

    var friends = [];
    var lineWrap = document.querySelector('.line-wrap');
    var friendBox = document.createElement('div');
    friendBox.className = 'friend-box';
    lineWrap.appendChild(friendBox);
    friendBox.innerHTML =
      '<div class="friend-bar">好友<span class="line-friend-total"></span><span class="friend-click"></span><div class="toggle-arrow">ᐃ</div></div>';

    for (var i = 0; i < 1; i++) {
      var myFrindBox = document.createElement('div');
      myFrindBox.className = 'friends' + i;
      friends.push(myFrindBox);
      console.log(friends.length);
    }
    lineFriendTotal.innerHTML = friends.length;
  },
  lineProfileBox() {
    const profileArticle = document.createElement('article');
    profileArticle.className = 'profile-box';

    const profile =
      '<section class="profile-background"><div class="profile-star">&#9733;</div><div class="profile-op"></div><div class="img-circle-big"><img class="profile-img"></div><div class="profile-name"></div><div class="profile-info"></div><span class="profile-toggle">ᐁ</span><div class="profile-lower"><div class="profile-chat"><span class="chat-img"></span><span class="chat-text">聊天</span></div><div class="profile-phone"><span class="phone-img"></span><span class="phone-text">免費通話</span></div><div class="profile-video"><span class="video-img"></span><span class="video-text">視訊通話</span></div></div><div class="profile-lower-bottom"><div class="profile-post">投稿</div><div class="profile-photo-movie">照片.影片</div></div></section><article class="profile-box2"><div class="profile-background2"><div class="profile-small-box"><div class="profile-post-thing">投稿</div><div class="img-circle-small"><img class="profile-img"></div><div class="profile-photo-movie2">照片.影片</div><div class="profile-chat-small"></div><div class="profile-op2"></div></div><section class="profile-post-box"><div class="profile-post-background"></div><span class="profile-post-nopost">沒有任何投稿</section><section class="profile-photo-movie-box"><div class="profile-photo-movie-background"></div><span class="profile-photo-movie-nopost">沒有照片或影片</section></div></article>';

    var loveClick = false;
    const line = document.querySelector('.line');
    const screenBc2 = document.querySelector('.screen-boxcontrol2');
    const loveFriendClick = document.querySelector('.love-friend-click');

    loveFriendClick.onclick = function() {
      loveClick = true;
      console.log(loveClick);

      shanApp.arrPush(profileArticle);

      line.appendChild(profileArticle);
      profileArticle.innerHTML = profile;
      console.log('lovefriendclick onclick arr', shanApp.arr);
      var profileName = document.querySelector('.profile-name');
      var profileImg = document.querySelectorAll('.profile-img');
      for (var i = 0; i < profileImg.length; i++) {
        profileImg[i].src = yushanLiImg;
      }

      profileName.innerHTML = 'Yushan Li';
      var profileInfo = document.querySelector('.profile-info');
      profileInfo.innerHTML = '做事要謹慎小心。不要圖一時之利';
    };
  },
  lineCall() {
    console.log('linecall', shanApp.arr.length);
    var freePhone = document.createElement('article');
    freePhone.className = 'free-phone';
    var phonePage =
      '<section class="phone-background"><div class="phone-picture"><img class="phone-picture-img"><div class="phone-smaller"></div></div><div class="phone-name">Yushan Li</div><div class="moving-ball-box"><div class="ball0"></div><div class="ball1"></div><div class="ball2"></div></div><div class="phone-mic"></div><div class="phone-video"></div><div class="phone-loud"></div><div class="phone-hang-up"></div></section>';

    changeCall('.profile-phone');

    function changeCall(cls) {
      var line = document.querySelector('.line');
      var phoneInit = false;
      var ele = document.querySelector(cls);
      switch (cls) {
        case '.profile-phone': {
          ele.onclick = function() {
            if (shanApp.arr.includes(freePhone)) {
              console.log('includes freephone');
              return false;
            }
            line.appendChild(freePhone);
            freePhone.innerHTML = phonePage;
            shanApp.arrPush(freePhone);

            var phonePictureImg = document.querySelector('.phone-picture-img');
            phonePictureImg.src = yushanLiImg;

            console.log('profilephone is appended', shanApp.arr);
            phoneInit = true;
            if (phoneInit == true) {
              console.log('you can now click button');
              var phonesmaller = false;
              var phoneSmaller = document.querySelector('.phone-smaller');
              phoneSmaller.onclick = function() {
                phonesmaller = true;
                console.log('phonesmaller', phonesmaller);
                var createBubble = function() {
                  var bubble = document.createElement('div');
                  bubble.className = 'phone-bubble';
                  var bubbles =
                    '<div class="img-circle-small"><img class="phone-bubble-img"></div><div class="phone-bubble-small"></div>';
                  bubble.innerHTML = bubbles;
                  shanApp.arrPush(bubble);
                  console.log(shanApp.arr);
                  // we will appendchild on freephone first because message area is not yet build
                  shanApp.messageBox();
                  freePhone.appendChild(bubble);
                  var img = require('../images/yushan-img.jpg');
                  var phoneBubbleImg = document.querySelector(
                    '.phone-bubble-img',
                  );
                  phoneBubbleImg.src = img;
                };
                var getSingle = function(fn) {
                  var result;
                  return function() {
                    return result || (result = fn.apply(this, arguments));
                  };
                };
                var OnCreateBubble = getSingle(createBubble);
                return OnCreateBubble();
              };
              var phoneHangUp = document.querySelector('.phone-hang-up');
              phoneHangUp.onclick = function() {
                console.log('hang up the call', shanApp.arr);
                line.removeChild(shanApp.arrPop());
                if (shanApp.arrPop() !== freePhone) {
                  console.log('not freephone');
                  return false;
                }
              };
            }
          };
          break;
        }
        case '.message-phone': {
          ele.onclick = function() {
            if (shanApp.arr.includes(freePhone)) {
              console.log('includes freephone');
              return false;
            }
            line.appendChild(freePhone);
            freePhone.innerHTML = phonePage;
            shanApp.arrPush(freePhone);

            var phonePictureImg = document.querySelector('.phone-picture-img');
            phonePictureImg.src = yushanLiImg;

            console.log('profilephone is appended', shanApp.arr);
            phoneInit = true;
            if (phoneInit == true) {
              console.log('you can now click button');
              var phonesmaller = false;
              var phoneSmaller = document.querySelector('.phone-smaller');
              phoneSmaller.onclick = function() {
                phonesmaller = true;
                console.log('phonesmaller', phonesmaller);
                var createBubble = function() {
                  var bubble = document.createElement('div');
                  bubble.className = 'phone-bubble';
                  var bubbles =
                    '<div class="img-circle-small"><img class="phone-bubble-img"></div><div class="phone-bubble-small"></div>';
                  bubble.innerHTML = bubbles;
                  shanApp.arrPush(bubble);
                  console.log(shanApp.arr);
                  // we will appendchild on freephone first because message area is not yet build
                  shanApp.messageBox();
                  freePhone.appendChild(bubble);
                  var img = require('../images/yushan-img.jpg');
                  var phoneBubbleImg = document.querySelector(
                    '.phone-bubble-img',
                  );
                  phoneBubbleImg.src = img;
                };
                var getSingle = function(fn) {
                  var result;
                  return function() {
                    return result || (result = fn.apply(this, arguments));
                  };
                };
                var OnCreateBubble = getSingle(createBubble);
                return OnCreateBubble();
              };
              var phoneHangUp = document.querySelector('.phone-hang-up');
              phoneHangUp.onclick = function() {
                console.log('hang up the call', shanApp.arr);
                line.removeChild(shanApp.arrPop());
                if (shanApp.arrPop() !== freePhone) {
                  console.log('not freephone');
                  return false;
                }
              };
            }
          };
          break;
        }
      }
    }
  },
  videoChat() {
    var videoScreen =
      '<div class="img-circle-big"><img class="profile-img"></div><div class="profile-name"></div><div class="moving-ball-video"><div class="ball0"></div><div class="ball1"></div><div class="ball2"></div></div><div class="phone-hang-up"></div>';

    var videoChatRTC = document.createElement('video');
    videoChatRTC.className = 'video-background';
    videoChatRTC.innerHTML = videoScreen;
    videoChatRTC.autoplay = true;

    var contraints = {
      video: {
        mandatory: {
          maxWidth: 274,
          maxHeight: 370,
        },
      },
      audio: true,
    };

    function hasUserMedia() {
      //check if the browswer supports the webrtc
      return !!(
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia
      );
    }
    if (hasUserMedia()) {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      navigator.getUserMedia(
        contraints,
        function(stream) {
          var videoBackGround = document.querySelector('.video-background');
          videoBackGround.src = window.URL.createObjectURL(stream);
        },
        function(err) {
          alert('fukced');
        },
      );
    } else {
      alert('webRTC not supported');
    }
    const profileVideo = document.querySelector('.profile-video');
    profileVideo.onclick = e => {
      if (shanApp.arr.includes(videoChatRTC)) {
        return false;
        console.log('return false video');
      }
      console.log('video clicked');

      var line = document.querySelector('.line');
      line.appendChild(videoChatRTC);
      shanApp.arrPush(videoChatRTC);
      hasUserMedia();
      console.log('videochat', shanApp.arr.length);
    };
  },

  messageBox() {
    var cpu = null;
    console.log('message-box');
    var line = document.querySelector('.line');
    var messageBox = document.createElement('article');
    messageBox.className = 'message-box';
    var message =
      '<div class="message-upper-box"><div class="message-back"></div><div class="message-friend-name"></div><div class="message-lock"></div><div class="message-phone"></div><div class="message-notebook"></div><div class="message-toggle-down"></div></div><div class="message-toggle-box"><div class="message-invite"><span class="span-invite">邀請</span></div><div class="message-search"><span class="span-search">搜尋</span></div><div class="message-notify"><span class="span-notify">關閉提醒</span></div><div class="message-block"><span class="span-block">封鎖</span></div><div class="message-notebook-2"><span class="span-notebook-2">記事本</span></div><div class="message-photos"><span class="span-photos">相簿</span></div><div class="message-share-content"><span class="span-share-content">共享內容</span></div><div class="message-activity"><span class="span-activity">活動</span></div><div class="message-edit-message"><span class="span-edit-message">編輯訊息</span></div><div class="message-setup"><span class="span-setup">設定</span></div></div><div class="message-dialog"><div class="message-plus"></div><div class="message-camera"></div><div class="message-photo"></div><div class="message-field"><input class="messgae-input type="text"><button type="submit"><img class="message-img"></button></div><div class="message-record-sound"></div></div><ul class="message-board"></ul>';

    // var profileChat = document.querySelector('.profile-chat')
    // profileChat.onclick = function () {
    //  changeElement(this.cls)

    // }
    // var profileChatSmall = document.querySelector('.profile-chat-small')
    // profileChatSmall.onclick = function(){
    //   changeElement(this.cls)
    // }
    changeElement('.profile-chat');
    changeElement('.profile-chat-small');

    function changeElement(cls) {
      var ele = document.querySelector(cls);
      switch (cls) {
        case '.profile-chat':
          {
            ele.onclick = function() {
              if (shanApp.arr.includes(messageBox)) {
                return false;
                console.log('no message box');
              }
              console.log('profile-chat clicked');
              messageBox.innerHTML = message;
              shanApp.arrPush(messageBox);

              console.log('mesagebox', shanApp.arr.length);
              line.appendChild(messageBox);
              var messageImg = document.querySelector('.message-img');
              var smileImg = require('../images/smile.svg');
              messageImg.src = smileImg;

              messageControl();

              userTalking.choice('雨珊,安安', '雨珊,你今天好漂亮~', 0);

              if (
                userTalking.decisionMade === 1 &&
                userTalking.choiceMade === false
              ) {
                console.log('choice false made 1');
                $('.choice1').on('click', function() {
                  console.log('clicked choice1');

                  userTalking.choice1();

                  userTalking.cpuTalking('安什麼安', '謝謝,嘴巴真甜', 3000);
                  userTalking.choice('最近好嗎', '最近有變胖嗎', 4000);
                  if (
                    userTalking.choiceMade === false &&
                    userTalking.decisionMade === 2
                  ) {
                    $('.choice1').on('click', function() {
                      userTalking.choice1();
                      userTalking.cpuTalking(
                        '最近還不錯啊~你呢?',
                        '幹!你最近變胖了喔?',
                        3000,
                      );
                      userTalking.choice('都在忙什麼?', '我還不是老樣子', 4000);
                      if (
                        userTalking.choiceMade === false &&
                        userTalking.decisionMade === 3
                      ) {
                        console.log('next3', userTalking.decisionMade);
                        $('.choice1').on('click', function() {
                          console.log('click');
                          userTalking.choice1();
                          userTalking.cpuTalking(
                            '忙著釣凱子啊~呵呵',
                            '沒變胖可以多吃一點啊',
                            3000,
                          );
                          userTalking.choice(
                            '釣了幾個凱子啊?',
                            '釣凱子?',
                            4000,
                          );
                          if (
                            userTalking.choiceMade === false &&
                            userTalking.decisionMade === 4
                          ) {
                            console.log('next4', userTalking.decisionMade);
                            $('.choice1').on('click', function() {
                              console.log('clicked');
                              userTalking.choice1();
                              userTalking.cpuTalking(
                                '很多個啊~隔壁的老王~小李～小四~小七~',
                                '有沒有吃到💩啊',
                                3000,
                              );
                              userTalking.choice(
                                '哇靠!這麼多!',
                                '分明給我戴綠帽',
                                4000,
                              );
                              if (
                                userTalking.choiceMade === false &&
                                userTalking.decisionMade === 5
                              ) {
                                console.log('next5', userTalking.decisionMade);
                                $('.choice1').on('click', function() {
                                  console.log('clicked');
                                  userTalking.choice1();
                                  userTalking.cpuTalking(
                                    '還算少哩~',
                                    '有沒有吃到💩啊',
                                    3000,
                                  );
                                  userTalking.choice(
                                    '這樣叫少?',
                                    '我打死你',
                                    4000,
                                  );
                                  if (
                                    userTalking.choiceMade === false &&
                                    userTalking.decisionMade === 6
                                  ) {
                                    console.log(
                                      'next6',
                                      userTalking.decisionMade,
                                    );
                                    $('.choice1').on('click', function() {
                                      console.log('clicked');
                                      userTalking.choice1();
                                      userTalking.cpuTalking(
                                        '我姊妹每天換一個啊~跟她比起來~真慚愧',
                                        null,
                                        3000,
                                      );
                                      userTalking.choice(
                                        '慚愧殺小鬼東西啦?',
                                        '你姐妹?',
                                        4000,
                                      );
                                      if (
                                        userTalking.choiceMade === false &&
                                        userTalking.decisionMade === 7
                                      ) {
                                        console.log(
                                          'next7',
                                          userTalking.decisionMade,
                                        );
                                        $('.choice1').on('click', function() {
                                          console.log('clicked');
                                          userTalking.choice1();
                                          userTalking.cpuTalking(
                                            '誒~一天換一個耶~多屌啊',
                                            null,
                                            3000,
                                          );
                                          userTalking.choice(
                                            '汗..是在屌啥小拉~',
                                            '我打死你',
                                            4000,
                                          );
                                          if (
                                            userTalking.choiceMade === false &&
                                            userTalking.decisionMade === 8
                                          ) {
                                            console.log(
                                              'next8',
                                              userTalking.decisionMade,
                                            );
                                            $('.choice1').on(
                                              'click',
                                              function() {
                                                console.log('clicked');
                                                userTalking.choice1();
                                                userTalking.cpuTalking(
                                                  '就很屌啊~我現在還不夠~只有老王,小李,小四,小七,還要繼續加油~',
                                                  null,
                                                  3000,
                                                );
                                                userTalking.choice(
                                                  '我打死你!',
                                                  '我打死你!',
                                                  4000,
                                                );
                                                if (
                                                  userTalking.choiceMade ===
                                                    false &&
                                                  userTalking.decisionMade === 9
                                                ) {
                                                  console.log(
                                                    'next9',
                                                    userTalking.decisionMade,
                                                  );
                                                  $('.choice1').on(
                                                    'click',
                                                    function() {
                                                      console.log('clicked');
                                                      userTalking.choice1();
                                                      userTalking.cpuTalking(
                                                        'OH~NO',
                                                        null,
                                                        3000,
                                                      );
                                                    },
                                                  );
                                                }
                                              },
                                            );
                                          }
                                        });
                                      }
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                    $('.choice2').on('click', function() {
                      userTalking.choice2();
                      userTalking.cpuTalking(
                        '最近還不錯啊~你呢?',
                        '幹!你最近變胖了喔?',
                        3000,
                      );
                      userTalking.choice('都在忙什麼?', '我最近沒變胖啊', 4000);
                    });
                  }
                });

                //new conversatoion

                $('.choice2').on('click', function() {
                  console.log('choice2 clicked');
                  userTalking.choice2();
                  userTalking.cpuTalking('安什麼安', '謝謝,嘴巴真甜', 3000);
                  userTalking.choice('最近好嗎', '最近有變胖嗎', 4000);
                });
              }

              if (
                userTalking.choiceMade === false &&
                userTalking.decisionMade === 2
              ) {
                $('.choice1').on('click', function() {
                  userTalking.choice1();
                  userTalking.cpuTalking(
                    '最近還不錯啊~你呢?',
                    '胖?你最近變胖了嗎',
                    3000,
                  );
                });
                $('.choice2').on('click', function() {
                  userTalking.choice2();
                  userTalking.cpuTalking(
                    '最近還不錯啊~你呢?',
                    '胖?你最近變胖了嗎',
                    3000,
                  );
                });
              }

              if (
                userTalking.choiceMade === false &&
                userTalking.decisionMade === 3
              ) {
                console.log('3');
              }
            };
          }

          break;

        case '.profile-chat-small': {
          ele.onclick = function() {
            if (shanApp.arr.includes(messageBox)) {
              return false;
              console.log('no message box');
            }
            console.log('profile-chat-small clicked');
            messageBox.innerHTML = message;
            shanApp.arrPush(messageBox);

            console.log('mesagebox', shanApp.arr.length);
            line.appendChild(messageBox);
            var messageImg = document.querySelector('.message-img');
            var smileImg = require('../images/smile.svg');
            messageImg.src = smileImg;

            messageControl();

            userTalking.choice('你好啊~雨珊', '嗨~雨珊,你今天真漂亮');
          };
        }
      }
    }

    function messageControl() {
      const messageBack = document.querySelector('.message-box');
      const messageFriendName = document.querySelector('.message-friend-name');
      messageFriendName.innerHTML = 'Yushan Li';
      const messagePhone = document.querySelector('.message-phone');
      const messageNoteBook = document.querySelector('.message-note-book');
      const messageToggleDown = document.querySelector('.message-toggle-down');
      var click = 0;
      messageToggleDown.onclick = function() {
        console.log('clicked');
        click++;
        var messageToggleBox = document.querySelector('.message-toggle-box');
        return (function() {
          console.log('returned');

          if (click === 3) click = 1;
          switch (click) {
            case 1:
              messageToggleBox.style.height = '150px';
              var messageToggleDown = document.querySelector(
                '.message-toggle-down',
              );
              messageToggleDown.style.backgroundPosition = '-839px -605px';
              var messages = document.querySelectorAll(
                '.message-invite,.message-search,.message-notify,.message-block,.message-notebook-2,.message-photos,.message-share-content,.message-activity,.message-edit-message,.message-setup',
              );
              for (var i = 0; i < messages.length; i++) {
                messages[i].style.visibility = 'visible';
                messages[i].style.opacity = '1';
              }
              break;

            case 2:
              messageToggleBox.style.height = '0px';
              var messageToggleDown = document.querySelector(
                '.message-toggle-down',
              );
              messageToggleDown.style.backgroundPosition = '-493px -605px';
              var messages = document.querySelectorAll(
                '.message-invite,.message-search,.message-notify,.message-block,.message-notebook-2,.message-photos,.message-share-content,.message-activity,.message-edit-message,.message-setup',
              );
              for (var i = 0; i < messages.length; i++) {
                messages[i].style.visibility = 'hidden';
                messages[i].style.opacity = '0';
              }
              break;
          }

          console.log(click);
        })();
      };
    }
  },

  mobileBack() {
    //checking if shanapp.arr have undefine insdie if it does then remove it

    var back = document.querySelector('.back');
    var screenBc2 = document.querySelector('.screen-boxcontrol2');
    var screenBc = document.querySelector('.screen-boxcontrol');
    var profileBox = document.querySelector('.profile-box');
    var line = document.querySelector('.line');
    var messageBox = document.querySelector('.message-box');
    var videoChatRTC = document.querySelector('.video-background');
    back.onclick = function() {
      console.log('clicked', shanApp.arr, shanApp.arr.length);
      var article = document.createElement('article');
      var div = document.createElement('div');
      for (var i = 0; i < shanApp.arr.length; i++) {
        if (shanApp.arr[i] === undefined || shanApp.arr[i] === null) {
          shanApp.arr.splice(i, 1);
          console.log('undefine null', shanApp.arr);
        }
        if ((shanApp.arr[i] === article.className) == 'message-box') {
          shanApp.arr.splice(i, 1);
          console.log('removed', shanApp.arr.splice(i, 1));
        }
        if ((shanApp.arr[i] === article.className) == 'free-phone') {
          shanApp.arr.splice(i, 1);
          console.log('remove freephone', shanApp.arr);
        }
        if ((shanApp.arr[i] === div.className) == 'phone-bubble') {
          shanApp.arr.splice(i, 1);
          console.log('removed phone-bubble');
        }
        if ((shanApp.arr[i] === article.className) == 'video-background') {
          shanApp.arr.splice(i, 1);
          console.log('removed video-background');
        }
        if ((shanApp.arr[i] === article.className) == 'message-box') {
          shanApp.arr.splice(i, 1);
          console.log('removed message-box');
        }
      }

      if (shanApp.arr.length === 3 && document.documentElement.contains(line)) {
        console.log('remove profile box', shanApp.arr);

        line.removeChild(shanApp.arrPop());
      } else if (
        shanApp.arr.length === 2 &&
        document.documentElement.contains(screenBc2)
      ) {
        screenBc2.removeChild(shanApp.arrPop());
        console.log(shanApp.arr, 'removed length = 2');
        if (
          document.documentElement.contains(screenBc) &&
          screenBc.hasChildNodes('screen-boxcontrol2')
        ) {
          screenBc.removeChild(shanApp.arrPop());
          console.log('removed', shanApp.arr);
        }
      } else if (
        shanApp.arr.length === 4 &&
        document.documentElement.contains(messageBox)
      ) {
        profileBox.removeChild(shanApp.arrPop());
        console.log('nothing to do', shanApp.arr);
      }
    };
  },
  removeAll() {
    userTalking.decisionMade = 0;
    console.log('usertalking decisionmade', userTalking.decisionMade);
    var fivePoints = document.querySelector('.five-points');
    fivePoints.onclick = function() {
      var screenBc2 = document.querySelector('.screen-boxcontrol2');
      var screenBc2FirstEl = screenBc2.firstElementChild;
      while (screenBc2FirstEl) {
        screenBc2.removeChild(screenBc2FirstEl);
        screenBc2FirstEl = screenBc2.lastElementChild;
        document.querySelector('.screen-boxcontrol').removeChild(screenBc2);
        var choiceBc = document.querySelector('.choice-boxcontrol');
        var choiceBcParentEl = choiceBc.parentElement;
        choiceBcParentEl.removeChild(choiceBc);
        console.log('shanApp', shanApp.arr);
      }
    };
  },
  musicPlayer() {
    var player = document.createElement('section');
    player.classList.add('music-boxcontrol');
    var buttons =
      '<div class="play-btn"></div><input class="seek-slider" type="range" min="0" max="100" value="0" step="1"><div class="speaker"></div><input class="volume-slider" type="range" min="0" max="100" value="100" step="1">';
    var screenBc = document.querySelector('.screen-boxcontrol');
    screenBc.appendChild(player);
    player.innerHTML = buttons;
    initAudioPlayer();
    var audio;
    var playBtn;
    var muteBtn;
    var seekSlider;
    var seeking = false;
    var volumeSlider;
    var seekTo;
    var song5 = path.join(__dirname, 'src', 'sound', '5.mp3');
    function initAudioPlayer() {
      audio = new Audio();

      audio.src = path.join(__dirname, 'src', 'sound', '5.mp3');
      audio.loop = true;

      playBtn = document.querySelector('.play-btn');
      muteBtn = document.querySelector('.speaker');
      seekSlider = document.querySelector('.seek-slider');
      volumeSlider = document.querySelector('.volume-slider');
      //add event
      playBtn.addEventListener('click', playPause);
      muteBtn.addEventListener('click', mute);
      seekSlider.addEventListener('mousedown', function(event) {
        seeking = true;
        seek(event);
      });
      seekSlider.addEventListener('mouseup', function() {
        seeking = false;
      });
      seekSlider.addEventListener('mousemove', function(event) {
        seek(event);
      });
      volumeSlider.addEventListener('mousemove', setVolume);
      var pausePng = require('../images/pause.png');
      var playPng = require('../images/play.png');
      function playPause() {
        console.log('pressed');
        if (audio.paused) {
          console.log('paused play it');
          audio.play();
          playBtn.style.background = 'url(' + pausePng + ')no-repeat';
        } else {
          console.log('paused');
          audio.pause();
          playBtn.style.background = 'url(' + playPng + ')no-repeat';
        }
      }
      var mutePng = require('../images/mute.png');
      var mutedPng = require('../images/muted.png');
      function mute() {
        console.log('pressed');
        if (audio.muted) {
          console.log('muted play it');
          audio.muted = false;
          muteBtn.style.background = 'url(' + mutePng + ')no-repeat';
        } else {
          console.log('muted');
          audio.muted = true;
          muteBtn.style.background = 'url(' + mutedPng + ')no-repeat';
        }
      }
      function setVolume() {
        audio.volume = volumeSlider.value / 100;
      }
      function seek(event) {
        if (seeking) {
          seekSlider.value = event.clientX - seekSlider.offsetLeft;
          seekTo = audio.duration * (seekSlider.value / 100);
          audio.currentTime = seekTo;
        }
      }
    }
  },

  lineAddingFriend() {
    var addFriends = document.querySelector('.add-friend');
    addFriends.onclick = function() {
      console.log('press addfriends');
      var line = document.querySelector('.line');
      var addFnds = document.createElement('article');
      addFnds.className = 'screen-boxcontrol3';
      console.log('here');
      var addFriendsDiv = document.createElement('div');
      addFnds.innerHTML = addFriendsDiv;
      addFriendsDiv.className = 'add-friends-box';
      var addFriendsBox = document.querySelector('.add-friends-box');
      console.log('herehere');
      var addFriendsPage =
        '<div class="add-friends-box"></div><section class="friends-box"><div class="add-friends-title">加入好友</div><div class="add-friend-options"></div><div class="add-friend-invite"></div><div class="add-friend-gogo"></div><div class="add-friend-shake"></div><div class="add-friend-search"></div><div class="add-friend-auto-adding"><div class="add-friend-icon"></div><div class="add-friend-auto-text">自動加入好友</div><div class="add-friend-panel">ON</div><div class="add-friend-change-setting">更變您的設定</div><div class="add-friend-refresh"></div></div><div class="add-friend-create-group"><div class="add-friend-group-icon"></div><div class="add-friend-group-text">建立群組</div><div class="add-friend-smaller-text">與好友建立群組</div><div class="add-friend-arrow"></div></div></section>';
      addFriendsBox.innerHTML = addFriendsPage;
      shanApp.arrPush(addFnds);
      line.appendChild(addFnds);
      console.log(arr);
    };
  },
  lineProfile() {
    var profileBox = document.querySelector('.profile-box');

    $('.profile-post').on('click', function() {
      console.log('click profile-post');
      $('.profile-background').css('top', '-370px');
      $('.profile-background2').css('top', '0px');
    });

    var manager = new Hammer.Manager(profileBox);
    var swipe = new Hammer.Swipe();
    manager.add(swipe);
    var deltaX = 0;
    var deltaY = 0;
    manager.on('swipe', function(e) {
      console.log('e.target', e.target);
      deltaX = deltaX + e.deltaX;
      deltaY = deltaY + e.deltaY;
      console.log('deltaY', deltaY);
      var direction = e.offsetDirection;
      console.log('direction', direction);
      var translated3d = 'translate3d(' + deltaX + 'px,0,0)';

      if (direction === 8) {
        $('.profile-background').css('top', '-370px');
        $('.profile-background2').css('top', '0px');
        console.log('swipe', direction);
      }
      if (direction === 16) {
        $('.profile-background').css('top', '0px');
        $('.profile-background2').css('top', '370px');
        console.log('swipe', direction);
      }
    });
  },

  profileToggle() {
    var profileToggle = document.querySelector('.profile-toggle');
    var click = 0;
    profileToggle.onclick = () => {
      console.log('clicked protogglert', click);
      return (() => {
        click++;
        if (click === 3) click = 1;
        switch (click) {
          case 1:
            $('.img-circle-big').css('top', '20%');
            $('.profile-name').css('top', '40%');
            $('.profile-info').css('top', '52%');
            var div = document.createElement('div');
            div.className = 'profile-info2';
            $('.profile-background').append(div);
            $('.profile-info2')
              .css({
                display: 'block',
                position: 'absolute',
                top: '47%',
                left: '0%',
                right: '0%',
                'font-size': '10px',
                'text-align': 'center',
                color: 'white',
              })
              .text('1991年7月25日');
            $('.profile-toggle').text('ᐃ');
            break;
          case 2:
            $('.img-circle-big').css('top', '30%');
            $('.profile-name').css('top', '50%');
            $('.profile-info').css('top', '57%');
            $('.profile-toggle').text('ᐁ');
            document
              .querySelector('.profile-info2')
              .parentElement.lastChild.remove();
            if (
              document.documentElement.contains(
                document.querySelector('profile-info2'),
              )
            ) {
              console.log('shit its still here');
            } else {
              console.log('removed profile-info2');
            }
            break;
        }
      })();
    };
  },

  special:
    '<div class="special-btn"><span class="tips pos">手機</span></div><div class="special-one"><span class="tips pos1">相本</span></div><div class="special-two"><span class="tips pos5">手</span></div><div class="special-three"><span class="tips pos5">Localstorage</span></div><div class="special-four"><span class="tips pos2">駭客雨</span></div><div class="special-five"></div>',
  phone: false,
  specialAppBtn: function() {
    var footerBc = document.querySelector('.footer-boxcontrol');

    footerBc.innerHTML = this.special;
    console.log('special app finished loading');
    var book = document.querySelector('.special-one');
    var phone = document.querySelector('.special-btn');
    var mainBc = document.querySelector('.main-boxcontrol');

    var scene = document.querySelector('.scene');
    var yushan = document.querySelectorAll(
      '.yushan1,.yushan2,.yushan3,.yushan4,.yushan5,.yushan6',
    );

    var phoneClick = 0;
    phone.onclick = () => {
      console.log('phone');
      phoneClick++;
      return (() => {
        if (phoneClick === 3) phoneClick = 1;
        switch (phoneClick) {
          case 1:
            console.log(this.phone);
            if (this.phone === false) {
              $('.shan-li-chat-app').css({
                opacity: '1',
                visibility: 'visible',
                function() {
                  this.phone = true;
                  console.log('css', this.phone);
                },
              });
              phone.classList.add('phone-on');

              var shanLiChatApp = document.querySelector('.shan-li-chat-app');
              var slideBc = document.querySelector('.slide-boxcontrol');
              let manager = new Hammer.Manager(slideBc);
              let swipe = new Hammer.Swipe();
              manager.add(swipe);
              manager.on('swipe', function(e) {
                console.log('swipe');
                let direction = e.offsetDirection;
                console.log('dir', direction);
                if (direction === 8) {
                  console.log('fucked');
                }
                if (direction === 16) {
                  $('.shan-li-chat-app').css({
                    visibility: 'hidden',
                    opacity: '0',
                  });
                  phone.classList.remove('phone-on');
                  this.phone = false;
                  console.log(this.phone);
                }
              });
            }
            this.phone = true;
            console.log(this.phone);
            break;
          case 2:
            if (this.phone === true) {
              console.log('this.phone', this.phone);
              $('.shan-li-chat-app').css({
                opacity: '0',
                visibility: 'hidden',
              });
              phone.classList.remove('phone-on');
              this.phone = false;
              console.log('this.phone', this.phone);
            }

            break;
        }
      })();
    };
    var clickT = 0;
    var specialThree = document.querySelector('.special-three');
    specialThree.onclick = () => {
      clickT++;
      console.log('click');
      return (function() {
        if (clickT === 3) clickT = 1;
        switch (clickT) {
          case 1:
            $('.local-wrapper').css('display', 'block');
            break;
          case 2:
            $('.local-wrapper').css('display', 'none');
        }
      })();
    };
    var clickF = 0;
    var specialFour = document.querySelector('.special-four');
    specialFour.onclick = () => {
      console.log('clicked', clickF);
      return (() => {
        console.log('returned', clickF);
        clickF++;
        if (clickF === 3) clickF = 1;
        switch (clickF) {
          case 1:
            matrix.matrix();
            console.log('case1');
            break;
          case 2:
            var defaultCanvas = document.querySelector('#defaultCanvas0');
            defaultCanvas.parentElement.removeChild(defaultCanvas);

            console.log('case 2');

            break;
        }
      })();
    };
    var clickT = 0;
    const specialTwo = document.querySelector('.special-two');
    specialTwo.onclick = () => {
      clickT++;
      return (function() {
        if (clickT === 3) clickT = 1;
        switch (clickT) {
          case 1:
            hand.original();
            document.querySelector('.click-box').style.margin =
              '-30px 0 0 -30px';
            hand.moveHands();

            document.querySelector('.click-box').style.margin = '';
            break;
          case 2:
            var clickBox = document.querySelector('.click-box');
            clickBox.parentElement.removeChild(clickBox);
            break;
        }
      })();
    };
    var click = 0;
    book.onclick = () => {
      console.log('bag clicked');
      click++;
      return (() => {
        if (click === 3) click = 1;

        console.log('return', click);
        switch (click) {
          case 1:
            scene.style.visibility = 'visible';
            scene.style.opacity = '1';
            $('.photo1').on('click', function() {
              let yushan1 = document.querySelector('.yushan1');
              yushan1.src = require('../images/yushan06.jpg');
              console.log('clicked');
              $('.photo1-show').css({
                visibility: 'visible',
                opacity: '1',
              });
            });
            $('.photo2').on('click', function() {
              let yushan2 = document.querySelector('.yushan2');
              yushan2.src = require('../images/yushan-line10.png');
              console.log('clicked2');
              $('.photo2-show').css({
                visibility: 'visible',
                opacity: '1',
              });
            });
            $('.photo3').on('click', function() {
              let yushan3 = document.querySelector('.yushan3');
              yushan3.src = require('../images/shan.jpg');
              console.log('clicked2');
              $('.photo3-show').css({
                visibility: 'visible',
                opacity: '1',
              });
            });
            $('.photo4').on('click', function() {
              let yushan4 = document.querySelector('.yushan4');
              yushan4.src = require('../images/yushan-jap2.jpg');
              console.log('clicked2');
              $('.photo4-show').css({
                visibility: 'visible',
                opacity: '1',
              });
            });
            $('.photo5').on('click', function() {
              let yushan5 = document.querySelector('.yushan5');
              yushan5.src = require('../images/yushan05.jpg');
              console.log('clicked2');
              $('.photo5-show').css({
                visibility: 'visible',
                opacity: '1',
              });
            });
            $('.photo6').on('click', function() {
              let yushan6 = document.querySelector('.yushan6');
              yushan6.src = require('../images/yushan08.jpg');
              console.log('clicked2');
              $('.photo6-show').css({
                visibility: 'visible',
                opacity: '1',
              });
            });
            $('.close').on('click', function() {
              console.log('clicked');
              $(
                '.photo1-show,.photo2-show,.photo3-show,.photo4-show,.photo5-show,.photo6-show',
              ).css({
                visibility: 'hidden',
                opacity: '0',
              });
            });

            var layerText = document.querySelector('.layer-text');
            for (var a = 3; a < 10; a++) {
              var pageLeft = document.createElement('div');
              pageLeft.classList.add('page-left-' + a);
              layerText.appendChild(pageLeft);
            }
            var page2 = document.querySelector('.page-left-2');
            var manager = new Hammer.Manager(page2);
            var swipe = new Hammer.Swipe();
            manager.add(swipe);
            var deltaX = 0;
            var deltaY = 0;
            manager.on('swipe', function(e) {
              console.log('page', e.target);
              deltaX = deltaX + e.deltaX;
              deltaY = deltaY + e.deltaY;
              let direction = e.offsetDirection;
              console.log('direction', direction);
              var rotateY = 'rotatey(' + deltaY + 'deg)';

              if (direction === 4) {
                $('.page-left-2').css({
                  transform: 'rotatey(146deg)translatez(7px)',
                  flex: 'inherit',
                });
                $('.page-left-2-before').css({
                  zIndex: '999',
                  position: 'absolute',
                  width: '204px',
                  height: '343px',
                  background: 'white',
                });
              }
              if (direction === 2) {
                $('.page-left-2').css({
                  transform: 'rotatey(7deg)',
                  flex: '1',
                });
                $('.page-left-2-before').css('zIndex', '0');
              }
            });

            console.log('deployed book');

            break;

          case 2:
            scene.style.visibility = 'hidden';
            scene.style.opacity = '0';
            console.log('book removed');

            break;
        }
      })();
    };
  },
  movePhone() {
    const hammer1 = new Hammer.Manager(
      document.querySelector('.shan-li-chat-app'),
    );
    hammer1.add(
      new Hammer.Pan({
        direction: Hammer.DIRECTION_ALL,
        threshold: 0,
      }),
    );
    hammer1.on('pan', handleDrag);

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
      var shanLiChatApp = document.querySelector('.shan-li-chat-app');
      var updateStatus = document.querySelector('.updates');
      if (!isDragging) {
        isDragging = true;
        rect = shanLiChatApp.getBoundingClientRect();
        pos3 = e.deltaX;
        pos4 = e.deltaY;
        updateStatus.innerHTML = 'updates' + pos3 + ',' + pos4;
        console.log(pos3, pos4);
      }

      viewport.bottom = window.innerHeight - PADDING;
      viewport.left = PADDING;
      viewport.right = window.innerWidth - PADDING;
      viewport.top = PADDING;

      // calculate the new cursor position:
      pos1 = pos3 - e.deltaX;
      pos2 = pos4 - e.deltaY;
      pos3 = e.deltaX;
      pos4 = e.deltaY;
      console.log(pos1, pos2, pos3, pos4);

      // check to make sure the shanLiChatAppent will be within our viewport boundary
      var newLeft = shanLiChatApp.offsetLeft - pos1;
      var newTop = shanLiChatApp.offsetTop - pos2;
      console.log(newLeft, newTop);
      if (
        newLeft < viewport.left ||
        newTop < viewport.top ||
        newLeft + rect.width > viewport.right ||
        newTop + rect.height > viewport.bottom
      ) {
        console.log(
          'viewportright',
          viewport.right,
          'viewporttop',
          viewport.top,
          'left',
          viewport.left,
          'bottom',
          viewport.bottom,
        );
        // the shanLiChatAppent will hit the boundary, do nothing...
      } else {
        // set the shanLiChatAppent's new position:
        shanLiChatApp.style.top = shanLiChatApp.offsetTop - pos2 + 'px';
        shanLiChatApp.style.left = shanLiChatApp.offsetLeft - pos1 + 'px';
        updateStatus.innerHTML = pos1 + pos2 + pos3 + pos4;
      }
      if (e.isFinal) {
        console.log('e.isfinal', e.isFinal);
        isDragging = false;
      }
    }
  },
  temper:
    '<div class="friendly-box"><span class="friendly-title">友善</span><div class="friendly-set-one"></div><div class="friendly-set-two"></div><div class="friendly-set-three"></div><div class="friendly-set-four"></div><div class="friendly-set-five"></div><div class="friendly-set-six"></div><div class="friendly-set-seven"></div><div class="friendly-set-eight"></div><div class="friendly-set-nigh"></div><div class="friendly-set-ten"></div></div><div class="suspicious-box"><span class="suspicious-title">懷疑</span><div class="suspicious-set-one"></div><div class="suspicious-set-two"></div><div class="suspicious-set-three"></div><div class="suspicious-set-four"></div><div class="suspicious-set-five"></div><div class="suspicious-set-six"></div><div class="suspicious-set-seven"></div><div class="suspicious-set-eight"></div><div class="suspicious-set-eigh"></div><div class="suspicious-set-ten"></div></div><div class="angry-box"><span class="angry-title">生氣</span><div class="angry-set-one"></div><div class="angry-set-two"></div><div class="angry-set-three"></div><div class="angry-set-four"></div><div class="angry-set-five"></div><div class="angry-set-six"></div><div class="angry-set-seven"></div><div class="angry-set-eight"></div><div class="angry-set-eigh"></div><div class="angry-set-ten"></div></div>',
  temperApp() {
    console.log('temperapp');

    var headerMenu = document.querySelector('.header-menu');

    headerMenu.insertAdjacentHTML(
      'afterbegin',
      '<article class="temper-boxcontrol"></article>',
    );
    var tempBc = document.querySelector('.temper-boxcontrol');
    tempBc.innerHTML = this.temper;
  },
  movePoint() {
    var div = document.createElement('div');
    div.classList.add('light');
    document.querySelector('.shan-li-chat-app').appendChild(div);
    document.addEventListener('click', getClickPosition, false);

    function getClickPosition(e) {
      var parentPos = getPosition(e.currentTarget);
      var xPos = e.clientX - parentPos.x - div.clientWidth;
      var yPos = e.clientY - parentPos.y - div.clientHeight;

      div.style.left = xPos + 'px';
      div.style.top = yPos + 'px';
      div.style.visibility = 'visible';
    }
    //helper function
    function getPosition(el) {
      var xPosition = 0;
      var yPosition = 0;

      while (el) {
        if (el.tagName == 'BODY') {
          //deal with browser quirks with body window document and page scroll
          var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
          var yScroll = el.scrollTop || document.documentElement.scrollTo;

          xPosition += el.offsetLeft - xScroll + el.clientLeft;
          yPosition += el.offsetTop - yScroll + el.clientTop;
        } else {
          //for all other non body elements
          xPosition = el.offsetLeft - el.scrollLeft + el.clientLeft;
          yPosition = el.offsetTop - el.scrollTop + el.clientTop;
        }
        el = el.offsetParent;
      }
      return {
        x: xPosition,
        y: yPosition,
      };
    }
  },
  localstorage() {
    const localWrapper = document.querySelector('.local-wrapper');
    const hammer = new Hammer.Manager(localWrapper);
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
      var ele = document.querySelector('.local-wrapper');

      if (!isDragging) {
        console.log('not draffing');
        isDragging = true;
        rect = ele.getBoundingClientRect();
        pos3 = e.deltaX;
        pos4 = e.deltaY;
      }

      viewport.bottom = window.innerHeight - PADDING;
      viewport.left = PADDING;
      viewport.right = window.innerWidth - PADDING;
      viewport.top = PADDING;

      // calculate the new cursor position:
      pos1 = pos3 - e.deltaX;
      pos2 = pos4 - e.deltaY;
      pos3 = e.deltaX;
      pos4 = e.deltaY;
      console.log(pos1, pos2, pos3, pos4);

      // check to make sure the shanLiChatAppent will be within our viewport boundary
      var newLeft = ele.offsetLeft - pos1;
      var newTop = ele.offsetTop - pos2;
      console.log(newLeft, newTop);
      if (
        newLeft < viewport.left ||
        newTop < viewport.top ||
        newLeft + rect.width > viewport.right ||
        newTop + rect.height > viewport.bottom
      ) {
        console.log(
          'viewportright',
          viewport.right,
          'viewporttop',
          viewport.top,
          'left',
          viewport.left,
          'bottom',
          viewport.bottom,
        );
        // the shanLiChatAppent will hit the boundary, do nothing...
      } else {
        // set the shanLiChatAppent's new position:
        ele.style.top = ele.offsetTop - pos2 + 'px';
        ele.style.left = ele.offsetLeft - pos1 + 'px';
      }
      if (e.isFinal) {
        console.log('e.isfinal', e.isFinal);
        isDragging = false;
      }
    }
    const addItems = document.querySelector('.add-items');
    const itemsList = document.querySelector('.plates');
    const items = JSON.parse(localStorage.getItem('items')) || [];
    function addItem(e) {
      console.log('additem');
      e.preventDefault();
      const text = this.querySelector('[name=item]').value;
      const item = {
        text,
        done: false,
      };
      items.push(item);
      populateList(items, itemsList);
      localStorage.setItem('items', JSON.stringify(items));
      this.reset();
    }
    function populateList(plates = [], platesList) {
      platesList.innerHTML = plates
        .map((plate, i) => {
          return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${
            plate.done ? 'checked' : ''
          } />
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
        })
        .join('');
    }
    function toggleDone(e) {
      console.log('toggle');
      if (!e.target.matches('input')) return; // skip this unless it's an input
      const el = e.target;
      const index = el.dataset.index;
      items[index].done = !items[index].done;
      localStorage.setItem('items', JSON.stringify(items));
      populateList(items, itemsList);
    }
    addItems.addEventListener('submit', addItem);
    itemsList.addEventListener('click', toggleDone);
    populateList(items, itemsList);
  },
};

function checking(selector, callback, time) {
  var self = this;
  self.selector = selector;
  self.callback = callback;
  self.time = 1 || time;
  self.start = function() {
    self.id = setInterval(self.check, time);
  };
  self.check = function(err) {
    if (document.documentElement.contains(document.querySelector(selector))) {
      window.clearInterval(self.id);
      callback();
    }
    if (err) {
      console.log('err', err);
    }
  };
}
var setId = function() {
  var addFriends = document.querySelector('.add-friend');
  addFriends.onclick = function() {};
};
var getId = function(fn) {};

module.exports = shanApp;
