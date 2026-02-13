import React from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context';

const SidebarWrapper = styled.aside`
  background: #ffffff;
  border-radius: 4px;
  padding: 1rem 0.75rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  font-size: 0.9rem;
  height: 100%;

  h4 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  button {
    border: none;
    background: transparent;
    text-align: left;
    width: 100%;
    padding: 0.25rem 0.1rem;
    cursor: pointer;
    border-radius: 3px;
  }

  button.active {
    background: #febd69;
    color: #111827;
    font-weight: 600;
  }

  button:hover {
    background: rgba(254, 189, 105, 0.5);
  }
`;

const CategorySidebar = () => (
  <ProductConsumer>
    {(value) => {
      const categories = value.categories && value.categories.length ? value.categories : ['all'];
      const selected = value.selectedCategory || 'all';
      const visible = categories.filter((c) => c !== 'other');
      const hasOther = categories.includes('other');
      return (
        <SidebarWrapper>
          <ul>
            {visible.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  className={selected === c ? 'active' : ''}
                  onClick={() => value.setCategory(c)}
                >
                  {c === 'all' ? 'All products' : c}
                </button>
              </li>
            ))}
          </ul>
          {hasOther && (
            <div style={{ marginTop: '0.75rem' }}>
              <button
                type="button"
                className={selected === 'other' ? 'active' : ''}
                onClick={() => value.setCategory('other')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.6rem', borderRadius: 6 }}
              >
                <span style={{ fontSize: '1.1rem' }}>✨</span>
                <span style={{ fontWeight: 600 }}>{selected === 'other' ? 'Other' : 'Other'}</span>
              </button>
            </div>
          )}
        </SidebarWrapper>
      );
    }}
  </ProductConsumer>
);

export default CategorySidebar;


