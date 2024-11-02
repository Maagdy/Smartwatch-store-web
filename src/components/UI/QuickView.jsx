import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  Button,
  IconButton,
  Stack,
  Chip,
  TextField,
  Divider,
  GlobalStyles,
} from "@mui/material";
import { Favorite, CompareArrows, ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToCompare,
  addToFavorites,
  removeFromCompare,
  removeFromFavorites,
} from "../../store/slices/productsSlice";
import { showSnackbar } from "../../store/slices/snackbarSlice";
import {
  hideQuickView,
  selectViewedProduct,
} from "../../store/slices/quickViewSlice";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";

const QuickView = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectViewedProduct);
  const cardRef = useRef(null);
  const location = useLocation();
  const prevLocation = useRef(location);

  const [addedValue, setAddedValue] = useState(1);

  useEffect(() => {
    if (prevLocation.current.pathname !== location.pathname) {
      dispatch(hideQuickView());
    }
    prevLocation.current = location;
  }, [location, dispatch]);

  const increment = () => {
    const newValue = addedValue + 1;
    setAddedValue(newValue);
  };

  const decrement = () => {
    if (addedValue > 0 && addedValue !== 0) {
      const newValue = addedValue - 1;
      setAddedValue(newValue);
    }
  };

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

  const handleAddToCart = () => {
    if (addedValue === 0) {
      dispatch(
        showSnackbar({
          message: "You Can't order 0 Products",
          severity: "info",
        })
      );
    } else {
      dispatch(addToCart({ id: product.id, quantity: addedValue }));
      dispatch(
        showSnackbar({
          message: "Added to cart",
          severity: "success",
          path: "/cart",
        })
      );
    }
  };
  const handleOverlayClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            overflow: "hidden",
            paddingRight: "15px",
          },
        }}
      />
      <Box
        onClick={handleOverlayClick}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1300,
        }}
      >
        <Card
          ref={cardRef}
          sx={{
            maxWidth: "100%",
            maxHeight: "75%",
            overflow: "auto",
            mx: 4,
            position: "relative",
            bgcolor: "background.paper",
            boxShadow: 24,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "unset" },
              p: 2,
              gap: 4,
            }}
          >
            <Box sx={{ width: { sm: "40%", xs: "70%" } }}>
              <Box
                component="img"
                src={product?.image}
                alt={product?.name}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 1,
                }}
              />
            </Box>

            <Box sx={{ p: 1, width: { xs: "100%", sm: "50%" } }}>
              <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  {product?.name}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rating value={product?.rating} readOnly size="small" />
                  <Typography
                    variant="body2"
                    sx={{ ml: 1 }}
                    color="text.secondary"
                  >
                    ({product?.customerReview} customer review)
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "baseline", mb: 2 }}>
                  {product?.originalPrice && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textDecoration: "line-through", mr: 1 }}
                    >
                      ${product.originalPrice.toFixed(2)}
                    </Typography>
                  )}
                  <Typography variant="h6" fontWeight="bold">
                    ${product?.price?.toFixed(2)}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {product?.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    mb: 2,
                    gap: 1,
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <IconButton onClick={decrement} size="small">
                      <Minus size={16} />
                    </IconButton>
                    <TextField
                      sx={{
                        width: "40px",
                        mx: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                          "& input[type='number']": {
                            MozAppearance: "textfield",
                            "&::-webkit-outer-spin-button": {
                              display: "none",
                            },
                            "&::-webkit-inner-spin-button": {
                              display: "none",
                            },
                          },
                        },
                      }}
                      size="small"
                      type="number"
                      value={addedValue}
                      slotProps={{
                        htmlInput: {
                          style: {
                            textAlign: "center",
                            padding: "4px",
                          },
                        },
                      }}
                    />
                    <IconButton onClick={increment} size="small">
                      <Plus size={16} />
                    </IconButton>
                  </Box>

                  <Box display={"flex"} gap={2}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ShoppingCart />}
                      onClick={handleAddToCart}
                      sx={{
                        px: { xs: 2, sm: 3, md: 4 },
                        py: { xs: 1, sm: 0.75, md: 1 },
                        textTransform: "none",
                        bgcolor: "#0088ff",
                        fontWeight: "bold",
                        borderRadius: 10,
                        "&:hover": {
                          bgcolor: "black",
                          color: "white",
                        },
                      }}
                    >
                      Add to cart
                    </Button>

                    <IconButton size="small" onClick={handleFavoriteClick}>
                      <Favorite
                        fontSize="small"
                        sx={{
                          color: isFavorite ? "red" : "inherit",
                        }}
                      />
                    </IconButton>

                    <IconButton size="small" onClick={handleAddToCompare}>
                      <CompareArrows
                        fontSize="small"
                        sx={{
                          color: isCompared ? "#000000" : "inherit",
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={1} alignItems={"left"}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography variant="body2" fontWeight={"bold"}>
                      Brand:
                    </Typography>
                    <Typography variant="caption">XTRA</Typography>
                  </Stack>

                  <Stack direction={"row"} spacing={1}>
                    <Typography variant="body2" fontWeight={"bold"}>
                      SKU:
                    </Typography>
                    <Typography variant="caption">{product?.sku}</Typography>
                  </Stack>

                  <Stack direction={"row"} spacing={1}>
                    <Typography variant="body2" fontWeight={"bold"}>
                      Status:
                    </Typography>
                    <Typography variant="caption" color="success.main">
                      {product?.availability}
                    </Typography>
                  </Stack>

                  <Stack direction={"row"} spacing={1}>
                    <Typography variant="body2" fontWeight={"bold"}>
                      Tags:
                    </Typography>
                    <Chip label="gold" size="small" />
                    <Chip label="rose" size="small" />
                    <Chip label="watch" size="small" />
                  </Stack>

                  <Stack direction={"row"} spacing={1}>
                    <Typography variant="body2" fontWeight={"bold"}>
                      Categories:
                    </Typography>

                    <Chip label={product?.category} size="small" />
                  </Stack>
                </Stack>
              </CardContent>
            </Box>
          </Box>
        </Card>
        <IconButton
          size="large"
          onClick={() => dispatch(hideQuickView())}
          sx={{
            p: 0.5,
            color: "white",
            background: "red",
            ":hover": {
              color: "white",
              background: "red",
              rotate: "180deg",
              transition: "0.3s",
            },
            position: "relative",
            right: 45,
            bottom: 245,
            overflow: "hidden",
            zIndex: 1300,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default QuickView;
