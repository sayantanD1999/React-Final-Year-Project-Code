import React, { useEffect, useReact, useState } from "react";
import {
  Row,
  Col,
  Container,
  Alert,
  Modal,
  Card,
  Button,
} from "react-bootstrap";
import axios from "axios";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../CSS/view_recipe.css";
import { getData, setData } from "../CheckAuth";

function ViewRecipe() {
  let { foodId } = useParams();
  console.log(foodId);
  const adminemail = localStorage.getItem("adminemail");
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const showEditModal = () => {
    setShow(true);
  };

  useEffect(() => {
    // var loggedInAdmin = getData();

    // if (!loggedInUser) {
    //   navigate("/");
    // } else {
    axios.post(`/getrecipeAdmin/${foodId}`).then((response) => {
      if (response && response.status == 200) {
        console.log(response);
        setRecipeDetails(response.data.rows[0]);
      } else {
        console.log("Error");
      }
    });
    // }
  }, []);

  const updateVerification = (val) => {
    console.log(val);
    var adminemail = localStorage.getItem("adminemail");
    var obj = {
      foodId: foodId,
      admin: adminemail,
      status: val,
    };

    axios.post(`/updaterecipe`, { obj }).then((response) => {
      if (response && response.status == 200) {
        if (response.data.msg == "success") {
          window.location.reload();
        }
      } else {
        console.log("Error");
      }
    });
  };
  return (
    <div>
      <Container className="p-3 pt-5">
        <Link to={`/admin/allrecipe/${adminemail}`}>
          <button className="btn btn-success">Back</button>
        </Link>

        <Modal
          show={show}
          onHide={() => {
            setShow(false);
          }}
        >
          <div className="d-flex justify-content-around">
            <button
              onClick={() => {
                updateVerification("Verified");
              }}
              className="btn btn-success"
            >
              Verify Recipe
            </button>
            <button
              onClick={() => {
                updateVerification("Rejected");
              }}
              className="btn btn-danger"
            >
              Reject Recipe
            </button>
            <button
              onClick={() => {
                updateVerification("Verification Pending");
              }}
              className="btn btn-warning"
            >
              Make verification pending
            </button>
          </div>
        </Modal>
        <Col>
          {recipeDetails.status == "Rejected" ? (
            <>
              <Alert variant="danger" className="d-flex justify-content-around">
                <p className="pt-3">
                  {" "}
                  This recipe is rejected as it violated recipe upload guidlines
                  !!!
                </p>
                <button className="btn btn-success" onClick={showEditModal}>
                  Edit verification
                </button>
              </Alert>
            </>
          ) : null}
          {recipeDetails.status == "Verified" ? (
            <>
              <Alert
                variant="success"
                className="d-flex justify-content-around"
              >
                <p className="pt-3">This recipe is verified !!!</p>
                <button className="btn btn-success" onClick={showEditModal}>
                  Edit verification
                </button>
              </Alert>
            </>
          ) : null}
          {recipeDetails.status == "Verification Pending" ? (
            <>
              <Alert
                variant="warning"
                className="d-flex justify-content-around"
              >
                <p className="pt-3">
                  The verification of this recipe is pending !!!
                </p>
                <button className="btn btn-success" onClick={showEditModal}>
                  Edit verification
                </button>
              </Alert>
            </>
          ) : null}
          <Row>
            <Col lg={6} xs={12}>
              <img
                src={`${process.env.PUBLIC_URL}/food/${recipeDetails.image_name}`}
                width="100%"
                className="img"
                alt="img"
              />
            </Col>

            <Col lg={6} xs={12}>
            <div className="d-flex justify-content-between">
                <h2> {recipeDetails.food}</h2>
                <div style={{ width: "30px", height: "30px" }} className="mt-2">
                  {recipeDetails.food_type == "Veg" ? <>

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
              <p>
                {" "}
                <FaPencilAlt />
                <i>{recipeDetails.author}</i>
              </p>

              {/* <p>
                {" "}
                <BiCheckboxChecked /> {recipeDetails.status}
              </p> */}

              <div className="d-flex flex-wrap">
                <div className="small_box">
                  <MdFoodBank />
                  <>
                    {recipeDetails.category_id == 10 ? <>South Indian</> : null}
                    {recipeDetails.category_id == 11 ? <>North Indian</> : null}
                    {recipeDetails.category_id == 12 ? <>East Indian</> : null}

                    {recipeDetails.category_id == 13 ? <>West Indian</> : null}
                  </>
                </div>
                <div className="small_box">
                  <FaUtensils />
                  <>
                    {recipeDetails.subcategory_id == 25 ? <>Deserts</> : null}
                    {recipeDetails.subcategory_id == 26 ? <>Breakfast</> : null}
                    {recipeDetails.subcategory_id == 24 ? <>Soups</> : null}

                    {recipeDetails.subcategory_id == 23 ? (
                      <>Maincourse</>
                    ) : null}
                    {recipeDetails.subcategory_id == 22 ? <>Salad</> : null}
                    {recipeDetails.subcategory_id == 21 ? <>Beverages</> : null}
                    {recipeDetails.subcategory_id == 19 ? (
                      <>Accompaniments</>
                    ) : null}
                  </>
                </div>
                <div className="small_box">
                  <MdPlace /> {recipeDetails.region}
                </div>
              </div>

              <div className="d-flex flex-wrap">
                <div className="small_box">
                  <FaClock /> {recipeDetails.time}
                </div>
                <div className="small_box"> {recipeDetails.type}</div>
              </div>
            </Col>
          </Row>

          <div className="pt-5 pb-5">
            <h3>Description</h3>
            <p>{recipeDetails.description}</p>

            <h3>Ingredients</h3>
            <p>{recipeDetails.ingredients}</p>
            <h3>Procedure</h3>
            <p>{recipeDetails.proce}</p>
          </div>
        </Col>
      </Container>
    </div>
  );
}

export default ViewRecipe;
