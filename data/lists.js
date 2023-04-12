// create list - used by /list/new route
// view list - /profile/:username/lists - getAll(), /list/:id - get()
// edit list - used by /list/:id route
// delete list - used by /list/:id route
// delete entry from list - used by /list/:id route
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import * as validation from "../utils/validation.js";
import { checkNumber } from "../utils/validation.js";

const exportedMethods = {
  async create(userId, title, movies) {
    //for validation validate if 
    //userId is valid
    //title is a string
    //movies is an array of integers 
    userId = userId.trim();
    title = title.trim();
    movies.forEach((elem) => {
        elem = validation.checkNumber(elem, "movie");
    });
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(id) });
    if (user === null) throw "No user with that id";

    let newList = {
      _id: new ObjectId(),
      title: title,
      movies: movies,
    };
    const updatedInfo = await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $push: { lists: newList },
        $set: { overallRating: newOverallRating },
      }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw "No update occured in the band while adding album!";
    }

    newList._id = newList._id.toString();
    return newList;
  },

  async getAll(userId){
    //check userID


    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(id) });
    if (user === null) throw "No user with that id";

    let movieList = user.lists;
    if (movieList.length === 0)
      throw "No lists present for this user Id";
    movieList.forEach((element) => {
      element._id = element._id.toString();
    });
    return movieList;
  },
  
};
