/**
 * @param n index of the color to return. Pass any positive integer or 0.
 * @returns A hex rgb color code of a list of predefined colors.
 */
export default function nthColor(n: number): string {
  var i = 0,
    c: string,
    rem = n % colors.length;
  for (; i < colors.length; i++) {
    if (i === rem) return colors[i].hex;
  }
  return colors[0].name; //won't happen but ts compiler needs to be happy too
}
const colors = [
  { name: "darkgreen", hex: "#006400" },
  { name: "gold", hex: "#ffd700" },
  { name: "darkgrey", hex: "#a9a9a9" },
  { name: "navy", hex: "#000080" },
  { name: "darkorange", hex: "#ff8c00" },
  { name: "darkblue", hex: "#00008b" },
  { name: "darksalmon", hex: "#e9967a" },
  { name: "aqua", hex: "#00ffff" },
  { name: "azure", hex: "#f0ffff" },
  { name: "beige", hex: "#f5f5dc" },
  { name: "black", hex: "#000000" },
  { name: "blue", hex: "#0000ff" },
  { name: "brown", hex: "#a52a2a" },
  { name: "cyan", hex: "#00ffff" },
  { name: "darkcyan", hex: "#008b8b" },
  { name: "darkkhaki", hex: "#bdb76b" },
  { name: "darkmagenta", hex: "#8b008b" },
  { name: "darkolivegreen", hex: "#556b2f" },
  { name: "darkorchid", hex: "#9932cc" },
  { name: "darkred", hex: "#8b0000" },
  { name: "darkviolet", hex: "#9400d3" },
  { name: "fuchsia", hex: "#ff00ff" },
  { name: "green", hex: "#008000" },
  { name: "indigo", hex: "#4b0082" },
  { name: "khaki", hex: "#f0e68c" },
  { name: "lightblue", hex: "#add8e6" },
  { name: "lightcyan", hex: "#e0ffff" },
  { name: "lightgreen", hex: "#90ee90" },
  { name: "lightgrey", hex: "#d3d3d3" },
  { name: "lightpink", hex: "#ffb6c1" },
  { name: "lightyellow", hex: "#ffffe0" },
  { name: "lime", hex: "#00ff00" },
  { name: "magenta", hex: "#ff00ff" },
  { name: "maroon", hex: "#800000" },
  { name: "olive", hex: "#808000" },
  { name: "orange", hex: "#ffa500" },
  { name: "pink", hex: "#ffc0cb" },
  { name: "purple", hex: "#800080" },
  { name: "violet", hex: "#800080" },
  { name: "red", hex: "#ff0000" },
  { name: "silver", hex: "#c0c0c0" },
  { name: "white", hex: "#ffffff" },
  { name: "yellow", hex: "#ffff00" }
];
