import { WebGLRenderer, PerspectiveCamera, Scene } from 'three';
import { Color, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, Texture, Vector3 } from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { LumaSplatsThree } from '@lumaai/luma-web';
import { gsap } from "gsap";
import * as THREE from "three";

let canvas = document.querySelector('canvas');

let renderer = new WebGLRenderer({
	canvas: canvas,
	antialias: false,
	particleRevealEnabled: true
});

renderer.setSize(window.innerWidth, window.innerHeight, false);

let scene = new Scene();

let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-1, 0.4, 2);

let controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

let splat = new LumaSplatsThree({
	source: 'https://lumalabs.ai/embed/def76f0d-a3f1-43d2-a7c0-7eb9d449bfc3?mode=sparkles&background=%23ffffff&color=%23000000&showTitle=true&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false',
	// we disable full three.js for performance
	enableThreeShaderIntegration: false,
	// particle entrance animation
	particleRevealEnabled: true,
});
scene.add(splat);

// the splats file can provide an ideal initial viewing location
// splat.onInitialCameraTransform = transform => {
// 	transform.decompose(camera.position, camera.quaternion, new Vector3());
// };

// Add text
scene.add(createWelcomeText());
scene.add(createInfoText());

renderer.setAnimationLoop(() => {
	controls.update();
	renderer.render(scene, camera);
});

function createWelcomeText() {
	// create canvas
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	canvas.width = 1024;
	canvas.height = 512;

	// clear white, 0 alpha
	context.fillStyle = 'rgba(255, 255, 255, 0)';
	context.fillRect(0, 0, canvas.width, canvas.height);

	// draw text
	context.fillStyle = 'white';
	// 100px helvetica, arial, sans-serif
	context.font = '180px sans-serif';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	// stroke
	context.strokeStyle = 'rgba(0, 0, 0, 0.5)'
	context.lineWidth = 5;
	context.fillText('Welcome', canvas.width / 2, canvas.height / 2);
	context.strokeText('Welcome', canvas.width / 2, canvas.height / 2);

	// create texture from canvas
	const texture = new Texture(canvas);
	texture.needsUpdate = true;

	// create plane geometry and mesh with the texture
	const geometry = new PlaneGeometry(4, 2);
	const material = new MeshStandardMaterial({
		map: texture,
		transparent: false,
		alphaTest: 0.5,
		side: DoubleSide,
		premultipliedAlpha: true,
		emissive: 'white',
		emissiveIntensity: 2,
	});
	const textPlane = new Mesh(geometry, material);

	// position and rotate
	textPlane.position.set(-3, 1, -2);
	//textPlane.rotation.y = 20;
	textPlane.scale.setScalar(1);

	// Animate text rotation using GSAP
	gsap.to(textPlane.rotation, {
		y: Math.PI * 2, // Rotate 360 degrees
		duration: 5,    // Animation duration in seconds
		repeat: -1,     // Repeat indefinitely
		ease: "linear" // Linear ease
	});

	return textPlane;
}

function createInfoText() {
	// create canvas
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	canvas.width = 1024;
	canvas.height = 512;

	// clear white, 0 alpha
	context.fillStyle = 'rgba(245, 31, 31, 0)';
	context.fillRect(0, 0, canvas.width, canvas.height);

	// draw text
	context.fillStyle = 'red';
	// 100px helvetica, arial, sans-serif
	context.font = '140px sans-serif';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	// stroke
	context.strokeStyle = 'rgba(232, 0, 0, 0.5)'
	context.lineWidth = 5;
	context.fillText('Discover', canvas.width / 2, canvas.height / 2);
	context.strokeText('Discover', canvas.width / 2, canvas.height / 2);

	// create texture from canvas
	const texture = new Texture(canvas);
	texture.needsUpdate = true;

	// create plane geometry and mesh with the texture
	const geometry = new PlaneGeometry(4, 2);
	const material = new MeshStandardMaterial({
		map: texture,
		color: 0xff0000,
		transparent: true,
		alphaTest: 0.5,
		side: DoubleSide,
		premultipliedAlpha: true,
		emissive: 'white',
		emissiveIntensity: 2,
	});
	const textPlane = new Mesh(geometry, material);

	// position and rotate
	textPlane.position.set(2, 0, 2);
	textPlane.rotation.y = -40;
	textPlane.scale.setScalar(1);

	return textPlane;
}