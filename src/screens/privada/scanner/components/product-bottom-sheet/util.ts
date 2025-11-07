export function filterProductWithSearch(product) {
  const variants = product?.customVariants;

  if (!variants || variants.length === 0) return null;

  const variantsWithStock = variants.filter(
    (v) => v.realStockLevel > 0 || v.stockLevel === "IN_STOCK"
  );

  const chosenVariant =
    variantsWithStock.length > 0
      ? variantsWithStock.reduce((prev, curr) =>
          (curr.price ?? Infinity) < (prev.price ?? Infinity) ? curr : prev
        )
      : variants.reduce((prev, curr) =>
          (curr.price ?? Infinity) < (prev.price ?? Infinity) ? curr : prev
        );

  return {
    ...product,
    customVariants: [chosenVariant],
  };
}
