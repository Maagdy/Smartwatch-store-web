import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../components/rootElements/Footer";
import ScrollToTop from "../components/UI/ScrollToTop";
import AutoScroll from "../components/UI/AutoScroll";
import Header from "../components/rootElements/Header";
import QuickView from "../components/UI/QuickView";
import { useSelector } from "react-redux";
import { selectQuickView } from "../store/slices/quickViewSlice";

export default function Root() {
  const isVisible = useSelector(selectQuickView);

  return (
    <>
      <Header />
      <AutoScroll />
      <ScrollToTop />
      <Container>
        {isVisible && <QuickView />}
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
