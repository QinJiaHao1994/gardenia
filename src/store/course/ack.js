/* eslint-disable no-unused-vars */
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";
import { db, auth } from "../../app/firebase";
import {
  collectIdsAndDocs,
  toDatabase,
  fromDatabase,
} from "../../common/utils";

class CourseApi {
  static studentApi = new StudentApi();
  static teacherApi = new TeacherApi();

  setRole(role) {
    if (role === 0) return this.studentApi;
    return this.teacherApi;
    // let Api = null;
    // switch (role) {
    //   case 0:
    //     Api = TeacherApi;
    //     break;
    //   case 1:
    //     Api = StudentApi;
    //     break;
    //   default:
    //     Api = StudentApi;
    //     break;
    // }
    // return Api;
  }

  static async _getCourseByid(id) {
    const docRef = doc(db, "courses", id).withConverter(courseConverter);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Course isn't exist");
    }
    return collectIdsAndDocs(docSnap);
  }
}

class StudentApi extends CourseApi {
  static async _collectCourseIds(uid) {
    const courseEnrollRef = collection(db, "course_enroll");
    const q = query(courseEnrollRef, where("user_id", "==", uid));
    const querySnapshot = await getDocs(q);
    const course_ids = querySnapshot.docs.map((doc) => doc.data().course_id);
    return course_ids;
  }

  static async _getCoursesByIds(ids) {
    const coursesRef = collection(db, "courses").withConverter(courseConverter);
    const q = query(coursesRef, where(documentId(), "in", ids));
    const querySnapshot = await getDocs(q);
    const courses = querySnapshot.docs.map(collectIdsAndDocs);
    return courses;
  }

  static async;

  static async getCoursesByUid(uid) {
    const course_ids = await this._collectCourseIds(uid);
    const courses = await this._getCoursesByIds(course_ids);
    return courses;
  }
}

class TeacherApi extends CourseApi {
  static async getCoursesByUid(uid) {
    const coursesRef = collection(db, "courses").withConverter(courseConverter);
    const q = query(coursesRef, where("teacher_id", "==", uid));
    const querySnapshot = await getDocs(q);
    const courses = querySnapshot.docs.map(collectIdsAndDocs);
    return courses;
  }
}

const courseConverter = {
  toFirestore: (course) => toDatabase(course),
  fromFirestore: (snapshot, options) => {
    const data = fromDatabase(snapshot.data(options));
    data.endDate = data.endDate.toMillis();
    data.startDate = data.startDate.toMillis();
    return data;
  },
};

export default CourseApi;
