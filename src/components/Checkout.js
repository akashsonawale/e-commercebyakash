import React, { useContext } from "react";
import { ProductConsumer } from "../context";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function Checkout() {
  const auth = useContext(AuthContext);
  const history = useHistory();

  return (
    <ProductConsumer>
      {(value) => {
        const { cart, cartSubTotal, cartTax, cartTotal, clearCart } = value;

        if (!auth.user) {
          history.push("/login");
          return null;
        }

        const placeOrder = () => {
          const order = {
            id: `order_${Date.now()}`,
            user: auth.user.email,
            items: cart.map((c) => ({ id: c.id, title: c.title, count: c.count, total: c.total })),
            totals: { cartSubTotal, cartTax, cartTotal },
            createdAt: new Date().toISOString(),
          };
          try {
            const raw = localStorage.getItem("akash_orders");
            const arr = raw ? JSON.parse(raw) : [];
            arr.push(order);
            localStorage.setItem("akash_orders", JSON.stringify(arr));
          } catch (e) {}
          clearCart();
          history.push(`/order-confirmation?orderId=${order.id}`);
        };

        return (
          <div className="container mt-4">
            <h3>Checkout</h3>
            <div className="card p-3">
              <h5>Order summary</h5>
              <p>Items: {cart.length}</p>
              <p>Subtotal: {cartSubTotal}</p>
              <p>Tax: {cartTax}</p>
              <p>Total: {cartTotal}</p>
              <button className="btn btn-primary" onClick={placeOrder} disabled={!cart.length}>
                Place order
              </button>
            </div>
          </div>
        );
      }}
    </ProductConsumer>
  );
}
