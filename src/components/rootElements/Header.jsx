import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { motion } from "framer-motion";
import DropdownWithCards from "../UI/DropdownWithCards";
import { useSelector } from "react-redux";
import DrawerNavigation from "./DrawerNavigation";
import { selectTotalQuantity } from "../../store/slices/productsSlice";
const PUBLIC_URL = window.location.origin;

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: -6,
    top: 25,
    border: `2px solid ${"white"}`,
    padding: "0 4px",
  },
}));

const LINKS = [
  { label: "Home", path: "/", ExpandIcon: false },
  {
    label: "Collections",
    path: null,
    ExpandIcon: <KeyboardArrowDownIcon />,
    categories: true,
  },
  {
    label: "Watches",
    path: "/watches",
    ExpandIcon: false,
  },
  {
    label: "Quick Find",
    path: null,
    ExpandIcon: <KeyboardArrowDownIcon />,
    subItems: [
      { label: "Sports", path: "/watches/sports" },
      { label: "Classic", path: "/watches/classic" },
      { label: "Modern", path: "/watches/modern" },
      { label: "Bestsellers", path: "/watches/bestsellers" },
      { label: "Custom", path: "/watches/custom" },
      { label: "More", path: "/watches" },
    ],
  },
  {
    label: "Pages",
    path: null,
    ExpandIcon: <KeyboardArrowDownIcon />,
    subItems: [
      { label: "Blog", path: "/blog" },
      { label: "About", path: "/about" },
      { label: "FAQ", path: "/faq" },
      { label: "Wishlist", path: "/wishlist" },
      { label: "My account", path: "/account" },
      { label: "Tracking orders", path: "/orders" },
      { label: "Items Compare", path: "/compare" },
    ],
  },
];

const bottomTabsLinks = [
  { label: "Home", btmTab: <HomeIcon fontSize="small" />, path: "/" },
  {
    label: "Store",
    btmTab: <ShoppingBagIcon fontSize="small" />,
    path: "/watches",
  },
  {
    label: "About us",
    btmTab: <InfoIcon fontSize="small" />,
    path: "/about",
  },
  {
    label: "Contact",
    btmTab: <ContactPageIcon fontSize="small" />,
    path: "/contact",
  },
];

