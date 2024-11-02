import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Pagination,
} from "@mui/material";
import { useRef, useState, useMemo } from "react";
import ProductCard from "../UI/PrdouctCard";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProducts } from "../../store/slices/productsSlice";
import ErrorPage from "../../pages/ErrorPage";

export default function Watches() {
  const theme = useTheme();
  const Products = useSelector(selectProducts);
  const { category } = useParams();
  const validCategories = [
    "modern",
    "classic",
    "bestsellers",
    "sports",
    "custom",
  ];

  const hint = useRef("");
  const [inputValue, setInputValue] = useState("");
  const [filterType, setFilterType] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const sortedProducts = useMemo(() => {
    let sorted = [...Products];
    switch (filterType) {
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "priceLow":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "alphabet":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [filterType, Products]);

  const itemsPerPage = 8;

  const totalPages = Math.ceil(Products.length / itemsPerPage);

  const filteredProducts = useMemo(() => {
    return sortedProducts.filter((product) => {
      const matchesCategory = category ? product.category === category : true;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(inputValue.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [sortedProducts, category, inputValue]);

  const currentProducts = useMemo(() => {
    const indexOfLastProd = currentPage * itemsPerPage;
    const indexOfFirstProd = indexOfLastProd - itemsPerPage;
    return filteredProducts.slice(indexOfFirstProd, indexOfLastProd);
  }, [currentPage, filteredProducts]);

  if (category && !validCategories.includes(category)) {
    return <ErrorPage />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: filteredProducts.length <= 3 ? "center" : "flex-end",
        mb: 10,
        mt: 5,
      }}
    >
      <Box sx={sxStyles.filterSection}>
        <Autocomplete
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              if (hint.current) {
                setInputValue(hint.current);
                event.preventDefault();
              }
            }
          }}
          onClose={() => {
            hint.current = "";
          }}
          onChange={(event, newValue) => {
            setInputValue(newValue && newValue.name ? newValue.name : "");
            setCurrentPage(1);
          }}
          disablePortal
          inputValue={inputValue}
          id="combo-box-hint-demo"
          options={Products}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <Box sx={{ position: "relative" }}>
              <Typography sx={sxStyles.searchedItem}>{hint.current}</Typography>
              <TextField
                {...params}
                onChange={(event) => {
                  const newValue = event.target.value;
                  setInputValue(newValue);
                  const matchingOption = Products.find((option) =>
                    option.name.toLowerCase().startsWith(newValue.toLowerCase())
                  );

                  if (newValue && matchingOption) {
                    hint.current = matchingOption.name;
                  } else {
                    hint.current = "";
                  }
                }}
                label="Watch"
              />
            </Box>
          )}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-select-label">Filter By</InputLabel>
          <Select
            labelId="filter-select-label"
            id="filter-select"
            value={filterType}
            label="Filter By"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="priceLow">Price: Low to High</MenuItem>
            <MenuItem value="priceHigh">Price: High to Low</MenuItem>
            <MenuItem value="alphabet">Alphabetical</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {currentProducts.length >= 6 && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
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
        {currentProducts.length === 0 && (
          <Typography variant="h6" align="center" fontWeight={"bold"}>
            No Products Found!
          </Typography>
        )}
        {currentProducts.map((prod) => (
          <ProductCard key={prod.id} to={prod.to} product={prod} />
        ))}
      </Stack>
    </Box>
  );
}

const sxStyles = {
  filterSection: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    flexWrap: { xs: "wrap" },
    gap: 2,
    marginBottom: 2,
  },
  searchedItem: {
    position: "absolute",
    opacity: 0.5,
    left: 14,
    top: 16,
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "calc(100% - 75px)",
  },
};
