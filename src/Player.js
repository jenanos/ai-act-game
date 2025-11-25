import * as THREE from 'three';

export class Player {
    constructor(camera, scene, domElement) {
        this.camera = camera;
        this.scene = scene;
        this.domElement = domElement || document.body;

        // Initial Position
        this.camera.position.set(0, 5, 20);
        
        // Movement State
        this.velocity = new THREE.Vector3();
        this.input = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            up: false,
            down: false,
            sprint: false
        };

        // Settings
        this.baseSpeed = 50.0;
        this.sprintMultiplier = 3.0;
        this.damping = 5.0;
        
        // Mouse Look State
        this.isLocked = false;
        this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
        this.sensitivity = 0.002;

        this.initInput();
    }

    initInput() {
        // Keyboard
        document.addEventListener('keydown', (e) => this.onKeyChange(e, true));
        document.addEventListener('keyup', (e) => this.onKeyChange(e, false));
        
        // Mouse Look
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        
        // Pointer Lock
        this.domElement.addEventListener('click', () => {
            this.domElement.requestPointerLock();
        });

        document.addEventListener('pointerlockchange', () => {
            this.isLocked = document.pointerLockElement === this.domElement;
        });
    }

    onMouseMove(event) {
        if (!this.isLocked) return;

        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        this.euler.y -= movementX * this.sensitivity;
        this.euler.x -= movementY * this.sensitivity;

        // Clamp pitch (look up/down)
        this.euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.euler.x));

        this.camera.quaternion.setFromEuler(this.euler);
    }

    onKeyChange(event, isPressed) {
        switch(event.code) {
            case 'KeyW': this.input.forward = isPressed; break;
            case 'KeyS': this.input.backward = isPressed; break;
            case 'KeyA': this.input.left = isPressed; break;
            case 'KeyD': this.input.right = isPressed; break;
            case 'Space': this.input.up = isPressed; break;
            case 'KeyC': 
            case 'ControlLeft': 
                this.input.down = isPressed; break;
            case 'ShiftLeft': this.input.sprint = isPressed; break;
        }
    }

    update(deltaTime) {
        // Calculate Speed
        const currentSpeed = this.input.sprint ? 
            this.baseSpeed * this.sprintMultiplier : 
            this.baseSpeed;

        // Movement Direction relative to camera
        const direction = new THREE.Vector3();
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
        const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
        const up = new THREE.Vector3(0, 1, 0);

        // Flatten forward/right vectors for "walking" feel if desired, 
        // but for "flying" we usually want to move in the direction we look.
        // If we want pure "spectator" fly mode where W is always "forward into screen":
        
        if (this.input.forward) direction.add(forward);
        if (this.input.backward) direction.sub(forward);
        if (this.input.left) direction.sub(right);
        if (this.input.right) direction.add(right);
        
        // Vertical movement is usually absolute up/down in spectator cams
        if (this.input.up) direction.add(new THREE.Vector3(0, 1, 0));
        if (this.input.down) direction.sub(new THREE.Vector3(0, 1, 0));

        if (direction.lengthSq() > 0) direction.normalize();

        // Acceleration
        if (direction.lengthSq() > 0) {
            this.velocity.add(direction.multiplyScalar(currentSpeed * deltaTime));
        }

        // Damping (friction)
        const dampingFactor = Math.exp(-this.damping * deltaTime) - 1;
        this.velocity.addScaledVector(this.velocity, dampingFactor);

        // Apply Velocity
        this.camera.position.add(this.velocity.clone().multiplyScalar(deltaTime));
    }
}
