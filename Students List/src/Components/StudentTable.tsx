import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Student } from "../types/Student";

interface StudentTableProps {
  students: Student[];
  onDelete: (id: number) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onDelete }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "80%", mx: "auto", mt: 4, borderRadius: 3, overflow: "hidden" }}
    >
      <Typography
        variant="h6"
        textAlign="center"
        color="primary"
        fontWeight="bold"
        sx={{ mt: 2 }}
      >
        Students List
      </Typography>

      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell align="center">Full Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Class</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No students added yet
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell align="center">{student.fullName}</TableCell>
                <TableCell align="center">{student.age}</TableCell>
                <TableCell align="center">{student.email}</TableCell>
                <TableCell align="center">{student.className}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => onDelete(student.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
