import "./style.css"
import { animate, inView } from "motion"
import { 
  Scene, 
  PerspectiveCamera, 
  BoxGeometry, 
  MeshBasicMaterial, 
  WebGLRenderer, 
  Mesh, 
  AmbientLight,
  DirectionalLight,
  Group,
  Clock
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { NoiseShader } from './noise-shader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const guitarTag = document.querySelector("section.guitar");

animate (
  "header", 
  {
    y: [-100, 0],
    opacity: [0, 1]
  }, 
  { duration: 1, delay: 2.5},
)

animate (
  "section.new-drop",
  {
    y: [-100, 0],
    opacity: [0, 1],
  },
  { duration: 1, delay: 2 },
)

animate("section.content p, section.content img", { opacity: 0 })
inView ("section.content", (element, info) => {
  animate (info.target.querySelectorAll("p, img"), { opacity: 1,}, { duration: 1, delay: 1 })
})

const clock = new Clock();

const scene =  new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
guitarTag.appendChild(renderer.domElement);

const ambience = new AmbientLight(0x404040);
camera.add(ambience);

const keyLight = new DirectionalLight(0xffffff, 1);
keyLight.position.set(-1, 1, 3);
camera.add(keyLight);

const fillLight = new DirectionalLight(0xffffff, 0.5);
fillLight.position.set(1, 1, 3);
camera.add(fillLight);

const backLight = new DirectionalLight(0xffffff, 1);
backLight.position.set(-1, 3, -1);
camera.add(backLight);

scene.add(camera);

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: 0x00ff00 });
const shape = new Mesh(geometry, material);

const loadGroup = new Group();
loadGroup.position.y = -10;
loadGroup.add(shape);

const scrollGroup = new Group();
scrollGroup.add(loadGroup);

scene.add(scrollGroup);

animate(
  loadGroup.position, 
  { y: 0 }, { duration: 2, delay: 1 }
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.update();

camera.position.z = 5;

const composer = new EffectComposer(renderer);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const noisePass = new ShaderPass(NoiseShader);
noisePass.uniforms.time.value = clock.getElapsedTime();
composer.addPass(noisePass);

const outputPass = new OutputPass();
composer.addPass(outputPass);

const render = () => {
  controls.update();

  scrollGroup.rotation.set(0, window.scrollY * 0.001, 0);

  noisePass.uniforms.time.value = clock.getElapsedTime();

  requestAnimationFrame(render);
  composer.render();
}

const resize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

render(); 
window.addEventListener('resize', resize);