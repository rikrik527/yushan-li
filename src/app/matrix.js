import p5 from 'p5';
module.exports.matrix = function() {
  let s = sk => {
    var streams = [];
    var fadeInterval = 1.6;
    var symbolSize = 14;

    sk.setup = () => {
      sk.createCanvas(window.innerWidth, window.innerHeight).parent('shan-btn');

      var x = 0;
      for (var i = 0; i <= sk.width / symbolSize; i++) {
        var stream = new Stream();
        stream.generateSymbols(x, sk.random(-2000, 0));
        streams.push(stream);
        x += symbolSize;
      }

      sk.textFont('Consolas');
      sk.textSize(symbolSize);
    };

    sk.draw = () => {
      sk.background(0, 255);
      streams.forEach(function(stream) {
        stream.render();
      });
    };

    function Symbol(x, y, speed, first, opacity) {
      this.x = x;
      this.y = y;
      this.value;

      this.speed = speed;
      this.first = first;
      this.opacity = opacity;

      this.switchInterval = sk.round(sk.random(2, 25));

      this.setToRandomSymbol = function() {
        var charType = sk.round(sk.random(0, 5));
        if (sk.frameCount % this.switchInterval == 0) {
          if (charType > 1) {
            // set it to Katakana
            this.value = String.fromCharCode(
              0x30a0 + sk.round(sk.random(0, 96)),
            );
          } else {
            // set it to numeric
            this.value = sk.round(sk.random(0, 9));
          }
        }
      };

      this.rain = function() {
        this.y = this.y >= sk.height ? 0 : (this.y += this.speed);
      };
    }

    function Stream() {
      this.symbols = [];
      this.totalSymbols = sk.round(sk.random(5, 35));
      this.speed = sk.random(5, 22);

      this.generateSymbols = function(x, y) {
        var opacity = 255;
        var first = sk.round(sk.random(0, 4)) == 1;
        for (var i = 0; i <= this.totalSymbols; i++) {
          var symbol = new Symbol(x, y, this.speed, first, opacity);
          symbol.setToRandomSymbol();
          this.symbols.push(symbol);
          opacity -= 255 / this.totalSymbols / fadeInterval;
          y -= symbolSize;
          first = false;
        }
      };

      this.render = function() {
        this.symbols.forEach(function(symbol) {
          if (symbol.first) {
            sk.fill(140, 255, 170, symbol.opacity);
          } else {
            sk.fill(0, 255, 70, symbol.opacity);
          }
          sk.text(symbol.value, symbol.x, symbol.y);
          symbol.rain();
          symbol.setToRandomSymbol();
        });
      };
    }
    window.addEventListener('resize', function() {
      this.console.log('resize');
      sk.resizeCanvas(window.innerWidth, window.innerHeight);
    });
  };

  const P5 = new p5(s);
};
