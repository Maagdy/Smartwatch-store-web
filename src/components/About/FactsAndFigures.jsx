/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { motion, useInView } from "framer-motion";

const factData = [
  { number: 27, label: "Years of experience", delay: 0 },
  { number: 34, label: "Expert Supports", delay: 0.75 },
  { number: 16, label: "Awards Winners", delay: 1.5 },
  { number: 800, label: "Happy Clients", delay: 3 },
];

const CountUp = ({ number, duration = 3, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let start = 0;
        const increment = number / (duration * 60);

        const interval = setInterval(() => {
          start += increment;
          if (start >= number) {
            start = number;
            clearInterval(interval);
          }
          setCount(Math.floor(start));
        }, 1000 / 60);

        return () => clearInterval(interval);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, number, duration, delay]);

  return (
    <motion.div ref={ref}>
      <Typography variant="h2" component="span">
        {count}
      </Typography>
    </motion.div>
  );
};

const FactItem = ({ number, label, delay }) => {
  return (
    <Box sx={sxStyles.factItem}>
      <CountUp number={number} delay={delay} />
      <Typography className="factLabel" sx={sxStyles.factLabel}>
        {label}
      </Typography>
    </Box>
  );
};

const FactsAndFigures = () => {
  return (
    <Box sx={sxStyles.main}>
      <Typography sx={sxStyles.subtitle} variant="h4">
        Our facts and figures
      </Typography>
      <Typography sx={sxStyles.subtitle2} variant="subtitle1">
        You can trust our watches and the quality and professionalism of our
        products.
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          mt: "6%",
          mx: 1,
        }}
      >
        <Grid container spacing={2}>
          {factData.map((fact, index) => (
            <Grid item xs={6} sm={6} md={6} lg={3} key={index}>
              <FactItem
                number={fact.number}
                label={fact.label}
                delay={fact.delay}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default FactsAndFigures;

const sxStyles = {
  main: {
    mb: "10%",
    px: 0,
    py: 8,
    color: "white",
    position: "relative",
    backgroundImage: `url('/images/general/watchPrev.webp')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "95vw",
    height: { xs: "80vh", sm: "95vh", md: "95vh", lg: "80vh" },
    borderRadius: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.6)",
  },
  factItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-10px)",
    },
    "&:hover .factLabel": {
      bgcolor: "#0088ff",
      color: "white",
      transition: "all 0.3s ease",
    },
  },
  factLabel: {
    mt: { xs: "0%", sm: "10%" },
    py: { xs: 1, sm: 1.5, md: 2 },
    px: { xs: 2, sm: 4, md: 3 },
    width: { xs: "100%", lg: "fit-content" },
    textAlign: "center",
    bgcolor: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
    borderRadius: 3,
  },
  subtitle: {
    bgcolor: "#0088ff",
    width: "fit-content",
    px: { xs: 4, sm: 6, md: 8 },
    py: { xs: 2, sm: 3, md: 4 },
    borderRadius: 3,
    position: "absolute",
    top: "0%",

    left: "50%",
    fontWeight: "bold",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
  },
  subtitle2: {
    color: "lightgrey",
    textAlign: "center",
    mt: 3,
    fontSize: { xs: "16px", sm: "18px", md: "20px" },
    px: { xs: 1, sm: 2, md: 3 },
  },
};
