'use strict'
import * as _instance from "../framework/three.module.js";
import { OrbitControls } from "../framework/controls/OrbitControls.js";
var container, sceneWidth, sceneHeight, scene, renderer, camera, cube, controls;

init();

function init() {

  createScene();
  update();

}

function createScene() {

  sceneWidth = window.innerWidth;
  sceneHeight = window.innerHeight;

  //Escena
  scene = new _instance.Scene();
  var skybox = new _instance.CubeTextureLoader().load( [

    '../assets/images/skybox_right.png',//derecha
    '../assets/images/skybox_left.png', //izquierda
    '../assets/images/skybox_up.png',// arriba
    '../assets/images/skybox_down.png',//abajo
    '../assets/images/skybox_back.png',// atras
    '../assets/images/skybox_front.png' // frente

  ] );

  scene.background = skybox;

  //Render

  renderer = new _instance.WebGLRenderer( { antialias:true, alpha:true  } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( sceneWidth, sceneHeight );

  //Canvas
  container = document.getElementById( 'main' );
  container.appendChild( renderer.domElement );

  //Camara
  camera = new _instance.PerspectiveCamera( 30, sceneWidth / sceneHeight, 1, 10000);
  camera.position.set( 0, 50, 500 );

  //Luces
  var light = new _instance.DirectionalLight( 0xffffff );
  light.position.set( 1, 0, 10 );
  scene.add(light);

  var hemi = new _instance.HemisphereLight( 0xffffff, 0xffffff, 0.5 );
  hemi.position.set( 0, 0, 5);
  scene.add( hemi );

  //Controles
  controls = new OrbitControls( camera, renderer.domElement );
  controls.update();

  //Crear Sol
  var cubeGeo = new _instance.IcosahedronGeometry( 100, 1 );
  cubeGeo.computeFlatVertexNormals();
  var cubeMaterial = new _instance.MeshLambertMaterial( { color: 0xee1122 } );
  cube = new _instance.Mesh( cubeGeo, cubeMaterial );
  cube.position.z -= 500;
  scene.add( cube );
  createPlane()

}

function createPlane() {

  var group = new _instance.Group();
  const planeBlack = new _instance.PlaneGeometry( 1200, 1200, 1, 1 );
  const planeGeo = new _instance.PlaneGeometry( 1000, 1000, 32, 32 );
  planeBlack.rotateX( -Math.PI /2 );
  planeGeo.rotateX( -Math.PI /2 );
  var vertices = planeGeo.vertices;

  for( let i = 0; i < vertices.length; i++) {

    vertices[ i ].y  = ( Math.random() > 0.8 ) ? Math.random() * 100 : 0;

  }

  planeGeo.faces.forEach( ( value ) => {

    const i = planeGeo.vertices[ value.a ];
    const j = planeGeo.vertices[ value.b ];
    const k = planeGeo.vertices[ value.c ];

    const maximo = Math.max( i.y, j.y, k.y );

    if( maximo > 1 ) return value.color.set( 0x00ccaf);
    value.color.set( 0xff0000 );

  } );

  planeGeo.verticesNeedUpdate = true;
  planeGeo.colorsNeedUpdate = true;

  const material = new _instance.MeshBasicMaterial( { vertexColors: _instance.VertexColors, wireframe: true});
  const material2 = new _instance.MeshBasicMaterial( { color: 0x000000 } );

  var mesh = new _instance.Mesh( planeGeo, material );

  group.add( new _instance.Mesh( planeBlack, material2 ) );
  group.add( mesh );
  scene.add( group );

}

function update(){

  requestAnimationFrame( update );
  render();

}

function render(){

  controls.update();
  camera.position.z += Math.sin( Math.cos( 10 ) ) / 10;
  camera.position.x += Math.cos( Math.sin( 10 ) ) / 10;
  //camera.position.y -= Math.sin( Math.cos( 10 ) ) / 10;
  camera.lookAt( cube.position )
  console.log( renderer.info.render.calls );
  renderer.render( scene, camera );

}