import React, { useState } from "react";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faUser,
  faEnvelope,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
const signin = {};
const register = {};
const b1 = {};
const pass = {};
const pass1 = {};
const value = "";
const value1 = "";
const value2 = "";
const value3 = "";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [isLogin, setisLogin] = useState(false);

  let navigate = useNavigate();


  let validateLogin = async (e) => {
    e.preventDefault();

    try {
      let res = await AxiosService.post("/login", {
        email,
        password,
      });

      if (res.status === 200) {
        toast.success("Login Successfull");
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("id", res.data.id);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
        "Error Occoured! Please try after some time"
      );
    }
  };

  let validateSignUp = async (e) => {
    e.preventDefault();
    try {
      let res = await AxiosService.post("/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      if (res.status === 201) {
        toast.success("User Created Successfully, Click on Login");
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
        "Error Occoured! Please try after some time"
      );
    }
  };

  let validatereset = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        toast.error("Enter Email Id first");
      } else {
        let res = await AxiosService.post("/forgetPassword", {
          email,
        });
        console.log(res);
        if (res.status === 200) {
          navigate("/resetPassword");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  let logintoggle = () => {
    setisLogin(true)
  };
  let registertoggle = () => {
    setisLogin(false)

  };

  return (
    <>
      <div className="home">
        <div className="form-box">
          <div className="button-box">
            {/* <div className="btn"></div> */}
            <Button
              className="toggle-btn"
              id="b1"
              onClick={() => logintoggle()}
            >
              Login
            </Button>
            <Button className="toggle-btn" onClick={() => registertoggle()}>
              Register
            </Button>
          </div>
          <div className="container d-flex flex-row">
            {/* <!-- login In Form --> */}
            {
              isLogin ? <Form className="input-group">
                <span className="text">Welcome Back</span>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{
                    color: "#ffffff",
                    marginTop: "65px",
                    marginLeft: "225px",
                    position: "absolute",
                  }}
                />
                <input
                  type="text"
                  className="input-field"
                  id="value"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faEye}
                  style={{
                    color: "#fcfcfc",
                    cursor: "pointer",
                    marginLeft: "225px",
                    marginTop: "130px",
                    position: "absolute",
                  }}
                  onMouseOver={() => {
                    pass.type = "text";
                  }}
                  onMouseOut={() => {
                    pass.type = "password";
                  }}
                />
                <input
                  type="password"
                  className="input-field"
                  id="pass"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  className="submit-btn"
                  onClick={(e) => validateLogin(e)}
                >
                  Login
                </Button>
                <Button
                  type="submit"
                  className="submit-btn"
                  onClick={(e) => validatereset(e)}
                >
                  Forget Password
                </Button>
                <Button className="home-btn" onClick={() => navigate("/")}>
                  <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff" }} />
                </Button>
              </Form>
                :
                < Form className=" input-group" >
                  <span className="text">Register Now</span>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      color: "#ffffff",
                      marginTop: "46px",
                      marginLeft: "225px",
                      position: "absolute",
                    }}
                  />
                  <input
                    type="text"
                    className="input-field"
                    id="value1"
                    placeholder="First Name"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      color: "#ffffff",
                      marginTop: "100px",
                      marginLeft: "225px",
                      position: "absolute",
                    }}
                  />
                  <input
                    type="text"
                    className="input-field"
                    id="value2"
                    placeholder="Last Name"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{
                      color: "#ffffff",
                      marginTop: "157px",
                      marginLeft: "225px",
                      position: "absolute",
                    }}
                  />
                  <input
                    type="text"
                    className="input-field"
                    id="value3"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={faEye}
                    style={{
                      color: "#fcfcfc",
                      cursor: "pointer",
                      marginLeft: "225px",
                      marginTop: "211px",
                      position: "absolute",
                    }}
                    onMouseOver={() => {
                      pass1.type = "text";
                    }}
                    onMouseOut={() => {
                      pass1.type = "password";
                    }}
                  />
                  <input
                    type="password"
                    className="input-field"
                    id="pass1"
                    placeholder="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="submit-btn"
                    onClick={(e) => validateSignUp(e)}
                  >
                    Register
                  </Button>
                  <Button className="home-btn" onClick={() => navigate("/")}>
                    <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff" }} />
                  </Button>
                </Form>

            }
          </div>
        </div>
      </div >
    </>
  );
}

export default Login;