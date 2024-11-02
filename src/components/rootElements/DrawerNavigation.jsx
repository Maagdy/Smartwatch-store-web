/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import CloseIcon from "@mui/icons-material/Close";

const socialMediaIcons = [
  {
    name: "Twitter",
    icon: <TwitterIcon />,
    link: "https://x.com/ME_G_Z?t=I8BHm2I-7Jh7Ex0fWmalgw&s=09",
    hoverColor: "#1DA1F2",
  },
  {
    name: "Instagram",
    icon: <InstagramIcon />,
    link: "https://www.instagram.com/_maagdyy_?igsh=MTRuajB4emRkZ2Rtaw==",
    hoverColor: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
  },
  {
    name: "Linkedin",
    icon: <LinkedInIcon />,
    link: "https://www.linkedin.com/in/mohamed-magdy-24b7ba320/",
    hoverColor: "#005b8e",
  },
];
export default function DrawerNavigation({ drawerOpen, setDrawerOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
      setDrawerOpen(false);
    }
  };

  return (
    <>
      {drawerOpen && (
        <IconButton
          size="large"
          onClick={() => setDrawerOpen(false)}
          sx={{
            color: "white",
            background: "none",
            ":hover": {
              color: "white",
              rotate: "180deg",
              transition: "0.3s",
            },
            position: "fixed",
            right: 280,
            zIndex: 1300,
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 280,
            height: "150%",
            bgcolor: "black",
            color: "white",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={1}>
            {LINKS.map((link) =>
              link.ExpandIcon ? (
                <Accordion
                  key={link.label}
                  expanded={expanded === link.label}
                  onChange={handleAccordionChange(link.label)}
                  TransitionProps={{ timeout: 1000 }}
                  sx={{
                    bgcolor: "transparent",
                    boxShadow: "none",
                    color: "white",
                    "&:before": { display: "none" },
                    "& .MuiAccordionSummary-root": {
                      minHeight: 48,
                      py: 1,
                      px: 2,
                      borderRadius: "100px",
                      bgcolor:
                        location.pathname === link.path
                          ? "white"
                          : "transparent",
                      color:
                        location.pathname === link.path ? "black" : "white",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                      },
                      "& .MuiCollapse-root": {
                        bgcolor: "transparent",
                      },
                      "& .MuiAccordionDetails-root": {
                        bgcolor: "transparent",
                      },
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <KeyboardArrowDownIcon
                        sx={{
                          color:
                            location.pathname === link.path ? "black" : "white",
                        }}
                      />
                    }
                  >
                    <Typography sx={{ fontWeight: 500, background: "none" }}>
                      {link.label}
                    </Typography>
                  </AccordionSummary>
                  {link.subItems && (
                    <AccordionDetails sx={{ pt: 1, pb: 0 }}>
                      <Stack spacing={1} pl={2}>
                        {link.subItems.map((item) => (
                          <Typography
                            key={item.label}
                            onClick={() => handleNavigation(item.path)}
                            sx={{
                              py: 1,
                              cursor: "pointer",
                              color:
                                location.pathname === item.path
                                  ? "white"
                                  : "rgba(255, 255, 255, 0.5)",
                              fontWeight:
                                location.pathname === item.path
                                  ? "bold"
                                  : "transparent",
                              borderRadius: "4px",
                              px: 1,
                              "&:hover": {
                                color: "white",
                              },
                            }}
                          >
                            {item.label}
                          </Typography>
                        ))}
                      </Stack>
                    </AccordionDetails>
                  )}
                </Accordion>
              ) : (
                <Typography
                  key={link.label}
                  onClick={() => handleNavigation(link.path)}
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: "100px",
                    bgcolor:
                      location.pathname === link.path ? "white" : "transparent",
                    color: location.pathname === link.path ? "black" : "white",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {link.label}
                </Typography>
              )
            )}
          </Stack>

          <Box display={"flex"} gap={2} mt={1} flexDirection={"column-reverse"}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mb: 10 }}
            >
              {socialMediaIcons.map((social) => (
                <IconButton
                  key={social.name}
                  size="small"
                  color="inherit"
                  href={social.link}
                  sx={{
                    mx: 1,
                    "&:hover": {
                      backgroundImage:
                        social.name === "Instagram"
                          ? social.hoverColor
                          : `none`,
                      backgroundColor:
                        social.name !== "Instagram"
                          ? social.hoverColor
                          : "transparent",
                      borderColor:
                        social.name === "Instagram"
                          ? "transparent"
                          : social.hoverColor,
                      color: "#fff",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
            <Typography
              align="center"
              sx={{
                color: "white",
                opacity: 0.7,
                fontSize: "0.8rem",
              }}
            >
              © Copyright 2024
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

const LINKS = [
  { label: "Home", path: "/", ExpandIcon: false },
  {
    label: "Collections",
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
