// © Akash Sonawale. All rights reserved.
import React from 'react';
import {Switch,Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart";
import Default from "./components/Default";
import Modal from './components/Modal';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';

function App() {
  return (
    <React.Fragment>
      <div className="app-root">
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/order-confirmation" component={OrderConfirmation} />
          <Route component={Default} />
        </Switch>
        <Modal />
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default App;
