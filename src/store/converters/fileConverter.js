import { toDatabase, fromDatabase } from "../../common/utils";

const fileConverter = {
  toFirestore: (file) => toDatabase(file),
  fromFirestore: (snapshot, options) => {
    const data = fromDatabase(snapshot.data(options));
    data.createdAt = data.createdAt.toMillis();
    data.updatedAt = data.updatedAt.toMillis();
    return data;
  },
};

export default fileConverter;
