import React, { useState } from "react";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
function Deleteuser() {
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  let id = sessionStorage.getItem("id");
  let validateDelete = async (e) => {
    e.preventDefault();
    try {
      let res = await AxiosService.put(`/delete/${id}`, {
        password,
      });
      if (res.status === 200) {
        toast.success("Account deleted Successfull");
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
          <span>Delete Your Account</span>
        </div>
        <div >
          <span className="del">Enter ur password to delete ur Account</span>
        </div>
        <div className="d-flex flex-row">
          <Form className="input-group" id="reset">
            <div className="d-flex flex-column">
              <input
                type="password"
                className="input-field"
                placeholder="Enter Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                className="reset-btn mt-3"
                onClick={(e) => validateDelete(e)}
              >
                Delete Account
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Deleteuser;