/* eslint-disable no-unused-vars */
import {
  doc,
  getDoc,
  addDoc,
  // setDoc,
  updateDoc,
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
  uid;

  async getCourseByid(id) {
    const docRef = doc(db, "courses", id).withConverter(courseConverter);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Course isn't exist");
    }
    return collectIdsAndDocs(docSnap);
  }
}

class StudentApi extends CourseApi {
  async _collectCourseIds() {
    const courseEnrollRef = collection(db, "course_enroll");
    const q = query(courseEnrollRef, where("user_id", "==", this.uid));
    const querySnapshot = await getDocs(q);
    const course_ids = querySnapshot.docs.map((doc) => doc.data().course_id);
    return course_ids;
  }

  async _getCoursesByIds(ids) {
    const coursesRef = collection(db, "courses").withConverter(courseConverter);
    const q = query(coursesRef, where(documentId(), "in", ids));
    const querySnapshot = await getDocs(q);
    const courses = querySnapshot.docs.map(collectIdsAndDocs);
    return courses;
  }

  async getCourseByid(id) {}

  async getCourses() {
    const course_ids = await this._collectCourseIds();
    const courses = await this._getCoursesByIds(course_ids);
    return courses;
  }
}

class TeacherApi extends CourseApi {
  async getCourses() {
    const coursesRef = collection(db, "courses").withConverter(courseConverter);
    const q = query(coursesRef, where("teacher_id", "==", this.uid));
    const querySnapshot = await getDocs(q);
    const courses = querySnapshot.docs.map(collectIdsAndDocs);
    return courses;
  }

  async getCourseByid(id) {
    const course = await super.getCourseByid(id);
    const { teacherId } = course;
    if (teacherId !== this.uid)
      throw new Error("The course does not belong to this teacher");
    return course;
  }

  async createCourse(formData) {
    const data = {
      ...formData,
      teacherId: this.uid,
    };
    const coursesRef = collection(db, "courses").withConverter(courseConverter);
    const { id } = await addDoc(coursesRef, data);
    data.id = id;
    return data;
  }

  async updateCourse(id, data) {
    const docRef = doc(db, "courses", id).withConverter(courseConverter);
    await updateDoc(docRef, data);
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

const courseApiFactory = () => {
  const studentApi = new StudentApi();
  const teacherApi = new TeacherApi();

  const proxy = {
    setRole({ id, role }) {
      const api = role === 0 ? teacherApi : studentApi;
      api.uid = id;
      Object.setPrototypeOf(proxy, api);
      return proxy;
    },
  };

  return proxy;
};

export default courseApiFactory();
