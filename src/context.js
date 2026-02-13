// © Akash Sonawale. All rights reserved.
import React, { Component } from "react";
import { detailProduct } from "./data";
import {
    fetchCategories,
    fetchProductById,
    fetchProducts,
    fetchProductsByCategory,
    searchProducts
} from "./api/products";
const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        loadingProducts: false,
        productsError: null,
        categories: [],
        selectedCategory: "all",
        searchQuery: ""
    };
    componentDidMount() {
        this.bootstrap();
    }

    bootstrap = async () => {
        this.restoreCartFromStorage();

        await Promise.all([this.loadCategories(), this.loadProducts()]);
    };

    loadCategories = async () => {
        try {
            const categories = await fetchCategories();
            this.setState(() => ({ categories: ["all", ...categories] }));
        } catch (e) {
        }
    };

    loadProducts = async () => {
        this.setState(() => ({ loadingProducts: true, productsError: null, selectedCategory: "all" }));
        try {
            const products = await fetchProducts({ limit: 100 });
            this.setState(
                () => ({ products, loadingProducts: false }),
                () => {
                    this.checkCartItems();
                }
            );
        } catch (e) {
            this.setState(() => ({
                loadingProducts: false,
                productsError: e && e.message ? e.message : "Failed to load products"
            }));
        }
    };

    setCategory = async (category) => {
        const next = category || "all";
        this.setState(() => ({
            selectedCategory: next,
            searchQuery: "",
            loadingProducts: true,
            productsError: null
        }));

        try {
            const products = next === "all" ? await fetchProducts({ limit: 100 }) : await fetchProductsByCategory(next);
            this.setState(() => ({ products, loadingProducts: false }), this.checkCartItems);
        } catch (e) {
            this.setState(() => ({
                loadingProducts: false,
                productsError: e && e.message ? e.message : "Failed to load products"
            }));
        }
    };

    filterProducts = (value) => {
        const q = (value || "").trim();
        this.setState(() => ({ searchQuery: q, loadingProducts: true, productsError: null, selectedCategory: "all" }));

        if (!q) {
            this.loadProducts();
            return;
        }

        searchProducts(q)
            .then((products) => {
                this.setState(() => ({ products, loadingProducts: false }), this.checkCartItems);
            })
            .catch((e) => {
                this.setState(() => ({
                    loadingProducts: false,
                    productsError: e && e.message ? e.message : "Search failed"
                }));
            });
    }

    setProducts = () => {
        this.loadProducts();
    };

    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };
    handleDetail = id => {
        const product = this.getItem(id);
        if (product) {
            this.setState(() => ({ detailProduct: product }));
            return;
        }

        // Fallback: if user deep-links or list isn't loaded yet
        fetchProductById(id)
            .then((p) => this.setState(() => ({ detailProduct: p })))
            .catch(() => {});
    };
    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(() => {
            return {
                products: [...tempProducts],
                cart: [...this.state.cart, product],
                detailProduct: { ...product }
            };
        }, () => {
            this.persistCartToStorage();
            this.addTotals();
        });
    };
    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true };
        });
    };
    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false };
        });
    };
    increment = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;
        this.setState(() => {
            return {
                cart: [...tempCart]
            };
        }, () => {
            this.persistCartToStorage();
            this.addTotals();
        });
    };
    decrement = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;
            this.setState(() => {
                return { cart: [...tempCart] };
            }, () => {
                this.persistCartToStorage();
                this.addTotals();
            });
        }
    };
    getTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        return {
            subTotal,
            tax,
            total
        };
    };
    addTotals = () => {
        const totals = this.getTotals();
        this.setState(
            () => {
                return {
                    cartSubTotal: totals.subTotal,
                    cartTax: totals.tax,
                    cartTotal: totals.total
                };
            },
            () => {
            }
        );
    };
    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        tempCart = tempCart.filter(item => {
            return item.id !== id;
        });

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            };
        }, () => {
            this.persistCartToStorage();
            this.addTotals();
        });
    };
    clearCart = () => {
        this.setState(
            () => {
                return { cart: [] };
            },
            () => {
                this.setProducts();
                this.addTotals();
                this.persistCartToStorage();
            }
        );
    };

    persistCartToStorage = () => {
        try {
            const minimal = this.state.cart.map((item) => ({ id: item.id, count: item.count }));
            localStorage.setItem("cart", JSON.stringify(minimal));
        } catch (e) {
            // ignore
        }
    };

    restoreCartFromStorage = () => {
        try {
            const raw = localStorage.getItem("cart");
            const parsed = raw ? JSON.parse(raw) : [];
            const minimal = Array.isArray(parsed) ? parsed : [];
            // We'll hydrate against products once they're loaded
            this.setState(() => ({ cart: [], _savedCart: minimal }));
        } catch (e) {
            this.setState(() => ({ cart: [], _savedCart: [] }));
        }
    };

    checkCartItems = () => {
        const saved = Array.isArray(this.state._savedCart) ? this.state._savedCart : [];
        if (!saved.length) {
            this.addTotals();
            return;
        }

        const tempProducts = [...this.state.products];
        const nextCart = [];

        saved.forEach(({ id, count }) => {
            const idx = tempProducts.findIndex((p) => p.id === id);
            if (idx === -1) return;
            const product = tempProducts[idx];
            const safeCount = Math.max(1, Number(count) || 1);
            product.inCart = true;
            product.count = safeCount;
            product.total = safeCount * product.price;
            nextCart.push(product);
        });

        this.setState(() => ({ products: tempProducts, cart: nextCart }), () => {
            this.persistCartToStorage();
            this.addTotals();
        });
    };
    
    addExternalProduct = (p) => {
        try {
            const temp = [...this.state.products];
            const exists = temp.find((x) => x.id === p.id);
            if (!exists) {
                // normalize minimal fields expected by app
                const product = {
                    id: p.id,
                    title: p.title || p.name || "",
                    img: p.img || p.image || "",
                    price: p.price || 0,
                    company: p.company || p.brand || "",
                    info: p.info || p.description || "",
                    category: p.category || "",
                    inCart: false,
                    count: 0,
                    total: 0
                };
                temp.unshift(product);
                this.setState(() => ({ products: temp }));
            }
        } catch (e) {
            // ignore
        }
    };
    showProducts = (products) => {
        // Replace current products shown with a provided list
        try {
            this.setState(() => ({ products: Array.isArray(products) ? products : [] }));
        } catch (e) {}
    };
    render() {
        return (
            <ProductContext.Provider
                value={{
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart,
                    filterProducts: this.filterProducts,
                    setCategory: this.setCategory,
                    getItem: this.getItem,
                    showProducts: this.showProducts,
                    reloadProducts: this.loadProducts,
                    addExternalProduct: this.addExternalProduct
                }}
            >
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
