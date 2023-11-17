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
  let createInquiry = await inquiryCollection.insertOne(inquiryObj);
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
  console.log(fetchAgain);
  return fetchAgain;
};

const getInquiry = async () => {
  const inquiryCollection = await inquiry();
  // let getAllInquiries = await inquiryCollection
  //   .find({ patiendId: patientId })
  //   .toArray();
  let getAllInquiries = await inquiryCollection.find({}).toArray();
  // if (getAllInquiries.length == 0) {
  //   throw { statusCode: 404, error: `No inquiry with the id:- ${patientId}` };
  // }
  getAllInquiries.forEach((elem) => {
    elem._id = elem._id.toString();
  });
  // console.log(getAllInquiries);
  return getAllInquiries;
};

module.exports = {
  createInquiry,
  getInquiry,
};
