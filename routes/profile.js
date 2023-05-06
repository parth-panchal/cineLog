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
//get - get all the statistics for the user

import { userData, listData, activityData, statsData } from "../data/index.js";
import * as validation from "../utils/validation.js";
import * as helper from "../utils/helper.js";

import xss from "xss";

import { Router } from "express";
const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    req.session.user._id = xss(req.session.user._id);
    try {
      let userDetails = await userData.getUserById(req.session.user._id); //not sure if this is the right way to get the user id
      return res.render("profile", {
        isAuthenticated: true,
        userDetails: userDetails,
        script_partial: "userInfo",
      }); //use id userDetails in homepage hbs to get details
    } catch (e) {
      return res.render("error", { error: e }); //figure these out too..
    }
  })
  .put(async (req, res) => {
    let user = req.body;
    console.log("inside put update");
    if (!user)
      return res
        .status(400)
        .render("error", { error: "You must provide data to update a user" });
    req.session.user._id = xss(req.session.user._id);
    user.fName = xss(user.fName);
    user.lName = xss(user.lName);
    user.username = xss(user.username);
    user.password = xss(user.password); // update this once hashed password is implemented
    try {
      console.log("put update validation reached");
      console.log(user);
      req.session.user._id = validation.checkId(req.session.user._id);
      user.fName = validation.checkString(user.fName, "first name");
      user.lName = validation.checkString(user.lName, "last name");
      user.username = validation.checkUsername(user.username);
      user.password = validation.checkString(user.password, "Password"); // update this once hashed password is implemented
      console.log("validation passed");
    } catch (e) {
      //return res.status(400).render("error", { error: e });
      console.log(e);
    }

    try {
      console.log("update user reached");
      const userUpdates = await userData.updateUser(
        req.session.user._id,
        user.fName,
        user.lName,
        user.username,
        user.password
      );
      return res.render("profile", {
        isAuthenticated: true,
        userUpdates: userUpdates,
        script_partial: "userInfo",
      });
    } catch (e) {
      return res.status(500).render("error", { error: e });
    }
  })
  .delete(async (req, res) => {
    req.session.user._id = xss(req.session.user._id);
    try {
      req.session.user._id = validation.checkId(req.session.user._id);
    } catch (e) {
      return res.status(400).render("error", { error: e });
    }

    try {
      let user = await userData.deleteUser(req.session.user._id);
      return res.json(user); //change this afterwards
    } catch (e) {
      return res.status(500).render("error", { error: e });
    }
  });

