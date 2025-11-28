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

        this.asteroidBelt = null;
        this.nebulae = null;
        this.comets = [];
        this.beaconGroup = null;

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

        this.createNebulae();
        this.createAsteroidBelt();
        this.createObservationBeacons();
        this.spawnComets();
    }

    createNebulae() {
        const cloudMaterial = new THREE.SpriteMaterial({
            color: 0x4a7cff,
            opacity: 0.25,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        this.nebulae = new THREE.Group();

        for (let i = 0; i < 25; i++) {
            const sprite = new THREE.Sprite(cloudMaterial.clone());
            const scale = 50 + Math.random() * 100;
            sprite.scale.set(scale, scale, 1);
            sprite.material.color.offsetHSL((Math.random() - 0.5) * 0.2, 0, 0);
            sprite.material.opacity = 0.15 + Math.random() * 0.15;

            const radius = 150 + Math.random() * 120;
            const angle = Math.random() * Math.PI * 2;
            sprite.position.set(
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 40,
                Math.sin(angle) * radius
            );

            this.nebulae.add(sprite);
        }

        this.scene.add(this.nebulae);
    }

    createAsteroidBelt() {
        const belt = new THREE.Group();
        const geometry = new THREE.IcosahedronGeometry(0.5, 0);
        const material = new THREE.MeshStandardMaterial({
            color: 0x777777,
            roughness: 1,
            metalness: 0.1
        });

        const innerRadius = 35;
        const outerRadius = 65;

        for (let i = 0; i < 220; i++) {
            const asteroid = new THREE.Mesh(geometry, material.clone());
            const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
            const angle = Math.random() * Math.PI * 2;
            const yOffset = (Math.random() - 0.5) * 6;

            asteroid.position.set(
                Math.cos(angle) * radius,
                yOffset,
                Math.sin(angle) * radius
            );

            const scale = 0.3 + Math.random() * 1.2;
            asteroid.scale.setScalar(scale);

            asteroid.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

            asteroid.userData = {
                spin: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.5,
                    (Math.random() - 0.5) * 0.5,
                    (Math.random() - 0.5) * 0.5
                )
            };

            belt.add(asteroid);
        }

        this.asteroidBelt = belt;
        this.scene.add(this.asteroidBelt);
    }

    createObservationBeacons() {
        this.beaconGroup = new THREE.Group();

        const beaconPositions = [
            new THREE.Vector3(0, 8, -30),
            new THREE.Vector3(25, 6, 10),
            new THREE.Vector3(-28, 10, 18)
        ];

        beaconPositions.forEach((pos, index) => {
            const baseGeometry = new THREE.CylinderGeometry(0.6, 1.2, 4, 12);
            const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x222831, emissive: 0x0b192f });
            const base = new THREE.Mesh(baseGeometry, baseMaterial);
            base.position.copy(pos);

            const ringGeometry = new THREE.TorusGeometry(2.4, 0.08, 12, 48);
            const ringMaterial = new THREE.MeshStandardMaterial({ color: 0x4af2c0, emissive: 0x2ae6b0, emissiveIntensity: 0.8 });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.copy(pos);
            ring.rotation.x = Math.PI / 2;

            const light = new THREE.PointLight(0x3ae4ff, 2.5, 40, 2);
            light.position.copy(pos).add(new THREE.Vector3(0, 2, 0));

            const tipGeometry = new THREE.ConeGeometry(0.4, 1.2, 10);
            const tipMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x4a7cff, emissiveIntensity: 1.2 });
            const tip = new THREE.Mesh(tipGeometry, tipMaterial);
            tip.position.copy(pos).add(new THREE.Vector3(0, 2.5, 0));

            const beacon = new THREE.Group();
            beacon.add(base, ring, tip, light);

            beacon.userData = {
                pulseOffset: index * Math.PI * 0.5
            };

            this.beaconGroup.add(beacon);
        });

        this.scene.add(this.beaconGroup);
    }

    spawnComets() {
        this.comets = [];

        const bodyGeometry = new THREE.SphereGeometry(0.8, 16, 16);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x6bd5ff, emissiveIntensity: 1.2 });

        const tailGeometry = new THREE.ConeGeometry(0.4, 3, 12);
        const tailMaterial = new THREE.MeshStandardMaterial({ color: 0x9cf5ff, emissive: 0x7ae3ff, emissiveIntensity: 0.7, transparent: true, opacity: 0.8 });

        for (let i = 0; i < 4; i++) {
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial.clone());
            const tail = new THREE.Mesh(tailGeometry, tailMaterial.clone());

            const comet = new THREE.Group();
            comet.add(body);
            comet.add(tail);
            tail.position.y = -1.5;
            tail.rotation.x = Math.PI;

            const radius = 70 + Math.random() * 40;
            const speed = 0.08 + Math.random() * 0.12;
            const height = (Math.random() - 0.5) * 20;
            const offset = Math.random() * Math.PI * 2;

            comet.userData = {
                radius,
                speed,
                angle: offset,
                height
            };

            this.scene.add(comet);
            this.comets.push(comet);
        }
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

        if (this.asteroidBelt) {
            this.asteroidBelt.rotation.y += deltaTime * 0.05;
            this.asteroidBelt.children.forEach(asteroid => {
                asteroid.rotation.x += asteroid.userData.spin.x * deltaTime;
                asteroid.rotation.y += asteroid.userData.spin.y * deltaTime;
                asteroid.rotation.z += asteroid.userData.spin.z * deltaTime;
            });
        }

        if (this.nebulae) {
            this.nebulae.children.forEach((sprite, index) => {
                sprite.material.opacity = 0.12 + Math.sin(elapsedTime * 0.2 + index) * 0.05 + (sprite.material.opacity * 0.2);
                sprite.material.rotation += 0.001;
            });
        }

        if (this.beaconGroup) {
            this.beaconGroup.children.forEach((beacon, index) => {
                const pulse = Math.sin(elapsedTime * 2 + beacon.userData.pulseOffset) * 0.5 + 1.2;
                beacon.children.forEach(child => {
                    if (child.isPointLight) {
                        child.intensity = 1.5 * pulse;
                    }
                });

                const ring = beacon.children.find(child => child.geometry && child.geometry.type === 'TorusGeometry');
                if (ring) {
                    ring.rotation.z += deltaTime * 0.6;
                }
            });
        }

        if (this.comets.length) {
            this.comets.forEach(comet => {
                comet.userData.angle += comet.userData.speed * deltaTime;
                const angle = comet.userData.angle;
                comet.position.set(
                    Math.cos(angle) * comet.userData.radius,
                    comet.userData.height + Math.sin(angle * 0.7) * 3,
                    Math.sin(angle) * comet.userData.radius
                );

                comet.rotation.y = -angle + Math.PI / 2;
            });
        }
    }
}
