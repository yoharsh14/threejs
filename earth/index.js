import * as THREE from "three";
// import { getFresnelMat } from "./getFresnelMat.js";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStarfield from "./getStarField.js";
const scene = new THREE.Scene();
const h = window.innerHeight;
const w = window.innerWidth;
//rendere
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  precision: "highp",
  powerPreference: "high-performance",
});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Earth Group for adding layers to the earth
const earthGroup = new THREE.Group();
earthGroup.rotation.z = (23.4 * Math.PI) / 100;
scene.add(earthGroup);

new OrbitControls(camera, renderer.domElement);

// shape of Earth with adding layer
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 20);

// normal Earth Mesh with matrial for the spotight side of the
// shape.
// const material = new THREE.MeshStandardMaterial({
//   color: 0xffffff,
//   map: loader.load("./texture/00_earthmap1k.jpg"),
// });

// const earthMesh = new THREE.Mesh(geometry, material);
// earthGroup.add(earthMesh);

// light Mesh for the darker side
const lightsMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 1,
    map: loader.load("./texture/03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
});
const lightMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightMesh);

//cloud Mesh
// const cloudMat = new THREE.MeshBasicMaterial({
//   map: loader.load("./texture/04_earthcloudmap.jpg"),
//   transparent: true,
//   opacity: 0.35,
//   blending: THREE.AdditiveBlending,
// });
// const cloudMesh = new THREE.Mesh(geometry, cloudMat);
// cloudMesh.scale.setScalar(1.005);
// earthGroup.add(cloudMesh);

// const fresnelMat = getFresnelMat();
// const glowMesh = new THREE.Mesh(geometry, fresnelMat);
// glowMesh.scale.setScalar(1.01);
// earthGroup.add(glowMesh);
const star = getStarfield();
scene.add(star);

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, -0.5, 2);
scene.add(sunLight);

function animate(t = 0) {
  requestAnimationFrame(animate);
  // earthMesh.rotation.y += 0.002;
  lightMesh.rotation.y += 0.002;
  // cloudMesh.rotation.y += 0.0012;
  // glowMesh.rotation.y += 0.002;
  renderer.render(scene, camera);
}

animate();
