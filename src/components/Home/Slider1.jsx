import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Slider1() {
  const navigate = useNavigate();
  return (
    <Stack
      direction={{ xs: "column-reverse", sm: "row" }}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{
        maxWidth: "100%",
        overflow: {
          xs: "hidden",
          sm: "visible",
        },
      }}
    >
      <Box
        height="100%"
        width={{ xs: "100%", sm: "auto" }}
        sx={{
          textAlign: { xs: "center", sm: "left" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          component={motion.div}
          initial={{ opacity: 0.25, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          mb={{ md: 3 }}
          fontFamily="Poppins"
          fontSize={{ xs: "15px", sm: "16px", md: "21px" }}
          color="textSecondary"
        >
          Skip the impossible
        </Typography>
        <Typography
          component={motion.div}
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: 1, scale: 1 }}
          mb={{ xs: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          fontSize={{ xs: "29px", sm: "40px", md: "52px" }}
          variant={"h3"}
        >
          Extraordinary
        </Typography>
        <Typography
          component={motion.div}
          initial={{ opacity: 0, scale: 1.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          fontSize={{ xs: "48px", sm: "53px", md: "69px" }}
          fontWeight="bold"
          variant="h2"
        >
          Performance
        </Typography>
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 1.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.65 }}
          mt={{ xs: 2 }}
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "row" },
            justifyContent: { xs: "center", sm: "flex-start" },
            "& > *": { mx: { xs: 1, sm: 0 }, mr: { sm: 2 } },
          }}
        >
          <Button
            sx={sxStyles.btn}
            onClick={() => navigate("/watches")}
            variant="contained"
          >
            Purchase Now
          </Button>
          <IconButton sx={sxStyles.iconBtn} variant="outlined">
            <PlayCircleOutlineOutlinedIcon fontSize="small" /> Watch Video
          </IconButton>
        </Box>
      </Box>
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
        width={{ xs: "65%", sm: "45.5%" }}
        mb={{ xs: 2, sm: 0 }}
      >
        <img
          style={{ width: "100%", height: "auto", display: "block" }}
          src="images/general/slide-1.png"
          alt="Slide"
        />
      </Box>
    </Stack>
  );
}

const sxStyles = {
  btn: {
    textTransform: "none",
    borderRadius: 10,
    bgcolor: "#0088ff",
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 1, sm: 0.75, md: 1 },
    mr: { xs: 2, sm: 1.75, md: 2 },
    fontWeight: "bold",
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
    "&:hover": {
      bgcolor: "black",
      color: "white",
    },
  },
  iconBtn: {
    textTransform: "none",
    borderRadius: 10,
    border: "1px solid black",
    bgcolor: "white",
    color: "black",
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 0.5, sm: 0.75, md: 1 },
    fontWeight: "bold",
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
    "&:hover": {
      bgcolor: "#0088ff",
      color: "white",
    },
  },
};
