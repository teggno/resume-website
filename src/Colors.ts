import randomColor from "randomcolor";

/**
 * @param count Number of colors to build.
 * @returns An object with two functions to return colors.
 */
export default function colors(count: number) {
  const keyedCache: { [key: string]: string } = {},
    colors = randomColor({
      count: count,
      format: "rgba",
      alpha: 1
    });
  return {
    nth: (n: number): string => colors[n],
    /** The same instance of keyed() will always return the same color for the
     * same key. */
    keyed: (key: string): string | null => {
      let c = keyedCache[key];
      if (!c) {
        const colorsUsed = Object.keys(keyedCache).length;
        if (colorsUsed === colors.length) return null;
        c = colors[Object.keys(keyedCache).length];
        keyedCache[key] = c;
      }
      return c;
    }
  };
}
