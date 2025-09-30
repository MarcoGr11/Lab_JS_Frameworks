export abstract class Car {
  public brand: string;
  public model: string;

  protected year: number;

  #vin: string;

  constructor(brand: string, model: string, year: number, vin: string) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.#vin = vin;
  }

  getVinMasked(): string {
    return this.#vin.slice(0, 3) + "***********";
  }

  abstract describe(): string;
}

export class BMW extends Car {
  constructor(model: string, year: number, vin: string, private packageName: string = "M Sport") {
    super("BMW", model, year, vin);
  }
  describe(): string {
    return `[BMW] ${this.model} (${this.year}) – package: ${this.packageName}, vin: ${this.getVinMasked()}`;
  }
}

export class Audi extends Car {
  constructor(model: string, year: number, vin: string, protected quattro: boolean = true) {
    super("Audi", model, year, vin);
  }
  describe(): string {
    return `[Audi] ${this.model} (${this.year}) – quattro=${this.quattro}, vin: ${this.getVinMasked()}`;
  }
}

export class Toyota extends Car {
  constructor(model: string, year: number, vin: string, public hybrid: boolean = false) {
    super("Toyota", model, year, vin);
  }
  describe(): string {
    return `[Toyota] ${this.model} (${this.year}) – hybrid=${this.hybrid}, vin: ${this.getVinMasked()}`;
  }
}
export function demoCars(): void {
  console.log("Завдання 3: Cars");
  const cars: Car[] = [
    new BMW("M5", 2020, "WBA12345678901234", "Competition"),
    new BMW("X6", 2021, "WBA99999999999999"),
    new Audi("А7", 2019, "WAU12312312312312", true),
    new Audi("Q8", 2022, "WAU00000000000000", false),
    new Toyota("Camry", 2018, "JTD12312312312312", true),
    new Toyota("RAV4", 2023, "JTD00000000000000", false),
  ];

  for (const c of cars) console.log(c.describe());
}
