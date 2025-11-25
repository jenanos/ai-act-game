import * as THREE from 'three';
import { EntityManager } from './src/core/EntityManager.js';
import { Player } from './src/entities/Player.js';
import { StarField } from './src/entities/StarField.js';
import { Galaxy } from './src/entities/Galaxy.js';
import { World } from './src/World.js';
import { aiActData } from './src/ai_act_data.js';
import planetEarthUrl from './src/assets/textures/planet_earth_like.png';
import planetMarsUrl from './src/assets/textures/planet_mars_like.png';
import planetIceUrl from './src/assets/textures/planet_ice.png';
import planetGasUrl from './src/assets/textures/planet_gas_giant.png';
import planetLavaUrl from './src/assets/textures/planet_lava.png';

const planetTextures = [
    planetEarthUrl,
    planetMarsUrl,
    planetIceUrl,
    planetGasUrl,
    planetLavaUrl
];

// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.FogExp2(0x000000, 0.015);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize Entity Manager
const entityManager = new EntityManager();

// Add Entities
const player = new Player(camera, scene, renderer.domElement);
entityManager.add(player);

const starField = new StarField(scene);
entityManager.add(starField);

const galaxy = new Galaxy(scene);
entityManager.add(galaxy);

// World handles content generation
const world = new World(scene, player);
entityManager.add(world);

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const deltaTime = clock.getDelta();

    entityManager.update(deltaTime);

    renderer.render(scene, camera);
}

animate();
// UI Handling
const instructions = document.getElementById('instructions');

document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement) {
        instructions.style.display = 'none';
    } else {
        instructions.style.display = 'flex';
    }
});

