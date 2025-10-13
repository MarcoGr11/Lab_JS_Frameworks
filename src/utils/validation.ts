export const isYear = (v: string) => /^(18\d{2}|19\d{2}|20\d{2}|2100)$/.test(v);
export const isNumericId = (v: string) => /^\d+$/.test(v);
export const notEmpty = (v: string) => v.trim().length > 0;