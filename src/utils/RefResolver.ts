
export function resolveRef(obj, root) {
  if (Array.isArray(obj)) {
    return obj.map(i => resolveRef(i, root));
  }
  if (obj && typeof obj === "object") {
    if (obj.$ref) {
      const parts = obj.$ref.replace(/^#\//, "").split("/");
      let refObj = root;
      for (const p of parts) {
        refObj = refObj[p];
      }
      return resolveRef(refObj, root);
    }
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, resolveRef(v, root)])
    );
  }
  return obj;
}