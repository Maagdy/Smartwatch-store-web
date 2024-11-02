export const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const generateOrderId = () => {
  return "ORD-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
};

export const validCoupons = [
  { code: "SAVE10", discount: 10 },
  { code: "SAVE20", discount: 20 },
  { code: "SAVE30", discount: 30 },
];
