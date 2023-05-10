import { Router } from "express";
const router = Router();
import { listData } from "../data/index.js";
import * as validation from "../utils/validation.js";
import { getMovieInfo } from "../utils/helper.js";
import middleware from "../middleware.js";
import xss from "xss";

router
  .route("/:listId")
  .all(middleware.ensureCorrectUser)
  .get(async (req, res) => {
    //code to GET a list with listId
    let isAuthenticated = req.session.user ? true : false;
    let listId;
    try {
      listId = validation.checkId(xss(req.params.listId), "List ID");
    } catch (error) {
      return res
        .status(400)
        .json({ ErrorMessage: "A valid listid must be provided!" });
    }
    try {
      const list = await listData.getListById(listId);
      const movieData = await getAllMovieInfo(list.movies);
      movieData.forEach((elem) => {
        elem.release_date = elem.release_date.slice(0, 4);
      });
      return res.status(200).render("listById", { isAuthenticated, list, movieList: movieData });
    } catch (e) {
      return res.status(404).render("error", {error:e});
    }
  })
  .delete(async (req, res) => {
    //code to DELETE a list
    let listId;
    try {
      listId = validation.checkId(xss(req.params.listId), "List ID");
    } catch (error) {
      return res
        .status(400)
        .json({ ErrorMessage: "A valid Listid must be provided!" });
    }

    try {
      await listData.deleteList(listId);
      // return res.status(200).json({ message: "List deleted successfully" });
      req.session.deleteSuccess = true;
      return res.redirect("/profile/lists");
    } catch (e) {
      return res.status(500).render("error", {error:e});;
    }
  });

router.route("/:listId/in").get(async (req, res) => {
  //code to GET a list with listId
  let listId;
  try {
    listId = validation.checkId(xss(req.params.listId), "List ID");
  } catch (error) {
    return res
      .status(400)
      .json({ ErrorMessage: "A valid listid must be provided!" });
  }
  try {
    const list = await listData.getListById(listId);
    const movieData = await getAllMovieInfo(list.movies);
    movieData.forEach((elem) => {
      elem.release_date = elem.release_date.slice(0, 4);
    });
    return res.status(200).json( { list, movieList: movieData });
  } catch (e) {
    return res.status(404).json({ error: e });
  }
});

router
  .route("/:listId/edit")
  .all(middleware.ensureCorrectUser)
  .get(async (req, res) => {
    let isAuthenticated = req.session.user ? true : false;

    let listId;
    try {
      listId = validation.checkId(xss(req.params.listId), "List ID");
    } catch (error) {
      return res
        .status(400)
        .json({ ErrorMessage: "A valid listid must be provided!" });
    }
    try {
      const list = await listData.getListById(listId);
      const movieData = await getAllMovieInfo(list.movies);
      movieData.forEach((elem) => {
        elem.release_date = elem.release_date.slice(0, 4);
      });
      return res.status(200).render("editList", { isAuthenticated, list, movieList: movieData });
    } catch (e) {
      return res.status(404).render("error", {error:e});
    }
  })
  .put(async (req, res) => {
    //code to edit a list
    const listInfo = req.body;
    try {
      let listId = validation.checkId(xss(req.params.listId), "List ID");
      let title = validation.checkString(xss(listInfo.title), "Title");
      let movies = validation.checkMovieArray(listInfo.movies, "Movies");
      const updatedlist = await listData.updateList(listId, title, movies);
      return res.status(200).json(updatedlist);
    } catch (e) {
      return res.status(404).render("error", {error:e});
    }
  });

async function getAllMovieInfo(movieIds) {
  const moviePromises = movieIds.map(getMovieInfo);
  const movieData = await Promise.all(moviePromises);
  return movieData;
}

export default router;
