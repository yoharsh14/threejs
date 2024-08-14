import * as THREE from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "jsm/renderers/CSS2DRenderer.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
// Scene, Camera, and Renderer
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// CSS2DRenderer
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(w, h);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
document.body.appendChild(labelRenderer.domElement);

// Create a 3D object (a simple cube for this example)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Create a HTML element for the label
const labelDiv = document.getElementById("info")

// Create a CSS2DObject and add it to the scene
const labelObject = new CSS2DObject(labelDiv);
labelObject.position.copy(cube.position); // Position the label at the cube's position
scene.add(labelObject);

// Animation
function animate() {
  requestAnimationFrame(animate);

  // Update cube position (for example)
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Update label position (optional, if you want the label to follow the cube)
  labelObject.position.copy(cube.position);

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

animate();
