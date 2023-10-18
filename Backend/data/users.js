const mongoCollections = require("../Config/mongoCollections");
const validationFunc = require("../helpers");
const user_collection = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 16;
let { ObjectId } = require("mongodb");

const createUser = async (email, password, phoneNumber) => {
  // Error checking for username and password
  // await validationFunc.createValidator(username, password);

  let userCollection = await user_collection();

  // Convert to lower Case before saving the username
  email = email.toLowerCase();

  // Check if user with the username exist in the database
  let userExist = await userCollection.findOne({ email: email });
  if (userExist) return { insertUser: "email already exists" };

  // Hash user password and insert user in database
  let encryptedPassword = await bcrypt.hash(password, saltRounds);
  let newUser = {
    email: email,
    password: encryptedPassword,
    phoneNumber: phoneNumber,
    active: false,
    type: "yet to be given",
    loggedIn: false,
  };

  let insertUser = await userCollection.insertOne(newUser);
  // console.log(insertUser);
  if (!insertUser.acknowledged || insertUser.insertedCount === 0)
    throw { statusCode: 500, error: "Internal Server Error" };

  return { insertedUser: true };
};

const checkUser = async (email, password) => {
  // Error checking for username and password
  // await validationFunc.createValidator(username, password);

  let userCollection = await user_collection();

  // Convert to lower Case before saving the username
  email = email.toLowerCase();
  // Check if user with the username exist in the database
  let userExist = await userCollection.findOne({ email: email });
  if (!userExist)
    return { error: "Either the username or password is invalid" };
  console.log("inside CheckUser");
  let comparePswd = await bcrypt.compare(password, userExist.password);
  if (!comparePswd)
    return { error: "Either the username or password is invalid" };

  return { authenticatedUser: true };
};

module.exports = {
  createUser,
  checkUser,
};
