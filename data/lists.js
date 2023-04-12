// create list - used by /list/new route
// view list - /profile/:username/lists - getAll(), /list/:id - get()
// edit list - used by /list/:id route
// delete list - used by /list/:id route
// delete entry from list - used by /list/:id route
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import * as validation from "../utils/validation.js";


const exportedMethods = {
  async create(userId, title, movies) {
    //for validation validate if
    //userId is valid
    //title is a string
    //movies is an array of integers
    validation.checks(userId);
    userId = userId.trim();
    if (!ObjectId.isValid(userId)) throw "invalid object ID";
    title = title.trim();
    if (!movies || !Array.isArray(movies))
      throw "You must provide an array of movies";
    if (movies.length === 0) throw "You must supply at least one movie";
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
      }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw "No update occured in the user while adding album!";
    }

    newList._id = newList._id.toString();
    return newList;
  },

  async getAll(userId) {
    //check userID
    validation.checks(userId);
    userId = userId.trim();
    if (!ObjectId.isValid(userId)) throw "invalid object ID";
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(id) });
    if (user === null) throw "No user with that id";

    let movieList = user.lists;
    if (movieList.length === 0) throw "No lists present for this user Id";
    movieList.forEach((element) => {
      element._id = element._id.toString();
    });
    return movieList;
  },

  async get(listId) {
    validation.checks(listId);
    listId = listId.trim();
    if (!ObjectId.isValid(listId)) throw "invalid object ID";

    const userCollection = await users();
    const list = await userCollection.findOne(
      { "lists._id": new ObjectId(listId) },
      {
        projection: {
          _id: 0,
          lists: { $elemMatch: { _id: new ObjectId(listId) } },
        },
      }
    );
    if (!list) {
      throw "Error: list not found";
    }
    list.lists[0]._id = list.lists[0]._id.toString();
    return list.lists[0];
  },
  async delete(listId) {
    validation.checks(listId);
    listId = listId.trim();
    // console.log("hi3");
    if (!ObjectId.isValid(listId)) throw "invalid object ID";
    // console.log("hi3");
    const userCollection = await users();
    // console.log(userCollection)
    const user = await userCollection
      .find({
        "lists._id": new ObjectId(listId),
      })
      .toArray();
    if (!user) {
      throw "Error: user not found";
    }

    const userId = user[0]._id;
    // let thisList = await this.get(listId);
    // console.log(r);
    const deleteInfo = await userCollection.updateOne(
      { _id: userId },
      {
        $pull: { albums: { _id: new ObjectId(listId) } },
      }
    );
    if (deleteInfo.modifiedCount === 0) {
      throw "No deletion occured!";
    }
    const updatedUser = await userCollection.findOne({ _id: userId });
    return updatedUser;
  },
  async updateList(listId, title, movies) {
    validation.checks(listId);
    listId = listId.trim();
    // console.log("hi3");
    if (!ObjectId.isValid(listId)) throw "invalid object ID";
    title = title.trim();
    validation.checks(title);
    if (!movies || !Array.isArray(movies))
      throw "You must provide an array of movies";
    if (movies.length === 0) throw "You must supply at least one movie";
    movies.forEach((elem) => {
      elem = validation.checkNumber(elem, "movie");
    });
    const updatedList = {
      title: title,
      movies: movies,
    };
    const userCollection = await users();
    const user = await userCollection
      .find({
        "lists._id": new ObjectId(listId),
      })
      .toArray();
    if (!user) {
      throw "Error: user not found";
    }

    const userId = user[0]._id;
    const updatedInfo = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: updatedList },
      { returnDocument: "after" }
    );
    if (updatedInfo.lastErrorObject.n === 0) {
      throw "could not update dog successfully";
    }
    updatedInfo.value._id = updatedInfo.value._id.toString();
    return updatedInfo.value;
  },
};
