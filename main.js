// #1 Scene
import * as THREE from 'three';
// 2# Styles
import './style.css';
// #3 Controls
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
// #5 Animation
import { gsap } from "gsap";


/**
 * 2# SIZES
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

/**
 * 1# SZENE
 * (i) Was brauchen wir für eine 3D Szene: Object + Camera + Light + Renderer
 */
const scene = new THREE.Scene();

/** 
 * 1# OBJECT
 * Create our sphere
 * */
const geometry = new THREE.SphereGeometry(3, 64, 32)
// Noch keine Farbe
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83", // green
  roughness: 0.5 /** #5 DO AT THE END **/
});
// Combine both
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

/**
 * 1# CAMERA 
 * (1) Othographic / perspective
 * (2) Field of view (je weiter desto mehr verzerrung)
 * (3) Aspect ratio (Seitenverhältnis)
 * near — Kamera ebene - near plane.
 * far — Kamera ebene - far plane.
 */
// #1 first add 800 x 600 anstatt auf konstante
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 10 // Size? meters, centimeter? What you want. is relative
scene.add(camera)
// Erklärung Distanz. z position auf 101 ändern, near kamera auf 100


/**
 * 1# RENDERER
 * How to render on screen? With Canvas --> index.html
 */
const canvas = document.querySelector('.webgl');

// Since r118 WebGLRenderer automatically uses a WebGL 2 rendering context.
// https://threejs.org/docs/#api/en/renderers/WebGL1Renderer
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
// 1# renderer.render(scene,camera) // Später entfernen wegen loop

/**
 * 1# LIGHT
 * Warum kann man nichts sehen? LICHT FEHLT
 *
 * color - (optional) hexadecimal color of the light. Default is 0xffffff (white).
 * intensity - (optional) numeric value of the light's strength/intensity. Default is 1.
 * distance - Maximum range of the light. Default is 0 (no limit).
 * decay - Der Betrag, um den das Licht entlang der Lichtentfernung gedimmt wird. Der Standardwert ist 2
 */
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7);
light.position.set(0, 10, 10)
scene.add(light)


/**
 *  3# CONTROLS
 */
const controls = new OrbitControls(camera, canvas)
// Aktiviert Trägheit um Bedienelementen ein Gefühl von Gewicht zu geben
controls.enableDamping = true
controls.enablePan = false // Deaktiviert kamera-schwenk
controls.enableZoom = false // Deaktiviert zoomen - ungeeignet für Webseite
// DEMOS
//controls.autoRotate = true;
//controls.autoRotateSpeed = 5

/**
 * 2# RESIZING & LOOP
 * Einfügen von styles.css
 *
 * Wird nur 1x aufgerufen --> Loop!
 */
window.addEventListener("resize", () => {
  // Update Sizes - Check dass es immer aufgerufen wird:
  // console.log(window.innerWidth, window.innerHeight)
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update Camera
  camera.aspect = sizes.width / sizes.height
  // Updates the camera projection matrix. Must be called after any change of parameters.
  camera.updateProjectionMatrix()
  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
})

/**
 * 2# LOOP
 *  Wir wollen die Szene immer wieder re-rendern
 */
const loop = () => {
  //3# Keeps animating
  controls.update()

  //2# AnimationTest: light.position.x += 0.1;
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop)
}
loop()

/**
 * 5# ANIMATION
 */
var timeline = gsap.timeline({default: {duration: 1 }})
timeline.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
timeline.fromTo('nav', {y: "-100%"}, {y: "0%"})
timeline.fromTo(".title", {opacity: 0}, {opacity: 1})

// Change color on mouse move animation
let mouseDown = false
// b) later!
let rgb = []
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))
window.addEventListener("mousemove", (e) => {
  if(mouseDown) {
    // Lets animate ...
    rgb = [
      (e.pageX / sizes.width),
      (e.pageY / sizes.width),
      1
    ]
    //console.log('rbg', rgb)
    // In graphic libarys the Color function expects NORMALIZED Values, so r:rgb[0-1]
    gsap.to(mesh.material.color, {r:rgb[0], g:rgb[1], b:rgb[2]})

  }
})