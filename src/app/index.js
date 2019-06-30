require('../sass/app.scss');
var $ = require('jquery');
var shanApp = require('./shanApp');
import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';
import 'babylonjs-loaders';
import 'babylonjs-inspector';

var app = require('./babylon/app');

var toggleSwitch = require('./toggleSwitch');
var photos = require('./photo');
var math = require('./math');

var canvas;
var engine;
var scene;
var isWPressed = false;
var isSPressed = false;
var isAPressed = false;
var isDPressed = false;
// document.addEventListener('DOMContentLoaded', startGame())
function startGame() {
  canvas = document.getElementById('renderCanvas');
  engine = new BABYLON.Engine(canvas, true);
  scene = createScene();
  modifySettings();
  var tank = scene.getMeshByName('heroTank');
  var toRender = function() {
    tank.move();
    var heroDude = scene.getMeshByName('heroDude');
    if (heroDude) heroDude.move();
    scene.render();
  };
  engine.runRenderLoop(toRender);
}

var createScene = function() {
  var scene = new BABYLON.Scene(engine);
  var ground = CreateGround(scene);
  var freeCamera = createFreeCamera(scene);
  var tank = createTank(scene);
  var followCamera = createFollowCamera(scene, tank);
  scene.activeCamera = followCamera;
  createLights(scene);
  createHeroDude(scene);
  return scene;
};

function CreateGround(scene) {
  var hmap1 = require('../images/hmap1.png');
  var ground = new BABYLON.Mesh.CreateGroundFromHeightMap(
    'ground',
    hmap1,
    2000,
    2000,
    20,
    0,
    1000,
    scene,
    false,
    OnGroundCreated,
  );
  console.log(ground);
  function OnGroundCreated() {
    var groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
    var grass = require('../images/grass.jpg');
    groundMaterial.diffuseTexture = new BABYLON.Texture(grass, scene);
    ground.material = groundMaterial;
    ground.checkCollisions = true;
    console.log(ground);
  }
  return ground;
}

function createLights(scene) {
  var light0 = new BABYLON.DirectionalLight(
    'dir0',
    new BABYLON.Vector3(-0.1, -1, 0),
    scene,
  );
  var light1 = new BABYLON.DirectionalLight(
    'dir1',
    new BABYLON.Vector3(-1, -1, 0),
    scene,
  );
}
function createFreeCamera(scene) {
  var camera = new BABYLON.FreeCamera(
    'freeCamera',
    new BABYLON.Vector3(0, 0, 0),
    scene,
  );
  camera.attachControl(canvas);
  camera.position.y = 50;
  camera.checkCollisions = true;
  camera.applyGravity = true;
  camera.keysUp.push('w'.charCodeAt(0));
  camera.keysUp.push('W'.charCodeAt(0));
  camera.keysDown.push('s'.charCodeAt(0));
  camera.keysDown.push('S'.charCodeAt(0));
  camera.keysRight.push('d'.charCodeAt(0));
  camera.keysRight.push('D'.charCodeAt(0));
  camera.keysLeft.push('a'.charCodeAt(0));
  camera.keysLeft.push('A'.charCodeAt(0));

  return camera;
}

function createFollowCamera(scene, target) {
  var camera = new BABYLON.FollowCamera(
    'tankFollowCamera',
    target.position,
    scene,
    target,
  );
  camera.radius = 20; // how far from the object to follow
  camera.heightOffset = 4; // how high above the object to place the camera
  camera.rotationOffset = 180; // the viewing angle
  camera.cameraAcceleration = 0.1; // how fast to move
  camera.maxCameraSpeed = 5; // speed limit
  return camera;
}
function createTank(scene) {
  var tank = new BABYLON.MeshBuilder.CreateBox(
    'heroTank',
    { height: 1, depth: 6, width: 6 },
    scene,
  );
  var tankMaterial = new BABYLON.StandardMaterial('tankMaterial', scene);
  tankMaterial.diffuseColor = new BABYLON.Color3.Red();
  tankMaterial.emissiveColor = new BABYLON.Color3.Blue();
  tank.material = tankMaterial;
  tank.position.y += 2;
  tank.speed = 1;
  tank.frontVector = new BABYLON.Vector3(0, 0, 1);
  tank.move = function() {
    var yMovement = 0;
    if (tank.position.y > 2) {
      tank.moveWithCollisions(new BABYLON.Vector3(0, -2, 0));
    }

    if (isWPressed) {
      tank.moveWithCollisions(
        tank.frontVector.multiplyByFloats(tank.speed, tank.speed, tank.speed),
      );
    }
    if (isSPressed) {
      tank.moveWithCollisions(
        tank.frontVector.multiplyByFloats(
          -1 * tank.speed,
          -1 * tank.speed,
          -1 * tank.speed,
        ),
      );
    }
    if (isAPressed) {
      tank.rotation.y -= 0.1;
      tank.frontVector = new BABYLON.Vector3(
        Math.sin(tank.rotation.y),
        0,
        Math.cos(tank.rotation.y),
      );
    }
    if (isDPressed) {
      tank.rotation.y += 0.1;
      tank.frontVector = new BABYLON.Vector3(
        Math.sin(tank.rotation.y),
        0,
        Math.cos(tank.rotation.y),
      );
    }
  };
  return tank;
}

