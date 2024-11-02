/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CollectionCard({ onNav, icon, title, path }) {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(`/watches/${path}`);
    // PASSING FUNCS FOR 2 LEVELS
    onNav && onNav();
  };

  return (
    <Box
      sx={sxStyles.main}
      component={motion.div}
      whileHover={{
        scale: 1.07,
        transition: { duration: 0.3 },
      }}
    >
      <Box sx={sxStyles.card}>
        <img src={icon} alt={title} style={{ width: "100%", height: "100%" }} />
      </Box>
      <Typography variant="subtitle1" sx={sxStyles.subTitle}>
        {title}
      </Typography>
      <Button variant="contained" onClick={handleNav} sx={sxStyles.button}>
        Check Now
      </Button>
    </Box>
  );
}

const sxStyles = {
  main: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "white",
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    height: "180px",
  },
  card: {
    width: "80px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  },
  subTitle: {
    fontWeight: "bold",
    marginBottom: "22px",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2196f3",
    color: "white",
    "&:hover": {
      backgroundColor: "#202020",
      color: "white",
    },
    borderRadius: "20px",
    textTransform: "none",
  },
};
