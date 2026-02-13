import React from "react";
import { useLocation, Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function OrderConfirmation() {
  const q = useQuery();
  const id = q.get("orderId");

  return (
    <div className="container mt-4">
      <h3>Thank you for your order</h3>
      <p>Your order <strong>{id}</strong> has been placed.</p>
      <Link to="/">Continue shopping</Link>
    </div>
  );
}
