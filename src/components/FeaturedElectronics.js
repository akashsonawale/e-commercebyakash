import React, { useEffect, useState } from 'react';
import { fetchElectronics } from '../api/products';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';

export default function FeaturedElectronics() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchElectronics({ limit: 12 })
      .then((p) => {
        if (!mounted) return;
        setItems(p);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) return null;
  if (!items.length) return null;

  return (
    <div className="featured-section container mt-4">
      <h5>Featured Electronics</h5>
      <div className="featured-scroller d-flex gap-3 mt-2">
        {items.map((p) => (
          <div key={p.id} className="featured-card card p-2">
            <Link to="/details">
              <img src={p.img} alt={p.title} className="featured-img" />
            </Link>
            <div className="mt-2">
              <div className="small text-muted" style={{height: '30px', overflow:'hidden'}}>{p.title}</div>
              <div className="font-weight-bold">₹{p.price}</div>
            </div>
            <ProductConsumer>
              {(value) => (
                <button
                  className="btn btn-sm btn-warning mt-2"
                  onClick={() => {
                    // ensure product is available in state then add to cart
                    if (value.getItem(p.id)) {
                      value.addToCart(p.id);
                    } else {
                      // add external product then add to cart
                      if (typeof value.addExternalProduct === 'function') {
                        value.addExternalProduct(p);
                        setTimeout(() => value.addToCart(p.id), 100);
                      }
                    }
                  }}
                >Add</button>
              )}
            </ProductConsumer>
          </div>
        ))}
      </div>
    </div>
  );
}
