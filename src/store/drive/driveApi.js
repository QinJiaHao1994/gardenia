/* eslint-disable no-unused-vars */
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../app/firebase";
import { collectIdsAndDocs } from "../../common/utils";
import { fileConverter } from "../converters";
import { hasDuplicateName } from "./driveUtils";

export const getFiles = async (courseId) => {
  const collectionRef = collection(db, "files").withConverter(fileConverter);
  const q = query(collectionRef, where("course_id", "==", courseId));
  const querySnapshot = await getDocs(q);
  const files = querySnapshot.docs.map(collectIdsAndDocs);
  return files;
};

export const renameFileOrFolder = async (newName, data, dict) => {
  if (newName === data.name) return;

  if (hasDuplicateName(newName, data, dict))
    throw new Error("Dupliate filename, please rename!");
  const docRef = doc(db, "files", data.id).withConverter(fileConverter);
  await updateDoc(docRef, { name: newName });
};

export const deleteFileOrFolder = async (id) => {
  const docRef = doc(db, "files", id);
  await deleteDoc(docRef);
};

export const createFolder = async (data) => {
  const collectionRef = collection(db, "files").withConverter(fileConverter);
  const { id } = await addDoc(collectionRef, data);

  const floderData = {
    id,
    ...data,
  };

  return floderData;
};

export const uploadFile = async () => {};
