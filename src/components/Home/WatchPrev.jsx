import { Box, Stack, Typography } from "@mui/material";

const features = [
  { Link: "images\\general\\drop.png", Name: "Water proof" },
  {
    Link: "images\\general\\battery.png",
    Name: "Battery life",
  },
  { Link: "images\\general\\alarm.png", Name: "Alarm" },
  { Link: "images\\general\\cloudy.png", Name: "Weather" },
];

const sxStyles = {
  main: {
    width: "90vw",
    backgroundImage: "url('images/general/smartwatchbackground.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    boxShadow:
      "inset 0 0 0 2000px rgba(0, 0, 0, 0.7), 0 -30px 20px rgba(0, 0, 0, 0.2), 0 30px 20px rgba(0, 0, 0, 0.2)",
    borderRadius: "80px",
    mt: { xs: 10, sm: 20, md: 25 },
    mb: { xs: 10, sm: 15, md: 20 },
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    position: "relative",
  },
  servicesBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: { xs: "70%", sm: "unset" },
    flexBasis: { xs: "50%", sm: "auto" },
    marginBottom: { xs: 0.5, sm: 2, md: 2 },
    transition: "transform 0.6s ease",
    "&:hover div": {
      transform: "rotateY(360deg)",
      bgcolor: "black",
      transition: "all 0.6s ease",
    },
    "&:hover img": {
      filter: "brightness(0) invert(1)",
    },
  },
  imgBox: {
    borderRadius: "50%",
    bgcolor: "white",
    mb: { xs: 0.5, sm: 1, md: 1 },
    width: { xs: "65px", sm: "80px", md: "100px" },
    height: { xs: "65px", sm: "80px", md: "100px" },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.6s ease",
    position: "relative",
    overflow: "hidden",
  },
};

export default function WatchPrev() {
  return (
    <Box sx={sxStyles.main}>
      <Stack
        px={{ xs: 3, sm: 4, md: 8, lg: 15 }}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign="center"
      >
        <Typography
          variant="h4"
          fontSize={{ xs: "24px", sm: "30px", md: "35px" }}
          fontWeight={"bold"}
          pb={{ lg: 6, md: 4, xs: 3 }}
          color="white"
        >
          Gadget XTRA WordPress Theme
        </Typography>
        <Typography
          fontSize={{ xs: "0.8rem", sm: "1rem", md: "1.2rem" }}
          color="white"
        >
          A smartwatch is a wearable computer in the form of a watch; modern
          smartwatches provide a local touchscreen interface for daily use,
          while an associated smartphone app provides for management and
          telemetry (such as long-term biomonitoring)
        </Typography>
      </Stack>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={{ sm: 6, md: 8, xs: 0 }}
        sx={{
          gap: { lg: 8, md: 6, sm: 2 },
          flexWrap: "wrap",
        }}
      >
        {features.map((feature, index) => (
          <Box key={index} sx={sxStyles.servicesBox}>
            <Box sx={sxStyles.imgBox}>
              <img
                width="60%"
                height="60%"
                style={{
                  objectFit: "contain",
                  transition: "all 0.6s ease",
                }}
                src={feature.Link}
                alt={feature.Name}
              />
            </Box>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: 12, sm: 14, md: 16 },
              }}
              textAlign="center"
            >
              {feature.Name}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
