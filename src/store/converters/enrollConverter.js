import { toDatabase, fromDatabase } from "../../common/utils";

const enrollConverter = {
  toFirestore: (enroll) => toDatabase(enroll),
  fromFirestore: (snapshot, options) => fromDatabase(snapshot.data(options)),
};

export default enrollConverter;
