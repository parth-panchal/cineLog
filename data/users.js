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
	*/
	email = validation.checkEmail(email);
	username = validation.checkUsername(username);
	password = validation.checkString(password, "Password");

	const existingUsername = await getUserByUsername(username);
	if (existingUsername) throw `Error: User already exists with that username`;

	let newUser = {
		fName: fName,
		lName: lName,
		email: email,
		username: username,
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
	const userArr = await userCollection.find({}).toArray();

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
	const userInfo = userCollection.findOne({ _id: new ObjectId(userId) });

	if (!userInfo) throw `Error: User not found`;

	return userInfo;
};

const getUserByUsername = async (username) => {
	validation.checkProvided("Username", username);
	username = validation.checkUsername(username);

	const userCollection = await users();
	const userInfo = userCollection.findOne({ username: this.username });

	if (!userInfo) throw `Error: User not found`;

	return userInfo;
}

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

	const existingUser = await getUserById(id);

	const updatedUserInfo = {
		fName: fName,
		lName: lName,
		email: email,
		username: username,
		password: password
	};

	/* TODO:
		- If user updates username, need a way to find every person that is following
		the user and update their array.
			--- Ignore this following is an array of userIds, can fetch their username regardless of changes to it
	*/
	checkUpdate(existingUser, updatedUserInfo);

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
	id = validation.checkId(userId, "User ID");

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
		&& existingUser.username === updatedUserInfo.email
		&& existingUser.password === updatedUserInfo.password)
		throw "Error: No changes found";
}