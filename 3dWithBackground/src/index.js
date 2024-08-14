import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { planeMesh } from "./planeSurface.js";
import { createObject } from "./createObject.js";
const scene = new THREE.Scene();
const h = window.innerHeight;
const w = window.innerWidth;
const raycaster = new THREE.Raycaster();
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
camera.target = null;
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// objects
//1
const box = createObject();
scene.add(box);
//2
const sphere = createObject("Sphere", 0xfffaaa, 10, 20, 1);
scene.add(sphere);

//
const Cone = createObject("Cone", 0xfffaaa, 3, 0.2, 0.2);
Cone.rotation.x = 14;
scene.add(Cone);

const Cylinder = createObject("Cylinder", 0xfffaaa, 5, 0.2, 0.2);
Cylinder.rotation.x = 11
scene.add(Cylinder);

const Circle = createObject("Circle", 0xfffaaa, -2, 0.2, 1);
scene.add(Circle);

const ring = createObject("ring", 0xfffaaa, 7, 10, 1);
scene.add(ring);

const icosahedron = createObject("icosahedron", 0xfffaaa, 2, 20, 1);
scene.add(icosahedron);

const loader = new THREE.TextureLoader();
const texture = loader.load("../assets/horizon.jpg");
scene.background = texture;

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

planeMesh.position.set(0, 0, 0);
controls.target = planeMesh.position;

scene.add(planeMesh);

controls.addEventListener("change", () => {
  const cameraPostion = camera.position;
  if (cameraPostion.z <= 0.1) {
    camera.position.z = 0.1;
  }
});

renderer.domElement.addEventListener("click", (event) => {
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    console.log("Clicked on object:", clickedObject);

    // Change the color of the clicked object (example)
    controls.target = clickedObject.position;
  }
});

function animate(t = 0) {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();
