import * as trending from "./data/trending.js";
import * as connection from "./config/mongoConnection.js";

async function main() {
    const db = await connection.dbConnection();
    await db.dropDatabase();
    try {
        let trendingData = await trending.createTendingObject("03/15/2023","absby87474ybsc");
        console.log(trendingData);
    }catch(e){
        console.log(e);
    }
    await connection.closeConnection();
    console.log("Done!");
}

main();
