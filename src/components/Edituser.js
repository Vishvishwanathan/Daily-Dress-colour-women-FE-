import React, { useState } from "react";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
function Edituser() {
  let [password, setPassword] = useState("");
  let [newpassword, setNewpassword] = useState("");
  let navigate = useNavigate();
  let id = sessionStorage.getItem("id");
  let validateuser = async (e) => {
    e.preventDefault();
    try {
      let res = await AxiosService.put(`/${id}`, {
        password,
        newpassword,
      });
      if (res.status === 200) {
        toast.success("Password changed Successfull");
        navigate("/dashboard");
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
          <span>Change ur Password</span>
        </div>
        <div className="d-flex flex-row">
          <Form className="input-group" id="reset">
            <div className="d-flex flex-column">
              <input
                type="password"
                className="input-field"
                placeholder="Enter old Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="input-field"
                placeholder="Enter new Password"
                required
                onChange={(e) => setNewpassword(e.target.value)}
              />
              <Button
                type="submit"
                className="reset-btn mt-3"
                onClick={(e) => validateuser(e)}
              >
                Save
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Edituser;