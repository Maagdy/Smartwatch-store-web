import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/styles";
import ArrowCircleRightSharpIcon from "@mui/icons-material/ArrowCircleRightSharp";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "../UI/PrdouctCard";
import { initialProducts } from "../../data/products";
import { useNavigate } from "react-router-dom";

export default function ProductsPrev() {
  const navigate = useNavigate();
  const theme = useTheme();

  const products = initialProducts.slice(0, 4);

  const isMobile = useMediaQuery("(max-width:634px)");

  return (
    <Box>
      <Box sx={sxStyles.mainBox}>
        <Typography
          sx={{
            textShadow: "0 10px 5px rgba(0, 0, 0, 0.1)",
          }}
          variant="h3"
          fontSize={{ xs: "28px", sm: "38px", md: "48px" }}
          fontWeight={"bold"}
        >
          <span style={{ color: "#0088ff" }}>Pear-Watch </span>
          Products
        </Typography>
        <Typography
          pt={{ xs: 2, sm: 4 }}
          textAlign={"center"}
          fontSize={{ xs: "14px", sm: "18px", md: "18px", lg: "18px" }}
          color="#666666"
        >
          A smartwatch is a wearable computer in the form of a watch; modern
          smartwatches
          <br /> provide a local touchscreen interface for daily use.
        </Typography>
      </Box>
      {isMobile ? (
        <Grid container spacing={4} justifyContent="center" my={5}>
          {products.map((prod) => (
            <Grid item xs={9} key={prod.id}>
              <ProductCard to={prod.to} product={prod} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack
          maxWidth={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
          gap={3}
          my={5}
          sx={{
            [theme.breakpoints.down("lg")]: {
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            },
          }}
        >
          {products.map((prod) => (
            <ProductCard key={prod.id} to={prod.to} product={prod} />
          ))}
        </Stack>
      )}
      <Box sx={sxStyles.iconBox}>
        <IconButton
          sx={sxStyles.iconBtn}
          onClick={() => navigate("/watches")}
          variant="outlined"
        >
          <ArrowCircleRightSharpIcon
            fontSize="large"
            sx={{
              mr: 0.5,
            }}
          />
          Discover More
        </IconButton>
      </Box>
    </Box>
  );
}

const sxStyles = {
  mainBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBox: {
    mt: 10,
    display: "flex",
    flexDirection: { xs: "row", sm: "row" },
    justifyContent: "center",
    "& > *": { mx: { xs: 1, sm: 0 }, mr: { sm: 2 } },
  },
  iconBtn: {
    textTransform: "none",
    borderRadius: 10,
    bgcolor: "white",
    color: "black",
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 0.5, sm: 0.75, md: 1 },
    fontWeight: "bold",
    border: "none",
    fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "18px" },
    "&:hover": {
      bgcolor: "black",
      color: "white",
    },
  },
};
