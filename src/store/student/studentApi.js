import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../app/firebase";
import { collectIdsAndDocs } from "../../common/utils";
import { userConverter } from "../converters";
import { enrollConverter } from "../converters";

export const getStudents = async () => {
  const userRef = collection(db, "users").withConverter(userConverter);
  const q = query(userRef, where("role", "==", 1));
  const querySnapshot = await getDocs(q);
  const students = querySnapshot.docs.map(collectIdsAndDocs);
  return students;
};

export const getEnrolls = async (courseId) => {
  const courseEnrollRef = collection(db, "course_enroll").withConverter(
    enrollConverter
  );
  const q = query(courseEnrollRef, where("course_id", "==", courseId));
  const querySnapshot = await getDocs(q);
  const enrolls = querySnapshot.docs.map(collectIdsAndDocs);
  return enrolls;
};

export const enrollStudent = async (courseId, userId) => {
  const coursesRef = collection(db, "course_enroll").withConverter(
    enrollConverter
  );

  const data = {
    courseId,
    userId,
  };
  const { id } = await addDoc(coursesRef, data);
  const enrollData = {
    id,
    ...data,
  };

  return enrollData;
};

export const removeStudent = async (enrollId) => {
  const coursesRef = doc(db, "course_enroll", enrollId);
  await deleteDoc(coursesRef);
};
