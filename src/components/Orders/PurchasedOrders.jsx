import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  IconButton,
  TextField,
  useMediaQuery,
  Divider,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Swal from "sweetalert2";
import "./customAlertStyles.css";
import {
  removeFromPurchased,
  selectOrders,
} from "../../store/slices/productsSlice";

export default function PurchasedOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const purchasedItems = useSelector(selectOrders);

  const handleNav = (path) => {
    navigate(path);
  };

  const handleRemoveFromPurchased = (productId) => {
    const showWarningAlert = () => {
      Swal.fire({
        title: "Warning!",
        text: "Are you sure you want to cancel the order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed!",
        cancelButtonText: "No, cancel!",
        customClass: {
          popup: "custom-alert",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Proceeded!", "You Canceled This Order.", "success");
          dispatch(removeFromPurchased(productId));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "Your Order Still In Progress.", "error");
        }
      });
    };
    showWarningAlert();
  };

  const isColumn = useMediaQuery("(max-width:600px)");

  const renderMobileView = () => {
    return (
      <Box>
        {purchasedItems.map((order, orderIndex) => (
          <Paper
            key={orderIndex}
            sx={{ mb: 2, p: 2, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)" }}
          >
            {order.products.map((product, productIndex) => (
              <Box key={`${orderIndex}-${productIndex}`} mb={2}>
                <>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box display="flex" alignItems="center">
                      <img
                        src={product.image || "/api/placeholder/100/100"}
                        alt={product.name || "Product"}
                        style={{ width: 50, marginRight: 16 }}
                      />
                      <Box>
                        <Typography fontWeight={"bold"} variant="subtitle1">
                          {product.name || "Product Name"}
                        </Typography>
                        <Typography
                          variant="body2"
                          fontSize={10}
                          color="text.secondary"
                        >
                          SKU : {product.sku || "SKU"}
                        </Typography>
                      </Box>
                    </Box>
                    {productIndex === 0 && (
                      <IconButton
                        color="error"
                        aria-label="delete"
                        onClick={() => handleRemoveFromPurchased(order.orderId)}
                        sx={{ padding: 0 }}
                      >
                        <X size={16} />
                      </IconButton>
                    )}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                    flexWrap={"wrap"}
                  >
                    <Typography
                      variant="body1"
                      fontSize={14}
                      fontWeight={"bold"}
                      color="#444444"
                    >
                      Price: ${product.price.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontSize={14}
                      fontWeight={"bold"}
                      color="#444444"
                    >
                      Quantity: {product.quantity}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontSize={14}
                      fontWeight={"bold"}
                      color="#444444"
                    >
                      Subtotal: ${(product.price * product.quantity).toFixed(2)}
                    </Typography>
                  </Box>

                  <Divider orientation="horizontal" sx={{ my: 2 }} />
                </>
                {productIndex === order.products.length - 1 && (
                  <Box
                    display={"flex"}
                    flexWrap={"wrap"}
                    fontWeight={"bold"}
                    color="#444444"
                    mt={1}
                  >
                    Total: $
                    {order.discountAmount !== 0 ? (
                      <>
                        <Typography
                          sx={{ mr: 1, textDecoration: "line-through" }}
                        >
                          {order.products
                            .reduce(
                              (acc, product) =>
                                acc + product.price * product.quantity,
                              0
                            )
                            .toFixed(2)}
                        </Typography>
                        {order.totalAmount.toFixed(2)}
                      </>
                    ) : (
                      order.products
                        .reduce(
                          (acc, product) =>
                            acc + product.price * product.quantity,
                          0
                        )
                        .toFixed(2)
                    )}
                    <Typography
                      sx={{ fontSize: 16, fontWeight: "bold", ml: "auto" }}
                      variant="body1"
                    >
                      Order Status: {order.status}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
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
              <TableCell sx={{ width: "50%", pl: 4 }}>Product</TableCell>
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
            {purchasedItems.map((order, orderIndex) => (
              <React.Fragment key={orderIndex}>
                {order && (
                  <TableRow>
                    <TableCell
                      padding="checkbox"
                      sx={{
                        width: "40px",
                        border: "none",
                      }}
                    >
                      <IconButton
                        color="error"
                        aria-label="delete"
                        onClick={() => handleRemoveFromPurchased(order.orderId)}
                        sx={{
                          p: 0,
                          my: 1,
                          fontSize: 16,
                          fontWeight: "bold",
                          gap: 1,
                        }}
                      >
                        <X size={22} /> Cancel Order
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
                {order.products.map((product, productIndex) => (
                  <TableRow key={`${orderIndex}-${productIndex}`}>
                    <TableCell sx={{ width: "50%" }}>
                      <Box display="flex" alignItems="center">
                        <img
                          src={product.image || "/api/placeholder/100/100"}
                          alt={product.name || "Product"}
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "cover",
                            marginRight: 16,
                          }}
                        />
                        <Box>
                          <Typography variant="subtitle1">
                            {product.name || "Product Name"}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            SKU: {product.sku || "SKU"}
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
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ width: "15%" }}>
                      ${(product.price * product.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={1}
                    sx={{
                      fontSize: 18,
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Total: $
                    {order.discountAmount !== 0 ? (
                      <>
                        <Typography
                          sx={{ mr: 1, textDecoration: "line-through" }}
                        >
                          {order.products
                            .reduce(
                              (acc, product) =>
                                acc + product.price * product.quantity,
                              0
                            )
                            .toFixed(2)}
                        </Typography>
                        {order.totalAmount.toFixed(2)}
                      </>
                    ) : (
                      order.products
                        .reduce(
                          (acc, product) =>
                            acc + product.price * product.quantity,
                          0
                        )
                        .toFixed(2)
                    )}
                  </TableCell>
                  <TableCell colSpan={5} align="left">
                    <Typography
                      sx={{ fontSize: 16, fontWeight: "bold" }}
                      variant="body1"
                    >
                      Order Status: {order.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box
      sx={{
        mt: { xs: 4, sm: 6, md: 2 },
        mb: 12,
      }}
    >
      {purchasedItems.length === 0 ? (
        <Box
          sx={{ maxWidth: 1200, margin: "auto", padding: 3, mt: 10, mb: 20 }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h5"
              fontWeight={"bold"}
              fontSize={"36px"}
              gutterBottom
            >
              Your orders list is empty.
            </Typography>
          </Box>
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
      ) : isColumn ? (
        renderMobileView()
      ) : (
        renderDesktopView()
      )}
    </Box>
  );
}
