// for "/"
//get - make a db call to get information for the user based on their user id
//put - if the user wants to update any of their information
//delete - if the user wants to delete their profle

//for "/watchlist"
//get - get the watchlist for the user
//patch - adding or deleting movies from the watchlist

//for "/likes"
//get - get the liked movies for the user
//patch - adding or deleting movies from the liked movies

//for "/activity"
//get - get the activity for the user

//for "/lists"
//get - get the lists for the user

//for "/following"
//get - get the profiles followed for the user

//for "/statistics"
//
//
//
//
// LOL.

//IS IT REQ.SESSION OR REQ.PARAMS??

import { userData, listData, activityData } from "../data/index.js";
import * as statsData from "../data/statistics.js";
import * as validation from "../utils/validation.js";

import xss from "xss";

import { Router } from "express";
const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    req.session.user.id = xss(req.session.user.id);
    try {
      let userDetails = await userData.getUserById(req.session.user.id); //not sure if this is the right way to get the user id
      return res.render("profile", {
        userDetails: userDetails,
        script_partial: "userInfo",
      }); //use id userDetails in homepage hbs to get details
    } catch (e) {
      return res.render("error", { error }); //figure these out too..
    }
  })
  .put(async (req, res) => {
    let user = req.body;
    if (!user)
      return res
        .status(400)
        .render("error", { error: "You must provide data to update a user" });
    req.session.user.id = xss(req.session.user.id);
    user.fname = xss(user.fname);
    user.lname = xss(user.lname);
    user.username = xss(user.username);
    user.password = xss(user.password); // update this once hashed password is implemented
    try {
      req.session.user.id = validation.checkId(req.session.user.id);
      user.fname = validation.checkString(user.fname, "first name");
      user.lname = validation.checkString(user.lname, "last name");
      user.username = validation.checkUsername(user.username);
      user.password = validation.checkString(user.password, "Password"); // update this once hashed password is implemented
    } catch (e) {
      return res.status(400).render("error", { error: e });
    }

    try {
      const userUpdates = await userData.updateUser(
        req.session.user.id,
        user.fname,
        user.lname,
        user.username,
        user.password
      );
      return res.render("profile", {
        userUpdates: userUpdates,
        script_partial: "userInfo",
      });
    } catch (e) {
      return res.status(500).render("error", { error: e });
    }
  })
  .delete(async (req, res) => {
    req.session.user.id = xss(req.session.user.id);
    try {
      req.session.user.id = validation.checkId(req.session.user.id);
    } catch (e) {
      return res.status(400).render("error", { error: e });
    }

    try {
      let user = await userData.deleteUser(req.session.user.id);
      return res.json(user); //change this afterwards
    } catch (e) {
      return res.status(500).render("error", { error: e });
    }
  });

router
  .route("/watchlist")
  .get(async (req, res) => {
    req.session.user.id = xss(req.session.user.id);
    try {
      req.session.user.id = validation.checkId(req.session.user.id);
    } catch (e) {
      return res.status(400).render("error", { error: e });
    }
    try {
      let userWatchlist = await userData.getUserById(req.session.user.id)
        .watchlist;
      return res.render("profile", {
        userWatchlist: userWatchlist,
        script_partial: "watchlist",
      });
    } catch (e) {
      return res.status(500).render("error", { error: e });
    }
  })
  .patch(async (req, res) => {
    req.session.user.id = xss(req.session.user.id);
    req.body.movieId = xss(req.body.movieId);
    req.body.operation = xss(req.body.operation);
    try {
      req.session.user.id = validation.checkId(req.session.user.id);
      req.body.movieId = await validation.checkId(req.body.movieId);
      req.body.operation = validation.checkOperation(
        req.body.operation,
        "operation"
      );
    } catch (e) {
      return res.render("error", { error: e });
    }
    try {
      const updatedWatchlist = await userData.updateUserWatchlist(
        req.session.user.id,
        req.body.movieId,
        req.body.operation
      );
      return res.render("profile", {
        updatedWatchlist: updatedWatchlist,
        script_partial: "watchlist",
      });
    } catch (e) {
      return res.status(400).render("error", { error: e });
    }
  });

