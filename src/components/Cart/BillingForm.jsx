/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import { countries } from "../../data/countries";

const BillingForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    street: "",
    houseNumber: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "phone" || name === "zipCode") {
      const newValue = value.replace(/[^0-9-]/g, "").replace(/--+/g, "-");
      setFormData((prevData) => ({ ...prevData, [name]: newValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        p: 3,
        boxShadow: 1,
        borderRadius: 8,
        backgroundColor: "rgba(0, 0, 0, .01)",
      }}
    >
      <Typography
        variant="h1"
        fontSize={"18px"}
        sx={{ position: "relative", mb: 2 }}
        fontWeight="bold"
      >
        Billing Details
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
      <Stack spacing={3}>
        <Stack direction="row" spacing={2}>
          <TextField
            required
            fullWidth
            name="firstName"
            label="First name"
            disabled={isSubmitting && true}
            value={formData.firstName}
            onChange={handleChange}
            slotProps={{
              input: {
                sx: {
                  borderRadius: 6,
                },
              },
            }}
          />
          <TextField
            required
            fullWidth
            name="lastName"
            label="Last name"
            disabled={isSubmitting && true}
            value={formData.lastName}
            onChange={handleChange}
            slotProps={{
              input: {
                sx: {
                  borderRadius: 6,
                },
              },
            }}
          />
        </Stack>

        <TextField
          name="company"
          label="Company name (optional)"
          disabled={isSubmitting && true}
          value={formData.company}
          onChange={handleChange}
          slotProps={{
            input: {
              sx: {
                borderRadius: 6,
              },
            },
          }}
        />

        <FormControl fullWidth>
          <InputLabel>
            Country / Region<span style={{ color: "red" }}> *</span>
          </InputLabel>
          <Select
            required
            name="country"
            disabled={isSubmitting && true}
            value={formData.country}
            onChange={handleChange}
            sx={{
              borderRadius: 6,
            }}
            label="Country / Region"
          >
            {countries.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          required
          name="street"
          label="Street address"
          disabled={isSubmitting && true}
          value={formData.street}
          onChange={handleChange}
          slotProps={{
            input: {
              sx: {
                borderRadius: 6,
              },
            },
          }}
        />

        <TextField
          required
          name="houseNumber"
          label="House number and street name"
          disabled={isSubmitting && true}
          value={formData.houseNumber}
          onChange={handleChange}
          slotProps={{
            input: {
              sx: {
                borderRadius: 6,
              },
            },
          }}
        />

        <TextField
          name="apartment"
          label="Apartment, suite, etc. (optional)"
          disabled={isSubmitting && true}
          value={formData.apartment}
          onChange={handleChange}
          slotProps={{
            input: {
              sx: {
                borderRadius: 6,
              },
            },
          }}
        />

        <TextField
          required
          name="city"
          label="Town / City"
          disabled={isSubmitting && true}
          value={formData.city}
          onChange={handleChange}
          slotProps={{
            input: {
              sx: {
                borderRadius: 6,
              },
            },
          }}
        />

        <TextField
          name="state"
          label="State"
          disabled={isSubmitting && true}
          value={formData.state}
          onChange={handleChange}
          slotProps={{
            input: {
              sx: {
                borderRadius: 6,
              },
            },
          }}
        />

        <TextField
          name="zipCode"
          label="ZIP Code"
          disabled={isSubmitting && true}
          value={formData.zipCode}
          onChange={handleChange}
          slotProps={{
            input: {
              pattern: "[0-9-]*",
              onKeyPress: (event) => {
                if (!/[0-9-]/.test(event.key)) {
                  event.preventDefault();
                }
              },
              onPaste: (event) => {
                const pastedData = event.clipboardData.getData("text");
                if (!/^[0-9-]*$/.test(pastedData)) {
                  event.preventDefault();
                }
              },
              autoComplete: "off",
              inputMode: "numeric",
              sx: {
                borderRadius: 6,
              },
            },
          }}
        />

        <TextField
          required
          name="phone"
          label="Phone"
          disabled={isSubmitting && true}
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          slotProps={{
            input: {
              pattern: "[0-9-]*",
              onKeyPress: (event) => {
                if (!/[0-9-]/.test(event.key)) {
                  event.preventDefault();
                }
              },
              onPaste: (event) => {
                const pastedData = event.clipboardData.getData("text");
                if (!/^[0-9-]*$/.test(pastedData)) {
                  event.preventDefault();
                }
              },
              autoComplete: "off",
              inputMode: "numeric",
              sx: {
                borderRadius: 6,
              },
            },
          }}
        />

        <TextField
          required
          name="email"
          label="Email address"
          disabled={isSubmitting && true}
          type="email"
          value={formData.email}
          onChange={handleChange}
          slotProps={{
            input: {
              sx: {
                borderRadius: 6,
              },
            },
          }}
        />

        <Typography variant="h6" fontWeight={"bold"}>
          Additional Information
        </Typography>
        <TextField
          name="orderNotes"
          label="Order notes (optional)"
          disabled={isSubmitting && true}
          multiline
          rows={4}
          value={formData.orderNotes}
          onChange={handleChange}
          slotProps={{
            input: {
              sx: {
                borderRadius: 6,
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting && true}
          sx={{
            mt: 2,
            textTransform: "none",
            borderRadius: 10,
            fontWeight: "bold",
            backgroundColor: "#0088ff",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          Submit Billing Information
        </Button>
      </Stack>
    </Box>
  );
};

export default BillingForm;
