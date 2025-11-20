import * as React from "react";
import { Box } from "@mui/material";
import type { Student } from "../types/Student";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

const StudentsDashboard: React.FC = () => {
  const [students, setStudents] = React.useState<Student[]>([]);

  const handleAddStudent = (student: Student) => {
    setStudents((prev) => [...prev, student]);
  };

  const handleDeleteStudent = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: 5 }}>
      <StudentForm onAdd={handleAddStudent} />
      <StudentTable students={students} onDelete={handleDeleteStudent} />
    </Box>
  );
};

export default StudentsDashboard;
