import { Router } from "express";
import xss from "xss";
import * as validation from "../utils/validation.js";
import { userData } from "../data/index.js";
const router = Router();

router
    .route("/:username")
    .get(async (req, res) => {
        // When a user clicks a user from the search results page, it would make a request to here
        // This will call API for movie details about specific one
        // Redirects to get route if data is present
        let username = xss(req.params.username);

        try {
            username = validation.checkUsername(username, "Username");
        } catch(error) {
            return res.status(400).json({error: error});
        }

        try {
            const userInfo = await userData.getUserByUsername(username);
            res.render('user', {userInfo: userInfo});
        } catch (error) {
            return res.status(500).json({error: error});
        }
    })
    .patch(async (req, res) => {
        // When a user clicks the buttons to follow the searched user they would all fire here
        // Checks button was clicked and makes the DB call to add to that function
        let userId = req.session.user.id;
        let searchUserId = xss(req.body.searchUserId);

        try {
            userId = validation.checkId(userId, "User ID");
            searchUserId = validation.checkId(searchUserId, "Searched User ID");
        } catch (error) {
            return res.status(400).json({error: error});
        }

        try {
            const updatedUser = await userData.updateUserFollowing(userId, searchUserId, "add");
            res.json({success: true});
        } catch (error) {
            return res.status(500).json({error: error});
        }
    });

export default router;