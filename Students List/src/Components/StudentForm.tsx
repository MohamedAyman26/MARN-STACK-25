import * as React from "react";
import { Box, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import type { Student } from "../types/Student";

interface StudentFormProps {
  onAdd: (student: Student) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = React.useState({
    fullName: "",
    age: "",
    email: "",
    className: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.fullName || !formData.age || !formData.email || !formData.className) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    const newStudent: Student = {
      id: Date.now(),
      fullName: formData.fullName,
      age: parseInt(formData.age),
      email: formData.email,
      className: formData.className,
    };

    onAdd(newStudent);
    setFormData({ fullName: "", age: "", email: "", className: "" });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
      <Paper
        elevation={3}
        sx={{
          width: "70%",
          p: 5,
          borderRadius: 3,
          backgroundColor: "#fafafa",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          color="primary"
          fontWeight="bold"
          mb={3}
        >
          Add New Student
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Class"
                name="className"
                value={formData.className}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.3,
                  fontWeight: "bold",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #1565c0, #1e88e5)",
                  },
                }}
              >
                ➕ Add Student
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default StudentForm;
