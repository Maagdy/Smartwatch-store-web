import { useLocation } from "react-router-dom";
import CartContent from "../components/Cart/CartContent";
import CheckoutProgress from "../components/Cart/CheckoutProgress";
import CheckoutContent from "../components/Cart/CheckoutContent";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import GlobalSnackbar from "../components/UI/GlobalSnackbar";
import { selectCart } from "../store/slices/productsSlice";

export default function CartPage() {
  const location = useLocation();
  const cartItems = useSelector(selectCart);
  const isXs = useMediaQuery("(max-width:600px)");

  return (
    <>
      {!isXs && cartItems.length > 0 && <CheckoutProgress />}

      {location.pathname === "/cart" && <CartContent />}

      {location.pathname === "/checkout" && <CheckoutContent />}
      <GlobalSnackbar />
    </>
  );
}
