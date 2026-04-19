import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wishlist') || '[]');
    } catch {
      return [];
    }
  });

  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getUserCart = async (userToken) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token: userToken } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Please select a size');
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
        toast.success('Added to cart');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) total += cartItems[itemId][size];
      }
    }
    return total;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getCartAmount = () => {
    if (!products.length) return 0;
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          total += product.price * cartItems[itemId][size];
        }
      }
    }
    return total;
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem('wishlist', JSON.stringify(next));
      return next;
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  const getProductData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!token && savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);
    }
  }, []);

  const values = {
    products,
    loading,
    token,
    setToken,
    cartItems,
    setCartItems,
    currency,
    backendUrl,
    delivery_fee,
    search,
    showSearch,
    setSearch,
    setShowSearch,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    wishlist,
    toggleWishlist,
    isWishlisted,
    logout,
    navigate,
    Navigate: navigate,
  };

  return (
    <ShopContext.Provider value={values}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;