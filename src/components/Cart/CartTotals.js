import React from 'react';
import {Link} from 'react-router-dom';

export default function CartTotals({value}) {
    const {cartSubTotal, cartTax, cartTotal,clearCart, cart} = value;
    return (
       <div className="container">
           <div className="row">
               <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                    <Link to="/">
                        <button
                            className="btn btn-outline-danger text-uppercase mb-3 px-5"
                            type="button"
                            onClick={() => {
                                clearCart();
                            }}>
                            clear cart
                        </button>
                    </Link>
                    <Link to="/checkout">
                        <button className="btn btn-success text-uppercase mb-3 px-4 mr-2">
                            Proceed to Checkout
                        </button>
                    </Link>
                    <h5>
                        <span className="text-title">subtotal :</span>
                        <strong className="text-black">{cartSubTotal}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">tax :</span>
                        <strong className="text-black">{cartTax}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">total :</span>
                        <strong className="text-black">{cartTotal}</strong>
                    </h5>
               </div>
           </div>
       </div>
    )
}
