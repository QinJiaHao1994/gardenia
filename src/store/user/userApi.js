import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../app/firebase";
import { collectIdsAndDocs } from "../../common/utils";

export const auth = getAuth();

export const signin = async ({ email, password }) => {
  const {
    user: { uid },
  } = await signInWithEmailAndPassword(auth, email, password);
  const userData = await getUser(uid);
  return userData;
};

export const signup = async (data) => {
  const { email, password, ...other } = data;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const {
    metadata: { createdAt },
    uid,
  } = user;
  const userData = {
    id: uid,
    email,
    createdAt: new Date(Number(createdAt)),
    ...other,
  };

  await createUser(uid, userData);
  return userData;
};

export const getUser = async (uid) => {
  const docRef = doc(db, "users", uid).withConverter(userConverter);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error("User isn't exist");
  }
  return collectIdsAndDocs(docSnap);
};

const createUser = async (uid, data) => {
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, data);
};

const userConverter = {
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    data.createdAt = data.createdAt.toMillis();
    return data;
  },
};
