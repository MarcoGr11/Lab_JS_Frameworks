// src/services/Library.ts
export class Library<T extends { id: string | number }> {
    private items: T[] = [];

    constructor(initial: T[] = []) {
        this.items = initial;
    }

    all(): T[] {
        return this.items;
    }

    add(item: T): void {
        this.items.push(item);
    }

    remove(id: string | number): void {
        this.items = this.items.filter(i => i.id !== id);
    }

    findById(id: string | number): T | undefined {
        return this.items.find(i => i.id === id);
    }

    search(predicate: (i: T) => boolean): T[] {
        return this.items.filter(predicate);
    }

    setAll(items: T[]): void {
        this.items = items;
    }
}
