import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { closeSnackbar } from "../../store/slices/snackbarSlice";
import { Link } from "react-router-dom";

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity, path } = useSelector(
    (state) => state.snackbar
  );

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  const content =
    severity === "success" && path ? (
      <>
        {message}{" "}
        <Link to={path} style={{ color: "#fff", textDecoration: "underline" }}>
          View {path.replace(/^\//, "")} {path === "/compare" && "list"}
        </Link>
      </>
    ) : (
      message
    );
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{
          width: { xs: "90%", sm: "fit-content" },
          mt: 10,
        }}
      >
        {content}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