router
  .route("/likes")
  .get(async (req, res) => {
    req.session.user.id = xss(req.session.user.id);
    try {
      req.session.user.id = validation.checkId(req.session.user.id);
    } catch (e) {
      return res.status(400).render("error", { error: e });
    }
    try {
      let userLikes = await userData.getUserById(req.session.user.id).likes;
      return res.render("profile", {
        userLikes: userLikes,
        script_partial: "likes",
      });
    } catch (e) {
      return res.status(500).render("error", { error: e });
    }
  })
  .patch(async (req, res) => {
    req.session.user.id = xss(req.session.user.id);
    req.body.movieId = xss(req.body.movieId);
    req.body.operation = xss(req.body.operation);
    try {
      req.session.user.id = validation.checkId(req.session.user.id);
      req.body.movieId = await validation.checkId(req.body.movieId);
      req.body.operation = validation.checkOperation(req.body.operation);
    } catch (e) {
      return res.render("error", { error: e });
    }
    try {
      const updatedLikes = await userData.updateUserLikes(
        req.session.user.id,
        req.body.movieId,
        req.body.operation
      );
      return res.render("profile", {
        updatedLikes: updatedLikes,
        script_partial: "likes",
      });
    } catch (e) {
      return res.status(400).render("error", { error: e });
    }
  });

router.route("/activity").get(async (req, res) => {
  req.session.user.id = xss(req.session.user.id);
  try {
    req.session.user.id = validation.checkId(req.session.user.id);
  } catch (e) {
    return res.render("error", { error: e });
  }
  try {
    let logs = await activityData.getLogsByUserId(req.session.user.id);
    return res.render("profile", { logs: logs, script_partial: "activity" });
  } catch (e) {
    return res.render("error", { error: e });
  }
});

router.route("/lists").get(async (req, res) => {
  req.session.user.id = xss(req.session.user.id);
  try {
    req.session.user.id = validation.checkId(req.session.user.id);
  } catch (e) {
    return res.render("error", { error: e });
  }
  try {
    let lists = await listData.getAll(req.session.user.id);
    return res.render("profile", { lists: lists, script_partial: "lists" });
  } catch (e) {
    res.render("error", { error: e });
  }
});

router
  .route("/following")
  .get(async (req, res) => {
    req.session.user.id = xss(req.session.user.id);
    try {
      req.session.user.id = validation.checkId(req.session.user.id);
    } catch (e) {
      return res.render("error", { error: e });
    }
    try {
      let profilesFollowed = await userData.getUserById(req.session.user.id)
        .following;
      return res.render("profile", {
        following: profilesFollowed,
        script_partial: "following",
      });
    } catch (e) {
      res.render("error", { error: e });
    }
  })
  .patch(async (req, res) => {
    req.session.user.id = xss(req.session.user.id);
    req.body.followingId = xss(req.body.followingId);
    req.body.operation = xss(req.body.operation);
    try {
      const updatedFollowing = await userData.updateUserFollowing(
        req.session.user.id,
        req.body.followingId,
        req.body.operation
      );
      return res.render("profile", {
        updatedFollowing: updatedFollowing,
        script_partial: "following",
      });
    } catch (e) {
      return res.status(400).render("error", { error: e });
    }
  });

router.route("/statistics").get(async (req, res) => {
  req.session.user.id = xss(req.session.user.id);
  try {
    req.session.user.id = validation.checkId(req.session.user.id);
  } catch (e) {
    return res.render("error", { error: e });
  }
  try {
    // complete this once the statistics functions are implemented
  } catch (e) {
    res.render("error", { error: e });
  }
});
