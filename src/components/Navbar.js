// © Akash Sonawale. All rights reserved.
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import { AiOutlineMenu } from 'react-icons/ai'
import { ProductConsumer } from '../context';
import { AuthConsumer } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 768,
      menuOpen: false,
    };

    this.handleResize = this.handleResize.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({
      isMobile: window.innerWidth <= 768,
    });
  }

  handleMenu() {
    this.setState((prevState) => ({ menuOpen: !prevState.menuOpen }));
  }

  render() {
    const { isMobile, menuOpen } = this.state;

    return (
      <div className="amazon-header">
        {isMobile ? (
          <MobileNavWrapper className="navbar nav-bar-expand-sm bg-slate-800 px-sm-5 w-100">
            <div className="d-flex justify-content-between align-items-center w-100">
              <Link to="/" className="d-flex align-items-center">
                <img src={logo} alt="Akash" className="navbar-brand" />
              </Link>
              <div className="text-white menu" onClick={this.handleMenu}>
                <AiOutlineMenu className="menubar" />
              </div>
            </div>
            {menuOpen && (
              <div className=" resmenu w-100 ">
                <NavLink to="/" className={({ isActive }) => isActive ? "text-primary" : "text-white hover"}>
                  Products
                </NavLink>
                <ProductConsumer>
                  {value => (
                    <li style={{ listStyleType: 'none' }}>
                      <input
                        placeholder='Search for products'
                        style={{ width: '100%', padding: '0.4rem' }}
                        onChange={(e) => {
                          value.filterProducts(e.target.value);
                        }}
                      />
                    </li>
                  )}
                </ProductConsumer>
                <Link to="/cart" className="ml-auto">
                  <ButtonContainer>
                    <i className="fas fa-cart-plus">my cart</i>
                  </ButtonContainer>
                </Link>
              </div>
            )}
          </MobileNavWrapper>
        ) : (
          <DesktopNavWrapper className="navbar nav-bar-expand-sm bg-slate-800 px-sm-5 amazon-desktop-nav">
            <div className="amazon-left d-flex align-items-center">
              <Link to="/" className="d-flex align-items-center">
                <img src={logo} alt="Akash" className="navbar-brand" />
              </Link>
              <div className="amazon-location d-none d-md-block">
                <small>Hello</small>
                <div><strong>Select your address</strong></div>
              </div>
            </div>
            <ProductConsumer>
              {value => (
                <div className="amazon-search flex-grow-1">
                  <input
                    className="amazon-search-input"
                    placeholder="Search products"
                    onChange={(e) => value.filterProducts(e.target.value)}
                  />
                  <button className="amazon-search-button" type="button">
                    🔍
                  </button>
                </div>
              )}
            </ProductConsumer>
            <div className="amazon-right d-flex align-items-center">
              <AuthConsumer>
                {(auth) => (
                  <>
                    <div className="amazon-account d-none d-md-block">
                      <small>{auth.user ? `Hello, ${auth.user.name}` : 'Hello, sign in'}</small>
                      <div>
                        {auth.user ? (
                          <button className="btn btn-link p-0" onClick={() => { auth.logout(); window.location.href = '/'; }}>Logout</button>
                        ) : (
                          <>
                            <Link to="/login">Login</Link> / <Link to="/signup">Sign up</Link>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </AuthConsumer>
              <div className="amazon-orders d-none d-md-block">
                <small>Returns</small>
                <div><strong>&amp; Orders</strong></div>
              </div>
              <Link to="/cart" className="amazon-cart-link">
                <ButtonContainer cart>
                  <i className="fas fa-cart-plus" />&nbsp;Cart
                </ButtonContainer>
              </Link>
            </div>
          </DesktopNavWrapper>
        )}
      </div>
    );
  }
}

const NavWrapper = styled.nav`
  background: linear-gradient(90deg,#0f172a,#1f2937);
  padding: 0.5rem 1rem;
  box-shadow: 0 6px 18px rgba(2,6,23,0.4);
  .nav-link {
    color: #fff !important;
    font-size: 1rem;
    text-transform: capitalize;
  }
  .navbar-brand{ height:40px; }
  .amazon-left{ gap:0.75rem }
  .amazon-search{ display:flex; align-items:center; gap:0.5rem; }
  .amazon-search-input{ flex:1; padding:0.5rem 0.75rem; border-radius:4px 0 0 4px; border:none }
  .amazon-search-button{ padding:0.5rem 0.8rem; border-radius:0 4px 4px 0; border:none; background:#ff8a00; color:#fff }
  .amazon-cart-link .btn{ background: linear-gradient(90deg,#06b6d4,#7c3aed); color:white }
  .amazon-account small{ color:#d1d5db }
`;

const MobileNavWrapper = styled(NavWrapper)`
`;

const DesktopNavWrapper = styled(NavWrapper)`
`;

export default Navbar;
