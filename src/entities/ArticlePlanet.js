import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { overlay } from '../ui/Overlay.js';
import earthTextureUrl from '../assets/textures/earth.jpg';
import fontUrl from '../assets/fonts/Roboto_Regular.json?url';

export class ArticlePlanet {
    constructor(scene, player, data, position, textureUrl) {
        this.scene = scene;
        this.player = player;
        this.data = data;
        this.position = position;
        this.textureUrl = textureUrl;
        this.isCollected = false;
        this.keywordsMeshes = [];
        
        this.init();
    }

    init() {
        // Create Planet
        const geometry = new THREE.SphereGeometry(2, 32, 32);
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(this.textureUrl || earthTextureUrl);
        const material = new THREE.MeshStandardMaterial({ 
            map: texture,
            roughness: 0.7,
            metalness: 0.1
        });
        
        this.planet = new THREE.Mesh(geometry, material);
        this.planet.position.copy(this.position);
        this.scene.add(this.planet);

        // Load Font once for all text
        const loader = new FontLoader();
        loader.load(fontUrl, (font) => {
            this.createArticleNumber(font);
            this.createArticleTitle(font);
            this.createKeywords(font);
        });
    }

    createArticleNumber(font) {
        const textGeometry = new TextGeometry(this.data.shortLabel || "Art.", {
            font: font,
            size: 0.8,
            depth: 0.01,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.005,
            bevelSize: 0.005,
            bevelOffset: 0,
            bevelSegments: 5
        });

        textGeometry.center();

        const textMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff88 });
        this.textMesh = new THREE.Mesh(textGeometry, textMaterial);
        
        this.textMesh.position.copy(this.position);
        this.textMesh.position.y += 5.0; // Float higher above planet
        
        this.scene.add(this.textMesh);
    }

    createArticleTitle(font) {
        // Extract just the title part as requested
        // "Article 6 - Classification rules..." -> "Classification rules..."
        let titleText = this.data.title;
        if (titleText.includes("-")) {
            titleText = titleText.split("-")[1].trim();
        }

        const textGeometry = new TextGeometry(titleText, {
            font: font,
            size: 0.4,
            depth: 0.01,
            curveSegments: 12,
            bevelEnabled: false
        });

        textGeometry.center();

        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
        this.titleMesh = new THREE.Mesh(textGeometry, textMaterial);
        
        this.titleMesh.position.copy(this.position);
        this.titleMesh.position.y += 3.5; // Float above planet, below number
        
        this.scene.add(this.titleMesh);
    }

    createKeywords(font) {
        if (!this.data.keywords) return;

        this.data.keywords.forEach((keyword, index) => {
            const textGeometry = new TextGeometry(keyword, {
                font: font,
                size: 0.3,
                depth: 0.01,
                curveSegments: 12,
                bevelEnabled: false
            });

            textGeometry.center();

            const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
            const mesh = new THREE.Mesh(textGeometry, textMaterial);
            
            // Initial position (will be updated in animation)
            mesh.position.copy(this.position);
            
            // Store metadata for animation
            mesh.userData = {
                angle: (index / this.data.keywords.length) * Math.PI * 2,
                radius: 4 + Math.random() * 2,
                speed: 0.2 + Math.random() * 0.2,
                yOffset: (Math.random() - 0.5) * 2
            };

            this.scene.add(mesh);
            this.keywordsMeshes.push(mesh);
        });
    }

    update(delta) {
        // Rotate Planet
        if (this.planet) {
            this.planet.rotation.y += 0.5 * delta;
        }

        // Rotate Text to face player
        if (this.textMesh) {
            this.textMesh.lookAt(this.player.camera.position);
        }
        if (this.titleMesh) {
            this.titleMesh.lookAt(this.player.camera.position);
        }

        // Animate Keywords
        this.keywordsMeshes.forEach(mesh => {
            mesh.lookAt(this.player.camera.position);
            
            // Orbit logic
            mesh.userData.angle += mesh.userData.speed * delta;
            
            mesh.position.x = this.position.x + Math.cos(mesh.userData.angle) * mesh.userData.radius;
            mesh.position.z = this.position.z + Math.sin(mesh.userData.angle) * mesh.userData.radius;
            mesh.position.y = this.position.y + mesh.userData.yOffset;
        });

        // Check distance for interaction
        const dist = this.planet.position.distanceTo(this.player.camera.position);
        if (dist < 5 && !this.isCollected) {
            this.onCollect();
        }
    }

    onCollect() {
        // Show overlay
        let content = "";
        if (this.data.content && Array.isArray(this.data.content)) {
            content = this.data.content.map(p => `<p style="margin-bottom: 10px;">${p}</p>`).join('');
        } else {
            content = this.data.text || "No content";
        }

        overlay.show(this.data.title || this.data.text, content);
    }
}
