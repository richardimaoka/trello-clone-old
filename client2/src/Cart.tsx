import { gql, useQuery } from "@apollo/client";

function CartItem() {
  return <div>CartItem</div>;
}

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export function Cart() {
  const { data, loading, error } = useQuery(GET_CART_ITEMS);

  if (loading) return <div>loading...</div>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <div>empty data</div>;

  console.log("----------------------------");
  console.log(data);
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