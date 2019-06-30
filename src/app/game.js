// import WebpackLoader from 'phaser-webpack-loader'
// import AssetManifest from '../../AssetManifest'

// export default class Preload extends Phaser.Scene{
//   preload(){
//     this.load.scenePlugin('WebpackLoader',WebpackLoader,'loader','loader')
//   }
//   create(){
//     this.loader.start(AssetManifest)
//     this.loader.load().then(()=>{
//       console.log('done loading')
//     })
//   }
// }

// module.exports.game = function(){
//     function drawShape(){

//         var canvas = document.querySelector('#game')
//         var context = canvas.getContext('2d')
//         var x = canvas.width / 2
//         var y = canvas.height - 30
//         var dx = 2
//         var dy = -2
//         var ballRadius = 10
//         var paddleHeight = 12
//         var paddleWidth = 72
//         var paddleX = (canvas.width - paddleWidth)/2
//         var rightPress = false
//         var leftPress = false
//         var brickRowCount = 4

//         var brickColumnCount = 7
//         var brickWidth = 80
//         var brickHeight = 24
//         var brickPadding = 12
//         var brickOffsetTop = 32
//         var brickOffsetLeft = 32
//         var bricks = []
//         for(var i = 0; i < brickColumnCount;i++){
//           bricks[i]= []
//           console.log(bricks,bricks[i])
//           for(var b = 0; b < brickRowCount;b++){
//             bricks[i][b]={x: 0, y:0}
//             console.log(bricks[i][b])
//           }
//         }

// document.addEventListener('keydown',keyDownHandler,false)
// document.addEventListener('keyup',keyUpHandler,false)
// window.addEventListener('resize',canvasResize)

// function keyDownHandler(e){
//   if(e.keyCode == 39){
//     rightPress = true
//   }else if(e.keyCode == 37){
//     leftPress = true
//   }
// }
// function keyUpHandler(e){
//   if(e.keyCode == 39){
//     rightPress = false
//   }else if(e.keyCode == 37){
//     leftPress = false
//   }
// }
// function canvasResize(){
//   canvas.width = window.innerWidth
//   canvas.height = window.innerHeight
//   console.log('resize')
// }
//       function drawPaddle(){
//         context.beginPath();
//          context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);

//         context.fillStyle='blue'
//         context.fill();
//         context.closePath();
//       }
//       function drawBall(){
//         context.beginPath();
//         context.arc(x,y,ballRadius,0,Math.PI * 2,false)
//         context.fillStyle = 'red'
//         context.fill();
//         context.closePath()
//       }

//       function draw(){
//         context.clearRect(0, 0, canvas.width, canvas.height);
//           drawBall()
//           drawPaddle()
//           if(x + dx > canvas.width - ballRadius || x + dx < ballRadius ){
//             dx = -dx

//           }
//           if(y + dy < ballRadius){
//             dy = -dy

//           }else if(y + dy > canvas.height - ballRadius){
//             if(x > paddleX && x < paddleX + paddleWidth){
//               dy = -dy
//             }else{

//             }
//           }
//           if(y + dy > canvas.height - ballRadius || y + dy < ballRadius ){
//             dy = -dy

//           }
//           if(rightPress && paddleX < canvas.width - paddleWidth){
//             paddleX += 7
//           }else if(leftPress && paddleX > 0){
//             paddleX -= 7
//           }
//         x += dx
//         y += dy

//       }
//       setInterval(draw,10)

//     }
//     drawShape()
// }
