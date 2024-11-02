import React, { useState, useEffect } from "react";
import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate, useLocation } from "react-router-dom";

const steps = [
  { id: 1, label: "Shopping Cart", miniLabel: "Cart", path: "/cart" },
  {
    id: 2,
    label: "Checkout Details",
    miniLabel: "Checkout",
    path: "/checkout",
  },
  {
    id: 3,
    label: "Order Complete",
    miniLabel: "Complete",
    path: "/order-complete",
  },
];

const CheckoutProgress = () => {
  const isXs = useMediaQuery("(max-width:600px)");

  const [currentStep, setCurrentStep] = useState(() => {
    return parseInt(localStorage.getItem("currentCheckoutStep") || "1", 10);
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const step = steps.find((step) => step.path === location.pathname);
    if (step) {
      setCurrentStep(step.id);
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("currentCheckoutStep", currentStep.toString());
  }, [currentStep]);

  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      navigate(step.path);
    }
  };

  return (
    <Stack
      sx={{
        width: "fit-content",
        my: 5,
        mx: "auto",
      }}
      spacing={2}
      alignItems="center"
    >
      <Stack direction="row" spacing={{ lg: 4, xs: 2 }} alignItems="center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <Button
              onClick={() => handleStepChange(step.id)}
              disabled={currentStep === step.id || step.id === 3}
              variant=""
              startIcon={
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    mx: 1,
                    backgroundColor:
                      currentStep === step.id ? "black" : "lightgrey",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {step.id}
                </Box>
              }
              sx={{
                fontSize: { xs: 14, sm: 15, md: 20, lg: 23 },
                textTransform: "none",
                textAlign: "left",
                color:
                  currentStep === step.id ? "black !important" : "lightgrey",
                "&:hover": {
                  color: "#0088ff",
                  backgroundColor: "transparent",
                  transition: "all 0.3s ease-in-out",
                  "& .MuiBox-root": {
                    transition: "all 0.3s ease-in-out",
                    backgroundColor: "#0088ff",
                  },
                },
              }}
            >
              {isXs ? step.miniLabel : step.label}
            </Button>
            {index < steps.length - 1 && (
              <ArrowForwardIcon fontSize="medium" sx={{ color: "lightgrey" }} />
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
};

export default CheckoutProgress;
