/* eslint-disable no-unused-vars */
import {
  Box,
  Paper,
  Stack,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  styled,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationForm from "./LoactionForm";

const contactsInfo = [
  { icon: <MailIcon />, label: "Email", contactWay: "info@yourwebsite.com" },
  { icon: <CallIcon />, label: "Phone", contactWay: "+1 (800) 345 678" },
  {
    icon: <LocationOnIcon />,
    label: "Address",
    contactWay: "121 King Street, New York - USA",
  },
];

const shareOptions = [
  { name: "Facebook", icon: FacebookIcon, color: "#1877F2" },
  { name: "Twitter", icon: TwitterIcon, color: "#1DA1F2" },
  { name: "WhatsApp", icon: WhatsAppIcon, color: "#25D366" },
  { name: "Telegram", icon: TelegramIcon, color: "#0088cc" },
  { name: "Email", icon: EmailIcon, color: "#D44638" },
];

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.2)",
  },
}));

const ContactContent = () => {
  const handleClick = () => {};

  return (
    <Box sx={{ my: 15, mb: "5%" }}>
      <Typography
        align="center"
        sx={{
          textShadow: "0 10px 5px rgba(0, 0, 0, 0.1)",
          mb: 6,
        }}
        variant="h3"
        fontWeight="bold"
      >
        Get in touch
        <span style={{ color: "#0088ff" }}> with us</span>
      </Typography>

      <Box
        sx={{
          mt: 30,
          position: "relative",
          display: { xs: "flex", md: "block" },
          flexDirection: { xs: "column-reverse", md: "unset" },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems={"center"}
          spacing={4}
          sx={sxStyles.LocationFormStack}
        >
          <LocationForm />
        </Stack>

        <MapContainer
          center={[29.97371, 32.52627]}
          zoom={13}
          scrollWheelZoom={false}
          zoomControl={false}
          style={{ height: "600px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[29.97371, 32.52627]} />
          <ZoomControl position="bottomright" />
        </MapContainer>

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems={{ md: "stretch", xs: "center" }}
          spacing={4}
          sx={sxStyles.contactsInfoStack}
        >
          {contactsInfo.map((way, index) => (
            <Paper
              key={index}
              onClick={handleClick}
              elevation={1}
              sx={sxStyles.paper}
            >
              <Avatar className="contactWay" sx={sxStyles.avatar}>
                {way.icon}
              </Avatar>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {way.label}
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                {way.contactWay}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Box>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
        position={"relative"}
        sx={{ mt: { md: "45%", lg: "35%", xs: 4, sm: 6 } }}
        spacing={{ xs: 1, sm: 3 }}
      >
        {shareOptions.map((option) => (
          <Tooltip key={option.name} title={option.name}>
            <StyledIconButton
              sx={{
                "&:hover": {
                  color: option.color,
                },
              }}
            >
              <option.icon fontSize="large" />
            </StyledIconButton>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
};

export default ContactContent;

const sxStyles = {
  paper: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 3,
    pb: 4,
    pt: 0,
    width: { xs: "90%", md: "30%" },
    height: "100%",
    textAlign: "center",
    borderRadius: 3,
    position: "relative",
    overflow: "visible",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      transform: "translateY(-10px) scale(1.05)",
    },
    "&:hover .contactWay": {
      animation: "shake 0.4s ease-in-out ",
    },
    "@keyframes shake": {
      "0%": { transform: "translateX(0)" },
      "25%": { transform: "translateX(-8px)" },
      "50%": { transform: "translateX(8px)" },
      "75%": { transform: "translateX(-8px)" },
      "100%": { transform: "translateX(0)" },
    },
  },
  avatar: {
    bgcolor: "#0088ff",
    width: 56,
    height: 56,
    mt: -3,
    mb: 2,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  contactsInfoStack: {
    position: { md: "absolute", xs: "relative" },
    top: -80,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  LocationFormStack: {
    bgcolor: "white",
    borderRadius: 6,
    width: { md: "65%" },
    mx: "auto",
    mt: { xs: 5, md: 0 },
    position: { md: "absolute", xs: "relative" },
    top: "75%",
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
};
