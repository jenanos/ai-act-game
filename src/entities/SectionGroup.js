import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import fontUrl from '../assets/fonts/Roboto_Regular.json?url';
import { ArticlePlanet } from './ArticlePlanet.js';

// Import Planet Textures
import earthTextureUrl from '../assets/textures/earth.jpg';
import earthLikeTextureUrl from '../assets/textures/planet_earth_like.png';
import gasGiantTextureUrl from '../assets/textures/planet_gas_giant.png';
import iceTextureUrl from '../assets/textures/planet_ice.png';
import lavaTextureUrl from '../assets/textures/planet_lava.png';
import marsLikeTextureUrl from '../assets/textures/planet_mars_like.png';

const PLANET_TEXTURES = [
    earthTextureUrl,
    earthLikeTextureUrl,
    gasGiantTextureUrl,
    iceTextureUrl,
    lavaTextureUrl,
    marsLikeTextureUrl
];

export class SectionGroup {
    constructor(scene, player, data, position) {
        this.scene = scene;
        this.player = player;
        this.data = data;
        this.position = position;
        this.planets = [];
        
        this.init();
    }

    init() {
        // Create Section Title "Comet"
        const loader = new FontLoader();
        loader.load(fontUrl, (font) => {
            const textGeometry = new TextGeometry(this.data.text, {
                font: font,
                size: 2,
                depth: 0.5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelOffset: 0,
                bevelSegments: 5
            });

            textGeometry.center();

            const textMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x00ffff, 
                emissive: 0x0088ff,
                emissiveIntensity: 0.8
            });
            
            this.textMesh = new THREE.Mesh(textGeometry, textMaterial);
            
            // Position text higher above the group
            const textPos = this.position.clone();
            textPos.y += 20; 
            this.textMesh.position.copy(textPos);
            
            // Add a "comet" tail or glow
            const light = new THREE.PointLight(0x00ffff, 2, 50);
            light.position.copy(textPos);
            this.scene.add(light);
            
            this.scene.add(this.textMesh);
        });

        // Create Planets for this section
        if (this.data.articles) {
            this.data.articles.forEach((articleData, index) => {
                // Calculate position relative to section center
                // Arrange in a semi-circle or cluster around the section text
                // Increase spacing by using a larger arc or radius
                const angle = (index / this.data.articles.length) * Math.PI * 1.5; // Spread over 270 degrees
                const radius = 30; // Increased distance from section center
                
                const planetPos = new THREE.Vector3(
                    this.position.x + Math.cos(angle) * radius,
                    this.position.y + (Math.random() - 0.5) * 10, // More vertical variation
                    this.position.z + Math.sin(angle) * radius
                );

                // Pick a random texture
                const randomTexture = PLANET_TEXTURES[Math.floor(Math.random() * PLANET_TEXTURES.length)];

                const planet = new ArticlePlanet(this.scene, this.player, articleData, planetPos, randomTexture);
                this.planets.push(planet);
            });
        }
    }

    update(delta) {
        // Rotate Section Text
        if (this.textMesh) {
            this.textMesh.rotation.y += delta * 0.1;
        }

        // Update all planets in this group
        this.planets.forEach(planet => planet.update(delta));
    }
}
