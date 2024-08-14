import * as THREE from "three"

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

//shape
const material = new THREE.LineBasicMaterial({ color: 0xffffff});

const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry({color:0xffffff}).setFromPoints(points);
export const line = new THREE.Line(geometry, material);
