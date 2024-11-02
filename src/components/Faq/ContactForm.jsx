import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Avatar,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";

const departments = [
  { value: "Business Department", label: "Business Department" },
  { value: "Technical Support", label: "Technical Support" },
  { value: "Sales", label: "Sales" },
  { value: "Personal Department", label: "Personal Department" },
];

const ContactForm = () => {
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");

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
        maxWidth: "100%",
        p: 3,
        boxShadow: 1,
        borderRadius: 8,
        backgroundColor: "rgba(0, 0, 0, .01)",
        mx: "auto",
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "#000", mr: 2, width: 64, height: 64 }}>
          <DraftsIcon fontSize="large" />
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Ask Us ...
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Have questions ?
          </Typography>
        </Box>
      </Box>

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
      <Box display="flex" justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: 10,
            backgroundColor: "#0088ff",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          Ask
        </Button>
      </Box>
    </Box>
  );
};

export default ContactForm;
