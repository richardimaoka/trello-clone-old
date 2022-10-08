import { cartItemsVar } from "./cache";
// ... other imports

export function AddToCartButton({ productId }: { productId: number }) {
  return (
    <div>
      <button
        onClick={() => {
          cartItemsVar([...cartItemsVar(), productId]);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
