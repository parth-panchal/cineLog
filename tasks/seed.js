import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import * as activity from "../data/activity.js";
import * as trending from "../data/trending.js";
import * as lists from "../data/lists.js";
import userSeeding from "./userSeed.js";

const db = await dbConnection();
await db.dropDatabase();

await userSeeding();

// ================================= Activity Seeding =================================

try {
  let newLog = await activity.createLog(
    550,
    "parthpanchal",
    "This is a review",
    5,
    "06/06/2021"
  );
  if (newLog) console.log("log added");
} catch (e) {
  console.log(e);
}
try {
  let newLog = await activity.createLog(
    550,
    "parthpanchal",
    "This is a review",
    5,
    "06/09/2021"
  );
  if (newLog) console.log("log added");
} catch (e) {
  console.log(e);
}
try {
  let newLog = await activity.createLog(
    550,
    "parthpanchal",
    "This is a review",
    5,
    "06/06/2021"
  );
  if (newLog) console.log("log added");
} catch (e) {
  console.log(e);
}
try {
  let newLog = await activity.createLog(
    0, //this is the case I was talking about. This messes with axios badly. It just throws the entire error body that is returned from the server.
    "parthpanchal",
    "This is a review",
    5,
    "06/06/2021"
  );
  if (newLog) console.log("log added");
} catch (e) {
  console.log(e);
}
try {
  let parth = await activity.getAllLogs();
} catch (e) {
  console.log(e);
}
// we don't need this anymore since we're now using the userId instead of username
// try {
//   let parth = await activity.getLogsByUsername("parthpanchal");
//   let activity_to_delete = parth[0]._id.toString();
//   let change = await activity.deleteLog(activity_to_delete);
//   console.log(change);
// } catch (e) {
//   console.log(e);
// }
try {
} catch (e) {
  console.log(e);
}
try {
  let result = await trending.calculateTrending();
  console.log(result);
} catch (e) {
  console.log(e);
}

// ================================= Lists Seeding ================================
// try {
//   let list1 = await lists.create(
//     "643df5013cdc12d55448a21c",
//     "Best movies of 2022",
//     [ 555, 51, 233, 108]
//   );
//   if (list1) console.log("log added");
// } catch (e) {
//   console.log(e);
// }
// try {
//   let list2 = await lists.create(
//     "643df5013cdc12d55448a21c",
//     "Best movies of 2025",
//     [ 555, 51, 233, 108]
//   );
//   if (list2) console.log("log added");
// } catch (e) {
//   console.log(e);
// }
// try {
//   let k = await lists.getAll("643df5013cdc12d55448a21c");
//   console.log(k);
// } catch (e) {
//   console.log(e);
// }
// try {
//   let k = await lists.get("643df579caabb1d767f569e7");
//   console.log(k);
// } catch (e) {
//   console.log(e);
// }
// try {
//   let k = await lists.delete("643df579caabb1d767f569e7");
//   console.log(k);
// } catch (e) {
//   console.log(e);
// }
// try {
//   let k = await lists.updateList("643e03504eefaa3eb3c5025b", "Best Movies of 2024", [108, 9, 6, 16, 8]);
//   console.log(k)
// } catch (e) {
//   console.log(e)
// }

await closeConnection();
