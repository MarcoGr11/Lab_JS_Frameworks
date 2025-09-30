export function repeatMessage(message: string, times: number = 1): void {
  for (let i = 0; i < times; i++) {
    console.log(`[${i + 1}] ${message}`);
  }
}
console.log("functions.ts");
repeatMessage("TypeScript ", 3);
repeatMessage("За замовчуванням один раз");
