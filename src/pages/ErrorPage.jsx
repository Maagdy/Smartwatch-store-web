import { Box, Button, Container, Typography, Paper, Grid } from "@mui/material";
import {
  Error as ErrorIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

const ErrorPage = () => {
  const goBack = () => window.history.back();
  const goHome = () => (window.location.href = "/");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "background.default",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <ErrorIcon
            sx={{
              fontSize: 80,
              color: "error.main",
              mb: 2,
              animation: "bounce 2s infinite",
            }}
          />

          <Box position="relative" my={4}>
            <Typography
              variant="h1"
              sx={{
                fontSize: "8rem",
                fontWeight: "bold",
                color: "grey.200",
                lineHeight: 1,
              }}
            >
              404
            </Typography>
            <Typography
              variant="h4"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "text.primary",
              }}
            >
              Page Not Found
            </Typography>
          </Box>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            Oops! It seems you&apos;ve ventured into uncharted territory.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            The page you&apos;re looking for might have been moved, deleted, or
            possibly never existed.
          </Typography>

          <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={goBack}
                size="large"
              >
                Go Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<HomeIcon />}
                onClick={goHome}
                size="large"
                color="primary"
              >
                Return Home
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default ErrorPage;
