import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
//rendere
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//camera
const fov = 75; //field of view
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10;

// scene
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

//shape
const geometry = new THREE.TorusGeometry();
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  // flatShading: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// const wireMat = new THREE.MeshBasicMaterial({
//   color: 0xffffff,
//   wireframe: true,
// });

// const wireMesh = new THREE.Mesh(geometry, wireMat);
// wireMesh.scale.setScalar(1.0001);
// mesh.add(wireMesh);

// const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
// scene.add(hemiLight);

const light = new THREE.AmbientLight(0xa00040);
scene.add(light);

function animate(t = 0) {
  requestAnimationFrame(animate);
  mesh.rotation.x = t * 0.001;
  renderer.render(scene, camera);
  controls.update();
}

animate();
