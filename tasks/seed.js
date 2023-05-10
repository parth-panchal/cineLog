import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import activitySeed from "./activitySeed.js";
import * as trending from "../data/trending.js";
import listSeed from "./listSeed.js";
import userSeed from "./userSeed.js";
import populateSeed from "./populateSeed.js";

const db = await dbConnection();
await db.dropDatabase();

// Testing Seed Files
// await userSeed();
// await activitySeed();
// await listSeed();

// Populating DB Seed File
await populateSeed();

await closeConnection();
