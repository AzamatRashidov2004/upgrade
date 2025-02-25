import { CheapestCombination, Product } from "@/types/product";

export function parseProductDetails(
  product: string
): { model: string; storage: string; color: string } | null {
  // This regex breaks the string into:
  // - model: any text ending with "(YYYY)" where YYYY is 4 digits
  // - storage: a number followed by "GB"
  // - color: text before the next dash (assumed not to contain a dash)
  const regex = /^(.*\(\d{4}\))\s+(\d+GB)\s*-\s*([^-]+)\s*-/;
  const match = product.match(regex);

  if (!match) {
    return null;
  }

  const model = match[1].trim(); // e.g., "iPhone SE (2016)"
  const storage = match[2].trim(); // e.g., "16GB"
  const color = match[3].trim(); // e.g., "Rose Gold"

  return { model, storage, color };
}

export function findCheapestCombination(
  product: Product
): CheapestCombination | null {
  const { conditions, storage_options, color_options } = product.specifications;

  // Filter available conditions with valid price info
  const availableConditions = conditions.filter(
    (c) => c.is_available && c.detail && typeof c.detail.price === "number"
  );

  // If no conditions are available, we cannot compute a price combination
  if (availableConditions.length === 0) {
    return null;
  }

  // Choose the condition with the lowest price
  const cheapestCondition = availableConditions.reduce((prev, curr) =>
    prev.detail.price <= curr.detail.price ? prev : curr
  );

  // For storage and color options (without price info), simply choose the first available option (if any)
  const selectedStorage =
    storage_options.length > 0 ? storage_options[0] : undefined;
  const selectedColor = color_options.length > 0 ? color_options[0] : undefined;

  // Total price is just the condition price, as storage and color are assumed free in this example
  const totalPrice = cheapestCondition.detail.price;

  return {
    condition: cheapestCondition,
    storage_option: selectedStorage,
    color_option: selectedColor,
    totalPrice,
  };
}
