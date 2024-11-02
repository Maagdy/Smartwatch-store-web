import {
  Box,
  Typography,
  Divider,
  Stack,
  TextField,
  Button,
} from "@mui/material";

const AccountForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      gap={4}
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        p: 3,
        boxShadow: 1,
        borderRadius: 8,
        mb: 10,
        mt: 5,
        backgroundColor: "rgba(0, 0, 0, .01)",
      }}
    >
      <Stack flex={1} direction={"column"} component="form">
        <Typography
          variant="h1"
          fontSize={"18px"}
          sx={{ position: "relative", mb: 2 }}
          fontWeight="bold"
        >
          Login
          <Divider
            sx={{
              width: "35px",
              borderBottomWidth: 2,
              mt: 1,
              mb: 2,
              bgcolor: "black",
            }}
          />
        </Typography>
        <TextField
          sx={{
            mb: 5,
          }}
          required
          fullWidth
          label="Username or email address"
          slotProps={{
            input: {
              sx: {
                borderRadius: 6,
              },
            },
          }}
        />
        <TextField
          sx={{
            mb: 4,
          }}
          required
          fullWidth
          label="Password"
          slotProps={{
            input: {
              sx: {
                borderRadius: 6,
              },
            },
          }}
        />
        <Box display="flex" flexDirection={"column"} justifyContent="left">
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "fit-content",
              borderRadius: 10,
              backgroundColor: "#0088ff",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            Login
          </Button>
          <Button
            sx={{
              width: "fit-content",
              borderRadius: 10,
              color: "black",
              mt: 1,
              fontSize: 12,
              background: "none",
              textTransform: "none",
              "&:hover": {
                color: "#0088ff",
              },
            }}
          >
            Forget your password?
          </Button>
        </Box>
      </Stack>
      <Stack flex={1} direction={"column"} component="form">
        <Typography
          variant="h1"
          fontSize={"18px"}
          sx={{ position: "relative", mb: 2 }}
          fontWeight="bold"
        >
          Register
          <Divider
            sx={{
              width: "35px",
              borderBottomWidth: 2,
              mt: 1,
              mb: 2,
              bgcolor: "black",
            }}
          />
        </Typography>
        <TextField
          sx={{
            mb: 2,
          }}
          required
          fullWidth
          label="Email address"
          slotProps={{
            input: {
              sx: {
                borderRadius: 6,
              },
            },
          }}
        />
        <Box display="flex" flexDirection={"column"} justifyContent="left">
          <Typography fontSize={12} my={2}>
            A link to set a new password will be sent to your email address.
          </Typography>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "fit-content",
              borderRadius: 10,
              backgroundColor: "#0088ff",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AccountForm;
