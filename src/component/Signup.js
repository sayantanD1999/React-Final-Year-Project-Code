import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FormData from "form-data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData, setData } from "../component/CheckAuth";

toast.configure();
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [pswd2, setPswd2] = useState("");
  const [userImg, setUserImg] = useState([]);

  const navigate = useNavigate();

  const notify = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  function form_validation() {
    let flag = true;

    if (name == "") {
      notify("Name is required");
      flag = false;
      return flag;
    }
    if (email == "") {
      notify("Email is required");
      flag = false;
      return flag;
    }
    if (pswd == "") {
      notify("Password is required");
      flag = false;
      return flag;
    }
    if (pswd != pswd2) {
      notify("Passwords do not match");
      flag = false;
      return flag;
    }
    if (userImg.length == 0) {
      notify("Image is required");
      flag = false;
      return flag;
    }
    return flag;
  }

  function toAdmin() {
    // window.open("http://localhost/project-finalyear/admin/login.php");
    navigate(`/adminlogin`);
  }

  const user_signup = (e) => {
    e.preventDefault();
    console.log("Signup", form_validation());
    if (form_validation()) {
      let formData = new FormData();
      formData.append("file", userImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", pswd);

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      axios
        .post(`http://localhost:3000/recipe-signup`, formData)
        .then((response) => {
          console.log(response);

          if (response && response.status == 200) {
            if (response.data.statusCode == 400) {
              notify(response.data.msg);
            }
            if (response.data.statusCode == 200) {
              console.log(response.data.data);
              setData(email, name, true, response.data.data[0]._id);

              navigate(`/recipefeed/${email}`);
            }
          }
        });
    }
  };

  function toggle_password() {
    let box = document.getElementById("signup_password");
    let ip1 = document.getElementById("signup_pswd1");
    let ip2 = document.getElementById("signup_pswd2");
    if (box.checked) {
      ip1.type = "text";
      ip2.type = "text";
    } else {
      ip1.type = "password";
      ip2.type = "password";
    }
  }

  function openNav() {
    document.getElementsByClassName("overlay")[0].style.width = "100%";
    // document.getElementById("myBtn").style.display = "none";
  }
  function closeNav() {
    document.getElementsByClassName("overlay")[0].style.width = "0%";
    // document.getElementById("myBtn").style.display = "block";
  }

  return (
    <>
      <div className="fixed_nav loggedout">
        <div>
          <h1 id="heading">
            {" "}
            <a href="/">Recipe</a>
          </h1>
        </div>

        <div>
          <a className="btn btn-success" href="/login">
            Log In
          </a>
          <button onClick={toAdmin} className="btn btn-success">
            Admin
          </button>
        </div>
      </div>
      <div>
        <div className="side-menu">
          <h1 id="heading">
            {" "}
            <a href="/">Recipe</a>
          </h1>
          <div>
            <span onClick={openNav} className="menu">
              {" "}
              &#9776;{" "}
            </span>
          </div>
        </div>

        <div className="overlay">
          <span onClick={closeNav} className="cross">
            {" "}
            &times;{" "}
          </span>
          <div className="overlay-content">
            <ul>
              <li>
                <div>
                  <button onClick={toAdmin} className="btn btn-success">
                    Admin
                  </button>
                  <a className="btn btn-success" href="/login">
                    Log In
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="form_container pt-5 pb-3" id="signup_form">
        <Col lg={6} xs={10} className="form_bg p-2">
          <div className="clr-div">
            <h3>Sign Up</h3>
          </div>
          <Row>
            <Col lg={4} xs={12} className="d-flex justify-content-center">
              <div id="img_container" className="align-self-center">
                <input
                  name="user_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUserImg(e.target.files[0])}
                />
              </div>
            </Col>
            <Col lg={8} xs={12}>
              <div>
                <label htmlFor="name">
                  {" "}
                  <b>Enter your Full name</b>{" "}
                </label>
                <br />
                <input
                  type="text"
                  className="inp"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <label htmlFor="mail">
                  {" "}
                  <b> Enter your email address </b>
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  className="inp"
                  placeholder="Email"
                  id="mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>
                  {" "}
                  <b> Enter password </b>
                </label>{" "}
                <br />
                <input
                  type="password"
                  name="password"
                  className="inp sl"
                  placeholder="Password"
                  id="signup_pswd1"
                  onChange={(e) => setPswd(e.target.value)}
                />
                <br />
                <label>
                  {" "}
                  <b> Confirm password </b>{" "}
                </label>
                <br />
                <input
                  type="password"
                  name=""
                  className="inp"
                  //   onKeyup="check_password_similarity()"
                  placeholder="Re-enter password"
                  id="signup_pswd2"
                  onChange={(e) => setPswd2(e.target.value)}
                />
                <br />
                <p>
                  <input
                    type="checkbox"
                    name=""
                    id="signup_password"
                    onClick={toggle_password}
                  />
                  Show Password
                </p>
                {/* {{!-- <input type="file" style="visibility: hidden" name="" id="get_img"
                            onClick="getting_img(this)" />
                        --}} */}
                <button className="btn2" id="signup" onClick={user_signup}>
                  Sign Up
                </button>
                {/* 
                        {{!-- <p>Already have an account ? <a href="#" className="link" onClick="login()"> Sign-In</a>
                        </p> --}} */}
                <p>
                  Already have an account ?{" "}
                  <a href="/login" className="link">
                    {" "}
                    Sign-In
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </div>
    </>
  );
}

export default Signup;
