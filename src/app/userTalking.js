var shanApp = require('./shanApp');
var cpuMessaging = require('./cpuTalking');

var userTalking = userTalking || {};

userTalking = {
  choiceBc: document.createElement('article'),

  self: this,
  choice1Select: false,
  choice2Select: false,
  choiceMade: false,
  reply1: false,
  reply2: false,
  decisionMade: 0,

  choice(words, words2, time) {
    var self = this;
    this.choiceMade = false;

    var shanLiChatApp = document.querySelector('.shan-li-chat-app');

    console.log('this.chicebc', this.choiceBc);
    this.choiceBc.classList.add('choice-boxcontrol');
    this.choiceBc.innerHTML =
      '<div class="choice1"></div><div class="choice2"></div><div class="select"></div>';

    shanLiChatApp.appendChild(this.choiceBc);
    $('.choice1,.choice2,.select').css('display', 'none');
    var select = document.querySelector('.select');
    setTimeout(() => {
      $('.choice1').html(words);
      $('.choice2').html(words2);
      select.innerHTML = 'what do you want to say?';
      $('.choice1,.choice2,.select').css('display', 'block');
    }, time);

    this.decisionMade += 1;
    console.log(this.decisionMade);
  },
  choice1(words) {
    this.choiceMade = true;
    this.choice1Select = true;
    this.choice2Select = false;
    console.log(this.choiceMade);
    var choice1 = document.querySelector('.choice1');
    var messageBoard = document.querySelector('.message-board');
    var choiceBc = document.querySelector('.choice-boxcontrol');
    console.log('choice1');
    var choiceBc = document.querySelector('.choice-boxcontrol');
    var user = document.createElement('li');
    user.classList.add('user-talking');
    messageBoard.appendChild(user);

    user.innerHTML = choice1.innerText;

    choiceBc.parentElement.removeChild(choiceBc);

    console.log(this.choiceMade);

    return true;
  },
  choice2(words2) {
    this.choiceMade = true;
    this.choice2Select = true;
    this.choice1Select = false;
    var messageBoard = document.querySelector('.message-board');
    var choiceBc = document.querySelector('.choice-boxcontrol');

    console.log('choice2');
    var choice2 = document.querySelector('.choice2');
    var choiceBc = document.querySelector('.choice-boxcontrol');
    var user = document.createElement('li');
    user.classList.add('user-talking');
    messageBoard.appendChild(user);

    user.innerHTML = choice2.innerText;
    choiceBc.parentElement.removeChild(choiceBc);

    console.log(this.choiceMade);
    return true;
  },
  cpuTalking(answer1, answer2, time) {
    this.choiceMade = true;
    if (this.choice1Select === true) {
      console.log('choice1 selct', this.choice1Select);
      this.reply1 = true;
      reply();
    } else if (this.choice2Select === true) {
      console.log('choice2 select', this.choice2Select);
      this.reply2 = true;
      reply();
    }
    var self = this;

    function reply() {
      console.log('reply');
      setTimeout(() => {
        console.log('reply settimout');
        var cpuPic = document.createElement('div');
        var loveYu = document.createElement('img');
        cpuPic.className = 'cpu-img-circle';

        var imgLoveYu = require('../images/yushan-img.jpg');
        loveYu.src = imgLoveYu;
        loveYu.alt = 'yushan-li';
        var messageBoard = document.querySelector('.message-board');
        var cpuTalkingWrapper = document.createElement('li');
        var cpuTalking = document.createElement('span');
        cpuTalkingWrapper.classList.add('cpu-talking-wrapper');
        cpuTalkingWrapper.appendChild(cpuTalking);
        cpuPic.appendChild(loveYu);
        cpuTalkingWrapper.insertAdjacentElement('afterbegin', cpuPic);

        cpuTalking.className = 'cpu-talking';

        messageBoard.appendChild(cpuTalkingWrapper);

        if (self.choice1Select) {
          console.log('choice1 slected');
          cpuTalking.innerHTML = answer1;
        } else if (self.choice2Select) {
          console.log('choice2 selected');
          cpuTalking.innerHTML = answer2;
        }

        console.log('cpu talking');
      }, time);
    }

    return [
      (this.choiceMade = false),
      (this.reply1 = false),
      (this.reply2 = false),
    ];
  },
  moods(mood) {
    var moods = document.createElement('div');
    moods.classList.add('moods');
    setTimeout(() => {
      var cpuImgCircle = document.querySelector('.cpu-img-circle');
      cpuImgCircle.appendChild(moods);
      moods.innerHTML = mood;
    }, 5000);
  },
};

module.exports = userTalking;
