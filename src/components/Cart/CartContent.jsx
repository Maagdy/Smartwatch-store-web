import {
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
  Paper,
  useMediaQuery,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { initialProducts } from "../../data/products";
import ProductCard from "../UI/PrdouctCard";
import CardProdTable from "../UI/CardProdTable";
import ProductsCheckout from "../UI/ProductsCheckout";
import { useEffect, useState } from "react";
import {
  decrementCartItem,
  incrementCartItem,
  removeFromCart,
  selectCart,
} from "../../store/slices/productsSlice";

const CartContent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);
  const navigate = useNavigate();
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const isXs = useMediaQuery("(max-width:600px)");

  const handleDeletProd = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleQuantityChange = (productId, value) => {
    if (value === 1) {
      dispatch(incrementCartItem(productId));
    } else if (value === -1) {
      dispatch(decrementCartItem(productId));
    }
  };

  const handleNav = (path) => {
    navigate(path);
  };

  const products = initialProducts.slice(0, 3);
  const handleRefreshProds = () => {
    const shuffledProducts = [...initialProducts].sort(
      () => Math.random() - 0.5
    );
    setRecommendedProducts(shuffledProducts.slice(0, 2));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    handleRefreshProds();
  }, []);

  return (
    <Box
      sx={{
        mt: 5,
        mb: 10,
      }}
    >
      {cartItems.length === 0 ? (
        <Box sx={{ maxWidth: 1200, margin: "auto", padding: 3 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <ShoppingCartIcon
              sx={{ fontSize: 160, color: "text.secondary", mb: 2 }}
            />
            <Typography
              variant="h5"
              fontWeight={"bold"}
              fontSize={"36px"}
              gutterBottom
            >
              Looks like your cart is empty!
            </Typography>
            <Typography
              variant="body2"
              fontSize={"1.25rem"}
              color="text.secondary"
            >
              Time to start your shopping
            </Typography>
          </Box>
        </Box>
      ) : (
        <Stack
          maxWidth={"100%"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          direction={"row"}
          flexWrap="wrap"
          gap={3}
          rowGap={8}
          my={5}
          sx={{
            [theme.breakpoints.down("lg")]: {
              gap: 1,
              rowGap: 6,
            },
            [theme.breakpoints.down("md")]: {
              gap: 2,
              rowGap: 4,
            },
            [theme.breakpoints.down("xs")]: {
              gap: 0,
              flexShrink: 1,
              rowGap: 4,
            },
          }}
        >
          <CardProdTable
            cartItems={cartItems}
            onContinueShopping={() => handleNav("/watches")}
            onQuantityChange={handleQuantityChange}
            onRemove={handleDeletProd}
          />
        </Stack>
      )}
      <Stack
        direction={{ md: "row", xs: "column-reverse" }}
        spacing={cartItems.length !== 0 ? 4 : 0}
      >
        <Box
          sx={{
            width: "100%",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
            borderRadius: 8,
            px: 4,
            py: 2,
            mt: 10,
            bgcolor: "rgba(0, 0, 0, .01)",
            mx: "auto",
            flex: cartItems.length !== 0 && 1,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            fontWeight={"bold"}
            textAlign={"left"}
            sx={{ fontSize: { xs: "16px", md: "24px" }, mt: 4, mb: 2 }}
          >
            You may be interested in...
          </Typography>
          <Stack
            maxWidth={"100%"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            direction={"row"}
            flexWrap="wrap"
            gap={3}
            rowGap={8}
            my={5}
            sx={{
              [theme.breakpoints.down("lg")]: {
                gap: 1,
                rowGap: 6,
              },
              [theme.breakpoints.down("md")]: {
                gap: 2,
                rowGap: 4,
              },
              [theme.breakpoints.down("xs")]: {
                gap: 0,
                flexShrink: 1,
                rowGap: 4,
              },
            }}
          >
            {cartItems.length === 0 ? (
              <>
                {products.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    to={prod.to}
                    product={prod}
                    scrollTop={scrollToTop}
                  />
                ))}
              </>
            ) : (
              <>
                {recommendedProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    to={prod.to}
                    refreshProds={handleRefreshProds}
                    product={prod}
                    scrollTop={scrollToTop}
                  />
                ))}
              </>
            )}
          </Stack>
        </Box>
        {cartItems.length !== 0 && (
          <Paper
            sx={{
              height: "100%",
              p: 2,
              bgcolor: "rgba(0, 0, 0, 0.01)",
              borderRadius: 4,
              width: { md: "35%", xs: "100%" },
            }}
          >
            <Typography
              sx={{ position: "relative", mb: 2 }}
              fontWeight="bold"
              variant="h1"
              fontSize={"18px"}
            >
              Your Order
              <Divider
                sx={{
                  width: "50px",
                  borderBottomWidth: 2,
                  mt: 1,
                  mb: 2,
                  bgcolor: "black",
                }}
              />
            </Typography>
            <ProductsCheckout
              isMobile={isXs && true}
              proceedCheckout={() => handleNav("/checkout")}
              cartItems={cartItems}
            />
          </Paper>
        )}
      </Stack>

      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Button
          variant="contained"
          startIcon={<KeyboardArrowLeftIcon />}
          onClick={() => handleNav("/watches")}
          sx={{
            textTransform: "none",
            borderRadius: 10,
            bgcolor: "#0088ff",
            px: { xs: 2, sm: 3, md: 4 },
            mx: 2,
            py: { xs: 0.5, sm: 0.75, md: 1 },
            fontWeight: "bold",
            fontSize: { xs: "12px", sm: "13px", md: "14px" },
            "&:hover": {
              bgcolor: "black",
            },
          }}
        >
          Return to shop
        </Button>
      </Box>
    </Box>
  );
};

export default CartContent;