function createHeroDude(scene) {
  BABYLON.SceneLoader.ImportMesh(
    'him',
    require('../models/Dude/dude.babylon'),
    scene,
    onDudeImported,
  );
  function onDudeImported(newMeshes, particleSystems, skeletons) {
    newMeshes[0].position = new BABYLON.Vector3(0, 0, 5); // The original dude
    newMeshes[0].name = 'heroDude';
    var heroDude = newMeshes[0];
    heroDude.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
    heroDude.speed = 2;
    scene.beginAnimation(skeletons[0], 0, 120, true, 1.0);
    heroDude.move = function() {
      var tank = scene.getMeshByName('heroTank');
      var direction = tank.position.subtract(this.position);
      var distance = direction.length();
      var dir = direction.normalize();
      var alpha = Math.atan2(-1 * dir.x, -1 * dir.z);
      this.rotation.y = alpha;
      if (distance > 30)
        this.moveWithCollisions(
          dir.multiplyByFloats(this.speed, this.speed, this.speed),
        );
    };
  }
}
window.addEventListener('resize', function() {
  engine.resize();
});

function modifySettings() {
  scene.onPointerDown = function() {
    if (!scene.alreadyLocked) {
      console.log('Requesting pointer lock');
      canvas.requestPointerLock =
        canvas.requestPointerLock ||
        canvas.msRequestPointerLock ||
        canvas.mozRequestPointerLock ||
        canvas.webkitRequestPointerLock;
      canvas.requestPointerLock();
    } else {
      console.log('Not requesting because we are already locked');
    }
  };

  document.addEventListener('pointerlockchange', pointerLockListener);
  document.addEventListener('mspointerlockchange', pointerLockListener);
  document.addEventListener('mozpointerlockchange', pointerLockListener);
  document.addEventListener('webkitpointerlockchange', pointerLockListener);

  function pointerLockListener() {
    var element =
      document.mozPointerLockElement ||
      document.webkitPointerLockElement ||
      document.msPointerLockElement ||
      document.pointerLockElement ||
      null;

    if (element) {
      scene.alreadyLocked = true;
    } else {
      scene.alreadyLocked = false;
    }
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key == 'w' || event.key == 'W') {
    isWPressed = true;
  }
  if (event.key == 's' || event.key == 'S') {
    isSPressed = true;
  }
  if (event.key == 'a' || event.key == 'A') {
    isAPressed = true;
  }
  if (event.key == 'd' || event.key == 'D') {
    isDPressed = true;
  }
});

document.addEventListener('keyup', function(event) {
  if (event.key == 'w' || event.key == 'W') {
    isWPressed = false;
  }
  if (event.key == 's' || event.key == 'S') {
    isSPressed = false;
  }
  if (event.key == 'a' || event.key == 'A') {
    isAPressed = false;
  }
  if (event.key == 'd' || event.key == 'D') {
    isDPressed = false;
  }
});
window.onload = function() {
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  shanApp.nameSvg();

  shanApp.temperApp();
  shanApp.specialAppBtn();

  shanApp.shanChatApp();

  photos.infiniteLoop();

  startGame();

  // babylonApp.startGame()
};

// document.querySelector('.special-three').onclick = function(){
//     console.log('special3')
//     app.camera.position()

// }
/// <reference path="js/babylon.max.js" />
// var canvas;
// var engine;
// var scene;
// document.addEventListener("DOMContentLoaded", startGame);

// function startGame() {
//      canvas = document.getElementById("renderCanvas");
//      engine = new BABYLON.Engine(canvas,true);
//      scene = createScene();
//      var toRender = function () {
//          scene.render();
//      }
//      engine.runRenderLoop(toRender);
// }

// var createScene = function () {

//     var scene = new BABYLON.Scene(engine);
//     scene.ambientColor = new BABYLON.Color3(1, 0, 0);

//     // Geometries & Materials

