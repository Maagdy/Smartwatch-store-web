import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ProductsCheckout from "../UI/ProductsCheckout";
import BillingForm from "./BillingForm";
import { useLocation, useNavigate } from "react-router-dom";
import { showSnackbar } from "../../store/slices/snackbarSlice";
import {
  addToPurchased,
  clearCart,
  selectCart,
  selectDiscount,
  selectTotalPrice,
} from "../../store/slices/productsSlice";

export default function CheckoutContent() {
  const cartItems = useSelector(selectCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isBillingFormSubmitted, setIsBillingFormSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shouldNavigateToCart, setShouldNavigateToCart] = useState(false);
  const totalAmount = useSelector(selectTotalPrice);
  const discountAmount = useSelector(selectDiscount);

  const isXs = useMediaQuery("(max-width:900px)");

  const handleSnackbar = (message, severity) => {
    dispatch(showSnackbar({ message, severity }));
    if (!isXs) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBillingFormSubmit = () => {
    setIsBillingFormSubmitted(true);
    handleSnackbar("You can place your order now.", "success");
  };

  useEffect(() => {
    let navigateTimer;
    if (shouldNavigateToCart && location.pathname !== "/orders") {
      navigateTimer = setTimeout(() => {
        navigate("/cart");
      }, 4000);
    }

    return () => {
      if (navigateTimer) clearTimeout(navigateTimer);
    };
  }, [shouldNavigateToCart, location.pathname, navigate]);

  const handleSuccessedProcces = () => {
    setIsProcessing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    dispatch(
      addToPurchased({
        products: cartItems,
        shippingDetails: {
          address: "123 Main St",
          city: "City",
        },
        paymentMethod: {
          type: "credit_card",
        },
        totalAmount: totalAmount,
        discountAmount,
      })
    );

    const processingTimer = setTimeout(() => {
      setIsProcessing(false);

      dispatch(
        showSnackbar({
          message: "Order placed successfully!",
          severity: "success",
          path: "/orders",
        })
      );

      setShouldNavigateToCart(true);
    }, 3000);

    return () => clearTimeout(processingTimer);
  };

  const handlePlaceOrder = () => {
    if (!isBillingFormSubmitted) {
      handleSnackbar(
        "Please fill out and SUBMIT the billing information before placing an order.",
        "warning"
      );
      return;
    }

    if (cartItems.length === 0) {
      handleSnackbar(
        "Please add some products before placing an order.",
        "warning"
      );
      return;
    }

    dispatch(clearCart());
    setIsBillingFormSubmitted(false);
    handleSuccessedProcces();
  };

  return (
    <>
      {isProcessing && (
        <Stack
          spacing={2}
          direction="row"
          sx={{ width: "100%", height: "100%", mt: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress
            size="3rem"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          />
        </Stack>
      )}

      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems={{ xs: "center", md: "flex-start" }}
        spacing={6}
        sx={{
          my: { xs: 5, sm: 10 },
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: "100%",
          }}
        >
          <BillingForm
            onSubmit={handleBillingFormSubmit}
            isSubmitting={isProcessing}
          />
        </Box>
        <Paper
          sx={{
            flex: 1,
            width: "100%",
            p: 4,
            bgcolor: "rgba(0, 0, 0, 0.01)",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h1"
            fontSize={"18px"}
            sx={{ position: "relative", mb: 2 }}
            fontWeight="bold"
          >
            Your Order
            <Divider
              sx={{
                width: "30px",
                borderBottomWidth: 2,
                mt: 1,
                mb: 2,
                bgcolor: "black",
              }}
            />
          </Typography>
          <ProductsCheckout
            cartItems={cartItems}
            isOrdered={true}
            placeOrder={handlePlaceOrder}
          />
        </Paper>
      </Stack>
    </>
  );
}
