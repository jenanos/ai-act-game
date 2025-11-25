import * as THREE from 'three';
import { Content } from './Content.js';
import galaxyVertexShader from './assets/shaders/vertex.glsl?raw';
import galaxyFragmentShader from './assets/shaders/fragment.glsl?raw';
import sparkTextureUrl from './assets/textures/spark.png';

export class World {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.content = new Content(scene, player);
        this.clock = new THREE.Clock();
        
        this.initLights();
        this.initEnvironment();
        this.generateGalaxy();
        this.addParticles();
    }

    initLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 20, 10);
        this.scene.add(directionalLight);
    }

    initEnvironment() {


        // Fog for depth
        this.scene.fog = new THREE.FogExp2(0x000000, 0.01); // Reduced fog
        this.scene.background = new THREE.Color(0x000000);
        
        // Debug Cube
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );
        cube.position.set(0, 5, -10);
        this.scene.add(cube);
    }

    generateGalaxy() {
        const parameters = {};
        parameters.count = 50000;
        parameters.size = 0.02; // Increased size
        parameters.radius = 100;
        parameters.branches = 3;
        parameters.spin = 1;
        parameters.randomnessPower = 3;
        parameters.insideColor = '#ff6030';
        parameters.outsideColor = '#1b3984';
        parameters.randomness = 0.2;

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(parameters.count * 3);
        const randomness = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);
        const scales = new Float32Array(parameters.count * 1);

        const insideColor = new THREE.Color(parameters.insideColor);
        const outsideColor = new THREE.Color(parameters.outsideColor);

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;

            // Position
            const radius = Math.random() * parameters.radius;
            const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
            const spinAngle = radius * parameters.spin;

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            randomness[i3] = randomX;
            randomness[i3 + 1] = randomY;
            randomness[i3 + 2] = randomZ;

            // Color
            const mixedColor = insideColor.clone();
            mixedColor.lerp(outsideColor, radius / parameters.radius);

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;

            // Scale
            scales[i] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
        geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

        this.galaxyMaterial = new THREE.ShaderMaterial({
            size: parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            vertexShader: galaxyVertexShader,
            fragmentShader: galaxyFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uSize: { value: 30 * window.devicePixelRatio }
            }
        });

        this.galaxyPoints = new THREE.Points(geometry, this.galaxyMaterial);
        this.galaxyPoints.position.y = -10; // Moved up
        this.scene.add(this.galaxyPoints);
    }

    addParticles() {
        const textureLoader = new THREE.TextureLoader();
        const particleTexture = textureLoader.load(sparkTextureUrl);

        this.particleGroup = new THREE.Group();
        this.particleAttributes = { startSize: [], startPosition: [], randomness: [] };

        const totalParticles = 200;
        const radiusRange = 30;

        for (let i = 0; i < totalParticles; i++) {
            const spriteMaterial = new THREE.SpriteMaterial({
                map: particleTexture,
                color: 0xffffff,
                blending: THREE.AdditiveBlending
            });

            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(1.0, 1.0, 1.0); // Increased size
            sprite.position.set(
                (Math.random() - 0.5) * radiusRange * 2,
                (Math.random() - 0.5) * radiusRange,
                (Math.random() - 0.5) * radiusRange * 2
            );

            sprite.material.color.setHSL(Math.random(), 0.9, 0.7);
            
            this.particleGroup.add(sprite);
            this.particleAttributes.startPosition.push(sprite.position.clone());
            this.particleAttributes.randomness.push(Math.random());
        }

        this.scene.add(this.particleGroup);
    }

    update(deltaTime) {
        const elapsedTime = this.clock.getElapsedTime();

        // Update Content
        if (this.content) {
            this.content.update(deltaTime);
        }

        // Update Galaxy
        if (this.galaxyMaterial) {
            this.galaxyMaterial.uniforms.uTime.value = elapsedTime;
        }

        // Update Particles
        if (this.particleGroup) {
            this.particleGroup.rotation.y = elapsedTime * 0.1;
            
            for (let i = 0; i < this.particleGroup.children.length; i++) {
                const sprite = this.particleGroup.children[i];
                const a = this.particleAttributes.randomness[i] + 0.75;
                const pulseFactor = Math.sin(a * elapsedTime) * 0.1 + 0.9;
                
                sprite.position.x = this.particleAttributes.startPosition[i].x * pulseFactor;
                sprite.position.y = this.particleAttributes.startPosition[i].y * pulseFactor;
                sprite.position.z = this.particleAttributes.startPosition[i].z * pulseFactor;
            }
        }
    }
}
