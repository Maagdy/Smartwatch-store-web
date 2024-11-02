import { Box } from "@mui/material";
import AboutContent from "../components/About/AboutContent";
import FactsAndFigures from "../components/About/FactsAndFigures";
import AboutTestimonials from "../components/About/AboutTestimonials";

export default function AboutPage() {
  return (
    <Box>
      <AboutContent />
      <FactsAndFigures />
      <AboutTestimonials />
    </Box>
  );
}
