import { ObjectId } from "mongodb";
import { getMovieInfo } from "../utils/helper.js";

const checkString = (strVal, name) => {
  if (typeof strVal !== "string") throw `Error: ${name} must be a string`;

  if (strVal.trim().length === 0)
    throw `Error: ${name} cannot be an empty string or just spaces`;

  // This would make sense to check for strings, but commented out because
  // not sure if we need this
  // if (!isNaN(strVal.trim())) throw `Error: ${name} only contains digits`;

  return strVal.trim();
};

const checks = (str) => {
  if (!str) throw "You must provide a string";
  if (typeof str !== "string") throw "Input must be a string";
  if (str.trim().length === 0)
    throw "Input cannot be an empty string or string with just spaces";
};

const checkStringArray = (arr, name) => {
  if (!Array.isArray(arr)) throw `Error: ${name} must be an array`;

  if (arr.length === 0) throw `Error: ${name} must have at least one element`;

  for (let index in arr) {
    arr[index] = validateString(arr[index], `${name} elements`);
  }

  return arr;
};

function isLetter(char) {
  return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
}

function isNumber(char) {
  return char >= "0" && char <= "9";
}

//vallidates that username is in the following format:
//1. does not start with a number
//2. can only contain letters, numbers, periods, and underscores
//3. must be between 3 and 20 characters
const checkUsername = (username) => {
  username = checkString(username, "Username");
  if (!isLetter(username.charAt(0)))
    throw "Error: Username must start with a letter";
  for (let i = 0; i < username.length; i++) {
    const char = username.charAt(i);
    if (!isLetter(char) && !isNumber(char) && char !== "." && char !== "_")
      throw "Error: Username can only contain letters, numbers, periods, and underscores";
  }
  if (username.length < 3 || username.length > 20)
    throw "Error: Username must be between 3 and 20 characters";
  return username;
};

//adding a separate validation for rating, as it has different requirements
//the idea is that when we say ratings, we're actually talking about how many 'stars' a user gives a movie,
//so the rating must be between 0 and 5, and must be a multiple of 0.5.
//I've seen some websites that allow users to give half stars, so I think this is a good idea.
const checkRating = (rating) => {
  rating = checkNumber(rating, "Rating");
  if (rating < 0 || rating > 5) throw "Error: Rating must be between 0 and 5";
  if (rating % 0.5 !== 0) throw "Error: Rating must be a multiple of 0.5";
  return rating;
};

//do we really need email now? Can't we just have the user log in with the username?
//I don't think we do, but I'll leave it here for now

//validates email is in the following format:
//1. check if email has exactly one @
//2. check if email has atleast one . after @
//3. check if email does not start or end with @ or .
const checkEmail = (email) => {
  email = this.checkString(email, "Email");
  const atPos = email.indexOf("@");
  if (atPos === -1 || email.indexOf("@", atPos + 1) !== -1)
    throw "Error: Invalid email";
  const dotPos = email.indexOf(".", atPos);
  if (dotPos === -1 || dotPos === email.length - 1)
    throw "Error: Invalid email";
  if (
    email.startsWith(".") ||
    email.startsWith("@") ||
    email.endsWith(".") ||
    email.endsWith("@")
  )
    throw "Error: Invalid email";
  return email;
};

const checkNumber = (numVal, name) => {
  if (typeof numVal !== "number" || isNaN(numVal))
    throw `Error: ${name} must be a valid number`;
  return numVal;
};

const checkNumberAndRoundOne = (numVal, name) => {
  checkNumber(numVal, name);
  const roundedNum = Math.floor(numVal * 10) / 10;
  return roundedNum;
};

const checkId = (id, name) => {
  id = checkString(id, name);
  if (!ObjectId.isValid(id)) throw `Error: ${name} is an invalid object id`;
  return id;
};

const checkMovieId = (movieId) => {
  if (movieId === undefined) throw "Error: Movie ID is required";
  if (movieId === null) throw "Error: Movie ID cannot be null";
  if (isNaN(movieId)) throw "Error: Movie ID must be a number";
  let movie = getMovieInfo(movieId);
  if (!movie) throw "Error: Movie not found";
  return movieId;
};

// Validate that date is in MM/DD/YYYY format
// Assume that dateVal is string
// Will probably change depending on how we handle dates
const checkDate = (dateVal, name) => {
  dateVal = checkString(dateVal, name);

  // Seperate the date into 3 parts
  // parts[0]: Months
  // parts[1]: Days
  // parts[2]: Year
  const parts = dateVal.split("/");
  if (parts.length !== 3) throw `Error: Invalid date for ${name}`;

  if (parts[0].length !== 2 || parts[1].length !== 2 || parts[2].length !== 4)
    throw `Error: Invalid format for ${name}: Must be in MM/DD/YYYY form`;

  const month = parseInt(parts[0]);
  const day = parseInt(parts[1]);
  const year = parseInt(parts[2]);

  if (isNaN(month) || isNaN(day) || isNaN(year))
    throw `Error: Invalid format for ${name}: Month, Day, and Year must all be valid numbers`;

  if (month < 0 || month > 12)
    throw `Error: Invalid format for ${name}: Month Invalid Range`;
  if (day < 0 || day > 31)
    throw `Error: Invalid format for ${name}: Day Invalid Range`;
  const currYear = new Date(Date.now()).getFullYear();
  if (year < 1900 || year > currYear)
    `Error: Invalid format for ${name}: Year Invalid Range (1900 - ${currYear})`;
  return dateVal;
};

// Validates that the given arguments are provided
// name: Descriptive name detailing what the arguments are for
// Note, this will throw an error for the int 0, do not use if expected input can be 0
// Note, this does not return which arguments were not provided, just general case for all args passed
const checkProvided = (name, ...args) => {
  for (let arg in args) {
    if (!args[arg]) throw `Error: All fields must be provided for ${name}`;
  }
};

export {
  checkString,
  checkStringArray,
  checkUsername,
  checkEmail,
  checkNumber,
  checkNumberAndRoundOne,
  checkId,
  checkMovieId,
  checkRating,
  checkDate,
  checkProvided,
  checks
};
