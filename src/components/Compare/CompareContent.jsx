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
  Rating,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { X, Check } from "lucide-react";
import { Close } from "@mui/icons-material";
import { showSnackbar } from "../../store/slices/snackbarSlice";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  removeFromCompare,
  selectCompare,
  selectProducts,
} from "../../store/slices/productsSlice";

const CompareContent = () => {
  const products = useSelector(selectProducts);
  const compare = useSelector(selectCompare);

  const comparedItems = products.filter((product) =>
    compare.includes(product.id)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };

  const handleRemoveFromCompare = (id) => {
    dispatch(removeFromCompare(id));
    dispatch(
      showSnackbar({ message: "Removed from Compare", severity: "info" })
    );
  };
  return (
    <Box
      sx={{
        mt: { xs: 4, sm: 6, md: 2 },
        mb: 12,
      }}
    >
      {comparedItems.length === 0 ? (
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
              Your products compare list is empty.
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
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>PRODUCT</TableCell>
                {comparedItems.map((watch, index) => (
                  <TableCell key={index} align="center">
                    <Box sx={{ position: "relative", display: "inline-block" }}>
                      <img
                        src={watch.image}
                        alt={watch.name}
                        style={{ width: 100, height: 100 }}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: -15,
                          left: "50%",
                          transform: "translateX(-50%)",
                          bgcolor: "red",
                          color: "white",
                          transition: "all 0.3s ease",
                          ":hover": {
                            bgcolor: "red",
                            color: "white",
                            transition: "0.3s",
                            transform: "translateX(-50%) rotate(180deg)",
                          },
                        }}
                        onClick={() => handleRemoveFromCompare(watch.id)}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="subtitle1">{watch.name}</Typography>
                    <Button
                      onClick={() =>
                        dispatch(addToCart({ id: watch.id, quantity: 1 }))
                      }
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        borderRadius: 10,
                        backgroundColor: "#0088ff",
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "black",
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>price</TableCell>
                {comparedItems.map((watch, index) => (
                  <TableCell key={index} align="center">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {watch.originalPrice && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            textDecoration: "line-through",
                            mr: 1,
                            fontSize: { xs: "0.7rem", sm: "0.75rem" },
                          }}
                        >
                          ${watch.originalPrice.toFixed(2)}
                        </Typography>
                      )}
                      <Typography
                        variant="h6"
                        color="text.primary"
                        sx={{
                          fontWeight: "bold",
                          fontSize: {
                            xs: "1.1rem",
                            sm: "1rem",
                            md: "1rem",
                          },
                        }}
                      >
                        ${watch.price.toFixed(2)}
                      </Typography>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Rating</TableCell>
                {comparedItems.map((watch, index) => (
                  <TableCell key={index} align="center">
                    <Rating value={watch.rating} readOnly />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                {comparedItems.map((watch, index) => (
                  <TableCell key={index} align="center">
                    <Typography>{watch.description}</Typography>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>SKU</TableCell>
                {comparedItems.map((watch, index) => (
                  <TableCell key={index} align="center">
                    {watch.sku}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Availability</TableCell>
                {comparedItems.map((watch, index) => (
                  <TableCell key={index} align="center">
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Check size={16} color="green" />

                      {watch.availability}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Individual sale
                </TableCell>
                {comparedItems.map((watch, index) => (
                  <TableCell key={index} align="center">
                    <X size={16} color="red" />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Weight</TableCell>
                {comparedItems.map((watch, index) => (
                  <TableCell key={index} align="center">
                    {watch.weight}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Length</TableCell>
                {comparedItems.map((watch, index) => (
                  <TableCell key={index} align="center">
                    {watch.length}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Height</TableCell>
                {comparedItems.map((watch, index) => (
                  <TableCell key={index} align="center">
                    {watch.height}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Width</TableCell>
                {comparedItems.map((watch, index) => (
                  <TableCell key={index} align="center">
                    {watch.width}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Product Year</TableCell>
                {comparedItems.map((watch, index) => (
                  <TableCell key={index} align="center">
                    {watch.productYear}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Product Manual
                </TableCell>
                {comparedItems.map((watch, index) => (
                  <TableCell key={index} align="center">
                    {watch.productManual}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Refundable</TableCell>
                {comparedItems.map((watch, index) => (
                  <TableCell key={index} align="center">
                    Up to 14 days
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CompareContent;
