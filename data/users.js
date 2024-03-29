//recommendations: object with weighted values of preference

// create user - used by /signup
// view user - used by /login, /profile, /profile/:username
// edit user - used by /profile/:username
// delete user - used by /profile/:username
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import * as validation from "../utils/validation.js";
const saltRounds = 16;
import * as helper from "../utils/helper.js";

const createUser = async (fName, lName, username, password) => {
  validation.checkProvided("User Info", fName, lName, username, password);
  fName = validation.checkName(fName, "First Name");
  lName = validation.checkName(lName, "Last Name");
  /* TODO:
	- Improve validation/storing for password once we learn
	  hashing and authentication
	- Store information as lowercase, for comparisons (validation should also lowercase
	)
	*/
  username = validation.checkUsername(username);
  password = validation.checkPassword(password, "Password");
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Try to see if the username already exists in DB
  let existingUsername = undefined;
  try {
    existingUsername = await getUserByUsername(username);
  } catch (error) {
    // Catch the error thrown if username is not found in db
    // But don't do anything since, it means the username is available
  }
  if (existingUsername) throw { message: "User already exists with that username" } ;

  let newUser = {
    fName: fName, //.toLowerCase(),
    lName: lName, //.toLowerCase(),
    username: username, //.toLowerCase(),
    password: passwordHash,
    likes: [],
    watchlist: [],
    following: [],
    lists: [],
  };

  const userCollection = await users();
  const newUserInfo = await userCollection.insertOne(newUser);

  if (!newUserInfo.insertedId || !newUserInfo.acknowledged)
    throw `Error: Could not add user`;

  return await getUserById(newUserInfo.insertedId.toString());
};

const getAllUsers = async () => {
  const userCollection = await users();
  let userArr = await userCollection.find({}).toArray();

  if (!userArr) throw `Error: Could not get all users`;

  userArr = userArr.map((user) => {
    user._id = user._id.toString();
    return user;
  });

  return userArr;
};

const getUserById = async (userId) => {
  validation.checkProvided("User ID", userId);
  userId = validation.checkId(userId, "User ID");

  const userCollection = await users();
  const userInfo = await userCollection.findOne({ _id: new ObjectId(userId) });

  if (!userInfo) throw `Error: User not found`;

  userInfo._id = userInfo._id.toString();

  return userInfo;
};

const getUserByUsername = async (username) => {
  validation.checkProvided("Username", username);
  username = validation.checkUsername(username);

  const userCollection = await users();
  const userInfo = await userCollection.findOne({ username: username });

  if (!userInfo) throw `Error: User not found`;

  userInfo._id = userInfo._id.toString();

  return userInfo;
};

const getUserByUsernamePartial = async (username) => {
  validation.checkProvided("Username", username);
  username = validation.checkString(username, "Username search query");

  const userCollection = await users();
  let userArr = await userCollection
    .find({ username: { $regex: username, $options: "i" } })
    .toArray();

  if (!userArr.length) throw `Error: No users found`;

  userArr = userArr.map((user) => {
    user._id = user._id.toString();
    return user;
  });

  return userArr;
};

const updateUser = async (userId, fName, lName, username, password) => {
  validation.checkProvided(
    "User Update Info",
    userId,
    fName,
    lName,
    username,
    password
  );
  userId = validation.checkId(userId, "User ID");
  fName = validation.checkName(fName, "First Name");
  lName = validation.checkName(lName, "Last Name");
  /* TODO:
	- Improve validation/storing for password once we learn
	  hashing and authentication
	*/
  username = validation.checkUsername(username);
  password = validation.checkPassword(password, "Password");
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const existingUser = await getUserById(userId);

  const updatedUserInfo = {
    fName: fName,
    lName: lName,
    username: username,
    password: passwordHash,
  };

  // Checks if any of the fields are different from what already exists for user in DB
  checkUpdate(existingUser, updatedUserInfo);
  // Checks if the username that the user wants to change to is already in DB (used by another user)
  // Try to see if the username already exists in DB
  if (existingUser.username !== updatedUserInfo.username) {
    //check the following conditions only if the user is trying to change his username
    let existingUsername = undefined;
    try {
      existingUsername = await getUserByUsername(username);
    } catch (error) {
      // Catch the error thrown if username is not found in db
      // But don't do anything since, it means the username is available
    }
    if (existingUsername) throw `Error: User already exists with that username`;
  }

  const userCollection = await users();
  const updatedUser = await userCollection.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    { $set: updatedUserInfo },
    { returnDocument: "after" }
  );

  if (updatedUser.lastErrorObject.n === 0) {
    throw `Error: Could not update the user with id of ${userId}`;
  }

  updatedUser.value._id = updatedUser.value._id.toString();

  return updatedUser.value;
};

