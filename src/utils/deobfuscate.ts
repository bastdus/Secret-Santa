const OFFSET = 5;

export const deobfuscate = (encoded: string): string =>
  encoded
    .split("-")
    .map((code) => String.fromCharCode(Number(code) - OFFSET))
    .join("");
