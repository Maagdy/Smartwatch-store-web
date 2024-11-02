/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "../../store/slices/productsSlice";

const ProductsCheckout = ({
  cartItems,
  isOrdered,
  placeOrder,
  isMobile,
  proceedCheckout,
}) => {
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table
        sx={{ tableLayout: "auto", width: "100%" }}
        aria-label="shopping cart table"
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell sx={{ width: "75%" }}>Product</TableCell>
            <TableCell align="right" sx={{ width: "25%" }}>
              Subtotal
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((product) => (
            <TableRow key={product.id}>
              <TableCell align="center" sx={{ width: "100%" }}>
                <Box display="flex" alignItems="center">
                  <Typography
                    sx={{
                      fontSize: "16px",
                      mr: 1,
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    x{product.quantity}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right" sx={{ width: "15%" }}>
                ${(product.price * product.quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={1} sx={{ fontSize: 18, fontWeight: "bold" }}>
              Total:
            </TableCell>
            <TableCell align="right" sx={{ fontSize: 18, fontWeight: "bold" }}>
              ${totalPrice.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {isOrdered && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            onClick={placeOrder}
            sx={{
              textTransform: "none",
              borderRadius: 10,
              fontWeight: "bold",
              backgroundColor: "#0088ff",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            Place Order
          </Button>
        </Box>
      )}
      {isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            onClick={proceedCheckout}
            sx={{
              textTransform: "none",
              borderRadius: 10,
              fontWeight: "bold",
              backgroundColor: "#0088ff",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            Proceed to checkout
          </Button>
        </Box>
      )}
    </TableContainer>
  );
};

export default ProductsCheckout;
