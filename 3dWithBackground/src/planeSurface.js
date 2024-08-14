import * as THREE from "three";

const width = window.innerWidth;
const height = window.innerHeight;

const planeGeo = new THREE.PlaneGeometry(width, height,64,64);
const material = new THREE.MeshBasicMaterial({ color: 0x404347 });
export const planeMesh = new THREE.Mesh(planeGeo, material);


