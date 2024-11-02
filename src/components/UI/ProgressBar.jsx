/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { motion, useInView } from "framer-motion";

const MotionLinearProgress = motion.create(LinearProgress);

const AnimatedProgressBar = ({ label, percentage, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Box ref={ref} sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}
        >
          {label}
        </Typography>
        <Typography variant="body1" sx={{ color: "#666" }}>
          {`${percentage}%`}
        </Typography>
      </Box>

      <MotionLinearProgress
        variant="determinate"
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: delay }}
        sx={{
          height: 12,
          borderRadius: 6,
          bgcolor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            borderRadius: 6,
            bgcolor: "#000",
          },
        }}
        value={percentage}
      />
    </Box>
  );
};

const ProgressBarsSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      <AnimatedProgressBar label="Watches Quality" delay={0} percentage={99} />
      <AnimatedProgressBar
        label="Guarantee and Support"
        delay={0.4}
        percentage={98}
      />
      <AnimatedProgressBar
        delay={1}
        label="Other Watches Services"
        percentage={87}
      />
    </Box>
  );
};

export default ProgressBarsSection;
