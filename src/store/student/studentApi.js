import { collection, getDocs, where, query, addDoc } from "firebase/firestore";
import { db } from "../../app/firebase";
import { collectIdsAndDocs } from "../../common/utils";
import { userConverter } from "../converters";

export const getStudents = async () => {
  const userRef = collection(db, "users").withConverter(userConverter);
  const q = query(userRef, where("role", "==", 1));
  const querySnapshot = await getDocs(q);
  const students = querySnapshot.docs.map(collectIdsAndDocs);
  return students;
};

export const getEnrollIds = async (courseId) => {
  const courseEnrollRef = collection(db, "course_enroll");
  const q = query(courseEnrollRef, where("course_id", "==", courseId));
  const querySnapshot = await getDocs(q);
  const enrollIds = querySnapshot.docs.map((doc) => doc.data().user_id);
  return enrollIds;
};

export const enrollStudent = async (courseId, studentId) => {
  const coursesRef = collection(db, "course_enroll");
  const data = {
    course_id: courseId,
    user_id: studentId,
  };
  await addDoc(coursesRef, data);
};

export const removeStudent = async (id) => {};
