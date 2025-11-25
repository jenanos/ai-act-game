export class EntityManager {
    constructor() {
        this.entities = [];
    }

    add(entity) {
        this.entities.push(entity);
    }

    remove(entity) {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    update(delta) {
        for (const entity of this.entities) {
            if (entity.update) {
                entity.update(delta);
            }
        }
    }
}
