const mongoCollections = require("../Config/mongoCollections");
const inquiry = mongoCollections.inquiry;
let { ObjectId } = require("mongodb");

const createInquiry = async (patiendId, familyMemId, inquiryMessage) => {
  const inquiryCollection = await inquiry();
  let inquiryObj = {
    patiendId: patiendId,
    familyMemId: familyMemId,
    inquiryMessage: inquiryMessage,
  };
  let createInquiry = await inquiryCollection.insertOne({ inquiryObj });
  if (!createInquiry.acknowledged || createInquiry.insertedCount === 0) {
    throw { statusCode: 500, error: "The inquiry was not added" };
  }
  let fetchAgain = await inquiryCollection.findOne({
    _id: createInquiry.insertedId,
  });
  if (!fetchAgain) {
    throw { statusCode: 404, error: `No inquiry with the id:- ${patiendId}` };
  }
  fetchAgain._id = fetchAgain._id.toString();
  return fetchAgain;
};

const getInquiry = async (patientId) => {
  const inquiryCollection = await inquiry();
  let getAllInquiries = await inquiryCollection
    .find({ _id: ObjectId(patientId) })
    .toArray();
  if (getAllInquiries.length() == 0) {
    throw { statusCode: 404, error: `No inquiry with the id:- ${patiendId}` };
  }
  getAllInquiries = getAllInquiries.forEach((elem) => {
    elem._id = elem._id.toString();
  });

  return getAllInquiries;
};

module.exports = {
  createInquiry,
  getInquiry,
};
