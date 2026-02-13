// © Akash Sonawale. All rights reserved.
import React from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const data = [
  { id: 20001, title: 'Apple iPhone 15 Pro', price: 119999, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop' },
  { id: 20002, title: 'PlayStation 5 Console', price: 39999, img: 'https://images.unsplash.com/photo-1606813902852-6d8f0d2f6f59?q=80&w=1200&auto=format&fit=crop' },
  { id: 20003, title: 'OnePlus 11', price: 69999, img: 'https://images.unsplash.com/photo-1512446818091-5f7d2fbe7f2e?q=80&w=1200&auto=format&fit=crop' },
  { id: 20004, title: 'Sony WH-1000XM5 Headphones', price: 34999, img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop' },
  { id: 20005, title: 'Nintendo Switch OLED', price: 34999, img: 'https://images.unsplash.com/photo-1606813902852-6d8f0d2f6f59?q=80&w=1200&auto=format&fit=crop' }
];

const Wrapper = styled.section`
  margin-top: 1.25rem;
  .slide-card{ background: #fff; padding: 1rem; border-radius: 10px; box-shadow: 0 8px 30px rgba(2,6,23,0.06); display:flex; gap:1rem; align-items:center }
  .slide-img{ width:120px; height:80px; object-fit:cover; border-radius:8px }
  .slide-title{ font-weight:700; color:var(--mainText) }
  .slide-price{ color:#0b7285; font-weight:800 }
  .slide-actions{ margin-left:auto }
`;

export default function SwiperFeatured(){
  return (
    <ProductConsumer>
      {(value)=> (
        <Wrapper>
          <Swiper spaceBetween={12} slidesPerView={1.5} breakpoints={{640:{slidesPerView:2.2}, 900:{slidesPerView:3.2}}}>
            {data.map((p)=> (
              <SwiperSlide key={p.id}>
                <div className="slide-card">
                  <img className="slide-img" src={p.img} alt={p.title} />
                  <div>
                    <div className="slide-title">{p.title}</div>
                    <div className="small text-muted">{p.title}</div>
                    <div className="slide-price">{formatPrice(p.price)}</div>
                  </div>
                  <div className="slide-actions">
                    <button className="btn btn-sm btn-primary" onClick={() => {
                      if (typeof value.addExternalProduct === 'function') value.addExternalProduct({ id: p.id, title: p.title, img: p.img, price: p.price, company: 'Brand' });
                      setTimeout(()=>{ if (typeof value.addToCart === 'function') value.addToCart(p.id); }, 80);
                    }}>Add</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Wrapper>
      )}
    </ProductConsumer>
  );
}

function formatPrice(v){ try{ const n = Number(v) || 0; return `₹${n.toFixed(2)}` }catch(e){ return `₹${v}` } }
