import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import activitySeed from "./activitySeed.js";
import * as trending from "../data/trending.js";
import listSeed from "./listSeed.js";
import userSeed from "./userSeed.js";

const db = await dbConnection();
await db.dropDatabase();

await userSeed();
await activitySeed();
await listSeed();

await closeConnection();
