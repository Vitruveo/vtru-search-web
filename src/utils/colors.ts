export const convertHEXtoRGB = (hex: string) => {
    const parts = /#?(..)(..)(..)/.exec(hex);
    if (!parts) {
        throw new Error(`${hex} is not a valid HEX color.`);
    }
    return [parseInt(parts[1], 16), parseInt(parts[2], 16), parseInt(parts[3], 16)];
};

export const convertRGBtoHEX = (rgb: number[]) => {
  const clamp = (value: number) => Math.min(255, Math.max(0, value));

  const hex = rgb.map(clamp).map((value) => {
    const hexValue = value.toString(16); // Converter para hexadecimal
    return hexValue.length === 1 ? "0" + hexValue : hexValue; // Adicionar um zero à esquerda se necessário
  });

  return "#" + hex.join("");
}
