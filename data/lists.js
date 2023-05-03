// create list - used by /list/new route
// view list - /profile/:username/lists - getAll(), /list/:id - get()
// edit list - used by /list/:id route
// delete list - used by /list/:id route
// delete entry from list - used by /list/:id route
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import * as validation from "../utils/validation.js";
import * as userData from "./users.js";

const createList = async (userId, title, movies) => {
  //for validation validate if
  //userId is valid
  //title is a string
  //movies is an array of integers/valid movieIDs
  userId = validation.checkId(userId, "User ID");
  title = validation.checkString(title, "Title");
  movies = validation.checkMovieArray(movies, "Movies");
  const userCollection = await users();
  const user = await userData.getUserById(userId);

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
    throw "No update occured in the user while adding lists!";
  }

  newList._id = newList._id.toString();
  return newList;
};

const getAllLists = async (userId) => {
  //check userID
  userId = validation.checkId(userId, "User ID");
  const user = await userData.getUserById(userId);

  let movieList = user.lists;
  if (movieList.length === 0) throw "No lists present for this user Id";
  movieList.forEach((element) => {
    element._id = element._id.toString();
  });
  return movieList;
};

const getListById = async (listId) => {
  listId = validation.checkId(listId, "List ID");

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
};

const deleteList = async (listId) => {
  listId = validation.checkId(listId, "ListID");
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

  const deleteInfo = await userCollection.updateOne(
    { _id: userId },
    {
      $pull: { lists: { _id: new ObjectId(listId) } },
    }
  );
  if (deleteInfo.modifiedCount === 0) {
    throw "No deletion occured!";
  }
  const updatedUser = await userCollection.findOne({ _id: userId });
  return updatedUser;
};

const updateList = async (listId, title, movies) => {
  listId = validation.checkId(listId, "List ID");
  title = validation.checkString(title, "Title");
  movies = validation.checkMovieArray(movies, "Movies");
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
    { _id: userId },
    {
      $set: {
        "lists.$[elem].title": updatedList.title,
        "lists.$[elem].movies": updatedList.movies,
      },
    },
    {
      arrayFilters: [{ "elem._id": new ObjectId(listId) }],
      returnDocument: "after",
    }
  );

  if (updatedInfo.lastErrorObject.n === 0) {
    throw "could not update the list successfully";
  }
  updatedInfo.value._id = updatedInfo.value._id.toString();
  return updatedInfo.value;
};

export { createList, getAllLists, getListById, deleteList, updateList };
