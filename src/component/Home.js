import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Card } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/home.css";
import { FaUserAlt, FaClock, FaUtensils, FaSmile } from "react-icons/fa";
import { BiCheckboxChecked } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

toast.configure();
function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [recipe, setRecipe] = useState([]);


  const submit_msg = (e) => {
    e.preventDefault();
    let obj = {
      name: name,
      email: email,
      msg: msg,
    };
    console.log(name, email, msg);
    axios.post(`http://localhost:3000/submit-msg`, { obj }).then((res) => {
      console.log(res);
      if (res.status == 200 && res.data.msg == "Success") {
        toast.success("Your Message Is Submitted", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.scroll(0,0);
      }
    });
  };

  window.onscroll = () => {
    // console.log(window.Top);
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      document.querySelectorAll(".fixed_nav")[0].style.backgroundColor =
        "black";
    } else {
      document.querySelectorAll(".fixed_nav")[0].style.background =
        "transparent";
    }
  };

  useEffect(() => {
    axios.get(`/showrecipe`).then((response) => {
      if (response && response.status == 200) {
        console.log(response);
        for (let i = 0; i < response.data.val.length; i++) {
          setRecipe((recipe) => [...recipe, response.data.val[i]]);
        }
      }
    });
  }, []);

  function toAdmin() {
    // window.open("http://localhost/project-finalyear/admin/login.php");
    navigate(`/adminlogin`);
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
    <div>
      <section id="landing_page">
        <div className="fixed_nav loggedout">
          <div>
            <h1 id="heading">Recipe</h1>
          </div>
          <div className="mid_nav">
            <a href="#landing_page">Home</a>
            <a href="#about">
              <p>About</p>
            </a>
            <a href="#categories">
              <p>Categories</p>
            </a>
            <a href="#add_recipe">
              <p>Participate</p>
            </a>
          </div>
          <div>
            <Link to="/login">
              <button className="btn btn-success">Log In</button>
            </Link>

            <Link to="/signup">
              <button className="btn btn-success">Sign Up</button>
            </Link>

            <button onClick={toAdmin} className="btn btn-success">
              Admin
            </button>
          </div>
        </div>

        <div className="side-menu">
          <h1>Recipe</h1>
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
                <h2>
                  <a href="#landing_page">Home</a>
                </h2>
              </li>

              <li>
                <h2>
                  <a href="#about">
                    <p>About</p>
                  </a>
                </h2>
              </li>
              <li>
                <h2>
                  <a href="#categories">
                    <p>Categories</p>
                  </a>
                </h2>
              </li>

              <li>
                <h2>
                  <a href="#add_recipe">
                    <p>Participate</p>
                  </a>
                </h2>
              </li>
              <li>
                <div>
                  <Link to="/login">
                    <button className="btn btn-success">Log In</button>
                  </Link>

                  <Link to="/signup">
                    <button className="btn btn-success">Sign Up</button>
                  </Link>

                  <button onClick={toAdmin} className="btn btn-success">
                    Admin
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Container>
        <div id="about" className="d-flex justify-content-center">
          <div className="m-auto">
            <center>
              <h2>Recipe</h2>
            </center>
            <center>
              <b>A little about us and a brief explanation of our working</b>
            </center>
            <div id="line_seperation"></div>
            <br />
            <Row>
              <Col lg={6} xs={12}>
                <img src="pics/About.jpg" id="about_img" alt="" />
              </Col>
              <Col lg={6} xs={12}>
                This is a platform where different users can create accounts and
                upload the recipes of their choice. There are certain
                constraints which have to be followed though. The users must
                provide the recipe’s name, pictures, ingredients required and
                steps, which would undergo some inspections by the admin to
                ensure there is an opportunity of commercialization of this
                traditional food. If the inspection is successful recipe will be
                displayed on the webpage to all other users.
              </Col>
            </Row>
          </div>
        </div>

        <div
          style={{ minHeight: "100vh" }}
          id="categories"
          className="d-flex justify-content-center"
        >
          <div className="m-auto">
            <center>
              <h1>Explore</h1>
            </center>
            <div className="d-flex flex-wrap">
              {recipe.map((data, index) => {
                {
                  console.log(index);
                }
                if (index <= 2) {
                  return (
                    <div className="card" key={index}>
                    <img
                      src={`${process.env.PUBLIC_URL}/food/${data.image_name}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <br />
                    <div className="d-flex justify-content-around">
  
                      <h2>{data.food}</h2>
                      <div style={{ width: "30px", height: "30px"}} className="mt-">
                        {data.food_type == "Veg" ? <>
  
                          <img
                            src={`${process.env.PUBLIC_URL}/pics/Veg.png`}
                            width="100%"
                            alt="..."
                          />
  
                        </> : <>
                          <img
                            src={`${process.env.PUBLIC_URL}/pics/non-veg.jpg`}
                            width="100%"
                            alt="..."
                          /></>}
                      </div>
                    </div>
  
                    <div className="card-content">
                      <div className="small_box2">
                        <FaClock />
                        <p>{data.time}</p>
                      </div>
                      <div className="small_box2">
                        <FaUtensils />
                        <p>Serving</p>
                      </div>
                      <div className="small_box2">
                        <FaSmile />
                        <p>Beginner</p>
                      </div>
                    </div>
                    <div className="card-btn_div">
                      <Link
                        to="/login"
                        className="card-btn text-center pt-2"
                      >
                        Check Recipe <i className="fas fa-arrow-circle-right"></i>
                      </Link>
                    </div>
                  </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

        <section id="add_recipe">
          <div className="add_recipe_content">
            <div>
              <div className="add_recipe_upperdiv">
                <img src="pics/cook.png" height="350" width="350" alt="" />
              </div>
              <div className="add_recipe_lowerdiv">
                <h4 style={{ textAlign: "center" }}>
                  Now you can share your own recipe and spread the joy of
                  cooking.
                </h4>
                <div>
                  <Link to={"/login"} id="share_recipe_btn">
                    <p>
                      Let's share <i className="fas fa-arrow-circle-right"></i>
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="rows">
          <div className="col-md-6">
            <img src="pics/contact_img.png" height="100%" width="100%" alt="" />
          </div>
          <div className="col-md-6">
            <h2>Leave us a message</h2>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="exampleFormControlInput1"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="exampleFormControlInput1"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  onChange={(e) => setMsg(e.target.value)}
                  name="msg"
                  rows="3"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <div className="col-12">
                <button className="btn btn-success" onClick={submit_msg}>
                  Submit form
                </button>
              </div>
            </form>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default Home;
