import type { Student } from "../types/Student";

export let studentsData: Student[] = [
  {
    id: 1,
    fullName: "Ahmed Ali",
    age: 22,
    email: "ahmed@example.com",
    className: "CS",
  },
];

// دالة لإضافة طالب جديد
export const addStudent = (student: Student) => {
  studentsData.push(student);
};

// دالة لحذف طالب
export const deleteStudent = (id: number) => {
  studentsData = studentsData.filter((s) => s.id !== id);
};
