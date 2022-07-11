import React, { useState, useEffect } from "react";
import "../../CSS/home.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {
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
        .post(`http://localhost:3000/admin-login`, { obj: obj })
        .then((response) => {
          console.log(response);
          if (response && response.status == 200) {
            if (response.data.statusCode == 200) {
              localStorage.setItem("adminemail", response.data.val[0].email);
              localStorage.setItem("adminname", response.data.val[0].full_name);
              localStorage.setItem("adminLoggedIn", true);
              localStorage.setItem("adminId", response.data.val[0].id);
              navigate(`/admin/allrecipe/${email}`);
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
          <Link to="/login">
            <button className="btn btn-success">
              Log In
            </button>
          </Link>
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
                  <Link to="/login">
                    <button className="btn btn-success">
                      Log In
                    </button>
                  </Link>
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
            <h3>Admin Login</h3>
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

export default AdminLogin;
