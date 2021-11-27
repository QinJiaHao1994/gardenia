import {
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../app/firebase";
import {
  collectIdsAndDocs,
  toDatabase,
  fromDatabase,
} from "../../common/utils";

export const signin = async ({ email, password, remember }) => {
  if (remember) {
    await setPersistence(auth, browserLocalPersistence);
  } else {
    await setPersistence(auth, browserSessionPersistence);
  }
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const userData = await getUser(user);
  return userData;
};

export const signup = async (data) => {
  const { email, password, ...other } = data;
  await setPersistence(auth, browserSessionPersistence);
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

export const getUser = async (user) => {
  if (!user) {
    throw new Error("User isn't exist");
  }

  const { uid } = user;
  const docRef = doc(db, "users", uid).withConverter(userConverter);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error("User isn't exist");
  }
  return collectIdsAndDocs(docSnap);
};

const createUser = async (uid, data) => {
  const docRef = doc(db, "users", uid).withConverter(userConverter);
  await setDoc(docRef, data);
};

const userConverter = {
  toFirestore: (user) => toDatabase(user),
  fromFirestore: (snapshot, options) => {
    const data = fromDatabase(snapshot.data(options));
    data.createdAt = data.createdAt.toMillis();
    return data;
  },
};
