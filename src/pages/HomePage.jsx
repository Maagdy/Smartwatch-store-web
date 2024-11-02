import { Box } from "@mui/material";
import HomeContent from "../components/Home/HomeContent";
import SmartWatchDiagram from "../components/Home/SmartWatchDiagram";
import Testimonials from "../components/Home/Testimonials";
import GlobalSnackbar from "../components/UI/GlobalSnackbar";
import ProductsPrev from "../components/Home/ProductsPrev";
import WatchPrev from "../components/Home/WatchPrev";

export default function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HomeContent />
      <SmartWatchDiagram />
      <WatchPrev />
      <ProductsPrev />
      <Testimonials />
      <GlobalSnackbar />
    </Box>
  );
}
