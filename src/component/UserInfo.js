import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container, Button, Card } from "react-bootstrap";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import "../CSS/userinfo.css";
import {
  FaUserAlt,
  FaClock,
  FaUtensils,
  FaSmile,
  FaPencilAlt,
} from "react-icons/fa";
import { BiCheckboxChecked } from "react-icons/bi";
import { GiCommercialAirplane } from "react-icons/gi";
import { MdPlace, MdFoodBank } from "react-icons/md";
import { getData, setData } from "./CheckAuth";

function UserInfo() {
  let { email } = useParams();
  const [name, setName] = useState("");
  const [useremail, setUserEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(email);

    var loggedInUser = getData();

    if (!loggedInUser) {
      navigate("/");
    } else {
      axios.get(`/userinfo2/${email}`).then((response) => {
        // console.log(res);
        if (response && response.status == 200) {
          console.log(response);
          setRecipe(response.data.row2);
          setUserEmail(response.data.row1[0].email);
          setName(response.data.row1[0].user_name);
          setImg(response.data.row1[0].image);
          // setPhone(response.data.row1[0].phone);
          var btn = document.getElementsByClassName("btn");
          console.log(btn[0].innerText);
          for (let i = 0; i < btn.length; i++) {
            if (btn[i].innerText == "Verification Pending") {
              btn[i].classList.add("btn-warning");
            }
            if (btn[i].innerText == "Verified") {
              btn[i].classList.add("btn-success");
            }
            if (btn[i].innerText == "Rejected") {
              btn[i].classList.add("btn-danger");
            }
          }
        }
      });
    }
  }, []);

  const accordion = (button) => {
    console.log(button.target);
    console.log(button.target.parentNode.parentNode.parentNode);
    var box = button.target.parentNode.parentNode.parentNode;
    var section = box.querySelectorAll(".card-details")[0];
    console.log(section);

    section.classList.toggle("active");
    var panel = section;
    console.log(panel);
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      button.target.innerText = "See More";
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      button.target.innerText = "See Less";
    }
  };

  return (
    <>
      <Container>
        <Link to={`/recipefeed/${email}`}>
          <button className="btn btn-success">Back</button>
        </Link>

        <Row lg={12} className="p-5 d-flex">
          <Col lg={6} xs={12} className="d-flext text-center my-auto">
            <img
              src={`${process.env.PUBLIC_URL}/user/${img}`}
              width="100"
              className="img"
              alt="User Image"
            />
          </Col>
          <Col lg={6} xs={12} className="d-flext text-center my-auto">
            <div>
              <h1>{name}</h1>
              <h3>{email}</h3>
              <Link to={`/editprofile/${email}`} className="btn btn-success">
                <FiEdit /> Edit Profile
              </Link>
            </div>
          </Col>
        </Row>

        <div className="container">
          {recipe.length == 0 ? (
            <>
              <div
                className="alert alert-warning d-flex justify-content-around"
                role="alert"
              >
                <p className="pt-3">No recipe is submitted yet !!!</p>
                <Link to={`/Add_Recipe/${email}`}>
                  <button className="btn-nav">Upload a recipe now</button>
                </Link>
              </div>
            </>
          ) : null}
          {recipe.map((data, index) => {
            return (
              <Row key={index} className="horizontal_card mt-3 mb-3">
                <Col lg={4}>
                  <div className="img_div p-2">
                    <img
                      src={`${process.env.PUBLIC_URL}/food/${data.image_name}`}
                      alt="img"
                    />
                  </div>
                </Col>
                <Col lg={8}>
                  <div className="card-body">
                    <h3 className="card-title">{data.food}</h3>
                    <div className="recipe_highlights d-flex ">
                      <div className="small_box">
                        <MdFoodBank />
                        <>
                          {data.category_id == 10 ? <>South Indian</> : null}
                          {data.category_id == 11 ? <>North Indian</> : null}
                          {data.category_id == 12 ? <>East Indian</> : null}

                          {data.category_id == 13 ? <>West Indian</> : null}
                        </>
                      </div>

                      <div className="small_box">
                        {" "}
                        <FaUtensils />
                        {data.type}
                      </div>
                      <div className="small_box">
                        <FaClock />
                        {data.time}
                      </div>
                    </div>

                    <div className="d-flex ">
                      {data.status == "Verified" ? (
                        <>
                          <div className="success">{data.status}</div>
                        </>
                      ) : null}
                      {data.status == "Verification Pending" ? (
                        <>
                          <div className="pending">{data.status}</div>
                        </>
                      ) : null}
                      {data.status == "Rejected" ? (
                        <>
                          <div className="rekjected">{data.status}</div>
                        </>
                      ) : null}

                      <button
                        className="btn exp_btn"
                        onClick={(e) => accordion(e)}
                      >
                        {" "}
                        See More{" "}
                      </button>
                    </div>

                    <div className="card-details">
                      <p className="recipe-details">
                        {" "}
                        <span className="heading">Description </span>
                        <br /> {data.description}
                      </p>
                      <p className="recipe-details">
                        <span className="heading">Ingredients </span>
                        <br /> {data.ingredients}
                      </p>
                      <p className="recipe-details">
                        <span className="heading">Steps </span>
                        <br /> {data.proce}
                      </p>
                      {data.status == "Rejected" ? (
                        <>
                          <div class="alert alert-danger" role="alert">
                            This recipe is rejected as it violated recipe upload
                            guidlines !!!
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </Col>
              </Row>
            );
          })}
        </div>
      </Container>
    </>
  );
}

export default UserInfo;
