import * as THREE from 'three';
import { overlay } from '../ui/Overlay.js';

export class TextFragment {
    constructor(scene, player, data) {
        this.scene = scene;
        this.player = player;
        this.data = data;
        this.isCollected = false;
        
        // Create Sprite Label
        this.sprite = this.createSprite(data.shortLabel || "Unknown");
        
        // Random Position
        const range = 200;
        this.sprite.position.set(
            (Math.random() - 0.5) * range,
            (Math.random() - 0.5) * range,
            (Math.random() - 0.5) * range
        );
        
        this.scene.add(this.sprite);
    }

    createSprite(text) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const fontSize = 48;
        ctx.font = `bold ${fontSize}px Arial`;
        
        // Measure text
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        
        canvas.width = textWidth + 20;
        canvas.height = fontSize + 20;
        
        // Redraw with correct size
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        
        // Scale sprite to match aspect ratio
        const scale = 5;
        sprite.scale.set(scale * (canvas.width / canvas.height), scale, 1);
        
        return sprite;
    }

    update(delta) {
        if (this.isCollected) return;

        // Check distance to player
        const dist = this.sprite.position.distanceTo(this.player.camera.position);
        
        if (dist < 10) {
            this.onCollect();
        }

        // Optional: Make sprite look at camera (default behavior of Sprite, but good to know)
        // Floating animation
        this.sprite.position.y += Math.sin(Date.now() * 0.001 + this.sprite.position.x) * 0.01;
    }

    onCollect() {
        // Show in overlay
        let content = "";
        if (this.data.content && Array.isArray(this.data.content)) {
            content = this.data.content.map(p => `<p style="margin-bottom: 10px;">${p}</p>`).join('');
        } else {
            content = this.data.text || "No content";
        }

        overlay.show(this.data.title || this.data.text, content);
        
        // Visual feedback (maybe scale up and fade out?)
        // For now, just keep it visible but maybe change color? 
        // Or actually, let's not "remove" it, just show the text.
        // If we want to "collect" it, we could remove it from scene.
        // this.scene.remove(this.sprite);
        // this.isCollected = true;
    }
}
