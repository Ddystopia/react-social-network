export const replaceItemPropsInArray = <T extends Record<string, any>>(
  items: T[],
  itemId: number,
  propName: string,
  newProps: Partial<T>
): T[] => {
  return items.map(it => {
    if (it[propName] === itemId) {
      return { ...it, ...newProps }
    } else {
      return it
    }
  });
}

