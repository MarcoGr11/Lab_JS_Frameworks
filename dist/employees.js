export class Employee {
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
}
export class Developer extends Employee {
    getAnnualBonus() { return this.salary * 0.10; } // 10%
    pay() { console.log(`Paying salary to Developer ${this.name}`); }
}
export class Manager extends Employee {
    getAnnualBonus() { return this.salary * 0.20; } // 20%
    pay() { console.log(`Paying salary to Manager ${this.name}`); }
}
// Демо
export function demoEmployees() {
    console.log("Завдання 4: еmployees");
    const staff = [
        new Developer("Alice", 28, 3000),
        new Developer("Bob", 31, 3500),
        new Manager("Carol", 35, 5000),
    ];
    let totalBonus = 0;
    for (const e of staff) {
        totalBonus += e.getAnnualBonus();
    }
    console.log("Total annual bonus =", totalBonus);
    for (const e of staff) {
        if ("pay" in e && typeof e.pay === "function")
            e.pay();
    }
}
//# sourceMappingURL=employees.js.map