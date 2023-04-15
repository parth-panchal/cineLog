// create user - used by /signup
// view user - used by /login, /profile, /profile/:username
// edit user - used by /profile/:username
// delete user - used by /profile/:username
import { users } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import * as validation from '../utils/validation.js';

const createUser = async (fName, lName, email, username, password) => {
	validation.checkProvided("User Info", fName, lName, email, username, password);
	fName = validation.checkString(fName, "First Name");
	lName = validation.checkString(lName, "Last Name");
	/* TODO:
	- Improve validation/storing for password once we learn
	  hashing and authentication
	- Store information as lowercase, for comparisons (validation should also lowercase
	- Check if email is unique as well
	)
	*/
	email = validation.checkEmail(email);
	username = validation.checkUsername(username);
	password = validation.checkString(password, "Password");

	// Try to see if the username already exists in DB
	let existingUsername = undefined;
	try {
		existingUsername = await getUserByUsername(username);
	} catch (error) {
		// Catch the error thrown if username is not found in db
		// But don't do anything since, it means the username is available
	}
	if (existingUsername) throw `Error: User already exists with that username`;

	let newUser = {
		fName: fName, //.toLowerCase(),
		lName: lName, //.toLowerCase(),
		email: email, //.toLowerCase(),
		username: username, //.toLowerCase(),
		password: password,
		likes: [],
		watchList: [],
		following: [],
		lists: {}
	};

	const userCollection = await users();
	const newUserInfo = await userCollection.insertOne(newUser);

	if (!newUserInfo.insertedId || !newUserInfo.acknowledged) throw `Error: Could not add user`;

	return await getUserById(newUserInfo.insertedId.toString());

};

const getAllUsers = async () => {
	const userCollection = await users();
	let userArr = await userCollection.find({}).toArray();

	if (!userArr) throw `Error: Could not get all bands`;

	userArr = userArr.map(user => {
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



const updateUser = async (userId, fName, lName, email, username, password) => {
	validation.checkProvided("User Update Info", userId, fName, lName, email, username, password)
	userId = validation.checkId(userId, "User ID");
	fName = validation.checkString(fName, "First Name");
	lName = validation.checkString(lName, "Last Name");
	/* TODO:
	- Improve validation/storing for password once we learn
	  hashing and authentication
	*/
	email = validation.checkEmail(email);
	username = validation.checkUsername(username);
	password = validation.checkString(password, "Password");

	const existingUser = await getUserById(userId);

	const updatedUserInfo = {
		fName: fName,
		lName: lName,
		email: email,
		username: username,
		password: password
	};

	// Checks if any of the fields are different from what already exists for user in DB
	checkUpdate(existingUser, updatedUserInfo);
	// Checks if the username that the user wants to change to is already in DB (used by another user)
	// Try to see if the username already exists in DB
	let existingUsername = undefined;
	try {
		existingUsername = await getUserByUsername(username);
	} catch (error) {
		// Catch the error thrown if username is not found in db
		// But don't do anything since, it means the username is available
	}
	if (existingUsername) throw `Error: User already exists with that username`;

	const userCollection = await users();
	const updatedUser = await userCollection.findOneAndUpdate(
		{ _id: new ObjectId(userId) },
		{ $set: updatedUserInfo },
		{ returnDocument: "after" } 
	);

	if (updatedUser.lastErrorObject.n === 0) {
		throw `Error: Could not update the user with id of ${userId}`;
	};

	updatedUser.value._id = updatedUser.value._id.toString();

	return updatedUser.value;

};

const deleteUser = async (userId) => {
	validation.checkProvided("User ID", userId);
	userId = validation.checkId(userId, "User ID");

	const userCollection = await users();
	const deletedUser = await userCollection.findOneAndDelete(
		{ _id: new ObjectId(userId) }
	);

	if (deletedUser.lastErrorObject.n === 0) {
		throw `Error: Could not delete the user with id of ${userId}`;
	};

	const returnObj = {
		userId: deletedUser.value._id,
		deleted: true
	}

	return returnObj;
}

const checkUpdate = (existingUser, updatedUserInfo) => {
	if(existingUser.fName === updatedUserInfo.fName
		&& existingUser.lName === updatedUserInfo.lName
		&& existingUser.email === updatedUserInfo.email
		&& existingUser.username === updatedUserInfo.username
		&& existingUser.password === updatedUserInfo.password)
		throw "Error: No changes found";
};

export {
	createUser,
	getAllUsers,
	getUserByUsername,
	getUserById,
	updateUser,
	deleteUser
}