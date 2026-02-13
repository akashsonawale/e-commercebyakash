// © Akash Sonawale. All rights reserved.
import React from 'react';
import styled from 'styled-components';
import SwiperFeatured from './SwiperFeatured';

const BannerWrapper = styled.section`
  width: 100%;
  background: linear-gradient(135deg, #232f3e 0%, #131921 40%, #0f172a 100%);
  color: #fff;
  padding: 3.5rem 1rem 3.5rem;
  position: relative;
  overflow: hidden;

  .banner-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .headline {
    font-size: 3rem;
    line-height:1.02;
    font-weight: 900;
    color: var(--mainBlue);
    margin-bottom: 0.25rem;
  }

  .sub {
    font-size: 1rem;
    max-width: 420px;
    opacity: 0.9;
  }

  .card-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }

  .promo-card {
    background: #fff;
    color: #111827;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
    font-size: 0.9rem;
  }

  .promo-card h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  .hero-outer{ display:flex; gap:1.5rem; align-items:center; }
  .hero-media{ flex:1; height:380px; border-radius:10px; background-size:cover; background-position:center; box-shadow:0 12px 40px rgba(2,6,23,0.6); }
  .hero-text{ flex:1; }
  .cta{ margin-top:1rem; padding:0.6rem 1rem; background:linear-gradient(90deg,#ff8a00,#f83600); border-radius:6px; color:white; font-weight:700; border:none }
`;

const Banner = () => {
  const banners = [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=5a7d3e4d9d6b5b2d',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=3a2f1a7b2a9cf0c6',
    'https://images.unsplash.com/photo-1512446818091-5f7d2fbe7f2e?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=6f8f5c9e1f3e8a2b'
  ];

  return (
    <BannerWrapper role="banner" aria-label="Site hero">
      <div className="banner-inner">
        <div className="banner-hero">
          <div className="hero-outer">
            <div className="hero-text">
              <h1 className="headline">Akash — Shop everything online</h1>
              <p className="sub">Discover products across categories. Fast delivery, great prices.</p>
              <button className="cta">Shop deals</button>
            </div>
            <div className="hero-media" aria-hidden="false">
              <img src={banners[1]} alt="Featured products hero" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:10}} />
            </div>
          </div>
        </div>
        <SwiperFeatured />
      </div>
    </BannerWrapper>
  );
};

export default Banner;


