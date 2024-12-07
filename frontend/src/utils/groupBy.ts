export function groupBy<T, K extends string | number | symbol>(
  items: T[],
  callbackFn: (item: T, index?: number) => K
): Record<K, T[]> {
  return items.reduce((acc, item, index) => {
    const key = callbackFn(item, index);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);

    return acc;
  }, {} as Record<K, T[]>);
}
