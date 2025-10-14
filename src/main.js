import "./style.css"
import { animate, inView } from "motion"
import * as THREE from 'three';

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

animate("section.content", { opacity: 0 })
inView ("section.content", (element, info) => {
  animate (info.target, { opacity: 1,}, { duration: 1, delay: 1 })
})

const scene =  new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);