export default function Header() {
  const totalQuantity = useSelector(selectTotalQuantity);
  const isMobile = useMediaQuery("(max-width:956px)");
  const isSmall = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleNav = () => {
    navigate("/cart");
  };

  const handleClickNav = (path, filterFunction) => {
    if (path) {
      if (filterFunction) {
        const filter = filterFunction();
        navigate(path, { state: { filter } });
      } else {
        navigate(path);
      }
    }
    setDrawerOpen(false);
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenuIndex(null);
  };

  const handleMultipleClicks = (event, index) => {
    const handleMenuOpen = (event, index) => {
      setAnchorEl(event.currentTarget);
      setOpenMenuIndex(index);
    };

    const handleModal = (event, index) => {
      setHoverIndex(index);
      setAnchorEl(event.currentTarget);
      if (LINKS[index].categories) {
        setModalIsOpen(true);
      }
    };

    handleMenuOpen(event, index);
    handleModal(event, index);
  };

  return (
    <Stack sx={sxStyles.main}>
      <AppBar position="fixed" elevation={6} sx={{ bgcolor: "white" }}>
        <Toolbar sx={sxStyles.Toolbar}>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  "&:hover": { bgcolor: "black", color: "white" },
                }}
                aria-label="cart"
                onClick={handleNav}
              >
                <StyledBadge
                  badgeContent={
                    totalQuantity > 0 ? (
                      <motion.div
                        key={totalQuantity}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {totalQuantity}
                      </motion.div>
                    ) : null
                  }
                  color="primary"
                >
                  <ShoppingCartIcon fontSize={"small"} />
                </StyledBadge>
              </IconButton>
              <Box
                component="a"
                href="/"
                sx={{ width: "30%", maxWidth: "150px" }}
              >
                <img
                  width="100%"
                  src={`${PUBLIC_URL}/images/general/logo-watch-shop.png`}
                />
              </Box>
              <IconButton
                edge="end"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  "&:hover": { bgcolor: "black", color: "white" },
                }}
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <>
              <Box component="a" href="/" sx={{ width: "15%" }}>
                <img
                  width="100%"
                  src={`${PUBLIC_URL}/images/general/logo-watch-shop.png`}
                  alt="logo"
                />
              </Box>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {LINKS.map((link, index) => (
                  <Box key={link.label}>
                    <Button
                      onClick={
                        link.ExpandIcon
                          ? (event) => handleMultipleClicks(event, index)
                          : () => handleClickNav(link.path)
                      }
                      sx={{
                        ...sxStyles.navBtn,
                        ...(location.pathname === link.path && {
                          color: "Black",
                        }),
                      }}
                    >
                      {link.label}
                      {link.ExpandIcon && link.ExpandIcon}
                      {index < LINKS.length - 1 && (
                        <Divider orientation="vertical" sx={{ ml: 1 }} />
                      )}
                    </Button>
                    {link.categories && (
                      <DropdownWithCards
                        onNav={() => setModalIsOpen(false)}
                        anchorEl={anchorEl}
                        open={modalIsOpen && hoverIndex === index}
                        onClose={() => setModalIsOpen(false)}
                      />
                    )}
                    {link.subItems && (
                      <Menu
                        anchorEl={anchorEl}
                        open={openMenuIndex === index}
                        onClose={handleMenuClose}
                        slotProps={{
                          paper: {
                            sx: {
                              width: "180px",
                              mt: 0.5,
                              bgcolor: "black",
                              color: "white",
                              borderRadius: "12px",
                              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                            },
                          },
                        }}
                      >
                        {link.subItems.map((item) => (
                          <MenuItem
                            key={item.label}
                            onClick={() => {
                              handleClickNav(item.path);
                              handleMenuClose();
                            }}
                            sx={{
                              position: "relative",
                              padding: "12px 20px",
                              color: "white",
                              transition:
                                "margin-left 0.3s ease, transform 0.3s ease",
                              "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                ml: 0.1,
                                fontSize: "18px",
                                "&::before": {
                                  content: '""',
                                  position: "absolute",
                                  left: 0,
                                  top: 0,
                                  bottom: 0,
                                  width: "4px",
                                  backgroundColor: "white",
                                },
                              },
                            }}
                          >
                            {item.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    )}
                  </Box>
                ))}
              </Box>
              <Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/contact");
                  }}
                  sx={sxStyles.button}
                >
                  Contact Us
                </Button>
                <IconButton onClick={handleNav} sx={sxStyles.iconButton}>
                  <StyledBadge
                    badgeContent={
                      totalQuantity > 0 ? (
                        <motion.div
                          key={totalQuantity}
                          initial={{ scale: 0.8, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          {totalQuantity}
                        </motion.div>
                      ) : null
                    }
                    color="primary"
                  >
                    <ShoppingCartIcon fontSize={"small"} />
                  </StyledBadge>
                </IconButton>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      {isMobile && (
        <>
          <>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            <DrawerNavigation
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
            />
          </>
          {isSmall && (
            <Box sx={sxStyles.bottomNavBox}>
              {bottomTabsLinks.map((link) => (
                <motion.div
                  key={link.label}
                  initial={{ y: 0 }}
                  style={{
                    width: "100%",
                  }}
                  whileHover={{
                    y: -10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    sx={{
                      ...sxStyles.bottomNavBtn,
                      ...(location.pathname === link.path && {
                        bgcolor: "#0088ff",
                        color: "white",
                        scale: 1.1,
                      }),
                    }}
                    onClick={() => handleClickNav(link.path)}
                  >
                    <Box>{link.btmTab}</Box>
                    <Box sx={{ fontWeight: "bold", fontSize: "10px" }}>
                      {link.label}
                    </Box>
                  </Button>
                </motion.div>
              ))}
            </Box>
          )}
        </>
      )}
      <Box sx={sxStyles.paddingBox} />
    </Stack>
  );
}

const sxStyles = {
  main: {
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 616141,
  },
  Toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navBtn: {
    my: 2,
    mx: 1,
    fontWeight: "bold",
    fontSize: "14px",
    textTransform: "none",
    color: "grey",
    display: "flex",
    "&:hover": {
      color: "black",
    },
  },
  bottomNavBox: {
    position: "fixed",
    gap: 1,
    bottom: 0,
    left: 0,
    right: 0,
    bgcolor: "black",
    height: 59,
    borderTop: 1,
    zIndex: 100000000,
    borderColor: "divider",
    display: "flex",
    justifyContent: "space-around",
  },
  bottomNavBtn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "none",
    color: "white",
    borderRadius: "20px 20px 0 0",
    height: "100%",
    width: "100%",
    padding: "8px 16px",
    "&:hover": {
      bgcolor: "#0088ff",
    },
  },
  drawerBtn: {
    display: "block",
    padding: "10px 20px",
    width: "100%",
    textAlign: "left",
    textTransform: "none",
  },
  button: {
    textTransform: "none",
    borderRadius: 10,
    bgcolor: "black",
    px: 4,
    py: 1,
    "&:hover": {
      bgcolor: "#0088ff",
    },
  },
  iconButton: {
    border: 1,
    borderColor: "#999",
    ml: 2,
  },
  paddingBox: {
    flexGrow: 1,
    padding: 3,
    marginTop: {
      xs: "0",
      sm: "0",
      md: "4.7%",
      lg: "4.7%",
      xl: "5%",
    },
  },
};
