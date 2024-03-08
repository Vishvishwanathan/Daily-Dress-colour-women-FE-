import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AboutApp = () => {
  let navigate = useNavigate();
  return (
    <div className="about">
      <Row className="justify-content-md-center mt-4">
        <Col md="8">
          <div className="border p-4">
            <h1 className="mb-4">Welcome to Blend With Nature App</h1>
            <p>
              Thank you for using our awesome app. Follow the instructions below
              to get started.
            </p>
            <h2>Instructions:</h2>
            <ol>
              <li>
                Step 1: First Add the colors collection for Dress, Hand Bag,
                watch, Shoe
              </li>
              <li>
                Step 2: The Last 1 Week Suggestion Table shows up to the last 1
                week color suggestion u get
              </li>
              <li>
                Step 3: Click on Suggest Color button to get today Dress color
                Suggestion
              </li>
            </ol>
            <p>Get the Suggestion and enjoy the app!</p>
            <button className="btn2" onClick={() => navigate("/dashboard")}>
              Get Started
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AboutApp;