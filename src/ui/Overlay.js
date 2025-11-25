export class Overlay {
    constructor() {
        this.element = document.createElement('div');
        this.element.id = 'overlay';
        this.element.style.position = 'absolute';
        this.element.style.top = '20px';
        this.element.style.right = '20px';
        this.element.style.width = '400px';
        this.element.style.maxHeight = '80vh';
        this.element.style.overflowY = 'auto';
        this.element.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        this.element.style.color = '#fff';
        this.element.style.padding = '20px';
        this.element.style.borderRadius = '8px';
        this.element.style.fontFamily = 'monospace';
        this.element.style.border = '1px solid #44aa88';
        this.element.style.display = 'none';
        this.element.style.backdropFilter = 'blur(5px)';
        
        document.body.appendChild(this.element);
    }

    show(title, content) {
        this.element.innerHTML = `
            <h2 style="color: #ff3333; margin-bottom: 15px; border-bottom: 1px solid #666; padding-bottom: 10px;">${title}</h2>
            <div style="line-height: 1.6; font-size: 14px;">${content}</div>
            <div style="margin-top: 20px; font-size: 12px; color: #888;">Press ESC to close</div>
        `;
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}

export const overlay = new Overlay();
