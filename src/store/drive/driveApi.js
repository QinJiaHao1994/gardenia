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
import { fileConverter } from "../converters";

export const getFiles = async (courseId) => {
  const fileRef = collection(db, "files").withConverter(fileConverter);
  const q = query(fileRef, where("course_id", "==", courseId));
  const querySnapshot = await getDocs(q);
  const files = querySnapshot.docs.map(collectIdsAndDocs);
  return files;
};
