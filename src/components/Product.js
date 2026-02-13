// © Akash Sonawale. All rights reserved.
import React, { Component } from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';
import PropTypes from 'prop-types';

export default class Product extends Component {
    render() {
        const {id, title, img, price, inCart} = this.props.product;
        return (
                        <ProducrWrapper className="col-6 col-sm-6 col-md-4 col-lg-3 my-3">
                             <div className="card product-card akash-card">
                                <ProductConsumer>
                                                {value => (
                                                    <div className="img-container" onClick={() => value.handleDetail(id)}>
                                                        <Link to="/details" className="d-flex align-items-center justify-content-center">
                                                                <img src={img} alt={title} className="card-img-top" />
                                                        </Link>
                                                        <div className="discount-badge">{discountFor(price)}</div>
                                                        <button className="cart-btn" disabled={inCart ? true : false}
                                                                onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        value.addToCart(id);
                                                                        value.openModal(id);
                                                                }}>
                                                                {inCart ? (<p className="text-capitalize mb-0" disabled>{""}In cart</p>)
                                                                        : (<span className="add-txt">Add to cart</span>)}
                                                        </button>
                                                    </div>
                                                )}
                                </ProductConsumer>
                                 <div className="card-body p-3">
                                         <p className="product-title mb-1">{title}</p>
                                         <div className="small text-muted">{this.props.product.company || 'Seller'}</div>
                                         <div className="d-flex justify-content-between align-items-center mt-2">
                                             <div style={{textAlign:'left'}}>
                                                 <div className="price">{formatPrice(price)}</div>
                                                 <div className="price-original">{formatPrice(originalPrice(price))}</div>
                                             </div>
                                             <div className="rating">4.2★</div>
                                         </div>
                                 </div>
                             </div>
                        </ProducrWrapper>
        );
    }
}
Product.propTypes = {
    product:PropTypes.shape({
        id:PropTypes.number,
        img:PropTypes.string,
        title:PropTypes.string,
        price:PropTypes.number,
        inCart:PropTypes.bool
    }).isRequired
}
const ProducrWrapper =styled.div`
 .card{ border-color:transparent; transition: box-shadow 220ms ease, transform 180ms ease; }
 .product-card{ border-radius:12px; overflow:hidden }
 .card-body{ background:#fff }
 &:hover{ .card{ transform: translateY(-4px); box-shadow: 0 14px 30px rgba(2,6,23,0.08); } }
 .img-container{ position:relative; background:#fff; display:flex; align-items:center; justify-content:center; padding:1rem; height:160px }
 .card-img-top{ max-width:120px; max-height:140px; object-fit:contain }
 .discount-badge{ position:absolute; top:10px; left:10px; background:#fffaef; color:#c2410c; padding:0.25rem 0.45rem; border-radius:6px; font-weight:700; font-size:0.8rem }
 .cart-btn{ position:absolute; bottom:10px; right:10px; padding:0.35rem 0.6rem; background:linear-gradient(90deg,#7c3aed,#06b6d4); color:#fff; border-radius:6px; border:none; font-size:0.85rem }
 .cart-btn[disabled]{ opacity:0.7 }
 .product-title{ font-size:0.95rem; font-weight:600; color:var(--mainText); margin-bottom:0.2rem }
 .price{ color:#0b7285; font-weight:800; font-size:1.05rem }
 .price-original{ font-size:0.85rem; color:var(--muted); text-decoration:line-through }
 .rating{ color:#f59e0b; font-weight:700 }
`;

function originalPrice(price){ try{ const p = Number(price) || 0; return Math.round(p * 1.12); }catch(e){ return '' } }

function discountFor(price){
    try{
        const p = Number(price) || 0;
        const orig = Math.round(p * 1.12);
        const d = Math.round(100 - (p / orig) * 100);
        return d > 0 ? `${d}% OFF` : '20% OFF';
    }catch(e){
        return '20% OFF';
    }
}

function formatPrice(v){ try{ const n = Number(v) || 0; return `₹${n.toFixed(2)}` }catch(e){ return `₹${v}` } }
