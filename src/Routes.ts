export const technologyRoute = {
  hashFromName: (name: string) => `#technologies/${encodeURIComponent(name)}`,
  nameFromHash: (hash: string) =>
    decodeURIComponent(hash.replace("technologies/", "").replace("#", ""))
};
export const projectRoute = {
  hashFromName: (name: string) => `#projects/${encodeURIComponent(name)}`,
  nameFromHash: (hash: string) =>
    decodeURIComponent(hash.replace("projects/", "").replace("#", ""))
};
