import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";
const h = window.innerHeight;
const w = window.innerWidth;

//rendere
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  precision: "highp",
  powerPreference: "high-performance",
});
renderer.setClearColor(0x828583, 1);
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10;

//scene
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const ambientLight = new THREE.HemisphereLight(0xffffff, 0xffffff); // Soft white light
scene.add(ambientLight);
//model
const loader = new GLTFLoader();
// loader.load(
//   "./shiba/scene.gltf",
//   (gltf) => {
//     const model = gltf.scene;
//     scene.add(model);
//   },
//   undefined,
//   function (error) {
//     console.log(error);
//   }
// );
// loader.load(
//   "./scifi_girl_v.01/scene.gltf",
//   (gltf) => {
//     const model = gltf.scene;
//     scene.add(model);
//     const textures = model.images;
//     const textureLoader = new THREE.TextureLoader();
//     model.traverse((child) => {
//       if (child.isMesh) {
//         const material = child.material;
//         if (material.map) {
//         }
//       }
//     });
//   },
//   undefined,
//   function (error) {
//     console.log(error);
//   }
// );
let mixer;
let mixer1;
// loader.load(
//   "./scifi_pistol/scene.gltf",
//   (gltf) => {
//     const model = gltf.scene;
//     model.position.set(0, 0, 0);
//     model.scale.set(0.1, 0.1, 0.1);
//     scene.add(model);
//     const animation = gltf.animations;
//     mixer = new THREE.AnimationMixer(model);
//     animation.forEach((clip) => {
//       mixer.clipAction(clip).play();
//     });
//   },
//   undefined,
//   function (error) {
//     console.log(error);
//   }
// );
loader.load(
  "./spaceship_-_cb1/scene.gltf",
  (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(0.1, 0.1, 0.1);
    scene.add(model);
    const animation1 = gltf.animations;
    mixer1 = new THREE.AnimationMixer(model);
    animation1.forEach((clip) => {
      mixer1.clipAction(clip).play();
    });
    animate();
  },
  undefined,
  function (error) {
    console.log(error);
  }
);
const animationSpeedMultiplier = 1.0001;
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  const deltaTime = clock.getDelta() * animationSpeedMultiplier;
  mixer1.update(deltaTime);
  // mixer.update(deltaTime);
  controls.update();
}
