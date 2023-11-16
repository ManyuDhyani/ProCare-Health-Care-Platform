import React, { useState } from "react";
import axios from "axios";
import PatientList from "./PatientList";

export default function Inquiry(props) {
  const [inquiry, setinquiry] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [message, setMessage] = useState("");
  const [familymemberID, setFamilyMemberID] = useState("");

  let current_user = props.userObj;
  console.log(current_user.userID);

  const handleInquiryChange = (e) => {
    console.log("message", e.target.value);
    setMessage(e.target.value);
  };

  const handlePatientSelect = (e) => {
    console.log("eeeeee", e.target.value);
    setSelectedPatient(e.target.value);
  };
  const getPatients = async () => {
    try {
      let user = props.userObj;
      console.log("userID", user);
      setFamilyMemberID(user.userID);
      const response = await axios.get("http://localhost:8000/patient/");
      const patients = response.data;
      let temp_array = [];
      for (let i = 0; i < patients.length; i++) {
        if (patients[i].newObj.familyMembers.includes(current_user.userID)) {
          temp_array.push({
            id: patients[i]._id.toString(),
            name: patients[i].newObj.name,
          });
          console.log("temP", temp_array);
        }
      }
      setSelectedPatients(temp_array);
      // console.log("selected", selectedPatients);
      // console.log("sssssss", selectedPatient);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform actions with the feedback here, e.g., sending it to a server
    setSubmitted(true);
    if (message.length > 0)
      axios.post("http://localhost:8000/inquiry", {
        patiendId: selectedPatient,
        familyMemId: familymemberID,
        inquiryMessage: message,
      });
  };
  React.useEffect(() => {
    getPatients(); // Fetch patient data when the component mounts
  }, []);
  return (
    <div>
      <h4>Inquiry</h4>
      {submitted ? (
        <p>Thank you for your question!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patientDropdown">Select a Patient:</label>
            <select
              id="patientDropdown"
              value={selectedPatient}
              onChange={handlePatientSelect}
              className="form-control"
              required
            >
              <option value="" disabled>
                Select a Patient
              </option>
              {selectedPatients.map((patient) => (
                <option
                  key={patient.id}
                  value={patient.id}
                  style={{ color: "black" }}
                >
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="feedbackTextarea">Inquiry:</label>
            <textarea
              id="feedbackTextarea"
              rows="4"
              value={message}
              onChange={handleInquiryChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}