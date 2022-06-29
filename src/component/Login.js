import React, { useState, useEffect } from "react";
import "../CSS/home.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData, setData } from "../component/CheckAuth";

toast.configure();
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const form_validation = () => {
    let flag = true;
    if (email == "") {
      notify("Email is required");
      flag = false;
      return flag;
    }
    if (password == "") {
      notify("Password is required");
      flag = false;
      return flag;
    }
    return flag;
  };

  function toAdmin() {
    // window.location.replace('http://localhost/project-finalyear/admin/login.php');
    window.open("http://localhost/project-finalyear/admin/login.php");
  }

  const login = async () => {
    var obj = {
      email: email,
      password: password,
    };
    console.log(obj, form_validation());
    // var response = await userLogIn(obj);

    if (form_validation()) {
      axios
        .post(`http://localhost:3000/recipe`, { obj: obj })
        .then((response) => {
          // console.log(res);
          if (response && response.status == 200) {
            if (response.data.statusCode == 200) {
              console.log(
                response.data.val[0].user_userid,
                response.data.val[0].user_name,
                response.data.val[0].user_id
              );
              let uemail = response.data.val[0].user_userid;
              let uname = response.data.val[0].user_name;
              let uid = response.data.val[0].user_id;
              setData(uemail, uname, true, uid);
              // localStorage.setItem("useremail", response.data.val[0].user_userid);
              // localStorage.setItem("username", response.data.val[0].user_name);
              // localStorage.setItem("userLoggedIn", true);
              // localStorage.setItem("userId", response.data.val[0].user_id);
              navigate(`/recipefeed/${response.data.val[0].user_userid}`);
            } else {
              notify(response.data.msg);
            }
          }
        });
    }
  };

  function openNav() {
    document.getElementsByClassName("overlay")[0].style.width = "100%";
    // document.getElementById("myBtn").style.display = "none";
  }
  function closeNav() {
    document.getElementsByClassName("overlay")[0].style.width = "0%";
    // document.getElementById("myBtn").style.display = "block";
  }

  function toggle_password() {
    let box = document.getElementById("login_password");
    let ip = document.getElementById("login_password_ip");
    if (box.checked) {
      ip.type = "text";
    } else {
      ip.type = "password";
    }
  }

  return (
    <div>
      <div className="fixed_nav loggedout">
        <div>
          <h1 id="heading">
            {" "}
            <a href="/">Recipe</a>
          </h1>
        </div>

        <div>
          <a className="btn btn-success" href="/signup">
            Sign Up
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
                  <Link to="/signup">
                    <button className="btn btn-success">Sign Up</button>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="form_container" id="login_form">
        <div className="form-div">
          <div className="clr-div">
            <h3>User Login</h3>
          </div>
          <label htmlFor="login-email">
            <b> Enter your registered email address </b>
          </label>
          <br />
          <input
            type="email"
            name="email"
            className="inp"
            id="login-email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <br />
          <label htmlFor="login_pswd">
            {" "}
            <b> Enter password </b>{" "}
          </label>
          <br />
          <input
            type="password"
            name="password"
            className="inp"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            id="login_password_ip"
            required
          />
          <br />
          <input
            type="checkbox"
            name=""
            id="login_password"
            onClick={toggle_password}
          />
          Show Password
          <p className="wrong_text">Incorrect Details</p>
          <br />
          <button className="btn2" id="login" onClick={login}>
            Log In
          </button>
          {/* {{!-- <p>Don't have an account ? <a href="#" className="link" onClick="signup()"> Create One</a></p> --}} */}
          <p>
            Don't have an account ?{" "}
            <a href="/signup" className="link">
              {" "}
              Create One
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
