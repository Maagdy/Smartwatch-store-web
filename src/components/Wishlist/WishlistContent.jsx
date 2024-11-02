import { useSelector } from "react-redux";
import { Box, Typography, Stack, useTheme, Button } from "@mui/material";
import ProductCard from "../UI/PrdouctCard";

import { useNavigate } from "react-router-dom";
import {
  selectFavorites,
  selectProducts,
} from "../../store/slices/productsSlice";

const WishlistContent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  const favorites = useSelector(selectFavorites);

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  function handleNav() {
    navigate("/watches");
  }

  return (
    <Box sx={{ padding: 3 }}>
      {favoriteProducts.length === 0 ? (
        <Box
          sx={{
            my: 15,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            textAlign={"center"}
            variant="h1"
            fontSize={"40px"}
            fontWeight={"bold"}
          >
            Your wishlist list is empty.
          </Typography>
          <Button onClick={handleNav} sx={sxStyles.btn} variant="contained">
            Back To Shop
          </Button>
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
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlistPage={true}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default WishlistContent;

const sxStyles = {
  btn: {
    textTransform: "none",
    borderRadius: 10,
    bgcolor: "#0088ff",
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 1, sm: 0.75, md: 1 },
    mr: { xs: 2, sm: 1.75, md: 2 },
    my: 5,
    fontWeight: "bold",
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
    "&:hover": {
      bgcolor: "black",
      color: "white",
    },
  },
};