const updateUserLikes = async (userId, likeMovieId, operation) => {
  validation.checkProvided("User Likes", userId, likeMovieId, operation);
  userId = validation.checkId(userId, "User ID");
  await validation.checkMovieId(likeMovieId);

  const userCollection = await users();

  if (operation === "add") {
    const existingUser = await getUserById(userId);
    if (existingUser.likes.includes(likeMovieId))
      throw `Error: Movie ${likeMovieId} already exist in ${userId} like list`;

    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $addToSet: { likes: likeMovieId } },
      {
        projection: { _id: 1, likes: 1 },
        returnDocument: "after",
      }
    );

    if (updatedUser.lastErrorObject.n === 0) {
      throw `Error: Could not add movie with id: ${likeMovieId} to user ${userId} like list`;
    }

    updatedUser.value._id = updatedUser.value._id.toString();

    return updatedUser.value;
  } else if (operation === "remove") {
    const existingUser = await getUserById(userId);
    if (!existingUser.likes.includes(likeMovieId))
      throw `Error: Movie ${likeMovieId} doesn't exist in ${userId} like list`;

    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $pull: { likes: likeMovieId } },
      {
        projection: { _id: 1, likes: 1 },
        returnDocument: "after",
      }
    );

    if (updatedUser.lastErrorObject.n === 0) {
      throw `Error: Could not remove movie with id: ${likeMovieId} from user ${userId} like list`;
    }

    updatedUser.value._id = updatedUser.value._id.toString();
    return updatedUser.value;
  } else {
    throw "Error: Operation can only be 'add' or 'remove'";
  }
};

const updateUserWatchlist = async (userId, watchlistMovieId, operation) => {
  validation.checkProvided(
    "User Watchlist",
    userId,
    watchlistMovieId,
    operation
  );
  userId = validation.checkId(userId, "User ID");
  await validation.checkMovieId(watchlistMovieId);

  const userCollection = await users();

  if (operation === "add") {
    const existingUser = await getUserById(userId);
    if (existingUser.watchlist.includes(watchlistMovieId))
      throw `Error: Movie ${watchlistMovieId} already exist in ${userId} watchlist`;

    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $addToSet: { watchlist: watchlistMovieId } },
      {
        projection: { _id: 1, watchlist: 1 },
        returnDocument: "after",
      }
    );

    if (updatedUser.lastErrorObject.n === 0) {
      throw `Error: Could not add movie with id: ${likeMovieId} to user ${userId} watchlist`;
    }
    updatedUser.value._id = updatedUser.value._id.toString();

    return updatedUser.value;
  } else if (operation === "remove") {
    const existingUser = await getUserById(userId);
    if (!existingUser.watchlist.includes(watchlistMovieId))
      throw `Error: Movie ${watchlistMovieId} doesn't exist in ${userId} watchlist`;

    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $pull: { watchlist: watchlistMovieId } },
      {
        projection: { _id: 1, watchlist: 1 },
        returnDocument: "after",
      }
    );

    if (updatedUser.lastErrorObject.n === 0) {
      throw `Error: Could not remove movie with id: ${watchlistMovieId} from user ${userId} watchlist`;
    }

    updatedUser.value._id = updatedUser.value._id.toString();

    return updatedUser.value;
  } else {
    throw "Error: Operation can only be 'add' or 'remove'";
  }
};

