/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Close, CompareArrows } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Favorite, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { closeSnackbar, showSnackbar } from "../../store/slices/snackbarSlice";
import {
  addToCompare,
  addToFavorites,
  removeFromCompare,
  removeFromFavorites,
  selectProducts,
} from "../../store/slices/productsSlice";
import { addToCart } from "../../store/slices/productsSlice";
import { showQuickView } from "../../store/slices/quickViewSlice";

const ProductCard = ({ product, isWishlistPage, scrollTop, refreshProds }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const isFavorite = useSelector((state) =>
    state.products.favorites.includes(product.id)
  );

  const isCompared = useSelector((state) =>
    state.products.compare.includes(product.id)
  );

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      dispatch(
        showSnackbar({
          message: "Removed from wishlist",
          severity: "info",
        })
      );
    } else {
      dispatch(addToFavorites(product.id));
      dispatch(
        showSnackbar({
          message: "Added to wishlist",
          severity: "success",
          path: "/wishlist",
        })
      );
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ id: product.id, quantity: 1 }));
    scrollTop && scrollTop();
    refreshProds && refreshProds();
  };

  const handleViewProduct = () => {
    const viewedProduct = products.find((p) => p.id === product.id);
    if (viewedProduct) {
      dispatch(showQuickView(viewedProduct));
    }
  };

  const handleAddToCompare = () => {
    if (isCompared) {
      dispatch(removeFromCompare(product.id));
      dispatch(
        showSnackbar({
          message: "Removed from compare list",
          severity: "info",
        })
      );
    } else {
      dispatch(addToCompare(product.id));
      dispatch(
        showSnackbar({
          message: "Added to compare list",
          severity: "success",
          path: "/compare",
        })
      );
    }
  };

  const handleRemoveFromWishlist = () => {
    dispatch(removeFromFavorites(product.id));
    dispatch(
      showSnackbar({ message: "Removed from favorites", severity: "info" })
    );
  };

  const IconButtons = [
    {
      icon: (
        <Favorite
          sx={{
            color: isFavorite ? "red" : "inherit",
          }}
        />
      ),
      btnFunc: handleFavoriteClick,
    },
    {
      icon: (
        <CompareArrows
          sx={{
            color: isCompared ? "#000000" : "inherit",
          }}
        />
      ),
      btnFunc: handleAddToCompare,
    },
    { icon: <Visibility />, btnFunc: handleViewProduct },
  ];

  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));

  const getImageSize = () => {
    if (isXs) return "180px";
    if (isSm) return "200px";
    return "220px";
  };

  useEffect(() => {
    return () => {
      dispatch(closeSnackbar());
    };
  }, [dispatch]);

  return (
    <Link style={{ textDecoration: "none" }}>
      <Card
        sx={{
          cursor: "pointer",
          maxWidth: "100%",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
          position: "relative",
          borderRadius: 6,
          px: { xs: 2, sm: 4, md: 5, lg: 2 },
          py: 1,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            zIndex: 10,
          },
          "&:hover div.NAME": {
            color: "#0088ff",
            transition: "color 0.3s ease-in-out",
          },
          "& .NAME": {
            color: "black",
            transition: "color 0.3s ease-in-out",
          },
          "&:hover .hover-buttons-container": { opacity: 1 },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isWishlistPage && (
          <IconButton
            sx={{
              bgcolor: "red",
              color: "white",
              ":hover": {
                bgcolor: "red",
                color: "white",
                rotate: "180deg",
                transition: "0.3s",
              },
              position: "absolute",
              top: 0,
              right: 2,
            }}
            onClick={handleRemoveFromWishlist}
          >
            <Close />
          </IconButton>
        )}
        {product.offer && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: { xs: 10, sm: 15, md: 20 },
              left: { xs: 10, sm: 15, md: 20 },
              width: { xs: "40px", sm: "45px", md: "50px" },
              height: { xs: "40px", sm: "45px", md: "50px" },
              fontWeight: "bold",
              backgroundColor: "#ffffff",
              color: "primary.main",
              borderRadius: "50%",
              zIndex: 1,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
            }}
          >
            {product.offer}%
          </Box>
        )}
        <Box
          sx={{
            position: "relative",
            bgcolor: "#f2f2f2",
            width: getImageSize(),
            height: getImageSize(),
            borderRadius: "50%",
            overflow: "hidden",
            m: "5%",
            mx: "auto",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          {isHovered && (
            <Box
              className="hover-buttons-container"
              sx={{
                position: "absolute",
                bottom: "25%",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 0.5, sm: 1 },
                backgroundColor: "white",
                padding: { xs: "6px 8px", sm: "8px 12px" },
                borderRadius: "12px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                opacity: 0,
                transition: "opacity 0.3s ease-in-out",
                width: "auto",
              }}
            >
              {IconButtons.map((btn, index) => (
                <IconButton
                  key={index}
                  onClick={btn.btnFunc}
                  sx={{
                    width: { xs: 30, sm: 35, md: 40 },
                    height: { xs: 30, sm: 35, md: 40 },
                    minWidth: "unset",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#0088ff",
                      color: "white",
                    },
                  }}
                >
                  {btn.icon}
                </IconButton>
              ))}
            </Box>
          )}
        </Box>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: "12px", sm: "16px" },
          }}
        >
          <Typography
            className="NAME"
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: {
                xs: "1rem",
                sm: "1.1rem",
                md: "1.25rem",
              },
            }}
          >
            {product.name}
          </Typography>
          <Rating
            name="read-only"
            value={product.rating}
            readOnly
            size="small"
          />
          <Box sx={{ display: "flex", alignItems: "center", mt: 1, mb: 2 }}>
            {product.originalPrice && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textDecoration: "line-through",
                  mr: 1,
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                }}
              >
                ${product.originalPrice.toFixed(2)}
              </Typography>
            )}
            <Typography
              variant="h6"
              color="text.primary"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
              }}
            >
              ${product.price.toFixed(2)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<ShoppingCartOutlinedIcon />}
            onClick={handleAddToCart}
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
            Add to cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
