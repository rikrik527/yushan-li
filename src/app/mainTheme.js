// code start here
var mainTheme = mainTheme || {};
mainTheme = {
  rain() {
    console.log('let it rain');
    var canvas = document.querySelector('#rain');
    var shanBtn = document.querySelector('.shan-btn');
    canvas.width = shanBtn.offsetWidth;
    canvas.height = shanBtn.offsetHeight;
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      var w = canvas.width;
      var h = canvas.height;
      ctx.strokeStyle = 'rgba(174,190,220,0.5)';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';

      var init = [];
      var maxParts = 100;
      for (var a = 0; a < maxParts; a++) {
        init.push({
          x: Math.random() * w,
          y: Math.random() * h,
          l: Math.random() * 1,
          xs: -4 + Math.random() * 4 + 2,
          ys: Math.random() * 10 + 10,
          // i dont even know what this mean
        });
      }
      var particles = [];
      for (var b = 0; b < maxParts; b++) {
        particles[b] = init[b];
      }
      function draw() {
        ctx.clearRect(0, 0, w, h);
        for (var c = 0; c < particles.length; c++) {
          // console.log('particles.length',particles.length)
          var p = particles[c];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
          ctx.stroke();
          // console.log('var p = particles[c]',particles[c])
        }
        move();
      }
      function move() {
        for (var b = 0; b < particles.length; b++) {
          var p = particles[b];
          p.x += p.xs;
          p.y += p.ys;
          if (p.x > w || p.y > h) {
            p.x = Math.random() * w;
            p.y = -20;
            // console.log('px>w py>h',p.x,p.y)
          }
        }
      }
      setInterval(() => {
        draw();
      }, 30);
    }
  },
};
module.exports = mainTheme;
