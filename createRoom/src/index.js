import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
const scene = new THREE.Scene();
const h = window.innerHeight;
const w = window.innerWidth;
//rendere
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

//camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
// shape of Earth with adding layer

const geometry = new THREE.BoxGeometry();

// normal Earth Mesh with matrial for the spotight side of the
// shape.
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  side:THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const hemiLight = new THREE.HemisphereLight(0xaaaf99, 0x444444);
scene.add(hemiLight);
function animate(t = 0) {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", handleWindowResize, false);
