import Router from "express";
const router = Router();
import { trendingData } from "../data/index.js";
import { userData } from "../data/index.js";
import * as helper from "../utils/helper.js";

router.get("/", async (req, res) => {
  let isAuthenticated = req.session.user ? true : false;
  let trending = await trendingData.calculateTrending();
  let trendingList = [];
  for (const movie in trending) {
    let movieInfo = await helper.getMovieInfo(movie);
    trendingList.push(movieInfo);
  }

  if (isAuthenticated) {
    //console.log(req.session.user);
    let userRecommendations = await userData.calculateRecommendationsForUser(
      req.session.user._id
    );
    return res.render("homepage", {
      isAuthenticated: isAuthenticated,
      trendingList: trendingList,
      userRecommendations: userRecommendations,
    });
  } else {
    return res.render("homepage", {
      isAuthenticated: isAuthenticated,
      trendingList: trendingList,
    });
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

export default router;
