// add to activity - used by /movie/:id
// add to watchlist - used by /movie/:id
// add to likes - used by /movie/:id
import { Router } from "express";
import xss from "xss";
import { activityData, userData } from "../data/index.js";
import * as validation from "../utils/validation.js";
import { getMovieCast, getMovieInfo, calculateMovieStats } from "../utils/helper.js";
import { getLogsByMovieId } from "../data/activity.js";
import { getUserById } from "../data/users.js";

const router = Router();

router
    .route("/:id")
    .get(async (req, res) => {
        // When a user clicks a movie title from the search results page, it would make a request to here
        // This will call API for movie details about specific one
        // Redirects to get route if data is present
        let movieId = xss(req.params.id);
        let isAuthenticated = req.session.user ? true : false;

        try {
            movieId = await validation.checkMovieId(movieId);
        } catch (error) {
            return res.status(400).json({error: error});
        }

        try {
            let alreadyPresentLikes = false;
            let alreadyPresentWatchlist = false;

            if(isAuthenticated) {
                let userId = xss(req.session.user._id);
                let {likes, watchlist, following} = await getUserById(userId);
                if(likes.includes(movieId)) alreadyPresentLikes = true;
                if(watchlist.includes(movieId)) alreadyPresentWatchlist = true;
            }
            
            let movieInfo = await getMovieInfo(movieId);
            let movieCast = await getMovieCast(movieId);
            movieCast = movieCast.filter(castMember => castMember.order >= 0 && castMember.order < 5 );
            let movieActivity = await getLogsByMovieId(movieId);
            let activityInfo = calculateMovieStats(movieActivity);
            let today = new Date();
            const year = today.toLocaleString("default", { year: "numeric" });
            const month = today.toLocaleString("default", { month: "2-digit" });
            const day = today.toLocaleString("default", { day: "2-digit" });
            
            // Generate yyyy-mm-dd date string
            var formattedDate = year + "-" + month + "-" + day;

            res.render('movie', {
                movieInfo: movieInfo,
                movieCast: movieCast,
                activityInfo: activityInfo,
                isAuthenticated: isAuthenticated,
                currDate: formattedDate,
                alreadyPresentLikes,
                alreadyPresentWatchlist
            });
        } catch (error) {
            return res.status(500).json({error: error});
        }
    })
    .patch(async (req, res) => {
        // When a user clicks the buttons to add activity, watchlist, or likes they would all fire here
        // If add to activity button is clicked: popform form with info to enter shows, on that submit it is called here
        // Checks button was clicked and makes the DB call to add to that function
        // Those buttons will  be regular buttons that have client-side JS associated to make the call to this route
        let userId = req.session.user._id;
        let type = xss(req.body.type); // Type will be, activity, watchlist, or likes
        let movieId = xss(req.params.id);
        let review = undefined;
        let rating = undefined;
        let date = undefined;

        try {
            userId = validation.checkId(userId, "User ID");
            type = validation.checkString(type, "Add Activity");
            movieId = await validation.checkMovieId(movieId, "Movie ID");

            if(type  === "activity") {
                review = validation.checkString(xss(req.body.review), "Review");
                rating = validation.checkRating(xss(req.body.rating));
                date = validation.checkDate(xss(req.body.date), "Date");
            }
        } catch (error) {
            return res.status(400).json({error: error});
        }

        try {
            let response;
            if(type === "activity") {
                response = await activityData.createLog(movieId, userId, review, rating, date);
            } else if(type === "watchlist") {
                response  = await userData.updateUserWatchlist(userId, movieId, "add");
            } else if(type === "likes") {
                response = await userData.updateUserLikes(userId, movieId, "add");
            } else {
                throw "Error: Type can only be 'activity', 'watchlist', or 'likes'";
            }

            res.json({success: true});

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error});
        }
        
    });

export default router;