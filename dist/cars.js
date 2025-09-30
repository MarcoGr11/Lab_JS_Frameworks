var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Car_vin;
export class Car {
    constructor(brand, model, year, vin) {
        _Car_vin.set(this, void 0);
        this.brand = brand;
        this.model = model;
        this.year = year;
        __classPrivateFieldSet(this, _Car_vin, vin, "f");
    }
    getVinMasked() {
        return __classPrivateFieldGet(this, _Car_vin, "f").slice(0, 3) + "***********";
    }
}
_Car_vin = new WeakMap();
export class BMW extends Car {
    constructor(model, year, vin, packageName = "M Sport") {
        super("BMW", model, year, vin);
        this.packageName = packageName;
    }
    describe() {
        return `[BMW] ${this.model} (${this.year}) – package: ${this.packageName}, vin: ${this.getVinMasked()}`;
    }
}
export class Audi extends Car {
    constructor(model, year, vin, quattro = true) {
        super("Audi", model, year, vin);
        this.quattro = quattro;
    }
    describe() {
        return `[Audi] ${this.model} (${this.year}) – quattro=${this.quattro}, vin: ${this.getVinMasked()}`;
    }
}
export class Toyota extends Car {
    constructor(model, year, vin, hybrid = false) {
        super("Toyota", model, year, vin);
        this.hybrid = hybrid;
    }
    describe() {
        return `[Toyota] ${this.model} (${this.year}) – hybrid=${this.hybrid}, vin: ${this.getVinMasked()}`;
    }
}
export function demoCars() {
    console.log("Завдання 3: Cars");
    const cars = [
        new BMW("M5", 2020, "WBA12345678901234", "Competition"),
        new BMW("X6", 2021, "WBA99999999999999"),
        new Audi("А7", 2019, "WAU12312312312312", true),
        new Audi("Q8", 2022, "WAU00000000000000", false),
        new Toyota("Camry", 2018, "JTD12312312312312", true),
        new Toyota("RAV4", 2023, "JTD00000000000000", false),
    ];
    for (const c of cars)
        console.log(c.describe());
}
//# sourceMappingURL=cars.js.map