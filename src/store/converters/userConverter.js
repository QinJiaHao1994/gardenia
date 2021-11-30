import { toDatabase, fromDatabase } from "../../common/utils";

const userConverter = {
  toFirestore: (user) => toDatabase(user),
  fromFirestore: (snapshot, options) => {
    const data = fromDatabase(snapshot.data(options));
    data.createdAt = data.createdAt.toMillis();
    return data;
  },
};

export default userConverter;
