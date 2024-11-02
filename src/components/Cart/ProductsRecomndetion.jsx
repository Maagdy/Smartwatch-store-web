/* eslint-disable react/prop-types */
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import ProductCard from "../UI/PrdouctCard";

const ProductRecommendations = ({ products }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const displayProducts = products.slice(0, 4);

  return (
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
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
        You may be interested in...
      </Typography>
      <Grid container spacing={4} justifyContent="center" my={5}>
        {displayProducts.map((prod) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={prod.id}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ProductCard
              to={prod.to}
              product={prod}
              sx={{
                width: isMobile ? "100%" : isTablet ? "80%" : "100%",
                maxWidth: "100px",
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductRecommendations;
