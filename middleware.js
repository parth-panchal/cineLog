/*
    1: Reroute POST request to PUT/PATCH
    2: Authenticate that user is logged in at every route
*/
import { activityData } from "./data/index.js";
import {findUserIdByListId} from "./data/lists.js"

const exportedMethods = {
  rewriteUnsupportedBrowserMethods(req, res, next) {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
      req.method = req.body._method;
      delete req.body._method;
    }

    // let the next middleware run:
    next();
  },
  updates(req, res, next) {
    const timestamp = new Date().toUTCString();
    const method = req.method;
    const route = req.originalUrl;
    const isAuthenticated = req.session.user
      ? "Authenticated User"
      : "Non-Authenticated User";

    console.log(`[${timestamp}]: ${method} ${route} (${isAuthenticated})`);

    next();
  },
  protectedRoutes(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.session.returnTo = req.originalUrl;
      res.redirect("/login");
    }
  },
  logout(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/");
    }
  },
  signup_login(req, res, next) {
    if (req.session.user) {
      res.redirect("/");
    } else {
      next();
    }
  },
  async ensureCorrectUser(req, res, next) {
    const correctUserId = await findUserIdByListId(req.params.listId); // this should be the ID of the user who owns the list
    const userId = req.session.user._id; // this should be the ID of the logged-in user
    if (correctUserId !== userId) {
      return res.status(403).render("error",{error:"You are not authorized to access this page.", isAuthenticated: true});
    }
  
    next();
  },
  async ensureCorrectUserActivity(req, res, next) {
    const { userId } = await activityData.getLogById(req.params.id);
    const loggedInUserId = req.session.user._id;
    if (userId !== loggedInUserId) {
      return res.status(403).render("error", {error: "You are not authorized to access this page.", isAuthenticated: true});
    }
     next();
  }
  
  
};

export default exportedMethods;
