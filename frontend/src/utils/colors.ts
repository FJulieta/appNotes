export const pastelColors = [
  '#ff85d5',
  '#e79eff',
  '#b8e4ff',
  '#ff94a2',
  '#ffe180',
];

export function getRandomColor(): string {
  const index = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[index];
}
