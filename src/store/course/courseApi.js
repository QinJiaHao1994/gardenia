/* eslint-disable no-unused-vars */
import {
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
  #proxy;

  constructor() {
    this.setRole();
  }

  setRole(role) {
    switch (role) {
      case 0:
        this.#proxy = TeacherApi;
        break;
      case 1:
        this.#proxy = StudentApi;
        break;
      default:
        this.#proxy = StudentApi;
        break;
    }
    return this;
  }

  getCourses(...args) {
    return this.#proxy.getCourses(...args);
  }
}

class StudentApi {
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

  static async getCourses(uid) {
    const course_ids = await this._collectCourseIds(uid);
    const courses = await this._getCoursesByIds(course_ids);
    return courses;
  }
}

class TeacherApi {
  static async getCourses(uid) {
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

const api = new CourseApi();

export default api;
