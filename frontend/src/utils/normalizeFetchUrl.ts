export function normalizeFetchUrl(base: string, path: string) {
  const normalizedBase = base.endsWith("/") ? base : base + "/"
  const normalizedPath = path[0] === "/" ? path.slice(1, path.length) : path

  return normalizedBase + normalizedPath
}
