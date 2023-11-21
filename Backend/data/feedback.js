const mongoCollections = require("../Config/mongoCollections");
const feedback = mongoCollections.feedback;
let { ObjectId } = require("mongodb");
const automation = require("./automation");

const createFeedback = async (feedbackMsg, familyUserID) => {
  console.log("Inside createFeedback");
  // Cleaning Data: Triming input for storage
  feedbackMsg = feedbackMsg.trim();

  const feedbackCollection = await feedback();

  let newFeedback = {
    feedbackMsg: feedbackMsg,
    familyUserID: familyUserID,
  };

  let insertFeedback = await feedbackCollection.insertOne(newFeedback);
  if (!insertFeedback.acknowledged || insertFeedback.insertedCount === 0) {
    throw { statusCode: 500, error: "The feedback is not added" };
  }

  await automation.feedbackAlert(feedbackMsg);

  let newFeedbackID = insertFeedback.insertedId;
  let result = await feedbackCollection.findOne({ _id: newFeedbackID });
  if (!result) {
    throw { statusCode: 404, error: `No feedback with the id:- ${id}` };
  }
  result._id = result._id.toString();
  return result;
};

// Get all feedback for admin dashboard
const getAllFeedbacks = async () => {
  let feedbackCollection = await feedback();
  let allFeedbackList = await feedbackCollection.find({}).toArray();
  // if (allFeedbackList.length === 0) {
  //   throw { statusCode: 404, error: "No feedbacks in the Database" };
  // }
  if (allFeedbackList.length > 0) {
    allFeedbackList.forEach((element) => {
      element._id = element._id.toString();
    });
  }
  return allFeedbackList;
};

module.exports = {
  createFeedback,
  getAllFeedbacks,
};
