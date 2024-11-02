import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import SpeedIcon from "@mui/icons-material/Speed";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import WatchIcon from "@mui/icons-material/Watch";

const sxStyles = {
  hover: {
    transition: "transform 0.3s ease-in-out",
    "&:hover svg": {
      transform: "rotateY(360deg)",
    },
  },
};

const DiagramContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: "800px",
  height: "600px",
  margin: "0 auto",
  [theme.breakpoints.down("lg")]: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
}));

const WatchImage = styled("img")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  height: "auto",
  [theme.breakpoints.down("lg")]: {
    position: "static",
    transform: "none",
    width: "100%",
    maxWidth: "600px",
    margin: "20px 0",
  },
}));

const FeatureLabel = styled(Box)(({ theme, top, left, right, textAlign }) => ({
  position: "absolute",
  top,
  left,
  right,
  width: "200px",
  textAlign,
  [theme.breakpoints.down("lg")]: {
    position: "static",
    width: "100%",
    textAlign: "left",
    marginRight: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    flexDirection: "row",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  color: "#0088FE",
  marginBottom: "8px",
  [theme.breakpoints.down("lg")]: {
    marginRight: "15px",
    marginBottom: 0,
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.2rem",
  marginBottom: "4px",

  [theme.breakpoints.down("lg")]: {
    whiteSpace: "nowrap",
  },
}));

const Description = styled(Typography)({
  color: "#666",
  fontSize: "0.8rem",
});

const FeaturesGroup = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
  },
}));

const SmartWatchDiagram = () => {
  return (
    <DiagramContainer>
      <FeaturesGroup>
        <FeatureLabel
          sx={sxStyles.hover}
          top="8%"
          left="-13%"
          textAlign="right"
        >
          <IconWrapper>
            <SpeedIcon
              sx={{ transition: "transform 0.3s ease-in-out" }}
              fontSize="large"
            />
          </IconWrapper>
          <Box>
            <Title fontSize={{ xs: "1.1rem", sm: "1.2rem" }}>
              Extraordinary Performance
            </Title>
            <Description>
              A smartwatch is a wearable computer in the form of a watch.
            </Description>
          </Box>
        </FeatureLabel>

        <FeatureLabel
          sx={sxStyles.hover}
          top="38%"
          left="-16%"
          textAlign="right"
        >
          <IconWrapper>
            <BatteryChargingFullIcon
              sx={{ transition: "transform 0.3s ease-in-out" }}
              fontSize="large"
            />
          </IconWrapper>
          <Box>
            <Title fontSize={{ xs: "1.1rem", sm: "1.2rem" }}>
              Excellent battery life
            </Title>
            <Description>
              A smartwatch is a wearable computer in the form of a watch.
            </Description>
          </Box>
        </FeatureLabel>

        <FeatureLabel
          sx={sxStyles.hover}
          top="66%"
          left="-13%"
          textAlign="right"
        >
          <IconWrapper>
            <PhonelinkIcon
              sx={{ transition: "transform 0.3s ease-in-out" }}
              fontSize="large"
            />
          </IconWrapper>
          <Box>
            <Title fontSize={{ xs: "1.1rem", sm: "1.2rem" }}>
              Connectable to android/iOS
            </Title>
            <Description>
              A smartwatch is a wearable computer in the form of a watch.
            </Description>
          </Box>
        </FeatureLabel>
      </FeaturesGroup>

      <WatchImage src="images\general\features.jpg" alt="Smartwatch" />

      <FeaturesGroup>
        <FeatureLabel
          sx={sxStyles.hover}
          top="9%"
          right="-10%"
          textAlign="left"
        >
          <IconWrapper>
            <AccessTimeIcon
              sx={{ transition: "transform 0.3s ease-in-out" }}
              fontSize="large"
            />
          </IconWrapper>
          <Box>
            <Title fontSize={{ xs: "1.1rem", sm: "1.2rem" }}>
              Shows time & date
            </Title>
            <Description>
              A smartwatch is a wearable computer in the form of a watch.
            </Description>
          </Box>
        </FeatureLabel>

        <FeatureLabel
          sx={sxStyles.hover}
          top="38%"
          right="-15%"
          textAlign="left"
        >
          <IconWrapper>
            <AttachMoneyIcon
              sx={{ transition: "transform 0.3s ease-in-out" }}
              fontSize="large"
            />
          </IconWrapper>
          <Box>
            <Title fontSize={{ xs: "1.1rem", sm: "1.2rem" }}>
              Affordable price
            </Title>
            <Description>
              A smartwatch is a wearable computer in the form of a watch.
            </Description>
          </Box>
        </FeatureLabel>

        <FeatureLabel
          sx={sxStyles.hover}
          top="66%"
          right="-10%"
          textAlign="left"
        >
          <IconWrapper>
            <WatchIcon
              sx={{ transition: "transform 0.3s ease-in-out" }}
              fontSize="large"
            />
          </IconWrapper>
          <Box>
            <Title fontSize={{ xs: "1.1rem", sm: "1.2rem" }}>
              Best Quality and design
            </Title>
            <Description>
              A smartwatch is a wearable computer in the form of a watch.
            </Description>
          </Box>
        </FeatureLabel>
      </FeaturesGroup>
    </DiagramContainer>
  );
};

export default SmartWatchDiagram;
