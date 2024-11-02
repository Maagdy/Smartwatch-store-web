import { createSlice } from "@reduxjs/toolkit";
import { initialProducts } from "../../data/products";
import {
  getFromLocalStorage,
  getTotalQuantityFromLocalStorage,
  saveToLocalStorage,
} from "../utiltiesFunctions/Get&Save";

const generateOrderId = () => {
  return "ORD-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
};

const validCoupons = [
  { code: "SAVE10", discount: 10 },
  { code: "SAVE20", discount: 20 },
  { code: "SAVE30", discount: 30 },
];

const loadProductsWithFavorites = () => {
  const storedFavorites = getFromLocalStorage("favorites");
  const storedCompare = getFromLocalStorage("compare");
  const storedPurchased = getFromLocalStorage("purchasedOrders");

  return initialProducts.map((product) => ({
    ...product,
    isFavorite: storedFavorites.includes(product.id),
    isCompared: storedCompare.includes(product.id),
    isPurchased: storedPurchased.includes(product.id),
  }));
};

const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const initialState = {
  products: loadProductsWithFavorites(),
  favorites: getFromLocalStorage("favorites"),
  cart: getFromLocalStorage("cart"),
  compare: getFromLocalStorage("compare"),
  totalQuantity: getTotalQuantityFromLocalStorage(),
  totalPrice: getFromLocalStorage("totalPrice") || 0,
  orders: getFromLocalStorage("purchasedOrders") || [],
  couponCode: null,
  discountAmount: 0,
  usedCoupons: [],
  couponStatus: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;

      const product = state.products.find((p) => p.id === id);
      const cartProduct = state.cart.find((p) => p.id === product.id);

      if (cartProduct) {
        cartProduct.quantity += quantity;
      } else {
        state.cart.push({ ...product, quantity });
      }

      state.totalQuantity += quantity;
      state.totalPrice = calculateTotalPrice(state.cart);

      if (state.couponCode) {
        const coupon = validCoupons.find((c) => c.code === state.couponCode);
        if (coupon) {
          const discountAmount = (state.totalPrice * coupon.discount) / 100;
          state.totalPrice -= discountAmount;
          state.discountAmount = discountAmount;
        }
      }

      saveToLocalStorage("cart", state.cart);
      saveToLocalStorage("totalQuantity", state.totalQuantity);
      saveToLocalStorage("totalPrice", state.totalPrice);
    },

    removeFromCart: (state, action) => {
      const cartProduct = state.cart.find((p) => p.id === action.payload);

      if (cartProduct) {
        state.totalQuantity = Math.max(
          0,
          state.totalQuantity - cartProduct.quantity
        );
        state.cart = state.cart.filter((p) => p.id !== action.payload);
        state.totalPrice = calculateTotalPrice(state.cart);
        saveToLocalStorage("cart", state.cart);
        saveToLocalStorage("totalQuantity", state.totalQuantity);
        saveToLocalStorage("totalPrice", state.totalPrice);
      }
      if (state.couponCode) {
        const coupon = validCoupons.find((c) => c.code === state.couponCode);
        if (coupon) {
          const discountAmount = (state.totalPrice * coupon.discount) / 100;
          state.totalPrice -= discountAmount;
          state.discountAmount = discountAmount;
        }
      }
    },

    incrementCartItem: (state, action) => {
      const cartProduct = state.cart.find((p) => p.id === action.payload);
      if (cartProduct) {
        cartProduct.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice = calculateTotalPrice(state.cart);
        saveToLocalStorage("cart", state.cart);
        saveToLocalStorage("totalQuantity", state.totalQuantity);
        saveToLocalStorage("totalPrice", state.totalPrice);
      }

      if (state.couponCode) {
        const coupon = validCoupons.find((c) => c.code === state.couponCode);
        if (coupon) {
          const discountAmount = (state.totalPrice * coupon.discount) / 100;
          state.totalPrice -= discountAmount;
          state.discountAmount = discountAmount;
        }
      }
    },

    decrementCartItem: (state, action) => {
      const cartProduct = state.cart.find((p) => p.id === action.payload);
      if (cartProduct && cartProduct.quantity > 1) {
        cartProduct.quantity -= 1;
        state.totalQuantity = Math.max(0, state.totalQuantity - 1);
      } else if (cartProduct && cartProduct.quantity === 1) {
        state.cart = state.cart.filter((p) => p.id !== action.payload);
        state.totalQuantity = Math.max(0, state.totalQuantity - 1);
      }
      state.totalPrice = calculateTotalPrice(state.cart);
      saveToLocalStorage("cart", state.cart);
      saveToLocalStorage("totalQuantity", state.totalQuantity);
      saveToLocalStorage("totalPrice", state.totalPrice);
      if (state.couponCode) {
        const coupon = validCoupons.find((c) => c.code === state.couponCode);
        if (coupon) {
          const discountAmount = (state.totalPrice * coupon.discount) / 100;
          state.totalPrice -= discountAmount;
          state.discountAmount = discountAmount;
        }
      }
    },

    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      saveToLocalStorage("cart", []);
      saveToLocalStorage("totalQuantity", 0);
      saveToLocalStorage("totalPrice", 0);

      if (state.couponCode) {
        const coupon = validCoupons.find((c) => c.code === state.couponCode);
        if (coupon) {
          const discountAmount = (state.totalPrice * coupon.discount) / 100;
          state.totalPrice -= discountAmount;
          state.discountAmount = discountAmount;
        }
      }
    },

    addToFavorites: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product && !state.favorites.includes(productId)) {
        product.isFavorite = true;
        state.favorites.push(productId);
        saveToLocalStorage("favorites", state.favorites);
        saveToLocalStorage("products", state.products);
      }
    },

    removeFromFavorites: (state, action) => {
      const productId = action.payload;
      state.favorites = state.favorites.filter((id) => id !== productId);
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.isFavorite = false;
      }
      saveToLocalStorage("favorites", state.favorites);
      saveToLocalStorage("products", state.products);
    },

    addToCompare: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product && !state.compare.includes(productId)) {
        product.isCompared = true;
        state.compare.push(productId);
        saveToLocalStorage("compare", state.compare);
        saveToLocalStorage("products", state.products);
      }
    },

    removeFromCompare: (state, action) => {
      const productId = action.payload;
      state.compare = state.compare.filter((id) => id !== productId);
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.isCompared = false;
      }
      saveToLocalStorage("compare", state.compare);
      saveToLocalStorage("products", state.products);
    },

    addToPurchased: (state, action) => {
      const {
        products,
        shippingDetails,
        paymentMethod,
        totalAmount,
        discountAmount,
      } = action.payload;
      const orderDate = new Date().toISOString();
      const orderId = generateOrderId();

      const newOrder = {
        orderId,
        orderDate,
        products: products.map((product) => ({
          ...product,
          status: "pending",
        })),
        shippingDetails,
        paymentMethod,
        totalAmount: totalAmount,
        discountAmount,
        status: "pending",
      };

      state.orders.push(newOrder);

      products.forEach((product) => {
        const stateProduct = state.products.find((p) => p.id === product.id);
        if (stateProduct) {
          stateProduct.isPurchased = true;
        }
      });

      saveToLocalStorage("purchasedOrders", state.orders);
      saveToLocalStorage("products", state.products);
    },

    removeFromPurchased: (state, action) => {
      const orderId = action.payload;

      const orderToRemove = state.orders.find(
        (order) => order.orderId === orderId
      );

      if (orderToRemove) {
        orderToRemove.products.forEach((product) => {
          const stateProduct = state.products.find((p) => p.id === product.id);
          if (stateProduct) {
            stateProduct.isPurchased = false;
          }
        });

        state.orders = state.orders.filter(
          (order) => order.orderId !== orderId
        );

        saveToLocalStorage("purchasedOrders", state.orders);
        saveToLocalStorage("products", state.products);
      }
    },

    applyCoupon: (state, action) => {
      const { couponCode } = action.payload;

      if (state.usedCoupons.includes(couponCode)) {
        state.couponStatus = "used";
        return;
      }

      const coupon = validCoupons.find((c) => c.code === couponCode);

      if (coupon) {
        const discountAmount = (state.totalPrice * coupon.discount) / 100;
        state.couponCode = couponCode;
        state.discountAmount = discountAmount;
        state.totalPrice -= discountAmount;

        state.usedCoupons.push(couponCode);
        state.couponStatus = "valid";
      } else {
        console.error("Invalid coupon code");
        state.couponStatus = "invalid";
      }

      saveToLocalStorage("totalPrice", state.totalPrice);
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  addToCart,
  removeFromCart,
  incrementCartItem,
  decrementCartItem,
  clearCart,
  addToCompare,
  removeFromCompare,
  addToPurchased,
  removeFromPurchased,
  applyCoupon,
} = productsSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectFavorites = (state) => state.products.favorites;
export const selectCart = (state) => state.products.cart;
export const selectTotalQuantity = (state) => state.products.totalQuantity;
export const selectTotalPrice = (state) => state.products.totalPrice;
export const selectCompare = (state) => state.products.compare;
export const selectOrders = (state) => state.products.orders;
export const selectCouponStatus = (state) => state.products.couponStatus;
export const selectDiscount = (state) => state.products.discountAmount;

export default productsSlice.reducer;
