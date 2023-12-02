const mongoCollections = require("../Config/mongoCollections");
const validationFunc = require("../helpers");
const user_collection = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 16;
let { ObjectId } = require("mongodb");
const registerAlert = require("./automation");

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
    type: undefined,
    loggedIn: false,
    patients: [],
  };

  let insertUser = await userCollection.insertOne(newUser);
  // console.log(insertUser);
  if (!insertUser.acknowledged || insertUser.insertedCount === 0)
    throw { statusCode: 500, error: "Internal Server Error" };
  else {
    await registerAlert.registeredAlert(email);
  }
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
  let user = {
    email: userExist.email,
    type: userExist.type,
    userID: userExist._id.toString(),
  };
  return { authenticatedUser: true, user: user };
};

const getStaffMemberByPatientId = async (patientId) => {
  patientId = patientId.trim();

  const userCollections = await userCollection();
  let getStaffMember = await userCollections
    .find({
      patients: { $elemMatch: { patientID } },
      type: "StaffMember",
    })
    .toArray();

  if (getStaffMember.length === 0) {
    throw { statusCode: 400, error: "No staff Member " };
  }
  getStaffMember.forEach((elem) => {
    elem._id = elem._id.toString();
  });

  return getStaffMember;
};

const getFamilyMemberByParentId = async (patientId) => {
  patientId = patientId.trim();

  const userCollections = await userCollection();
  let getFamilyMember = await userCollections
    .find({
      patients: { $elemMatch: { patientId } },
      type: "FamilyMember",
    })
    .toArray();

  if (getFamilyMember.length === 0) {
    throw { statusCode: 400, error: "No family Member" };
  }
  getFamilyMember.forEach((elem) => {
    elem._id = elem._id.toString();
  });

  return getFamilyMember;
};

const getAllUsers = async () => {
  const userCollections = await user_collection();
  let getUsers = await userCollections.find({}).toArray();

  if (getUsers.length === 0) {
    throw { statusCode: 400, error: "No Users in Database" };
  }
  getUsers.forEach((elem) => {
    elem._id = elem._id.toString();
  });

  return getUsers;
};

const getUserEmailByID = async (userId) => {
  //email = email.trim();
  userId = userId.trim();
  const userCollections = await user_collection();
  let getEmailID = await userCollections.findOne({ _id: ObjectId(userId) })
    .email;
  if (!getEmailID) {
    throw { statusCode: 400, error: "No User Found" };
  }

  console.log(getEmailID);
  return getEmailID;
};

const updateUserType = async (userID, userType) => {
  console.log("inside update user type", userID, userType);
  userID = userID.trim();
  // const patientsCollections = await patients();
  const userCollections = await user_collection();
  if (!ObjectId.isValid(userID)) {
    throw { statusCode: 400, error: "User ID is not a valid object ID" };
  }
  let ID = ObjectId(userID);
  let fetchUser = await userCollections.findOne({
    _id: ID,
  });
  if (!fetchUser) {
    throw {
      statusCode: 404,
      error: "No Patient with the given ID present in the Database",
    };
  }
  // fetchUser._id = fetchUser._id.toString();
  if (fetchUser.type !== userType) {
    // update the userType
    let newObj = {
      type: userType,
    };
    const result = await userCollections.updateOne(
      { _id: fetchUser._id }, // Assuming userId is a MongoDB ObjectId
      { $set: newObj }
    );

    if (result.modifiedCount === 1) {
      console.log(`User with ID ${userID} successfully updated.`);
    } else {
      console.log(`Update for User with ID ${userID} failed.`);
      throw {
        statusCode: 404,
        error: "User could not be updated",
      };
    }
  } else {
    console.log("Same type selected again");
  }
  let fetchUser1 = await userCollections.findOne({
    _id: ID,
  });
  fetchUser1._id = fetchUser1._id.toString();
  return fetchUser1;
};

module.exports = {
  createUser,
  checkUser,
  getStaffMemberByPatientId,
  getFamilyMemberByParentId,
  getAllUsers,
  getUserEmailByID,
  updateUserType,
};
