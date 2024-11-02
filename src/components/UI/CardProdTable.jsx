/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { X, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../store/slices/snackbarSlice";
import {
  applyCoupon,
  selectCouponStatus,
} from "../../store/slices/productsSlice";

const CardProdTable = ({
  cartItems,
  onContinueShopping,
  onQuantityChange,
  onRemove,
}) => {
  const dispatch = useDispatch();
  const isColumn = useMediaQuery("(max-width:600px)");
  const [couponCode, setCouponCode] = useState("");
  const couponValue = useSelector(selectCouponStatus);
  const [isCouponSubmitted, setIsCouponSubmitted] = useState(false);

  const handleApplyCoupon = () => {
    if (couponCode) {
      dispatch(applyCoupon({ couponCode }));
      setCouponCode("");
      setIsCouponSubmitted(true);
    } else {
      dispatch(
        showSnackbar({
          message: `Enter coupon code, Valid codes: SAVE10 ,SAVE20 and SAVE30`,
          severity: "info",
        })
      );
    }
  };
  useEffect(() => {
    if (isCouponSubmitted) {
      if (couponValue === "valid") {
        dispatch(
          showSnackbar({
            message: "Coupon applied successfully",
            severity: "success",
          })
        );
      } else if (couponValue === "invalid") {
        dispatch(
          showSnackbar({ message: "Invalid coupon code", severity: "warning" })
        );
      } else if (couponValue === "used") {
        dispatch(
          showSnackbar({
            message: "This coupon has already been used!",
            severity: "error",
          })
        );
      }
      setIsCouponSubmitted(false);
    }
  }, [couponValue, isCouponSubmitted, dispatch]);

  const renderMobileView = () => {
    return (
      <Box>
        {cartItems.map((product) => (
          <Paper
            key={product.id}
            sx={{ mb: 2, p: 2, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)" }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              mb={2}
            >
              <Box display="flex" alignItems="center">
                <img
                  src={product.image || "/api/placeholder/100/100"}
                  alt={product.name}
                  style={{ width: 50, marginRight: 16 }}
                />
                <Box>
                  <Typography variant="subtitle1">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    SKU: {product.sku}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                color="error"
                aria-label="delete"
                onClick={() => onRemove(product.id)}
                sx={{ padding: 0 }}
              >
                <X size={16} />
              </IconButton>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1">
                Price: ${product.price.toFixed(2)}
              </Typography>
              <Box display="flex" alignItems="center">
                <IconButton
                  size="small"
                  onClick={() => onQuantityChange(product.id, -1)}
                >
                  <Minus size={16} />
                </IconButton>
                <TextField
                  sx={{
                    width: "40px",
                    mx: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                    },
                  }}
                  size="small"
                  value={product.quantity}
                  slotProps={{
                    htmlInput: {
                      style: {
                        textAlign: "center",
                        padding: "4px",
                      },
                    },
                  }}
                  onChange={(e) =>
                    onQuantityChange(product.id, parseInt(e.target.value) || 0)
                  }
                />
                <IconButton
                  size="small"
                  onClick={() => onQuantityChange(product.id, 1)}
                >
                  <Plus size={16} />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="body1" align="right" mt={1}>
              Subtotal: ${(product.price * product.quantity).toFixed(2)}
            </Typography>
          </Paper>
        ))}
      </Box>
    );
  };

  const renderDesktopView = () => {
    return (
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{ minWidth: "100%" }} aria-label="shopping cart table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell padding="checkbox" sx={{ width: "40px" }}></TableCell>
              <TableCell sx={{ width: "50%" }}>Product</TableCell>
              <TableCell align="right" sx={{ width: "15%" }}>
                Price
              </TableCell>
              <TableCell align="center" sx={{ width: "20%" }}>
                Quantity
              </TableCell>
              <TableCell align="right" sx={{ width: "15%" }}>
                Subtotal
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((product) => (
              <TableRow key={product.id}>
                <TableCell padding="checkbox" sx={{ width: "40px" }}>
                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => onRemove(product.id)}
                    sx={{ padding: 0 }}
                  >
                    <X size={16} />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ width: "50%" }}>
                  <Box display="flex" alignItems="center">
                    <img
                      src={product.image || "/api/placeholder/100/100"}
                      alt={product.name}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        marginRight: 16,
                      }}
                    />
                    <Box>
                      <Typography variant="subtitle1">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        SKU: {product.sku}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ width: "15%" }}>
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IconButton
                      size="small"
                      onClick={() => onQuantityChange(product.id, -1)}
                    >
                      <Minus size={16} />
                    </IconButton>
                    <TextField
                      sx={{
                        width: "40px",
                        mx: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                        },
                      }}
                      size="small"
                      value={product.quantity}
                      slotProps={{
                        htmlInput: {
                          style: {
                            textAlign: "center",
                            padding: "4px",
                          },
                        },
                      }}
                      onChange={(e) =>
                        onQuantityChange(
                          product.id,
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                    <IconButton
                      size="small"
                      onClick={() => onQuantityChange(product.id, 1)}
                    >
                      <Plus size={16} />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ width: "15%" }}>
                  ${(product.price * product.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box width={"100%"}>
      {isColumn ? renderMobileView() : renderDesktopView()}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        mt={2}
        px={2}
        py={1}
        gap={2}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "stretch", sm: "center" }}
          width={{ xs: "100%", sm: "auto" }}
          gap={1}
        >
          <TextField
            placeholder="Coupon code"
            size="small"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            sx={{
              width: { xs: "100%", sm: "auto" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "40px",
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handleApplyCoupon}
            sx={{
              textTransform: "none",
              borderRadius: 10,
              bgcolor: "#0088ff",
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 1, sm: 0.75, md: 1 },
              fontWeight: "bold",
              fontSize: { xs: "12px", sm: "13px", md: "14px" },
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                bgcolor: "black",
              },
            }}
          >
            Apply coupon
          </Button>
        </Box>

        <Button
          variant="contained"
          onClick={onContinueShopping}
          sx={{
            textTransform: "none",
            borderRadius: 10,
            bgcolor: "#0088ff",
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 1, sm: 0.75, md: 1 },
            fontWeight: "bold",
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
            width: { xs: "100%", sm: "auto" },
            "&:hover": {
              bgcolor: "black",
            },
          }}
        >
          Continue shopping
        </Button>
      </Box>
    </Box>
  );
};

export default CardProdTable;