//     var ground = BABYLON.Mesh.CreateGround("myGround", 60, 60, 50, scene);
//     var mirrorMaterial = new BABYLON.StandardMaterial("mirrorMaterial", scene);
//     mirrorMaterial.diffuseColor = new BABYLON.Color3(0.4, 1, 0.4);
//     mirrorMaterial.specularColor = new BABYLON.Color3.Black;
//     mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true);
//     mirrorMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(0 , -1.0, 0, -2.0);
//     mirrorMaterial.reflectionTexture.level = 1  ;//Select the level (0.0 > 1.0) of the reflection
//     ground.material = mirrorMaterial;

//     var spheres = [];
//     var sphereMaterials = [];

//     for (var i = 0 ; i < 10 ; i++)
//     {
//         spheres[i] = BABYLON.Mesh.CreateSphere("mySphere" + i, 32, 2, scene);
//         spheres[i].position.x += 3 * i - 9;
//         spheres[i].position.y += 2;
//         sphereMaterials[i] = new BABYLON.StandardMaterial("sphereMaterial" + i, scene);
//         spheres[i].material = sphereMaterials[i];

//         mirrorMaterial.reflectionTexture.renderList.push(spheres[i]);
//     }

//     sphereMaterials[0].ambientColor = new BABYLON.Color3(0, .5, 0);
//     sphereMaterials[0].diffuseColor = new BABYLON.Color3(5, 0, 0);
//     sphereMaterials[0].specularColor = new BABYLON.Color3(0, 0, 0);

//     sphereMaterials[1].ambientColor = new BABYLON.Color3(0, .5, 0);
//     sphereMaterials[1].diffuseColor = new BABYLON.Color3(5, 0, 1);
//     sphereMaterials[1].specularColor = new BABYLON.Color3(0, 0, 3);
//     sphereMaterials[1].specularPower = 256;

//     sphereMaterials[2].ambientColor = new BABYLON.Color3(0, .5, 0);
//     sphereMaterials[2].diffuseColor = new BABYLON.Color3(0, 0, 0);
//     sphereMaterials[2].emissiveColor = new BABYLON.Color3(0, 0, 1);

//     var lightning = require('../images/lightning.jpg')
//     sphereMaterials[3].diffuseTexture = new BABYLON.Texture(lightning, scene);
//     sphereMaterials[3].emissiveColor = new BABYLON.Color3.Green;

//     sphereMaterials[4].diffuseTexture = new BABYLON.Texture(lightning, scene);
//     sphereMaterials[4].emissiveColor = new BABYLON.Color3.Yellow;

//     sphereMaterials[5].diffuseTexture = new BABYLON.Texture(lightning, scene);
//     sphereMaterials[5].emissiveColor = new BABYLON.Color3.Red;
//     sphereMaterials[5].diffuseTexture.uScale *= 4;

//     sphereMaterials[6].ambientColor = new BABYLON.Color3(0, .8, 0);
//     sphereMaterials[6].diffuseColor = new BABYLON.Color3(1, 0, 0);
//     sphereMaterials[6].alpha = .5;
//     var coins = require('../images/coins.png')
//     sphereMaterials[7].diffuseTexture = new BABYLON.Texture(coins, scene);
//     sphereMaterials[7].diffuseTexture.hasAlpha = true;
//     sphereMaterials[7].emissiveColor = new BABYLON.Color3.Red;

// var yushan = require('../images/yushan.png')
//     sphereMaterials[8].ambientColor = new BABYLON.Color3(0, .3, 0);
//     sphereMaterials[8].bumpTexture = new BABYLON.Texture(yushan, scene);
//     sphereMaterials[8].bumpTexture.level = 15.0;

//      var section1 = require('../video/section1.mp4')
//     sphereMaterials[9].diffuseTexture = new BABYLON.VideoTexture("video", [section1],scene);

//     // lights
//     var light = new BABYLON.PointLight("myPointLight", new BABYLON.Vector3(0, 3, 0), scene);
//     light.intensity = .5;
//     light.diffuse = new BABYLON.Color3(1, .5, .5);

//     var light2 = new BABYLON.PointLight("myPointLight2", new BABYLON.Vector3(0, 3, -10), scene);
//     light2.intensity = .5;
//     light2.diffuse = new BABYLON.Color3(.5, .5, 1);

//     var counter = 0;

//     scene.registerBeforeRender(function () {

//         for(var i = 0 ; i < spheres.length-1 ; i++)
//         {
//             spheres[i].position.z = 2*i * Math.sin((i * counter)/2);
//             counter+=.0001;
//         }
//         sphereMaterials[4].diffuseTexture.uOffset += 0.101;
//         sphereMaterials[5].diffuseTexture.uScale += 0.0001

//     });

//     var camera = new BABYLON.FreeCamera("myCamera", new BABYLON.Vector3(0, 1, -10), scene);
//     camera.attachControl(canvas);

//     return scene;
// };

// window.addEventListener("resize", function () {
//     engine.resize();
// });
