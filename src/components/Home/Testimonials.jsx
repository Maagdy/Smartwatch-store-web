import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import TestimonialsSwiper from "../UI/TestimonialsSwiper";
import { useTheme } from "@emotion/react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    title: "This Watch is amazing! affordable price.",
    content:
      "I don't always clap, but when I do, it's because of pear watch. Pear watch has really helped me. I STRONGLY recommend pear watch to EVERYONE interested in fashion & tech! This is simply unbelievable!",
    name: "John Carter",
    job: "UX Designer",
    avatar: "images\\general\\testimonial-3.jpg",
  },
  {
    title: "Best tech purchase this year!",
    content:
      "The pear watch exceeded all my expectations. Its sleek design and advanced features make it a standout in the smartwatch market. The battery life is impressive, and the user interface is intuitive. Highly recommended for tech enthusiasts!",
    name: "Emma Thompson",
    job: "Software Engineer",
    avatar: "images\\general\\testimonial-4.jpg",
  },
];

export default function Testimonials() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <Stack
        my={20}
        maxWidth={"100%"}
        flexDirection="row"
        justifyContent="space-between"
        sx={{
          [theme.breakpoints.down("lg")]: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Box sx={sxStyles.swiperBox}>
          <TestimonialsSwiper testimonials={testimonials} />
        </Box>
        <Box sx={sxStyles.photosBox}>
          <Box
            component="img"
            src="images/general/man-airpods.jpg"
            alt="First Photo"
            sx={sxStyles.personImg}
          />
          <Box
            component="img"
            src="images/Watches/watch-front-home.png"
            alt="Second Photo"
            sx={sxStyles.watchImg}
          />
        </Box>
      </Stack>
      <Box sx={sxStyles.main}>
        <Stack
          px={{ xs: "20px", sm: "30px", md: "50px" }}
          pb={{ xs: "0" }}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          textAlign="center"
        >
          <Typography
            variant="h4"
            fontSize={{ xs: "24px", sm: "30px", md: "35px" }}
            fontWeight={"bold"}
            color="white"
          >
            Nearby Pear-Watch Stores
          </Typography>
          <Typography
            sx={{ m: { xs: 4, sm: 6, md: 8 } }}
            fontSize={{ xs: "0.875rem", sm: "1rem", md: "1.2rem" }}
            color="lightgrey"
          >
            A smartwatch is a wearable computer in the form of a watch; modern
            smartwatches provide a local touchscreen interface for daily use.
          </Typography>
        </Stack>
        <Box sx={sxStyles.btnBox}>
          <Button
            sx={sxStyles.btn}
            onClick={() => navigate("/watches")}
            variant="contained"
          >
            Purchase Now
          </Button>
          <IconButton
            sx={sxStyles.iconBtn}
            onClick={() => navigate("/contact")}
            variant="outlined"
          >
            <LocationOnIcon fontSize="medium" /> Find Nearby Stores
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

const sxStyles = {
  main: {
    width: "90vw",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundImage: "url('images/general/nearby-store.jpg')",
    backgroundSize: "cover",
    backgroundPosition: {
      xs: "center",
      sm: "calc(25% + 0px) center",
      md: "calc(10% + 0px) center",
      lg: "calc(25% + 0px) center",
    },
    backgroundRepeat: "no-repeat",
    boxShadow:
      "inset 0 0 0 2000px rgba(0, 0, 0, 0.7), 0 -30px 20px rgba(0, 0, 0, 0.2), 0 30px 20px rgba(0, 0, 0, 0.2)",
    borderRadius: "80px",
    mt: { xs: 10, sm: 20, md: 20 },
    mb: { xs: 10, sm: 15, md: 20 },
    position: "relative",
    padding: { xs: "10px", sm: "20px", md: "40px", lg: "60px" },
  },
  btnBox: {
    display: "flex",
    flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
    justifyContent: "center",
    alignItems: "center",
    gap: { md: 1 },
    pb: { md: 10 },
    "& > *": { mx: { xs: 1, sm: 0 }, mr: { md: 2 } },
  },
  iconBtn: {
    textTransform: "none",
    borderRadius: 10,
    bgcolor: "white",
    color: "black",
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 1, sm: 0.75, md: 1.3 },
    fontWeight: "bold",
    fontSize: { xs: "14px", sm: "16px", md: "18px" },
    "&:hover": {
      bgcolor: "#777777",
      color: "white",
    },
  },
  btn: {
    textTransform: "none",
    mb: { xs: 2.5, sm: 3, md: 0, lg: 0 },
    borderRadius: 10,
    bgcolor: "#ffffff",
    color: "black",
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 1, sm: 0.75, md: 1 },
    fontWeight: "bold",
    fontSize: { xs: "14px", sm: "16px", md: "18px" },
    "&:hover": {
      bgcolor: "black",
      color: "white",
    },
  },
  photosBox: {
    position: "relative",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  watchImg: {
    position: "absolute",
    bottom: {
      xs: "-30%",
      sm: "-10%",
    },
    left: {
      xs: "25%",
      sm: "-10%",
      md: "-18%",
    },
    maxWidth: "50%",
    maxHeight: "50%",
    borderRadius: "15%",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    },
  },
  personImg: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "8px",
    objectFit: "cover",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
    },
  },
  swiperBox: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
