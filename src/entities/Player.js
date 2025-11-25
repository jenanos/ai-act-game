import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { input } from '../core/Input.js';
import ufoModelUrl from '../assets/models/ufo.glb?url';

export class Player {
    constructor(camera, scene, domElement) {
        this.camera = camera;
        this.scene = scene;
        this.domElement = domElement || document.body;

        // State
        this.mesh = null;
        this.velocity = new THREE.Vector3();
        this.rotationSpeed = 2.0;
        
        // Settings
        this.baseSpeed = 30.0;
        this.sprintMultiplier = 2.0;
        this.damping = 3.0;
        
        // Camera Settings
        this.cameraOffset = new THREE.Vector3(0, 5, 15);
        this.cameraLookAtOffset = new THREE.Vector3(0, 2, 0);
        this.cameraSmoothness = 0.1;

        this.loadModel();
        this.initInput();
    }

    initInput() {
        // Pointer Lock for game start/UI handling
        this.domElement.addEventListener('click', () => {
            this.domElement.requestPointerLock();
        });
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load(ufoModelUrl, (gltf) => {
            this.mesh = gltf.scene;
            
            // Compute bounding box to handle unknown model scale
            const box = new THREE.Box3().setFromObject(this.mesh);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            
            console.log('Model loaded. Original size:', size);

            // Target size for the player (e.g., 0.5 units wide/long)
            const targetSize = 0.5;
            const scaleFactor = targetSize / maxDim;
            
            this.mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
            
            // Re-center the model geometry if needed (optional, but good practice)
            // For now, just relying on the model origin being reasonable or correcting via position.
            
            this.mesh.position.set(0, 0, 0);
            
            // Adjust camera relative to new size
            // Place camera behind and up, proportional to size but closer
            this.cameraOffset = new THREE.Vector3(0, 1.5, 4);
            this.cameraLookAtOffset = new THREE.Vector3(0, 0, 0);

            this.scene.add(this.mesh);
            console.log('Model scaled to:', targetSize, 'Scale factor:', scaleFactor);
        }, undefined, (error) => {
            console.error('An error occurred loading the UFO model:', error);
        });
    }

    update(deltaTime) {
        if (!this.mesh) return;

        // Input Checks
        const forward = input.isKeyDown('KeyW');
        const backward = input.isKeyDown('KeyS');
        const left = input.isKeyDown('KeyA');
        const right = input.isKeyDown('KeyD');
        const up = input.isKeyDown('Space') || input.isKeyDown('KeyE');
        const down = input.isKeyDown('KeyC') || input.isKeyDown('ControlLeft') || input.isKeyDown('KeyQ');
        const sprint = input.isKeyDown('ShiftLeft');

        // Calculate Speed
        const currentSpeed = sprint ? 
            this.baseSpeed * this.sprintMultiplier : 
            this.baseSpeed;

        // Rotation (Yaw)
        if (left) {
            this.mesh.rotation.y += this.rotationSpeed * deltaTime;
        }
        if (right) {
            this.mesh.rotation.y -= this.rotationSpeed * deltaTime;
        }

        // Movement Direction relative to model
        const direction = new THREE.Vector3();
        const modelForward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.mesh.rotation.y);
        const modelRight = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.mesh.rotation.y);

        if (forward) direction.add(modelForward);
        if (backward) direction.sub(modelForward);
        
        // Vertical movement (Absolute up/down)
        if (up) direction.add(new THREE.Vector3(0, 1, 0));
        if (down) direction.sub(new THREE.Vector3(0, 1, 0));

        if (direction.lengthSq() > 0) direction.normalize();

        // Acceleration
        if (direction.lengthSq() > 0) {
            this.velocity.add(direction.multiplyScalar(currentSpeed * deltaTime));
        }

        // Damping (friction)
        const dampingFactor = Math.exp(-this.damping * deltaTime) - 1;
        this.velocity.addScaledVector(this.velocity, dampingFactor);

        // Apply Velocity
        this.mesh.position.add(this.velocity.clone().multiplyScalar(deltaTime));

        // Update Camera
        this.updateCamera();
    }

    updateCamera() {
        if (!this.mesh) return;

        // Calculate desired camera position
        // Transform offset to world space relative to player rotation
        const relativeOffset = this.cameraOffset.clone();
        relativeOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.mesh.rotation.y);
        
        const targetPosition = this.mesh.position.clone().add(relativeOffset);
        
        // Smoothly interpolate camera position
        this.camera.position.lerp(targetPosition, this.cameraSmoothness);
        
        // Look at the player (plus offset)
        const lookAtTarget = this.mesh.position.clone().add(this.cameraLookAtOffset);
        this.camera.lookAt(lookAtTarget);
    }
}
