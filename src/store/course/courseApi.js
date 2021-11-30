import {
  doc,
  getDoc,
  addDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";
import { db } from "../../app/firebase";
import { collectIdsAndDocs } from "../../common/utils";
import { courseConverter } from "../converters";

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
    const courseIds = querySnapshot.docs.map((doc) => doc.data().course_id);
    return courseIds;
  }

  async _getCoursesByIds(ids) {
    const coursesRef = collection(db, "courses").withConverter(courseConverter);
    const q = query(coursesRef, where(documentId(), "in", ids));
    const querySnapshot = await getDocs(q);
    const courses = querySnapshot.docs.map(collectIdsAndDocs);
    return courses;
  }

  async judgePermission(id) {
    const courseEnrollRef = collection(db, "course_enroll");
    const q = query(
      courseEnrollRef,
      where("user_id", "==", this.uid),
      where("course_id", "==", id)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length > 0;
  }

  async getCourseByid(id) {
    const course = await super.getCourseByid(id);
    const hasPermission = await this.judgePermission(id);
    if (!hasPermission) {
      throw new Error("The course does not belong to this student");
    }

    return course;
  }

  async getCourses() {
    const courseIds = await this._collectCourseIds();
    const courses = await this._getCoursesByIds(courseIds);
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
