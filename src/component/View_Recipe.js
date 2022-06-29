import React, { useEffect, useReact, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
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
import "../CSS/view_recipe.css";
import { getData, setData } from "./CheckAuth";

// import food from "../../../food_imgs/boh.jpg";

function View_Recipe() {
  let { foodId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    var loggedInUser = getData();

    if (!loggedInUser) {
      navigate("/");
    } else {
      axios.post(`/getrecipe/${foodId}`).then((response) => {
        if (response && response.status == 200) {
          console.log(response);
          setRecipeDetails(response.data.rows[0]);
        } else {
          console.log("Error");
        }
      });
    }
  }, []);

  return (
    <div>
      <Container className="p-3 pt-5">
        <Link to={`/recipefeed/${recipeDetails.email}`}>
          <button className="btn btn-success">Back</button>
        </Link>

        <Col>
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
              <h2> {recipeDetails.food}</h2>
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

export default View_Recipe;
