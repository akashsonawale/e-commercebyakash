// © Akash Sonawale. All rights reserved.
import React from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context';

const GridWrapper = styled.section`
  margin: 1rem 0 2rem;
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.75rem;
  }
  .card {
    background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(250,250,250,0.9));
    border-radius: 8px;
    padding: 0.9rem;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(16,24,40,0.06);
    transition: transform 220ms ease, box-shadow 220ms ease;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:0.5rem;
  }
  .card:hover{ transform: translateY(-6px); box-shadow: 0 10px 24px rgba(16,24,40,0.12); }
  .emoji { font-size: 1.6rem; }
  .label { font-weight:600; font-size:0.92rem; color:var(--mainText); }
  .sub { font-size:0.78rem; color:var(--muted); }
  .other-card { display:flex; align-items:center; justify-content:center; border:1px dashed rgba(16,24,40,0.06); background:transparent }
`;

const CategoryGrid = () => (
  <ProductConsumer>
    {(value) => {
      const categories = value.categories && value.categories.length ? value.categories : ['all'];
      const visible = categories.filter((c) => c !== 'other');
      const hasOther = categories.includes('other');
      const extra = [ { key: 'games', label: 'Games' }, { key: 'ps5', label: 'PS5' } ];
      return (
        <GridWrapper>
          <div className="grid">
            {visible.map((c) => (
              <div key={c} className="card" onClick={() => value.setCategory(c)} role="button">
                <div className="emoji">{emojiFor(c)}</div>
                <div className="label">{c === 'all' ? 'All products' : capitalize(c)}</div>
                <div className="sub">{c === 'all' ? 'Browse everything' : `Shop ${c}`}</div>
                {c === 'electronics' && (
                  <div style={{ marginTop: 8, display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="btn btn-sm btn-outline-secondary" onClick={(e)=>{ e.stopPropagation(); const samples = sampleProductsForMore('mobiles'); if(typeof value.showProducts==='function') value.showProducts(samples); }}>Mobiles</button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={(e)=>{ e.stopPropagation(); const samples = sampleProductsForMore('headphones'); if(typeof value.showProducts==='function') value.showProducts(samples); }}>Headphones</button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={(e)=>{ e.stopPropagation(); const samples = sampleProductsForMore('accessories'); if(typeof value.showProducts==='function') value.showProducts(samples); }}>Accessories</button>
                  </div>
                )}
              </div>
            ))}
            {extra.map((e) => (
              <div key={e.key} className="card" onClick={() => {
                  const samples = sampleProductsFor(e.key);
                  if (typeof value.showProducts === 'function') {
                    value.showProducts(samples);
                  } else if (typeof value.addExternalProduct === 'function') {
                    samples.forEach((s) => value.addExternalProduct(s));
                  }
                }} role="button">
                <div className="emoji">{emojiFor(e.key)}</div>
                <div className="label">{e.label}</div>
                <div className="sub">Shop {e.label}</div>
              </div>
            ))}
            {hasOther && (
              <div className="card other-card" onClick={() => value.setCategory('other')} role="button">
                <div className="emoji">✨</div>
                <div className="label">Other</div>
              </div>
            )}
          </div>
        </GridWrapper>
      );
    }}
  </ProductConsumer>
);

function capitalize(s){ return (s || '').replace(/^./, (m)=>m.toUpperCase()); }

function emojiFor(c){
  if(!c || c==='all') return '🛍️';
  const mapping = {
    electronics: '💻',
    fashion: '👗',
    home: '🏠',
    health: '💊',
    books: '📚',
    beauty: '💅',
    sports: '🏃',
    toys: '🧸',
    games: '🎮',
    ps5: '🕹️'
  };
  return mapping[c.toLowerCase()] || '📦';
}

function sampleProductsFor(key){
  if(key === 'games'){
    return [
      { id: 9001, title: 'Marvel Avengers PS5', img: 'https://images.unsplash.com/photo-1606813902852-6d8f0d2f6f59?q=80&w=800&auto=format&fit=crop', price: 3999, company: 'PS Studios' },
      { id: 9002, title: 'FIFA 24 PS5', img: 'https://images.unsplash.com/photo-1585079542048-1f9d1f2b9b8b?q=80&w=800&auto=format&fit=crop', price: 2999, company: 'EA' },
      { id: 9003, title: 'Elden Ring PS5', img: 'https://images.unsplash.com/photo-1605902711622-cfb43c44367f?q=80&w=800&auto=format&fit=crop', price: 4999, company: 'FromSoftware' }
    ];
  }
  if(key === 'ps5'){
    return [
      { id: 9101, title: 'PlayStation 5 Console', img: 'https://images.unsplash.com/photo-1606813902852-6d8f0d2f6f59?q=80&w=800&auto=format&fit=crop', price: 39999, company: 'Sony' },
      { id: 9102, title: 'PS5 DualSense Controller', img: 'https://images.unsplash.com/photo-1616628185243-3c0d3b4b1b37?q=80&w=800&auto=format&fit=crop', price: 4999, company: 'Sony' }
    ];
  }
  return [];
}

// add mobile / headphones / accessories samples
function sampleProductsForMore(key){
  if(key === 'mobiles'){
    return [
      { id: 9201, title: 'iPhone 15 Pro', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop', price: 119999, company: 'Apple' },
      { id: 9202, title: 'Samsung Galaxy S23', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop', price: 89999, company: 'Samsung' },
      { id: 9203, title: 'OnePlus 11', img: 'https://images.unsplash.com/photo-1512446818091-5f7d2fbe7f2e?q=80&w=800&auto=format&fit=crop', price: 69999, company: 'OnePlus' }
    ];
  }
  if(key === 'headphones'){
    return [
      { id: 9301, title: 'Sony WH-1000XM5', img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop', price: 34999, company: 'Sony' },
      { id: 9302, title: 'Bose 700', img: 'https://images.unsplash.com/photo-1585386959984-a41552236f6b?q=80&w=800&auto=format&fit=crop', price: 37999, company: 'Bose' }
    ];
  }
  if(key === 'accessories'){
    return [
      { id: 9401, title: 'USB-C Charger 65W', img: 'https://images.unsplash.com/photo-1580894908361-ade0cdec3a63?q=80&w=800&auto=format&fit=crop', price: 2999, company: 'Anker' },
      { id: 9402, title: 'MagSafe Case', img: 'https://images.unsplash.com/photo-1585386959984-a41552236f6b?q=80&w=800&auto=format&fit=crop', price: 1999, company: 'Spigen' }
    ];
  }
  return [];
}


export default CategoryGrid;
