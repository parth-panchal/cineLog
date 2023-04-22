import { Router } from "express";
import xss from "xss";
import * as validation from "../utils/validation.js";

const router = Router();

router
    .route("/:id")
    .get(async (req, res) => {

    })
    .post(async (req, res) => {
        // When a user clicks a user from the search results page, it would make a request to here
        // This will call API for movie details about specific one
        // Redirects to get route if data is present
    })
    .patch(async (req, res) => {
        // When a user clicks the buttons to follow the searched user they would all fire here
        // Checks button was clicked and makes the DB call to add to that function
    });

export default router;