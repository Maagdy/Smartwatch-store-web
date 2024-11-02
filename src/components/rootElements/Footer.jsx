import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const PUBLIC_URL = window.location.origin;

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

const Footer = () => {
  const theme = useTheme();
  const isMid = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "rgb(241, 242, 246)",
        borderRadius: "80px 80px 0 0",
        py: 3,
        zIndex: 1145415,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          direction={isMid ? "column" : "row"}
          alignItems="center"
          justifyContent={isMid ? "center" : "flex-start"}
        >
          <Grid
            item
            xs={12}
            md={3}
            sx={{ textAlign: isMid ? "center" : "left" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "left",
                },
                mb: 1,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: isMid ? "40%" : "60%",
                  maxWidth: "200px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  width="100%"
                  height="auto"
                  src={`${PUBLIC_URL}/images/general/logo-watch-shop.png`}
                  alt="Watch Shop Logo"
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Box>
            <Typography variant="body2" mt={2} color="text.secondary">
              A smartwatch is a wearable computer in the form of a watch; modern
              smartwatches provide a local touchscreen interface for daily use.
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: isMid ? "center" : "flex-start",
              }}
            >
              {socialMediaIcons.map((social) => (
                <IconButton
                  key={social.name}
                  size="small"
                  color="inherit"
                  href={social.link}
                  sx={{
                    border: "1px solid #b0b0b0",
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
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ textAlign: isMid ? "center" : "left" }}
          >
            <Typography variant="h6" mb={2} fontWeight="bold" gutterBottom>
              Menu
            </Typography>
            {["Home", "Books", "Collections", "Categories"].map((item) => (
              <Link
                key={item}
                href={null}
                color="textSecondary"
                display="block"
                sx={{
                  cursor: "pointer",
                  mb: 1,
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {item}
              </Link>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              textAlign: isMid ? "center" : "left",
              my: isMid ? 2 : "",
            }}
          >
            <Typography variant="h6" mb={2} fontWeight="bold" gutterBottom>
              Support
            </Typography>
            {["FAQs", "Terms & Conditions", "Privacy Policy", "Report"].map(
              (item) => (
                <Link
                  key={item}
                  href={null}
                  color="textSecondary"
                  display="block"
                  sx={{
                    cursor: "pointer",
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {item}
                </Link>
              )
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ textAlign: isMid ? "center" : "left" }}
          >
            <Typography variant="h6" fontWeight={"bold"} gutterBottom>
              Stay in Touch
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{
                maxWidth: isMid ? "80%" : "100%",
                margin: isMid ? "0 auto" : "0",
              }}
            >
              <TextField
                fullWidth
                placeholder="Email address ..."
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "black",
                  "&:hover": { bgcolor: "primary.main" },
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: isMid ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: isMid ? 1 : 0,
              textAlign: isMid ? "center" : "left",
            }}
          >
            XTRA Shop © {new Date().getFullYear()} All Rights Reserved.
          </Typography>
          <Link
            href="orders"
            color="textSecondary"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isMid ? "center" : "flex-start",
              textDecoration: "none",
            }}
          >
            <ShoppingCartIcon sx={{ mr: 1 }} /> Track your orders
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
