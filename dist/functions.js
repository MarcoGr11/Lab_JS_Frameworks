export function repeatMessage(message, times = 1) {
    for (let i = 0; i < times; i++) {
        console.log(`[${i + 1}] ${message}`);
    }
}
console.log("functions.ts");
repeatMessage("TypeScript ", 3);
repeatMessage("За замовчуванням один раз");
//# sourceMappingURL=functions.js.map