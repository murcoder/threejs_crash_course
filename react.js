const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.webgl') });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
	transparent: true,
	color: 0x88ff88, // Light green color
	opacity: 0.7,
	roughness: 0.2,
	metalness: 0.5,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(scene, camera);
}
animate();

const loader = new THREE.FontLoader();
loader.load('https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {
	const geometry = new THREE.TextGeometry('React Three Fiber', {
		font: font,
		size: 0.5,
		height: 0.05,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 5
	});
	const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
	const text = new THREE.Mesh(geometry, material);
	text.position.set(-2, 0, 0);
	scene.add(text);
});