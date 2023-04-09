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
	= Use email validation once it's implemented
	- Use username validation once it's implemented
	- Improve validation/storing for password once we learn
	  hashing and authentication
	*/
	email = validation.checkString(email, "Email");
	username = validation.checkString(username, "Username");
	password = validation.checkString(password, "Password");

	const existingUsername = await getUserByUsername(username);
	if (!existingUsername) throw `Error: User already exists with that username`;

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

	return await this.getUserById(newUserInfo.insertedId.toString());

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
	username = validation.checkProvided(username, "Username");

	const userCollection = await users();
	const userInfo = userCollection.findOne({ username: this.username });

	if (!userInfo) throw `Error: User not found`;

	return userInfo;
}