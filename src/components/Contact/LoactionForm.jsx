import { useState } from "react";
import {
  Box,
  TextField,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const departments = [
  { value: "Business Department", label: "Business Department" },
  { value: "Technical Support", label: "Technical Support" },
  { value: "Sales", label: "Sales" },
  { value: "Personal Department", label: "Personal Department" },
];

const LocationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");
  const [department, setDepartment] = useState("");

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleSubjectChange = (event) => setSubject(event.target.value);
  const handleQuestionChange = (event) => setQuestion(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        height: 500,
        p: 3,
        boxShadow: 1,
        borderRadius: 6,
        backgroundColor: "rgba(0, 0, 0, .01)",
      }}
    >
      <Stack spacing={5} p={2}>
        <Stack direction="row" spacing={5}>
          <TextField
            id="name"
            name="name"
            label="Your Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={handleNameChange}
            sx={{
              mt: 6,
              mb: 4,
            }}
            slotProps={{
              input: {
                sx: {
                  borderRadius: 6,
                },
              },
            }}
          />
          <TextField
            id="email"
            name="email"
            label="Your Email"
            variant="outlined"
            fullWidth
            required
            type="email"
            value={email}
            onChange={handleEmailChange}
            sx={{ mb: 4 }}
            slotProps={{
              input: {
                sx: {
                  borderRadius: 6,
                },
              },
            }}
          />
        </Stack>

        <Stack direction="row" spacing={5}>
          <TextField
            id="subject"
            name="subject"
            label="Subject"
            variant="outlined"
            fullWidth
            value={subject}
            onChange={handleSubjectChange}
            sx={{ mb: 4 }}
            slotProps={{
              input: {
                sx: {
                  borderRadius: 6,
                },
              },
            }}
          />
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              labelId="department-label"
              id="department"
              name="department"
              value={department}
              onChange={handleDepartmentChange}
              label="Department"
              sx={{
                borderRadius: 6,
              }}
            >
              {departments.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <TextField
          id="question"
          name="question"
          label="Your Question"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={question}
          onChange={handleQuestionChange}
          sx={{ mb: 4 }}
          slotProps={{
            input: {
              sx: {
                borderRadius: 6,
              },
            },
          }}
        />
        <Box display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 10,
              backgroundColor: "#0088ff",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            Ask
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default LocationForm;
