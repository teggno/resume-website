export const technologyRoute = {
  hashFromName: (name: string) => `#technologies/${encodeURIComponent(name)}`,
  nameFromHash: (hash: string) =>
    decodeURIComponent(hash.replace("technologies/", "").replace("#", ""))
};
