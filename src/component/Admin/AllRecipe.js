import React, { useState, useEffect } from "react";
import "../../CSS/home.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../CSS/recipe.css";
import { FaUserAlt, FaClock, FaUtensils, FaSmile } from "react-icons/fa";
import { BiCheckboxChecked } from "react-icons/bi";
import {
  Navbar,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Form,
  Card,
  Modal,
  Tabs,
  Tab,
  Table,
} from "react-bootstrap";

function AllRecipe() {
  const navigate = useNavigate();
  const name = localStorage.getItem("adminname");
  const email = localStorage.getItem("adminemail");
  const [recipes, setRecipes] = useState([]);
  const [rejectedrecipes, setRejectedRecipes] = useState([]);
  const [pendingrecipes, setPendingRecipes] = useState([]);
  const [verifiedrecipes, setVerifiedRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState([]);
  const [key, setKey] = useState("Users");
  useEffect(() => {
    getAllRecipes();
    getAllUsers();
    getAllMsgs();
  }, []);

  const getAllRecipes = () => {
    axios.get(`http://localhost:3000/getallrecipes`).then((response) => {
      console.log(response);
      if (response && response.status == 200) {
        if (response.data.statusCode == 200) {
          for (let i = 0; i < response.data.rows.length; i++) {
            setRecipes((recipes) => [...recipes, response.data.rows[i]]);
            if (response.data.rows[i].status == "Verified") {
              setVerifiedRecipes((verifiedrecipes) => [
                ...verifiedrecipes,
                response.data.rows[i],
              ]);
            }
            if (response.data.rows[i].status == "Rejected") {
              setRejectedRecipes((rejectedrecipes) => [
                ...rejectedrecipes,
                response.data.rows[i],
              ]);
            }
            if (response.data.rows[i].status == "Verification Pending") {
              setPendingRecipes((pendingrecipes) => [
                ...pendingrecipes,
                response.data.rows[i],
              ]);
            }
          }
        }
      }
    });
  };

  const getAllUsers = () => {
    axios.get(`http://localhost:3000/getallusers`).then((response) => {
      console.log(response);
      if (response && response.status == 200) {
        if (response.data.statusCode == 200) {
          for (let i = 0; i < response.data.rows.length; i++) {
            setUsers((users) => [...users, response.data.rows[i]]);
          }
        }
      }
    });
  };

  const toUser = (n) => {
    navigate(`/admin/viewuser/${email}/${n}`);
  };

  const getAllMsgs = () => {
    axios.get(`http://localhost:3000/getallmsgs`).then((response) => {
      console.log(response);
      if (response && response.status == 200) {
        for (let i = 0; i < response.data.val.length; i++) {
          setMsg((msg) => [...msg, response.data.val[i]]);
        }
      }
    });
  }

  function logout() {
    console.log("admin logout");
    axios.get(`/adminlogout/${email}`).then((response) => {
      if (
        response &&
        response.status == 200 &&
        response.data.statusCode == 200
      ) {
        localStorage.clear();
        navigate("/");
      }
    });
  }


  return (
    <div>
      <Navbar expand="lg" variant="light" bg="dark" fixed="top" >
        <Container>
          <Navbar.Brand href="#">Admin Panel</Navbar.Brand>
          <button onClick={logout} className="btn btn-success">
            Log Out
          </button>
        </Container>
      </Navbar>
      <Container  >

        <Row lg={12} className="p-5 d-flex mt-4">
          <Col lg={6} xs={12} className="d-flext text-center my-auto">
            <img
              src={`${process.env.PUBLIC_URL}/Admin/pic.jpg`}
              width="60%"
              className="img"
              alt="User Image"
            />
          </Col>
          <Col lg={6} xs={12} className="d-flext text-center my-auto">
            <div>
              <h1>{name}</h1>
              <h3>{email}</h3>
              {/* <Link to={`/edituser/${email}`} className="btn btn-success">
                <FiEdit /> Edit Profile
              </Link> */}
            </div>
          </Col>
        </Row>

        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className=".transTabs mb-3"
        >
          <Tab eventKey="Users" title="Users">

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((data, key) => {
                  return (
                    <tr
                      onClick={() => toUser(data.user_userid)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* <Link to={`/admin/viewuser/${email}/${data.user_userid}`}> */}
                      <td>{data._id}</td>
                      <td>{data.user_name}</td>
                      <td>{data.user_userid}</td>
                      <td>{data.status}</td>
                      {/* </Link> */}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="All Recipes" title="All Recipes">
            <div className="d-flex flex-wrap">
              {recipes.length == 0 ? <>
                <div className="col-lg-12 alert alert-danger" role="alert">
                  There is no recipe.
                </div>
              </> :
                null
              }
              {recipes.map((data, index) => {
                { console.log(data.id) }
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
                      <div style={{ width: "30px", height: "30px" }} className="mt-2">
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
                        to = {`/admin/viewrecipe/${email}/${data._id}`}
                        className="card-btn text-center pt-2"
                      >
                        Check Recipe <i className="fas fa-arrow-circle-right"></i>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tab>
          <Tab eventKey="Verified Recipes" title="Verified Recipes">

            <div className="d-flex flex-wrap">
              {verifiedrecipes.length == 0 ? <>
                <div className="col-lg-12 alert alert-danger" role="alert">
                  There is no verified recipe.
                </div>
              </> :
                null
              }
              {verifiedrecipes.map((data, index) => {
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
                      <div style={{ width: "30px", height: "30px" }} className="mt-2">
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
                        to = {`/admin/viewrecipe/${email}/${data._id}`}
                        className="card-btn text-center pt-2"
                      >
                        Check Recipe <i className="fas fa-arrow-circle-right"></i>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tab>
          <Tab eventKey="Pending Recipes" title="Pending Recipes">
            <div className="d-flex flex-wrap">
              {pendingrecipes.length == 0 ? <>
                <div className="col-lg-12 alert alert-danger" role="alert">
                  There is no pending recipe.
                </div>
              </> :
                null
              }
              {pendingrecipes.map((data, index) => {
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
                      <div style={{ width: "30px", height: "30px" }} className="mt-2">
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
                        to = {`/admin/viewrecipe/${email}/${data._id}`}
                        className="card-btn text-center pt-2"
                      >
                        Check Recipe <i className="fas fa-arrow-circle-right"></i>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tab>
          <Tab eventKey="Rejected Recipes" title="Rejected Recipes">
            <div className="d-flex flex-wrap">
              {rejectedrecipes.length == 0 ? <>
                <div className="col-lg-12 alert alert-danger" role="alert">
                  There is no rejected recipe.
                </div>
              </> :
                null
              }
              {rejectedrecipes.map((data, index) => {
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
                      <div style={{ width: "30px", height: "30px" }} className="mt-2">
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
                        to = {`/admin/viewrecipe/${email}/${data._id}`}
                        className="card-btn text-center pt-2"
                      >
                        Check Recipe <i className="fas fa-arrow-circle-right"></i>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tab>
          <Tab eventKey="Messages" title="Messages">
            {msg.length == 0 ? <>
              <div className="col-lg-12 alert alert-danger" role="alert">
                There is no message.
              </div>
            </> :
              null
            }
            <div className="d-flex flex-wrap">
              {msg.map((data, index) => {
                return (
                  <div className="card p-2" key={index}>
                    <h3>{data.msg}</h3>
                    <p><i>{data.name}</i> </p>
                    <p>{data.email}</p>
                    <p>{data.date}</p>
                  </div>
                );
              })}
            </div>
          </Tab>

        </Tabs>
      </Container>
    </div>
  );
}

export default AllRecipe;
