import { gql, useQuery } from "@apollo/client";
import { GetCartItemsQuery, useGetCartItemsQuery } from "./generated/graphql";

function CartItem() {
  return <div>CartItem</div>;
}

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export function Cart() {
  const { data, loading, error } = useGetCartItemsQuery();

  if (loading) return <div>loading...</div>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <div>empty data</div>;
  if (!data.cartItems) return <div>empty data</div>;

  return (
    <div>
      <div>My Cart</div>
      {data.cartItems.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        <div>
          {data.cartItems.map((productId: any, index: number) => (
            <CartItem key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