router
  .route("/watchlist")
  .get(async (req, res) => {
    req.session.user._id = xss(req.session.user._id);
    try {
      req.session.user._id = validation.checkId(req.session.user._id);
    } catch (e) {
      return res.status(400).render("profile", { error: e });
    }
    try {
      let user = await userData.getUserById(req.session.user._id);
      let userWatchlistNumbers = user.watchlist;
      let userWatchlist = [];
      try {
        userWatchlist = await userWatchlistNumbers.reduce(
          async (previousPromise, movieId) => {
            let arr = await previousPromise;
            let movie = await helper.getMovieInfo(movieId);
            return arr.concat(movie);
          },
          Promise.resolve([])
        );
      } catch (e) {
        console.log(e); //change this later
      }
      return res.render("profile", {
        isAuthenticated: true,
        userWatchlist: userWatchlist,
        script_partial: "watchlist",
      });
    } catch (e) {
      console.log(e);
    }
  })
  .patch(async (req, res) => {
    req.session.user._id = xss(req.session.user._id);
    req.body.movieId = xss(req.body.movieId);
    req.body.operation = xss(req.body.operation);
    try {
      req.session.user._id = validation.checkId(req.session.user._id);
      req.body.movieId = await validation.checkMovieId(req.body.movieId);
      req.body.operation = validation.checkOperation(req.body.operation);
    } catch (e) {
      return res.render("profile", { 
        isAuthenticated: true,
        error: e 
      });
    }
    //adding validation to check if movie exists in user watchlist
    try {
      let user = await userData.getUserById(req.session.user._id);
      let userWatchlist = user.watchlist;
      //check if movie exists in user likes
      if (!userWatchlist.includes(req.body.movieId)) {
        throw `Movie does not exist in user watchlist`;
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const updatedWatchlistNumbersObject = await userData.updateUserWatchlist(
        req.session.user._id,
        req.body.movieId,
        req.body.operation
      );
      let updatedWatchlistNumbers = updatedWatchlistNumbersObject.watchlist;
      let updatedWatchlist = [];
      try {
        updatedWatchlist = await updatedWatchlistNumbers.reduce(
          async (previousPromise, movieId) => {
            let arr = await previousPromise;
            let movie = await helper.getMovieInfo(movieId);
            return arr.concat(movie);
          },
          Promise.resolve([])
        );
      } catch (e) {
        console.log(e);
      }
      return res.render("profile", {
        isAuthenticated: true,
        userWatchlist: updatedWatchlist,
        script_partial: "watchlist",
      });
    } catch (e) {
      console.log(e);
    }
  });

router
  .route("/likes")
  .get(async (req, res) => {
    req.session.user._id = xss(req.session.user._id);
    try {
      req.session.user._id = validation.checkId(req.session.user._id);
    } catch (e) {
      return res.status(400).render("profile", { error: e });
    }
    try {
      let user = await userData.getUserById(req.session.user._id);
      let userLikeNumbers = user.likes;
      let userLikes = [];
      try {
        userLikes = await userLikeNumbers.reduce(
          async (previousPromise, movieId) => {
            let arr = await previousPromise;
            let movie = await helper.getMovieInfo(movieId);
            return arr.concat(movie);
          },
          Promise.resolve([])
        );
      } catch (e) {
        console.log(e); //change this later
      }
      return res.render("profile", {
        isAuthenticated: true,
        userLikes: userLikes,
        script_partial: "likes",
      });
    } catch (e) {
      console.log(e);
    }
  })
  .patch(async (req, res) => {
    req.session.user._id = xss(req.session.user._id);
    req.body.movieId = xss(req.body.movieId);
    req.body.operation = xss(req.body.operation);
    try {
      req.session.user._id = validation.checkId(req.session.user._id);
      req.body.movieId = await validation.checkMovieId(req.body.movieId);
      req.body.operation = validation.checkOperation(req.body.operation);
    } catch (e) {
      return res.render("profile", {
        isAuthenticated: true, 
        error: e 
      });
    }
    //adding validation to check if movie exists in user likes
    try {
      let user = await userData.getUserById(req.session.user._id);
      let userLikes = user.likes;
      //check if movie exists in user likes
      if (!userLikes.includes(req.body.movieId)) {
        throw `Movie does not exist in user likes`;
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const userUpdatedResp = await userData.updateUserLikes(
        req.session.user._id,
        req.body.movieId,
        req.body.operation
      );
      let updatedLikesNumbers = userUpdatedResp.likes;
      let updatedLikes = [];
      try {
        updatedLikes = await updatedLikesNumbers.reduce(
          async (previousPromise, movieId) => {
            let arr = await previousPromise;
            let movie = await helper.getMovieInfo(movieId);
            return arr.concat(movie);
          },
          Promise.resolve([])
        );
      } catch (e) {
        console.log(e); //change this later
      }
      return res.render("profile", {
        isAuthenticated: true,
        userLikes: updatedLikes,
        script_partial: "likes",
      });
    } catch (e) {
      console.log(e);
    }
  });

router.route("/activity").get(async (req, res) => {
  req.session.user._id = xss(req.session.user._id);
  try {
    req.session.user._id = validation.checkId(req.session.user._id);
  } catch (e) {
    console.log(e); //change this later
  }
  try {
    let logsWithoutMovieTitle = await activityData.getLogsByUserId(
      req.session.user._id
    );
    let logs = [];
    try {
      logs = await logsWithoutMovieTitle.reduce(
        async (previousPromise, log) => {
          let arr = await previousPromise;
          let movie = await helper.getMovieInfo(log["movieId"]);
          let movieTitle = movie.title;
          log["movieTitle"] = movieTitle;
          return arr.concat(log);
        },
        Promise.resolve([])
      );
    } catch (e) {
      console.log(e); //change this later
    }
    logs = logs.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    console.log(logs);
    return res.render("profile", {
      isAuthenticated: true, 
      logs: logs, 
      script_partial: "activity" });
  } catch (e) {
    return res.render("profile", { 
      isAuthenticated: true,
      error: e });
  }
});

router.route("/lists").get(async (req, res) => {
  req.session.user._id = xss(req.session.user._id);
  try {
    req.session.user._id = validation.checkId(req.session.user._id);
  } catch (e) {
    return res.render("error", { error: e });
  }
  try {
    let lists = await listData.getAllLists(req.session.user._id);
    return res.render("profile", { 
      isAuthenticated: true,
      lists: lists, 
      script_partial: "lists" });
  } catch (e) {
    res.render("error", { error: e });
  }
});

router
  .route("/following")
  .get(async (req, res) => {
    req.session.user._id = xss(req.session.user._id);
    try {
      req.session.user._id = validation.checkId(req.session.user._id);
    } catch (e) {
      return res.render("error", { error: e });
    }
    try {
      let user = await userData.getUserById(req.session.user._id);
      let profilesFollowedIds = user.following;
      let profilesFollowed = [];
      try {
        profilesFollowed = await profilesFollowedIds.reduce(
          async (previousPromise, profileId) => {
            let arr = await previousPromise;
            let profile = await userData.getUserById(profileId);
            return arr.concat(profile);
          },
          Promise.resolve([])
        );
      } catch (e) {
        console.log(e); //change this later
      }
      return res.render("profile", {
        isAuthenticated: true,
        following: profilesFollowed,
        script_partial: "following",
      });
    } catch (e) {
      res.render("error", { error: e });
    }
  })
  .patch(async (req, res) => {
    req.session.user._id = xss(req.session.user._id);
    req.body.followingId = xss(req.body.followingId);
    req.body.operation = xss(req.body.operation);
    //adding validation to check if user exists in user following
    try {
      let user = await userData.getUserById(req.session.user._id);
      let userFollowing = user.following;
      //check if movie exists in user likes
      if (!userFollowing.includes(req.body.followingId)) {
        throw `User does not exist in user following`;
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const updatedFollowingIdsObject = await userData.updateUserFollowing(
        req.session.user._id,
        req.body.followingId,
        req.body.operation
      );
      let updatedFollowingIds = updatedFollowingIdsObject.following;
      let updatedFollowing = [];
      try {
        updatedFollowing = await updatedFollowingIds.reduce(
          async (previousPromise, userId) => {
            let arr = await previousPromise;
            let profile = await userData.getUserById(userId);
            return arr.concat(profile);
          },
          Promise.resolve([])
        );
      } catch (e) {
        console.log(e); //change this later
      }
      return res.render("profile", {
        isAuthenticated: true,
        following: updatedFollowing,
        script_partial: "following",
      });
    } catch (e) {
      return res.status(400).render("error", { error: e });
    }
  });

router.route("/statistics").get(async (req, res) => {
  req.session.user._id = xss(req.session.user._id);
  try {
    req.session.user._id = validation.checkId(req.session.user._id);
  } catch (e) {
    return res.render("error", { error: e });
  }
  try {
    let statistics = await statsData.allStats(req.session.user._id);
    if (statistics == null) {
      return res.render("profile", {
        isAuthenticated: true,
        statsAvailable: false,
        script_partial: "statistics",
      });
    }
    return res.render("profile", {
      isAuthenticated: true,
      statsAvailable: true,
      totalMoviesWatched: statistics.totalMoviesWatched,
      totalTimeWatched: statistics.totalTimeWatched,
      mostWatchedMovie: statistics.mostWatchedMovie,
      mostWatchedGenre: statistics.mostWatchedGenre,
      mostWatchedActor: statistics.mostWatchedActor,
      mostWatchedDirector: statistics.mostWatchedDirector,
      averageRating: statistics.averageRatingByUser,
      favoriteDecade: statistics.favoriteDecade,
      script_partial: "statistics",
    });
  } catch (e) {
    res.render("error", { error: e });
  }
});

export default router;

//likes --DONE
//watchlist --DONE
//following --DONE
//activity --DONE
//lists --DONE
//stats --DONE
//userinfo
