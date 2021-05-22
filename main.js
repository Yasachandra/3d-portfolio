import './style.css'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);


// Adding shapes
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
const torus = new THREE.Mesh( geometry, material );
scene.add(torus);


// Add lighting
// Light up a point in the scene
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

// Light up the whole scene
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Detect the point light origin in scene
// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(pointLightHelper, gridHelper);


// Listen for DOM events
// const controls = new OrbitControls(camera, renderer.domElement);


// Function to add starts to random positions in the scene
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
  star.position.set(x, y, z);
  scene.add(star);
}
// Add the stars to the scene
Array(200).fill().forEach(addStar);


// Set the background
const spaceTexture = new THREE.TextureLoader().load("outerSpace.jpg");
scene.background = spaceTexture;


// Avatar
const yasaTexture = new THREE.TextureLoader().load("myPhoto1.jpg");
const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( { map: yasaTexture } )
);
scene.add(avatar);


// Moon
const moonTexture = new THREE.TextureLoader().load("moon.jpeg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( { map: moonTexture } )
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

avatar.position.x = 2;
avatar.position.z = -5;


// Move the camera as user scrolls down the page
function moveCamera() {
  // Check how far the current viewport is from the top
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  avatar.rotation.y += 0.01;
  avatar.rotation.z += 0.01;

  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.01;
}
document.body.onscroll = moveCamera;
moveCamera();


// Render the scene with animation
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();
  renderer.render(scene, camera);
}

animate();