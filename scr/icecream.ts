const SIZE_PRICES = {
  small: 10,
  large: 25,
} as const;

const TOPPING_PRICES = {
  chocolate: 5,
  caramel: 6,
  berries: 10,
} as const;

const MARSHMALLOW_PRICE = 5;

type SizeKey = keyof typeof SIZE_PRICES;
type ToppingKey = keyof typeof TOPPING_PRICES;

function ask(promptText: string): string | null {
  return window.prompt(promptText);
}

export function runIceCreamCalculator(): void {
  alert("Вітаю у калькуляторі морозива! дайте відповідь на кілька запитань…");

  const sizeRaw = ask("Оберіть розмір small / large:")?.trim().toLowerCase();
  if (!sizeRaw || !(sizeRaw in SIZE_PRICES)) {
    alert("Некоректний розмір. Спробуйте ще раз.");
    return;
  }
  const size = sizeRaw as SizeKey;

  const toppingsRaw = ask(
    "Вкажіть начинку через кому. Доступні: chocolate, caramel, berries. (min 1)"
  )
    ?.split(",")
    .map(s => s.trim().toLowerCase())
    .filter(Boolean) ?? [];

  const invalid = toppingsRaw.filter(t => !(t in TOPPING_PRICES));
  if (toppingsRaw.length === 0 || invalid.length > 0) {
    alert("Некоректні начинки/не вибрано жодної.");
    return;
  }
  const toppings = toppingsRaw as ToppingKey[];

  const marshmallowAns = ask("Додати маршмелоу? yes/no:")?.trim().toLowerCase();
  const addMarshmallow = marshmallowAns === "yes" || marshmallowAns === "y";
  let total = SIZE_PRICES[size];
  for (const t of toppings) total += TOPPING_PRICES[t];
  if (addMarshmallow) total += MARSHMALLOW_PRICE;

  alert(
    `Ваше замовлення:\n` +
    `Розмір: ${size} (${SIZE_PRICES[size]} грн)\n` +
    `Начинки: ${toppings.join(", ")} (+${toppings
      .map(t => TOPPING_PRICES[t])
      .reduce((a, b) => a + b, 0)} грн)\n` +
    `Маршмелоу: ${addMarshmallow ? MARSHMALLOW_PRICE + " грн" : "ні"}\n` +
    `Разом: ${total} грн`
  );
}
