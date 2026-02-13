import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: #131921;
  color: #ddd;
  padding-top: 2rem;
  margin-top: 3rem;
  font-size: 0.85rem;

  .back-to-top {
    background: #232f3e;
    color: #fff;
    text-align: center;
    padding: 0.75rem 0;
    cursor: pointer;
  }

  .columns {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1.5rem;
    padding: 2rem 1rem;
  }

  h4 {
    color: #fff;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  a {
    color: #ddd;
    text-decoration: none;
    font-size: 0.8rem;
  }

  a:hover {
    text-decoration: underline;
  }

  .bottom {
    border-top: 1px solid #232f3e;
    text-align: center;
    padding: 1rem 0;
    font-size: 0.75rem;
    color: #999;
  }
`;

const Footer = () => (
  <FooterWrapper>
    <div
      className="back-to-top"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      Back to top
    </div>
    <div className="columns">
      <div>
        <h4>Get to Know Us</h4>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#careers">Careers</a></li>
          <li><a href="#press">Press</a></li>
        </ul>
      </div>
      <div>
        <h4>Make Money</h4>
        <ul>
          <li><a href="#sell">Sell products</a></li>
          <li><a href="#affiliate">Affiliate program</a></li>
        </ul>
      </div>
      <div>
        <h4>Help</h4>
        <ul>
          <li><a href="#account">Your account</a></li>
          <li><a href="#orders">Your orders</a></li>
          <li><a href="#help">Help center</a></li>
        </ul>
      </div>
    </div>
    <div className="bottom">
      &copy; {new Date().getFullYear()} Akash. Built with React.
    </div>
  </FooterWrapper>
);

export default Footer;


