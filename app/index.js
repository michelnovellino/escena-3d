'use strict'
import * as _instance from "../framework/three.module.js";
import { OrbitControls } from "../framework/controls/OrbitControls.js";
var container, sceneWidth, sceneHeight, scene, renderer, camera, cube, controls;

init();
function createScene() {

    //scene
    sceneWidth = window.innerWidth;
    sceneHeight = window.innerHeight;
    scene = new _instance.Scene();
    scene.background = new _instance.Color(0x000000);

    //renderer options
    renderer = new _instance.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sceneWidth, sceneHeight);
    //define container
    container = document.getElementById("main");
    container.appendChild(renderer.domElement);
    //camera
    camera = new _instance.PerspectiveCamera(75, sceneWidth / sceneHeight, 1, 1000);
    camera.position.set(0, 0, 100);
    //lights
    var light = new _instance.DirectionalLight(0xffffff);
    light.position.set(1, 0, 1);
    var hemi = new _instance.HemisphereLight(0xffffff, 0xffffff, 0.5);
    hemi.position.set(0, 0, 5);
    scene.add(light);
    scene.add(hemi);
    //controls
    controls = new OrbitControls(camera, renderer.domElement)
    controls.update();
    //geometries
    // var cubeGeo = new _instance.BoxGeometry(15, 15, 15);
    var cubeGeo = new _instance.IcosahedronGeometry(10, 1);
    cubeGeo.computeFlatVertexNormals();
    var cubeMaterial = new _instance.MeshLambertMaterial(
        { color: 0xee1122 }
    );
    cube = new _instance.Mesh(cubeGeo, cubeMaterial);
    scene.add(cube);
}
function update() {
    requestAnimationFrame(update);
    render();
}

function render() {
    controls.update();
    console.log(renderer.info.render.calls)
    renderer.render(scene, camera);
}
function init() {
    createScene();
    update();
}