import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const ShopContext = createContext();

const ShopProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL || 'https://e-commerce-backend-bo7f.onrender.com';
  const currency = 'ETB ';
  const delivery_fee = 50;

  const [search, setSearch] = useState('');
  const [searchBarStatus, setSearchBarStatus] = useState(true);
  const [products, setProducts] = useState([]);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);

  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('yegna_cart');
    return stored ? JSON.parse(stored) : [];
  });

  // 🔄 Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('yegna_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/product/list`);
      if (res.status === 200) {
        setProducts(res.data.products);
      } else {
        toast.error('Error fetching products');
      }
    } catch (err) {
      toast.error('Error fetching products');
      console.log(err);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🛒 Add to Cart
  const addToCart = (product, selectedVariant = {}) => {
    const id = `${product._id}-${Object.values(selectedVariant).map(v => v.value).join('-') || 'default'}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { id, product, variant: selectedVariant, quantity: 1 }];
      }
    });

    toast.success('Added to cart');
  };

  // ✏️ Update Quantity
  const updateCartItemCount = (id, newQuantity) => {
    if (newQuantity < 1) return removeFromCart(id);
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // ❌ Remove Item
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // 💰 Calculate Total
  const getCartTotal = () => {
    return cartItems.reduce((acc, item) => {
      const base = item.product.price;
      const variantAdd = Object.values(item.variant || {}).reduce((a, v) => a + (v.price || 0), 0);
      return acc + (base + variantAdd) * item.quantity;
    }, 0);
  };

  // 🔢 Get Item Count
  const getCartCount = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const value = {
    products,
    productsLoading,
    currency,
    delivery_fee,
    search,
    setSearch,
    searchBarStatus,
    setSearchBarStatus,
    backendurl,
    toggleStatus,
    setToggleStatus,
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getCartTotal,
    getCartCount,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
