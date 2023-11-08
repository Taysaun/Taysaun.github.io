import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer(
  {
    canvas: document.querySelector('#bg')
  }
);

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.z = 100
camera.position.y = 20

const geoPog = new THREE.CylinderGeometry(41.37, 41.37, 6, 100)
const texturePog = new THREE.TextureLoader().load('eevee1.png')
const matPog = new THREE.MeshStandardMaterial(
  {
    color: 0x3333FF,
    wireframe: false,
    map: texturePog
  }
)
const pointLight = new THREE.PointLight(0xFFFFFF, 10000, 1000)
pointLight.position.set(0, 0, 50)
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1)
scene.add(pointLight)
scene.add(ambientLight)

//Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
const axesHelper = new THREE.AxesHelper(20, 20, 20)
scene.add(lightHelper, gridHelper, axesHelper)

const pog = new THREE.Mesh(geoPog, matPog)
scene.add(pog)

const controls = new OrbitControls(camera, renderer.domElement);

function addstar(){
  const geometry = new THREE.SphereGeometry(0.1, 100, 100)
  const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)
}
Array(200).fill().forEach(addstar)

function animate(time) {
  requestAnimationFrame(animate);

  pog.rotation.x += 0.04;
  pog.rotation.y += 0.02;
  pog.rotation.z += 0.02;

  renderer.render(scene, camera)
}

animate()