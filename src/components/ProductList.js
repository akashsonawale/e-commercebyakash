// © Akash Sonawale. All rights reserved.
import React from 'react';
import Product from './Product';
import Title from './Title';
import { ProductConsumer } from '../context';
import Banner from './Banner';
import CategoryGrid from './CategoryGrid';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 12,
      sort: 'relevance', // relevance | price-asc | price-desc | title-asc
      priceMin: '',
      priceMax: ''
    };
  }

  setPage = (p) => this.setState({ page: p });
  setPageSize = (s) => this.setState({ pageSize: Number(s), page: 1 });
  setSort = (sort) => this.setState({ sort, page: 1 });

  sortedProducts(products) {
    const { sort } = this.state;
    const arr = [...products];
    if (sort === 'price-asc') return arr.sort((a,b)=>a.price - b.price);
    if (sort === 'price-desc') return arr.sort((a,b)=>b.price - a.price);
    if (sort === 'title-asc') return arr.sort((a,b)=> a.title.localeCompare(b.title));
    return arr.sort(() => Math.random() - 0.5);
  }

  pagedProducts(products) {
    const { page, pageSize } = this.state;
    const start = (page - 1) * pageSize;
    return products.slice(start, start + pageSize);
  }

  render() {
    const { page, pageSize, sort } = this.state;
    return (
      <React.Fragment>
        <Banner />
        <div className="py-5 bg-slate-200">
          <div className="container">
            <ProductConsumer>
              {(value) => (
                value.loadingProducts ? (
                  <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-primary">
                      <h4>Loading products…</h4>
                    </div>
                  </div>
                ) : value.productsError ? (
                  <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-primary">
                      <h4 className="text-danger">Couldn’t load products</h4>
                      <p>{value.productsError}</p>
                    </div>
                  </div>
                ) : value.products.length > 0 ? (
                  <div className="row">
                    <div className="col-12 mb-3">
                      <CategoryGrid />
                    </div>
                    <div className="col-12 col-lg-9">
                      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                        <Title name="shop" title="results" />
                        <div className="d-flex gap-2 align-items-center">
                          <label className="mr-2">Sort</label>
                          <select className="form-control" value={sort} onChange={(e)=>this.setSort(e.target.value)}>
                            <option value="relevance">Relevance</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="title-asc">Title A–Z</option>
                          </select>
                          <label className="ml-3 mr-2">Per page</label>
                          <select className="form-control" value={pageSize} onChange={(e)=>this.setPageSize(e.target.value)}>
                            <option value={8}>8</option>
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 d-flex gap-2 align-items-center flex-wrap">
                        <div className="d-flex align-items-center gap-2">
                          <label className="mb-0">Price</label>
                          <input type="number" className="form-control" placeholder="Min" style={{width:100}} value={this.state.priceMin} onChange={(e)=>this.setState({priceMin: e.target.value})} />
                          <span>—</span>
                          <input type="number" className="form-control" placeholder="Max" style={{width:100}} value={this.state.priceMax} onChange={(e)=>this.setState({priceMax: e.target.value})} />
                          <button className="btn btn-outline-primary btn-sm" onClick={()=>this.setState({page:1})}>Apply</button>
                          <button className="btn btn-link btn-sm text-muted" onClick={()=>this.setState({priceMin:'', priceMax:'', page:1})}>Reset</button>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        {(() => {
                          // Apply client-side price filtering on top of the current product list (category/search already applied)
                          const raw = value.products || [];
                          const min = parseFloat(this.state.priceMin) || null;
                          const max = parseFloat(this.state.priceMax) || null;
                          let filtered = this.sortedProducts(raw);
                          if (min !== null) filtered = filtered.filter(p => p.price >= min);
                          if (max !== null) filtered = filtered.filter(p => p.price <= max);
                          const paged = this.pagedProducts(filtered);
                          return paged.map((product) => <Product key={product.id} product={product} />);
                        })()}
                      </div>

                      <div className="d-flex justify-content-center mt-4">
                        {(() => {
                          const total = (() => {
                            const raw = value.products || [];
                            const min = parseFloat(this.state.priceMin) || null;
                            const max = parseFloat(this.state.priceMax) || null;
                            let filtered = this.sortedProducts(raw);
                            if (min !== null) filtered = filtered.filter(p => p.price >= min);
                            if (max !== null) filtered = filtered.filter(p => p.price <= max);
                            return filtered.length;
                          })();
                          const pages = Math.max(1, Math.ceil(total / pageSize));
                          const items = [];
                          for (let i=1;i<=pages;i++) {
                            items.push(
                              <button key={i} className={`btn btn-sm ${i===page? 'btn-primary':'btn-outline-primary'} mx-1`} onClick={()=>this.setPage(i)}>{i}</button>
                            );
                          }
                          return items;
                        })()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-primary">
                      <span style={{ color: 'red' }}>Sorry, no results found!</span>
                    </div>
                    <div className="col-10 mx-auto text-center text-title text-primary">
                      <span>Please check the spelling or try searching for something else</span>
                    </div>
                  </div>
                )
              )}
            </ProductConsumer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductList;
