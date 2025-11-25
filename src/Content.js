import * as THREE from 'three';
import { aiActData } from './ai_act_data.js';
import { SectionGroup } from './entities/SectionGroup.js';

export class Content {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.sectionGroups = [];

        this.init();
    }

    init() {
        this.generateContent();
    }

    generateContent() {
        // Group data into sections
        const sections = [];
        let currentSection = null;

        aiActData.forEach(item => {
            if (item.type === 'header' && item.text.startsWith('SECTION')) {
                currentSection = { ...item, articles: [] };
                sections.push(currentSection);
            } else if (item.type === 'article' && currentSection) {
                currentSection.articles.push(item);
            }
        });

        // Create Section Groups
        const radius = 60; // Distance from center
        
        sections.forEach((sectionData, index) => {
            const angle = (index / sections.length) * Math.PI * 2 + (Math.PI / 4); // Offset slightly
            
            const position = new THREE.Vector3(
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius
            );

            const sectionGroup = new SectionGroup(this.scene, this.player, sectionData, position);
            this.sectionGroups.push(sectionGroup);
        });
    }

    update(delta) {
        this.sectionGroups.forEach(group => group.update(delta));
    }
}