const updateUserFollowing = async (userId, followingUserId, operation) => {
  validation.checkProvided(
    "User Following",
    userId,
    followingUserId,
    operation
  );
  userId = validation.checkId(userId, "User ID");
  followingUserId = validation.checkId(followingUserId, "Follower ID");

  const userCollection = await users();

  if (operation === "add") {
    if(userId === followingUserId) throw `Error: User cannot follow own profile`;
    const existingUser = await getUserById(userId);
    if (existingUser.following.includes(followingUserId))
      throw `Error: User ${followingUserId} already exist in ${userId} follow list`;

    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $addToSet: { following: followingUserId } },
      {
        projection: { _id: 1, following: 1 },
        returnDocument: "after",
      }
    );

    if (updatedUser.lastErrorObject.n === 0) {
      throw `Error: Could not add user with id: ${followingUserId} to user ${userId} follow list`;
    }

    updatedUser.value._id = updatedUser.value._id.toString();

    return updatedUser.value;
  } else if (operation === "remove") {
    const existingUser = await getUserById(userId);
    if (!existingUser.following.includes(followingUserId))
      throw `Error: User ${followingUserId} doesn't exist in ${userId} follow list`;

    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $pull: { following: followingUserId } },
      {
        projection: { _id: 1, following: 1 },
        returnDocument: "after",
      }
    );

    if (updatedUser.lastErrorObject.n === 0) {
      throw `Error: Could not remove user with id: ${followingUserId} from user ${userId} follow list`;
    }

    updatedUser.value._id = updatedUser.value._id.toString();

    return updatedUser.value;
  } else {
    throw "Error: Operation can only be 'add' or 'remove'";
  }
};

const deleteUser = async (userId) => {
  validation.checkProvided("User ID", userId);
  userId = validation.checkId(userId, "User ID");

  const userCollection = await users();
  const deletedUser = await userCollection.findOneAndDelete({
    _id: new ObjectId(userId),
  });

  if (deletedUser.lastErrorObject.n === 0) {
    throw `Error: Could not delete the user with id of ${userId}`;
  }

  // Need to go through all users and remove the
  // deleted user from their following list (if present)
  const deletedUserFromFollowing = await userCollection.updateMany(
    { following: userId },
    { $pull: { following: userId } }
  );

  if (
    !deletedUserFromFollowing.acknowledged ||
    deletedUserFromFollowing.matchedCount !==
      deletedUserFromFollowing.modifiedCount
  ) {
    throw `Error: User with id ${userId} is deleted but could not delete user from followings lists`;
  }

  // Need to go through activity of user, and delete from trending

  const returnObj = {
    userId: deletedUser.value._id.toString(),
    deleted: true,
  };

  return returnObj;
};

const checkUser = async (username, password) => {
  username = username.trim().toLowerCase();
  try {
    username = validation.checkUsername(username);
    password = validation.checkPassword(password, "Password");
  } catch (e) {
    throw e;
  }

  const userCollection = await users();

  const user = await userCollection.findOne({ username: username });

  if (!user) {
    throw {
      code: 400,
      message: "Either the username or password is invalid",
    };
  }

  const passCheck = await bcrypt.compare(password, user.password);
  if (!passCheck) {
    throw {
      code: 400,
      message: "Either the username or password is invalid",
    };
  }
  user._id = user._id.toString();
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    _id: user._id,
  };
};

const checkUpdate = (existingUser, updatedUserInfo) => {
  if (
    existingUser.fName === updatedUserInfo.fName &&
    existingUser.lName === updatedUserInfo.lName &&
    existingUser.username === updatedUserInfo.username &&
    existingUser.password === updatedUserInfo.password
  )
    throw "Error: No changes found";
};

const calculateRecommendationsForUser = async (userId) => {
  let user = await getUserById(userId);
  let userLikes = user.likes;
  let allRecos = await userLikes.reduce(async (previousPromise, movie) => {
    let all = await previousPromise;
    let movieRecos = await helper.getRecommendationsByMovieId(movie);
    return all.concat(movieRecos);
  }, Promise.resolve([]));
  //maintain a count of how many times a movie is recommended
  let movieCount = {};
  allRecos.forEach((movie) => {
    //have to store movie IDs since object keys are strings, cannot have objects as keys.
    if (movieCount[movie.id]) movieCount[movie.id] += 1;
    else movieCount[movie.id] = 1;
  });
  //sort movieCount by value
  let sortedMovieCount = Object.keys(movieCount).sort(function (a, b) {
    return movieCount[b] - movieCount[a];
  });
  //get top 10 movies
  let top10 = sortedMovieCount.slice(0, 10);
  //if we really need to use the objects, we can use this part of the code, otherwise we can just return the top10 variable
  //return top10;
  let movieObjectArray = top10.reduce(async (previousPromise, movieId) => {
    let all = await previousPromise;
    let movie = await helper.getMovieInfo(movieId);
    return all.concat(movie);
  }, Promise.resolve([]));
  return movieObjectArray;
};

export {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserByUsernamePartial,
  getUserById,
  updateUser,
  updateUserLikes,
  updateUserWatchlist,
  updateUserFollowing,
  deleteUser,
  checkUser,
  calculateRecommendationsForUser,
};
