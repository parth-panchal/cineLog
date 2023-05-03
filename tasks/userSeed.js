import { ObjectId } from "mongodb";
import * as user from "../data/users.js";

export default async function main() {
  // ================================= User Seeding =================================
  let user1Id = "";
  let user1Username = "";
  let user2Id = "";
  let user2Username = "";
  let user3Id = "";
  let user3Username = "";

  // -------------------------------- Create Function -------------------------------
  try {
    let newUser = await user.createUser(
      "Parshotan",
      "Seenanan",
      "testAccy",
      "testPass1!"
    );
    if (newUser) console.log("User created 1");
    user1Id = newUser._id;
    user1Username = newUser.username;
  } catch (error) {
    console.log(error);
  }

  try {
    let newUser = await user.createUser(
      "Parshotan",
      "Seenanan",
      "testAccy2",
      "testPass1!"
    );
    if (newUser) console.log("User created 2");
    user2Id = newUser._id;
    user2Username = newUser.username;
  } catch (error) {
    console.log(error);
  }

  try {
    let newUser = await user.createUser(
      "Parshotan",
      "Seenanan",
      "testAccy3",
      "testPass1!"
    );
    if (newUser) console.log("User created 3");
    user3Id = newUser._id;
    user3Username = newUser.username;
  } catch (error) {
    console.log(error);
  }

  try {
    let newUser = await user.createUser(
      "Parshotan",
      "Seenanan",
      "testAccy",
      "testPass1!"
    );
    if (newUser) console.log("User created");
  } catch (error) {
    console.log(error);
  }

  try {
    let newUser = await user.createUser("Parshotan", "Seenanan", "testAccy");
    if (newUser) console.log("User created");
  } catch (error) {
    console.log(error);
  }

  try {
    let newUser = await user.createUser("", "Seenanan", "", "testPass");
    if (newUser) console.log("User created");
  } catch (error) {
    console.log(error);
  }

  try {
    let newUser = await user.createUser(
      1234,
      "Seenanan",
      "testAccy",
      "testPass1!"
    );
    if (newUser) console.log("User created");
  } catch (error) {
    console.log(error);
  }

  try {
    let newUser = await user.createUser(
      "Parshotan",
      "Seenanan",
      "TEstAccy",
      "testPass1!"
    );
    if (newUser) console.log("User created");
  } catch (error) {
    console.log(error);
  }

  try {
    let newUser = await user.createUser(
      "Parshotan",
      "Seenanan",
      "1231kasd",
      "testPass1!"
    );
    if (newUser) console.log("User created");
  } catch (error) {
    console.log(error);
  }

  try {
    let newUser = await user.createUser(
      "Parshotan",
      "Seenanan",
      "testAccy",
      "testPass1!"
    );
    if (newUser) console.log("User created");
  } catch (error) {
    console.log(error);
  }

  // -------------------------------- Get Functions -------------------------------
  try {
    let allUsers = await user.getAllUsers();
    if (allUsers) console.log("Fetched all users");
  } catch (error) {
    console.log(error);
  }

  try {
    let userInfo = await user.getUserById(user1Id);
    if (userInfo) console.log("Got Info for User 1");
  } catch (error) {
    console.log(error);
  }

  try {
    let userInfo = await user.getUserById("1029309ehrw98e");
    if (userInfo) console.log("Got Info for User 1");
  } catch (error) {
    console.log(error);
  }

  try {
    let userInfo = await user.getUserById(new ObjectId().toString());
    if (userInfo) console.log("Got Info for User 1");
  } catch (error) {
    console.log(error);
  }

  try {
    let userInfo = await user.getUserByUsername(user2Username);
    if (userInfo) console.log("Got Info for User 2");
  } catch (error) {
    console.log(error);
  }

  try {
    let userInfo = await user.getUserByUsername("fakeName");
    if (userInfo) console.log("Got Info for User 2");
  } catch (error) {
    console.log(error);
  }

  // -------------------------------- Update Functions -------------------------------
  try {
    let updatedUser = await user.updateUser(
      user3Id,
      "NewName",
      "NewLName",
      "newUserName123",
      "testPass1!"
    );
    if (updatedUser) console.log("Updated Info for User 3");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUser(
      user3Id,
      "NewName",
      "",
      "newUserName123",
      ""
    );
    if (updatedUser) console.log("Updated Info for User 3");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUser(
      user3Id,
      123,
      "NewLName",
      "newUserName123",
      "testPass"
    );
    if (updatedUser) console.log("Updated Info for User 3");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUser(
      user3Id,
      "NewName",
      "NewLName",
      "newUserName123",
      "testPass"
    );
    if (updatedUser) console.log("Updated Info for User 3");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserLikes(user1Id, 550, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added movie to like list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserLikes(user1Id, 550, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added movie to like list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserLikes(user1Id, 670, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added movie to like list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserLikes(user1Id, 234, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added movie to like list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserLikes(user1Id, 1, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added movie to like list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserLikes(user1Id, 234, "remove");
    if (updatedUser)
      console.log("Updated Info for User 1: Removed movie from like list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserLikes(user1Id, 1, "remove");
    if (updatedUser)
      console.log("Updated Info for User 1: Removed movie from like list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserLikes(user1Id, 234, "remove");
    if (updatedUser)
      console.log("Updated Info for User 1: Removed movie from like list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserLikes(user1Id, 234, "poop");
    if (updatedUser)
      console.log("Updated Info for User 1: Removed movie from like list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserWatchlist(user1Id, 550, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added movie to watchlist");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserWatchlist(user1Id, 550, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added movie to watchlist");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserWatchlist(user1Id, 670, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added movie to watchlist");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserWatchlist(user1Id, 234, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added movie to watchlist");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserWatchlist(user1Id, 1, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added movie to watchlist");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserWatchlist(user1Id, 234, "remove");
    if (updatedUser)
      console.log("Updated Info for User 1: Removed movie from watchlist");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserWatchlist(user1Id, 1, "remove");
    if (updatedUser)
      console.log("Updated Info for User 1: Removed movie from watchlist");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserWatchlist(user1Id, 234, "remove");
    if (updatedUser)
      console.log("Updated Info for User 1: Removed movie from watchlist");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserWatchlist(user1Id, 234, "poop");
    if (updatedUser)
      console.log("Updated Info for User 1: Removed movie from watchlist");
  } catch (error) {
    console.log(error);
  }
  //////
  try {
    let updatedUser = await user.updateUserFollowing(user1Id, user2Id, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added follower to follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user1Id, user2Id, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added follower to follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user1Id, user3Id, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added follower to follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user1Id, 234, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added follower to follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user1Id, 1, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added follower to follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(
      user1Id,
      user2Id,
      "remove"
    );
    if (updatedUser)
      console.log("Updated Info for User 1: Removed follower from follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user1Id, 1, "remove");
    if (updatedUser)
      console.log("Updated Info for User 1: Removed follower from follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(
      user1Id,
      new ObjectId().toString(),
      "remove"
    );
    if (updatedUser)
      console.log("Updated Info for User 1: Removed follower from follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user1Id, user2Id, "poop");
    if (updatedUser)
      console.log("Updated Info for User 1: Removed follower from follow list");
  } catch (error) {
    console.log(error);
  }

  // -------------------------------- Delete Function -------------------------------
  try {
    let deletedUser = await user.deleteUser(user2Id);
    if (deletedUser) console.log("User deleted");
  } catch (error) {
    console.log(error);
  }

  try {
    let deletedUser = await user.deleteUser(user2Id);
    if (deletedUser) console.log("User deleted");
  } catch (error) {
    console.log(error);
  }

  try {
    let deletedUser = await user.deleteUser();
    if (deletedUser) console.log("User deleted");
  } catch (error) {
    console.log(error);
  }

  // Test Case: Delete user that is followed by another, then call that other users follow list
  console.log("----------------------TEST-----------------");
  let user4Id = "";
  let user4Username = "";
  try {
    let newUser = await user.createUser(
      "Parshotan",
      "Seenanan",
      "testAccy4",
      "testPass"
    );
    if (newUser) console.log("User created 4");
    user4Id = newUser._id;
    user4Username = newUser.username;
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user1Id, user4Id, "add");
    if (updatedUser)
      console.log(
        "Updated Info for User User 1: Added follower to follow list"
      );
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserWatchlist(user1Id, 234, "remove");
    if (updatedUser)
      console.log("Updated Info for User 1: Removed movie from watchlist");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserWatchlist(user1Id, 234, "poop");
    if (updatedUser)
      console.log("Updated Info for User 1: Removed movie from watchlist");
  } catch (error) {
    console.log(error);
  }
  //////
  try {
    let updatedUser = await user.updateUserFollowing(user1Id, user2Id, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added follower to follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user1Id, user2Id, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added follower to follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user1Id, user3Id, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added follower to follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user1Id, 234, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added follower to follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user1Id, 1, "add");
    if (updatedUser)
      console.log("Updated Info for User 1: Added follower to follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(
      user1Id,
      user2Id,
      "remove"
    );
    if (updatedUser)
      console.log("Updated Info for User 1: Removed follower from follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user1Id, 1, "remove");
    if (updatedUser)
      console.log("Updated Info for User 1: Removed follower from follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(
      user1Id,
      new ObjectId().toString(),
      "remove"
    );
    if (updatedUser)
      console.log("Updated Info for User 1: Removed follower from follow list");
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user1Id, user2Id, "poop");
    if (updatedUser)
      console.log("Updated Info for User 1: Removed follower from follow list");
  } catch (error) {
    console.log(error);
  }

  // -------------------------------- Delete Function -------------------------------
  try {
    let deletedUser = await user.deleteUser(user2Id);
    if (deletedUser) console.log("User deleted");
  } catch (error) {
    console.log(error);
  }

  try {
    let deletedUser = await user.deleteUser(user2Id);
    if (deletedUser) console.log("User deleted");
  } catch (error) {
    console.log(error);
  }

  try {
    let deletedUser = await user.deleteUser();
    if (deletedUser) console.log("User deleted");
  } catch (error) {
    console.log(error);
  }

  // Test Case: Delete user that is followed by another, then call that other users follow list
  console.log("----------------------TEST-----------------");
  // let user4Id = "";
  // let user4Username = "";
  try {
    let newUser = await user.createUser(
      "Parshotan",
      "Seenanan",
      "testAccy4",
      "testPass"
    );
    if (newUser) console.log("User created 4");
    user4Id = newUser._id;
    user4Username = newUser.username;
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user1Id, user4Id, "add");
    if (updatedUser)
      console.log(
        "Updated Info for User User 1: Added follower to follow list"
      );
  } catch (error) {
    console.log(error);
  }

  try {
    let updatedUser = await user.updateUserFollowing(user3Id, user4Id, "add");
    if (updatedUser)
      console.log(
        "Updated Info for User User 1: Added follower to follow list"
      );
  } catch (error) {
    console.log(error);
  }

  try {
    let deletedUser = await user.deleteUser(user4Id);
    if (deletedUser) console.log("User 4 deleted");
  } catch (error) {
    console.log(error);
  }

  try {
    let userInfo = await user.getUserById(user1Id);
    if (userInfo) console.log("Got Info for User 1");
  } catch (error) {
    console.log(error);
  }

  // Test Case: Partial Searching
  console.log("----------------------TEST 2-----------------");
  try {
    let newUser = await user.createUser(
      "Parshotan",
      "Seenanan",
      "testAccy5",
      "testPass"
    );
    if (newUser) console.log("User created 4");
  } catch (error) {
    console.log(error);
  }

  try {
    let userArr = await user.getUserByUsernamePartial("oo");
    if (userArr) console.log("Got users for partial search");
  } catch (error) {
    console.log(error);
  }

  try {
    let deletedUser = await user.deleteUser(user4Id);
    if (deletedUser) console.log("User 4 deleted");
  } catch (error) {
    console.log(error);
  }

  try {
    let userInfo = await user.getUserById(user1Id);
    if (userInfo) console.log("Got Info for User 1");
  } catch (error) {
    console.log(error);
  }

  // Test Case: Partial Searching
  console.log("----------------------TEST 2-----------------");
  try {
    let newUser = await user.createUser(
      "Parshotan",
      "Seenanan",
      "testAccy5",
      "testPass"
    );
    if (newUser) console.log("User created 4");
  } catch (error) {
    console.log(error);
  }

  try {
    let userArr = await user.getUserByUsernamePartial("oo");
    if (userArr) console.log("Got users for partial search");
  } catch (error) {
    console.log(error);
  }

  try {
    let userArr = await user.getUserByUsernamePartial("te");
    if (userArr) console.log("Got users for partial search");
  } catch (error) {
    console.log(error);
  }
}
