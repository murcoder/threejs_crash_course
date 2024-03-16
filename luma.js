import { WebGLRenderer, PerspectiveCamera, Scene } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { LumaSplatsThree } from '@lumaai/luma-web';

let canvas = document.querySelector('canvas');

let renderer = new WebGLRenderer({
	canvas: canvas,
	antialias: false
});
	particleRevealEnabled: true,
renderer.setSize(window.innerWidth, window.innerHeight, false);

let scene = new Scene();

let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

let controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

let splat = new LumaSplatsThree({
	source: 'https://lumalabs.ai/embed/def76f0d-a3f1-43d2-a7c0-7eb9d449bfc3?mode=sparkles&background=%23ffffff&color=%23000000&showTitle=true&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false',
	particleRevealEnabled: true,
});
scene.add(splat);

renderer.setAnimationLoop(() => {
	controls.update();
	renderer.render(scene, camera);
});



// import { LumaSplatsThree } from "@lumaai/luma-web";
// import { Color, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, Texture, Vector3 } from "three";
// import { DemoProps } from ".";

// export function DemoHelloWorld(props: DemoProps) {
// 	let { renderer, camera, scene, gui } = props;

// 	scene.background = new Color('white');

// 	let splats = new LumaSplatsThree({
// 		// MIT WPU Globe @krazyykrunal
// 		source: 'https://lumalabs.ai/capture/ca9ea966-ca24-4ec1-ab0f-af665cb546ff',
// 		// we disable full three.js for performance
// 		enableThreeShaderIntegration: false,
// 		// particle entrance animation
// 		particleRevealEnabled: true,
// 	});

// 	scene.add(splats);

// 	// the splats file can provide an ideal initial viewing location
// 	splats.onInitialCameraTransform = transform => {
// 		transform.decompose(camera.position, camera.quaternion, new Vector3());
// 	};

// 	scene.add(createText());

// 	return {
// 		dispose: () => {
// 			// stop worker, free resources
// 			splats.dispose();
// 		}
// 	}
// }

// // create a plane with "Hello World" text
// function createText() {
// 	// create canvas
// 	const canvas = document.createElement('canvas');
// 	const context = canvas.getContext('2d')!;
// 	canvas.width = 1024;
// 	canvas.height = 512;

// 	// clear white, 0 alpha
// 	context.fillStyle = 'rgba(255, 255, 255, 0)';
// 	context.fillRect(0, 0, canvas.width, canvas.height);

// 	// draw text
// 	context.fillStyle = 'white';
// 	// 100px helvetica, arial, sans-serif
// 	context.font = '200px sans-serif';
// 	context.textAlign = 'center';
// 	context.textBaseline = 'middle';
// 	// stroke
// 	context.strokeStyle = 'rgba(0, 0, 0, 0.5)'
// 	context.lineWidth = 5;
// 	context.fillText('Hello World', canvas.width / 2, canvas.height / 2);
// 	context.strokeText('Hello World', canvas.width / 2, canvas.height / 2);

// 	// create texture from canvas
// 	const texture = new Texture(canvas);
// 	texture.needsUpdate = true;

// 	// create plane geometry and mesh with the texture
// 	const geometry = new PlaneGeometry(5, 2.5);
// 	const material = new MeshStandardMaterial({
// 		map: texture,
// 		transparent: false,
// 		alphaTest: 0.5,
// 		side: DoubleSide,
// 		premultipliedAlpha: true,
// 		emissive: 'white',
// 		emissiveIntensity: 2,
// 	});
// 	const textPlane = new Mesh(geometry, material);

// 	// position and rotate
// 	textPlane.position.set(0.8, -0.9, 0);
// 	textPlane.rotation.y = Math.PI / 2;
// 	textPlane.scale.setScalar(0.6);

// 	return textPlane;
// }