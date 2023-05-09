import { Router } from "express";
const router = Router();
import { listData } from "../data/index.js";
import * as validation from "../utils/validation.js";
import { getMovieInfo } from "../utils/helper.js";
import xss from "xss";

router
  .route("/:listId")
  .get(async (req, res) => {
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
      return res.status(200).render("listById", { list, movieList: movieData });
    } catch (e) {
      return res.status(404).json({ error: e });
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
      return res.status(500).json({ message: "Internal server error" });
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
    console.log(list);
    console.log("done");
    const movieData = await getAllMovieInfo(list.movies);
    console.log(movieData);
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
  .get(async (req, res) => {
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
      return res.status(200).render("editList", { list, movieList: movieData });
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .put(async (req, res) => {
    //code to edit a list
    const listInfo = req.body;
    try {
      let listId = validation.checkId(xss(req.params.listId), "List ID");
      let title = validation.checkString(xss(listInfo.title), "Title");
      console.log(title);
      let movies = validation.checkMovieArray(listInfo.movies, "Movies");
      console.log(movies);
      const updatedlist = await listData.updateList(listId, title, movies);
      console.log(updatedlist);
      return res.status(200).json(updatedlist);
    } catch (e) {
      return res.status(404).send(e.message);
    }
  });

async function getAllMovieInfo(movieIds) {
  const moviePromises = movieIds.map(getMovieInfo);
  const movieData = await Promise.all(moviePromises);
  return movieData;
}

export default router;
