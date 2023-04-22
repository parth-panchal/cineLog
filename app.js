<<<<<<< HEAD
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
=======
import express from "express";
import configRoutes from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import exphbs from "express-handlebars";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = express.static(__dirname + "/public");

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
      asJSON: (obj, spacing) => {
        if (typeof spacing === 'number')
          return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
  
        return new Handlebars.SafeString(JSON.stringify(obj));
      }
    },
    // Specifies us to use partial pages
    partialsDir: ['views/partials/']
  });

app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
})
>>>>>>> 77ebcde867c8142dd0b051fe7fbddcab07ebe2f5
