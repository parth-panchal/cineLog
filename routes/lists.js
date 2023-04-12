import { Router } from "express";
const router = Router();
import { listData } from "../data/index.js";
import * as validation from "../utils/validation.js";

router
  .route("/")
  .get(async (req, res) => {
    //code to GET all lists from a user
    let userId;
    try {
      userId = req.session.user._id ;
      userId=validation.checkId(userId, "User ID");
    } catch (error) {
      return res
        .status(400)
        .render("error",{ error: "User must be " });
    }
    try {
      const lists = await listData.getAllLists(userId);
      return res.status(200).json(lists);
    } catch (e) {
      return res.status(404).render("error",{error:e});
    }
  });
router
  .route("/newlist")
  .post(async (req, res) => {
    //code to POST lists for a user
    const listInfo = req.body;
    try {
      let userId = validation.checkId(req.params.userId, "User ID");
      let title = validation.checkString(listInfo.title, "Title");
      let movies = validation.checkMovieArray(listInfo.movies, "Movies");
      const list = await listData.createList(userId, title, movies);
      return res.status(200).json(list);
    } catch (e) {
      return res.status(404).send(e.message);
    }
  });

router
  .route("/list/:listId")
  .get(async (req, res) => {
    //code to GET a list with listId
    try {
      let listId = validation.checkId(req.params.listId, "List ID");
    } catch (error) {
      return res
        .status(400)
        .json({ ErrorMessage: "A valid listid must be provided!" });
    }
    try {
      let listId = validation.checkId(req.params.listId, "List ID");
      const list = await listData.getListById(listId);
      return res.status(200).json(list);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    //code to DELETE a list
    let listId;
    try {
      let listId = validation.checkId(req.params.listId, "List ID");
    } catch (error) {
      return res
        .status(400)
        .json({ ErrorMessage: "A valid Listid must be provided!" });
    }

    try {
      await listData.deleteList(listId);
      return res.status(200).json({ listId: listId, deleted: true });
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .put(async (req, res) => {
    //code to edit a list
    const listInfo = req.body;
    try {
      let listId = validation.checkId(req.params.listId, "List ID");
      let title = validation.checkString(listInfo.title, "Title");
      let movies = validation.checkMovieArray(listInfo.movies, "Movies");
      const updatedlist = await listData.updateList(
        listId,
        title,
       movies
      );
      return res.status(200).json(updatedlist);
    } catch (e) {
      return res.status(404).send(e.message);
    }
  });

export default router;
