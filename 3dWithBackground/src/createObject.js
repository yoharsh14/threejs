import * as THREE from "three";

export const createObject = (
  type = "Box",
  color = "0xffffff",
  x = 0,
  y = 0,
  z = 0.5
) => {
  let geometry;
  if (type == "Box") geometry = new THREE.BoxGeometry();
  else if(type=='Sphere')geometry = new THREE.SphereGeometry();
  else if(type=='Cone')geometry = new THREE.ConeGeometry();
  else if(type=='Cylinder')geometry = new THREE.CylinderGeometry();
  else if(type=='Circle')geometry = new THREE.CircleGeometry();
  else if(type=='ring')geometry = new THREE.RingGeometry();
  else if(type=='icosahedron')geometry = new THREE.IcosahedronGeometry();
  else if(type=='dodecahedron')geometry = new THREE.DodecahedronGeometry();
  // normal Earth Mesh with matrial for the spotight side of the
  // shape.
  const material = new THREE.MeshStandardMaterial({
    color: color,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  return mesh;
};
