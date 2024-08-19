// Three.js setup for background effect
import * as THREE from 'three';

let scene, camera, renderer;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threejs-background').appendChild(renderer.domElement);

    // Add some objects (e.g., particles, animated shapes)
    // For example:
    let geometry = new THREE.SphereGeometry(15, 32, 32);
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    let sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 50;

    function animate() {
        requestAnimationFrame(animate);

        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();
}

window.onload = init;
