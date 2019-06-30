var judo = require('./judoAct');
var click = 0;
module.exports.xMenu = function() {
  $('.x-menu').on('click', function() {
    console.log('clicked');

    return (function() {
      click++;
      console.log('click', click);
      if (click === 3) click = 1;
      switch (click) {
        case 1:
          $('.x').css('transform', 'rotatez(45deg)');
          $('.x-2').css({
            transform: 'rotatez(-90deg)',
            left: '0px',
          });
          $('.x-p').html('關閉');
          $('.x-menu-pop-out').css({
            display: 'grid',
            filter: 'blur(0px)',
          });
          $('.click-box').css('display', 'none');

          $('.about').on('click', function() {
            $('.x-menu-pop-out').css('display', 'none');
            $('.awake-second-section').css('right', '0%');
            $('.awake-first-section').css('right', '100%');
            $('.x').css('transform', 'rotatez(90deg)');
            $('.x-2').css({
              transform: 'rotatez(0deg)',
              left: '13px',
            });
          });
          $('.fb-fans').on('click', function() {
            window.location.href = 'https://www.facebook.com/shanli0725/';
          });
          $('.ig').on('click', function() {
            window.location.href =
              'https://www.instagram.com/rik527/?fbclid=IwAR0uLglglqt40E0ZqMxnH2OHiHpCk93B9nbbkf9lbeuYuDz4Qps_kaRyODc';
          });
          $('.contact').on('click', function() {
            console.log('contact');
          });
          break;
        case 2:
          $('.x').css('transform', 'rotatez(90deg)');
          $('.x-2').css({
            transform: 'rotatez(0deg)',
            left: '13px',
          });
          $('.click-box').css('display', 'block');
          $('.x-p').html('選單');
          $('.x-menu-pop-out').css({
            filter: 'blur(100px)',
            function() {
              console.log('i have been excuted');
              setTimeout(() => {
                console.log('i have been excuted 1000');
                $('.x-menu-pop-out').css('display', 'none');
              }, 1000);
            },
          });
      }
    })();
  });
};
module.exports.selectMenu = function() {
  $('.select-about').on('click', function() {
    console.log('clicked');
    $('.awake-second-section').css('right', '0%');
    $('.awake-first-section').css('right', '100%');
  });
  $('.select-fb-fans').on('click', function() {
    window.location.href = 'https://www.facebook.com/shanli0725/';
  });
  $('.select-ig').on('click', function() {
    window.location.href =
      'https://www.instagram.com/rik527/?fbclid=IwAR0uLglglqt40E0ZqMxnH2OHiHpCk93B9nbbkf9lbeuYuDz4Qps_kaRyODc';
  });
  $('.select-contact').on('click', function() {
    console.log('contact');
  });
};
