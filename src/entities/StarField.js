import * as THREE from 'three';

export class StarField {
    constructor(scene) {
        this.scene = scene;
        this.init();
    }

    init() {
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
        const starCount = 2000;
        const starPositions = [];
        
        for(let i=0; i<starCount; i++) {
            const x = (Math.random() - 0.5) * 400;
            const y = (Math.random() - 0.5) * 400;
            const z = (Math.random() - 0.5) * 400;
            starPositions.push(x, y, z);
        }
        
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
        this.stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.stars);
    }

    update(delta) {
        // Slowly rotate the star field for a dynamic feel
        this.stars.rotation.y += 0.05 * delta;
        this.stars.rotation.x += 0.02 * delta;
    }
}
