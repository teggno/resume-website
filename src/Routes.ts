export const technologyRoute = {
  hashFromName: (name: string) => `#technologies/${name}`,
  nameFromHash: (hash: string) =>
    hash.replace("technologies/", "").replace("#", "")
};
