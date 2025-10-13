export class Storage {
    constructor(private key: string) {}


    load<T>(fallback: T): T {
        const raw = localStorage.getItem(this.key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    }


    save<T>(data: T): void {
        localStorage.setItem(this.key, JSON.stringify(data));
    }


    clear(): void {
        localStorage.removeItem(this.key);
    }
}