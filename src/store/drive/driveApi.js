import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../../app/firebase";
import { collectIdsAndDocs, generateUUID } from "../../common/utils";
import { fileConverter } from "../converters";
import { hasDuplicateName, generateFileName } from "./driveUtils";
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import courseApi from "../course/courseApi";

export const getMarkdownFileDownloadUrlBelongToCourse = async (user, id) => {
  const { userId, courseId, type, url } = await getFileById(id);
  if (type !== "text/markdown")
    throw new Error("This is not a file could be previewed!");
  console.log(user, userId);
  if (user.role === 0 && user.id !== userId)
    throw new Error("Don't have permission!");
  if (user.role === 1) {
    const hasPermission = await courseApi.judgePermission(courseId);
    if (!hasPermission) throw new Error("Don't have permission!");
  }
  return await getFileDownloadURL(url);
};

export const getFileById = async (id) => {
  const docRef = doc(db, "files", id).withConverter(fileConverter);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error("File isn't exist");
  return collectIdsAndDocs(docSnap);
};

export const getFiles = async (courseId) => {
  const collectionRef = collection(db, "files").withConverter(fileConverter);
  const q = query(collectionRef, where("course_id", "==", courseId));
  const querySnapshot = await getDocs(q);
  const files = {};
  querySnapshot.docs.forEach((doc) => (files[doc.id] = collectIdsAndDocs(doc)));
  return files;
};

export const renameFileOrFolder = async (newName, data, dict) => {
  if (newName === data.name) return;

  if (hasDuplicateName(newName, data, dict))
    throw new Error("Dupliate filename, please rename!");
  const docRef = doc(db, "files", data.id).withConverter(fileConverter);
  await updateDoc(docRef, { name: newName });
};

export const deleteFileOrFolder = async (data) => {
  const { id, isDirectory, children, url } = data;
  if (isDirectory && children && children.length > 0) {
    throw new Error("Folder must be empty before delete");
  }
  if (!isDirectory) await deleteFile(url);
  const docRef = doc(db, "files", id);
  await deleteDoc(docRef);
};

const deleteFile = async (url) => {
  const desertRef = ref(storage, url);
  await deleteObject(desertRef);
};

export const createFolder = async (data) => {
  const collectionRef = collection(db, "files").withConverter(fileConverter);
  const { id } = await addDoc(collectionRef, data);
  return id;
};

export const uploadFile = async (file, courseId, parent, dict, userId) => {
  if (file.size > 1024 * 1024 * 8)
    throw new Error("Couldn't upload file greater than 8Mb!");

  const name = generateFileName(file.name, parent, dict);
  const index = name.lastIndexOf(".");
  const suffix = index === -1 ? "" : `.${name.substr(index + 1)}`;
  const uuid = generateUUID(file);
  const storageRef = ref(storage, `${courseId}/${uuid}${suffix}`);
  const {
    metadata: { contentType, size, timeCreated, updated, fullPath },
  } = await uploadBytes(storageRef, file);
  const data = {
    courseId,
    createdAt: new Date(timeCreated),
    updatedAt: new Date(updated),
    isDirectory: false,
    name,
    url: fullPath,
    parentId: parent.id,
    size,
    type: contentType,
    userId,
  };

  const collectionRef = collection(db, "files").withConverter(fileConverter);
  const { id } = await addDoc(collectionRef, data);
  data.id = id;
  return data;
};

export const getFileDownloadURL = async (url) => {
  const storageRef = ref(storage, url);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
