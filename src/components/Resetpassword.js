import React, { useState } from "react";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
function Resetpassword() {
  let [token, setToken] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  let validateReset = async (e) => {
    e.preventDefault();
    try {
      let res = await AxiosService.post("/resetPassword", {
        token,
        password,
      });
      if (res.status === 200) {
        toast.success("Password Reset Successfull");
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error Occoured! Please try after some time"
      );
    }
  };
  return (
    <div className="home">
      <div className="form-box">
        <div className="align">
          <span>Reset your Password</span>
        </div>
        <div className="d-flex flex-row">
          <Form className="input-group" id="reset">
            <div className="d-flex flex-column">
              <input
                type="text"
                className="input-field"
                placeholder=" Enter Reset key"
                required
                onChange={(e) => setToken(e.target.value)}
              />
              <input
                type="password"
                className="input-field"
                placeholder="Enter New Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                className="reset-btn mt-3"
                onClick={(e) => validateReset(e)}
              >
                Reset Password
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Resetpassword;