import express from "express";
import configRoutes from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import exphbs from "express-handlebars";
import session from "express-session";
import * as dotenv from "dotenv";
import middleware from "./middleware.js";
dotenv.config();

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
app.use(
  session({
      name: 'cineLogSession',
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {maxAge: 60000},
  })
);
app.get('/scriptList.js', function(req, res) {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(__dirname + "/public/js/scriptList.js");
});
app.use(middleware.rewriteUnsupportedBrowserMethods);
app.use("/list",middleware.protectedRoutes);
app.use("/activity",middleware.protectedRoutes);
app.use("/profile",middleware.protectedRoutes);
app.use("/user",middleware.protectedRoutes);
app.use("/login",middleware.signup_login);
app.use("/signup",middleware.signup_login);
app.use("/logout",middleware.logout);
app.use(middleware.updates);

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
})