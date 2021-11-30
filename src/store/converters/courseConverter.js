import { toDatabase, fromDatabase } from "../../common/utils";

const courseConverter = {
  toFirestore: (course) => toDatabase(course),
  fromFirestore: (snapshot, options) => {
    const data = fromDatabase(snapshot.data(options));
    data.endDate = data.endDate.toMillis();
    data.startDate = data.startDate.toMillis();
    return data;
  },
};

export default courseConverter;
