import React, { useState } from "react";
import axios from "axios";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform actions with the feedback here, e.g., sending it to a server
    setSubmitted(true);
  };

  return (
    <div>
      <h4>Feedback</h4>
      {submitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Please share your exprience</label>
            <textarea
              rows="4"
              value={feedback}
              onChange={handleFeedbackChange}
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
