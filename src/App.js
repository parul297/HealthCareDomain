import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Alert,
} from "@mui/material";

import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    file: null,
  });

  const [fileUploaded, setFileUploaded] = useState(false); 
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
    setFileUploaded(true); // Set file uploaded status
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form Submitted Successfully!");

    // Show success message when form is submitted
    setShowSuccessMessage(true);

    // Hide success message and reset file and name fields after 2 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
      setFileUploaded(false); 
      setFormData({ ...formData, file: null }); 
    }, 2000);
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginTop: "2rem",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Healthcare Dashboard
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />

      <FormControl  label="Age" fullWidth>
        <InputLabel id="age-label">Age</InputLabel>
        <Select
         label="Age"
          labelId="age-label"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        >
          {Array.from({ length: 100 }, (_, i) => (
            <MenuItem key={i} value={i + 1}>
              {i + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        component="label"
        fullWidth
        style={{ textTransform: "none" }}
      >
        Upload File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      {fileUploaded && (
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "1rem" }}
        >
          Selected File: {formData.file?.name}
        </Typography>
      )}

      {showSuccessMessage && (
        <Alert severity="success" style={{ marginTop: "1rem" }}>
          File uploaded successfully!
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        style={{ textTransform: "none" }}
      >
        Submit
      </Button>
    </Container>
  );
};

export default App;