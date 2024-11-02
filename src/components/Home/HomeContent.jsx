import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider1 from "./Slider1";
import Slider2 from "./Slider2";
import { Box } from "@mui/material";

export default function HomeContent() {
  const [currentComponent, setCurrentComponent] = useState("Component1");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentComponent((prevComponent) =>
        prevComponent === "Component1" ? "Component2" : "Component1"
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: {
          xs: "75vh",
          sm: "55vh",
          md: "80vh",
          lg: "80vh",
        },
      }}
    >
      <AnimatePresence>
        {currentComponent === "Component1" && (
          <motion.div
            key="component1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Slider1 />
          </motion.div>
        )}

        {currentComponent === "Component2" && (
          <motion.div
            key="component2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Slider2 />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
