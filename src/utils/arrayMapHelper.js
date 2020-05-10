export const arrayMapHelper = (items, itemId, propName, newProps) => {
	return items.map((i) => (i[propName] === +itemId ? { ...i, ...newProps } : i));
};
