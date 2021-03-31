import * as THREE from "three";
import "./css/style.css";
import "./css/normalize.css";
import "./css/reset.css";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

let camera, canvas, controls, renderer, scene, stats;

init();
animate();

function init() {
  // Output html element
  canvas = document.getElementById("webgl");

  // Scene
  scene = new THREE.Scene();

  // Axes helper
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);

  // Cube mesh
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
      color: 0xff0000,
    })
  );
  scene.add(cube);

  // Camera
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.set(5, 2, 8);

  // Camera controls
  // Right click to move, scroll to zoom in/out, left click to rotate
  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.minDistance = 1;
  controls.maxDistance = 500;
  scene.add(camera);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.render(scene, camera);

  // Window resize
  window.addEventListener("resize", onWindowResize);

  // Fullscreen on double-click
  window.addEventListener("dblclick", dblclickToFullscreen);

  /*
  Dev tools
  */

  // Stats
  stats = new Stats();
  document.body.appendChild(stats.dom);

  // Gui
  initGui();
}

function dblclickToFullscreen() {
  const isFullscreenEnabled =
    document.fullscreenElement ||
    document.webkitFullscreenElement;

  if (isFullscreenEnabled) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    // Safari & Chrome css prefix
    if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  } else {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    }
    // Safari & Chrome css prefix
    if (canvas.webkitFullscreenElement) {
      canvas.webkitFullscreenElement();
    }
  }
}

function onWindowResize() {
  // Update camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function animate() {
  // Update controls
  controls.update();

  // Update stats
  stats.update();

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

function initGui() {
  const gui = new GUI();

  const param = {
    "line type": 0,
    "width (px)": 5,
    dashed: false,
    "dash scale": 1,
    "dash / gap": 1,
  };

  // Initialize gui elements here
}
