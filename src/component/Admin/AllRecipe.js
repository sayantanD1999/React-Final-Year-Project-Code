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
  const [key, setKey] = useState("Users");
  useEffect(() => {
    getAllRecipes();
    getAllUsers();
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

  return (
    <div>
        <Navbar expand="lg" variant="light" bg="dark" fixed="top" >
          <Container>
            <Navbar.Brand href="#">Admin Panel</Navbar.Brand>
          </Container>
        </Navbar>
      <Container  >

        <Row lg={12} className="p-5 d-flex mt-4">
          <Col lg={6} xs={12} className="d-flext text-center my-auto">
            <img
              // src={`${process.env.PUBLIC_URL}/user/${img}`}
              width="100"
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
                      <td>{data.user_id}</td>
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
              {recipes.map((data, index) => {
                return (
                  <div className="card " key={index}>
                    <img
                      src={`${process.env.PUBLIC_URL}/food/${data.image_name}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <br />
                    <div className="card_details">
                      <h2 style={{ paddingLeft: "20px" }}>{data.food}</h2>
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
                        to={`/admin/viewrecipe/${email}/${data.id}`}
                        className="card-btn text-center pt-2"
                      >
                        Check Recipe{" "}
                        <i className="fas fa-arrow-circle-right"></i>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tab>
          <Tab eventKey="Verified Recipes" title="Verified Recipes">
            <div className="d-flex flex-wrap">
              {verifiedrecipes.map((data, index) => {
                return (
                  <div className="card " key={index}>
                    <img
                      src={`${process.env.PUBLIC_URL}/food/${data.image_name}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <br />
                    <div className="card_details">
                      <h2 style={{ paddingLeft: "20px" }}>{data.food}</h2>
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
                        to={`/admin/viewrecipe/${email}/${data.id}`}
                        className="card-btn text-center pt-2"
                      >
                        Check Recipe{" "}
                        <i className="fas fa-arrow-circle-right"></i>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tab>
          <Tab eventKey="Pending Recipes" title="Pending Recipes">
            <div className="d-flex flex-wrap">
              {pendingrecipes.map((data, index) => {
                return (
                  <div className="card " key={index}>
                    <img
                      src={`${process.env.PUBLIC_URL}/food/${data.image_name}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <br />
                    <div className="card_details">
                      <h2 style={{ paddingLeft: "20px" }}>{data.food}</h2>
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
                        to={`/admin/viewrecipe/${email}/${data.id}`}
                        className="card-btn text-center pt-2"
                      >
                        Check Recipe{" "}
                        <i className="fas fa-arrow-circle-right"></i>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tab>
          <Tab eventKey="Rejected Recipes" title="Rejected Recipes">
            <div className="d-flex flex-wrap">
              {rejectedrecipes.map((data, index) => {
                return (
                  <div className="card " key={index}>
                    <img
                      src={`${process.env.PUBLIC_URL}/food/${data.image_name}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <br />
                    <div className="card_details">
                      <h2 style={{ paddingLeft: "20px" }}>{data.food}</h2>
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
                        to={`/admin/viewrecipe/${email}/${data.id}`}
                        className="card-btn text-center pt-2"
                      >
                        Check Recipe{" "}
                        <i className="fas fa-arrow-circle-right"></i>
                      </Link>
                    </div>
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
