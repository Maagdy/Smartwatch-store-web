import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import WatchesPage from "./pages/WatchesPage";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ContactPage from "./pages/ContactPage";
import ComparePage from "./pages/ComparePage";
import OrdersPage from "./pages/OrdersPage";
import AccountPage from "./pages/AccountPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/watches",
        element: <WatchesPage />,
      },
      {
        path: "/watches/:category",
        element: <WatchesPage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },

      { path: "/about", element: <AboutPage /> },
      { path: "/faq", element: <FAQPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CartPage /> },
      { path: "/wishlist", element: <WishlistPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/compare", element: <ComparePage /> },
      {
        path: "/account",
        element: <AccountPage />,
      },
      { path: "/orders", element: <OrdersPage /> },
    ],
  },
]);

const theme = createTheme();

function App() {
  return (
    <>
      <CssBaseline />
      <div>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
