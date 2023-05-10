import { Router } from "express";
import xss from "xss";
import * as validation from "../utils/validation.js";
import { activityData, userData } from "../data/index.js";
import { transformInfo } from "../utils/helper.js";
const router = Router();

router
    .route("/:username")
    .get(async (req, res) => {
        // When a user clicks a user from the search results page, it would make a request to here
        // This will call API for movie details about specific one
        // Redirects to get route if data is present
        let username = xss(req.params.username);
        let isAuthenticated = req.session.user ? true : false;

        try {
            username = validation.checkUsername(username, "Username");
        } catch(error) {
            return res.status(400).json({error: error});
        }

        try {
            let alreadyFollowing = false;
            let sameUser = false;
            const userInfo = await userData.getUserByUsername(username);
            const userActivity = await activityData.getLogsByUserId(userInfo._id);

            if(isAuthenticated) {
                let userId = xss(req.session.user._id);
                let { following } = await userData.getUserById(userId);
                if(following.includes(userInfo._id)) alreadyFollowing = true;
                if(userId === userInfo._id) sameUser = true;
            }

            let activityInfo = await transformInfo(userActivity, "movieInfo", true);
            let watchlistInfo = await transformInfo(userInfo.watchlist, "movieInfo", false);
            let likeInfo = await transformInfo(userInfo.likes, "movieInfo", false);
            let followingInfo = await transformInfo(userInfo.following, "userInfo", false);

            res.render('user', {
                username: userInfo.username,
                logs: activityInfo,
                userWatchlist: watchlistInfo,
                userLikes: likeInfo,
                following: followingInfo,
                isAuthenticated: isAuthenticated,
                alreadyFollowing: alreadyFollowing,
                sameUser: sameUser,
                searchedUser: true
            });
        } catch (error) {
            return res.status(500).json({error: error});
        }
    })
    .patch(async (req, res) => {
        // When a user clicks the buttons to follow the searched user they would all fire here
        // Checks button was clicked and makes the DB call to add to that function
        let userId = req.session.user._id;
        let searchUsername = xss(req.params.username);

        try {
            userId = validation.checkId(userId, "User ID");
            searchUsername = validation.checkUsername(searchUsername);
        } catch (error) {
            return res.status(400).json({error: error});
        }

        try {
            const { _id } = await userData.getUserByUsername(searchUsername);
            if(userId === _id) throw "Error: User cannot follow own profile";
            const updatedUser = await userData.updateUserFollowing(userId, _id, "add");

            res.json({success: true});
        } catch (error) {
            return res.status(500).json({error: error});
        }
    });

export default router;