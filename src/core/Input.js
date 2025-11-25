export class Input {
    constructor() {
        this.keys = new Set();
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.keys.add(e.code));
        document.addEventListener('keyup', (e) => this.keys.delete(e.code));
    }

    isKeyDown(code) {
        return this.keys.has(code);
    }
}

export const input = new Input();
