import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import "./edit.css";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function AddStud() {
  // const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Enroll_No: "",
    Date_Of_Admission: ""
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const validate = () => {
    const { Name, Email, Phone, Enroll_No, Date_Of_Admission } = userData;
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!Name) newErrors.Name = "Name is required";
    if (!Email) newErrors.Email = "Email is required";
    else if (!emailRegex.test(Email)) newErrors.Email = "Email is invalid";
    if (!Phone) newErrors.Phone = "Phone is required";
    else if (!phoneRegex.test(Phone)) newErrors.Phone = "Phone number is invalid";
    if (!Enroll_No) newErrors.Enroll_No = "Enrollment Number is required";
    if (!Date_Of_Admission) newErrors.Date_Of_Admission = "Date of Admission is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
        const res = await axios.post("/addstud", userData);
        const data = res.data;
        console.log(data);
        navigate('/');
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="editPage">
      <div className="fields">
        <div className="addStd">
          Add New Student
        </div>
        <Form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Form.Group controlId="formName">
            <Form.Control
              type="text"
              name="Name"
              onChange={handleInputChange}
              placeholder={errors.Name??"Name"}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Control
              type="text"
              name="Email"
              onChange={handleInputChange}
              placeholder={errors.Email ??"Email"}
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Control
              type="text"
              name="Phone"
              onChange={handleInputChange}
              placeholder={errors.Phone??"Phone"}
            />
          </Form.Group>
          <Form.Group controlId="formEnrNo">
            <Form.Control
              type="text"
              name="Enroll_No"
              onChange={handleInputChange}
              placeholder={errors.Enroll_No ?? "Enrollment Number"}
            />
          </Form.Group>
          <Form.Group controlId="formDOA">
            <Form.Control
              type="text"
              name="Date_Of_Admission"
              onChange={handleInputChange}
              placeholder={errors.Date_Of_Admission ?? "Date of Admission"}
            />
          </Form.Group>
          <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <Button variant="success" onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={handleCancel} style={{ backgroundColor: '#C55D22', borderColor: '#C55D22' }}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddStud;
