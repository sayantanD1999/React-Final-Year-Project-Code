import React, { useState, useEffect } from "react";
import "../CSS/add_recipe.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import FormData from "form-data";
import { ToastContainer, toast } from "react-toastify";
import { FaUserAlt, FaClock, FaUtensils, FaSmile } from "react-icons/fa";
// import { VscDebugBreakpointLog } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { getData, setData } from "./CheckAuth";

toast.configure();
function AddRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [recipeTime, setRecipeTime] = useState("");
  const [recipeSubCategory, setRecipeSubCategory] = useState("");
  const [recipeType, setRecipeType] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeTradition, setRecipeTradition] = useState("");
  const [recipeRegion, setRecipeRegion] = useState("");
  const [foodType, setFoodType] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [recipeProcedure, setRecipeProcedure] = useState("");
  const [recipeImgs, setRecipeImgs] = useState([]);
  const [recipeImgsName, setRecipeImgsName] = useState([]);
  const [initials, setInitials] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    var loggedInUser = getData();

    if (!loggedInUser) {
      navigate("/");
    } else {
      const name = localStorage.getItem("username").split(" ");
      let x = "";
      for (let i = 0; i < name.length; i++) {
        console.log(name[i]);
        x += name[i].split("")[0].toUpperCase();
      }

      setInitials(x);
    }
  }, []);

  const notify = () => {

    toast.success("Recipe Submitted Successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notify2 = () => {
    toast.error("All fields are necessary", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  let { email } = useParams();
  console.log(email);

  const validateForm = () => {
    let flag = true;
    if (
      recipeName.length == 0 ||
      recipeIngredients.length == 0 ||
      recipeDescription.length == 0 ||
      recipeImgs.length == 0 ||
      recipeRegion.length == 0 ||
      recipeSubCategory.length == 0 ||
      recipeTradition.length == 0
    ) {
      notify2();
      flag = false;
    }
    return flag;
  };

  const submitRecipe = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let formData = new FormData();
      let name = localStorage.getItem("username");
      let uid = localStorage.getItem("userId");
      formData.append("file", recipeImgs);
      formData.append("name", recipeName);
      formData.append("email", email);
      formData.append("time", recipeTime + " mins");
      formData.append("recipetype", recipeType);
      formData.append("subcategory", recipeSubCategory);
      formData.append("description", recipeDescription);
      formData.append("fileName", recipeImgsName);
      formData.append("category", recipeTradition);
      formData.append("region", recipeRegion);
      formData.append("ingredients", recipeIngredients);
      formData.append("procedure", recipeProcedure);
      formData.append("foodtype", foodType);
      formData.append("author", name);
      formData.append("userid", uid);

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(`http://localhost:3000/submitrecipe`, formData, config)
        .then((response) => {
          console.log(response);
          if (response && response.status == 200) {
            console.log(response.statusCode);
            notify();
          }
        });

    };
  }

  function logout() {
    console.log("Frontend logout");
    axios.get(`/logout/${email}`).then((response) => {
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
      <nav className="container-fluid">
        <div className="nav_div container">
          <div>
            <Link to={`/userinfo/${email}`}>
              <div id="profile">
                <FaUserAlt style={{ color: "#fff" }} />
                <span id="profile_name">{initials}</span>
              </div>
            </Link>
          </div>
          <button className="btn-nav" onClick={logout}>
            Log Out
          </button>
        </div>
      </nav>
      <section className="container">
        <div className="row">
          <div className="col-md-6 mid_col">
            <img src="/pics/Chef_Outline.png" className="landing_img" alt="" />
          </div>
          <div className="col-md-6 mid_col">
            <div>
              <p id="landing_text">
                Add Your Own Recipe & <br />
                <span id="featured">Get Featured !!!</span>
                <br />
              </p>
              <center>
                <a href="#notice">
                  <button id="landing_btn">Get Started</button>
                </a>
              </center>
            </div>
          </div>
        </div>
      </section>
      <section id="notice" className="notice container">
        <div className="notice_div">
          <h1>Rules & Regulations For Uploading Recipes</h1>
          <br />
          <Row>
            <Col lg={6} xs={12}>
              <div>
                <p>
                  {" "}
                  <FaUtensils className="icons" /> Should be a traditional food
                  of any Indian culture
                </p>
              </div>
              <div>
                <p>
                  {" "}
                  <FaUtensils className="icons" /> Maximum 10 ingredients can be
                  used
                </p>
              </div>
              <div>
                <p>
                  {" "}
                  <FaUtensils className="icons" /> Maximum 10 steps are allowed
                  for the whole procedure
                </p>
              </div>
              <div>
                <p>
                  {" "}
                  <FaUtensils className="icons" /> Can be preserved upto two
                  weeks
                </p>
              </div>
              <div>
                <p>
                  {" "}
                  <FaUtensils className="icons" /> No added preservatives should
                  be used, only freezer
                </p>
              </div>
              <div>
                <p>
                  {" "}
                  <FaUtensils className="icons" /> The item should be easily
                  portable
                </p>
              </div>
              <div>
                <p>
                  {" "}
                  <FaUtensils className="icons" />
                  The cooking time should not be more than 30 minutes
                </p>
              </div>
              <div>
                <p>
                  {" "}
                  <FaUtensils className="icons" />
                  Can be classified as a packed food
                </p>
              </div>
            </Col>
            <Col
              lg={6}
              xs={12}
              className="d-flex my-auto justifu-content-center"
            >
              <center>
                <a href="#form">
                  <button id="landing_btn">Proceed</button>
                </a>
              </center>
            </Col>
          </Row>
        </div>
      </section>
      <Container id="form">
        {/* <form onSubmit={submitRecipe}> */}
        <Row className="p-2">
          <Col lg={6} xs={12} className="p-2">
            <label htmlFor="recipe_name">
              <b>Recipe Name</b> <span className="mandatory">*</span>
            </label>
            <br />
            <input
              className="inp"
              type="text"
              placeholder="e.g - Mutton Tikka"
              name="name"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              id="recipe_name"
            />
          </Col>
          <Col lg={6} xs={12} className="p-2">
            <label htmlFor="recipe_name">
              <b>Recipe Time (Minutes)</b> <span className="mandatory">*</span>
            </label>
            <br />
            <input
              className="inp"
              type="number"
              min="0"
              max="30"
              placeholder="e.g - 10 mins"
              id="recipe_time"
              value={recipeTime}
              onChange={(e) => setRecipeTime(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="p-2">
          <Col lg={6} xs={12} className="p-2">
            <label htmlFor="recipe_name">
              <b> Recipe Type</b> <span className="mandatory">*</span>
            </label>
            <br />
            <label>
              <input
                type="radio"
                className="rt"
                value="25"
                name="type"
                onChange={(e) => setRecipeSubCategory(e.target.value)}
                id=""
              />
              Breakfast
            </label>

            <label>
              {" "}
              <input
                type="radio"
                className="rt"
                value="26"
                onChange={(e) => setRecipeSubCategory(e.target.value)}
                name="type"
                id=""
              />{" "}
              Deserts
            </label>

            <label>
              {" "}
              <input
                type="radio"
                className="rt"
                value="24"
                onChange={(e) => setRecipeSubCategory(e.target.value)}
                name="type"
                id=""
              />{" "}
              Soups
            </label>
            <label>
              {" "}
              <input
                type="radio"
                className="rt"
                value="23"
                onChange={(e) => setRecipeSubCategory(e.target.value)}
                name="type"
                id=""
              />{" "}
              Maincourse
            </label>
            <label>
              {" "}
              <input
                type="radio"
                className="rt"
                value="22"
                onChange={(e) => setRecipeSubCategory(e.target.value)}
                name="type"
                id=""
              />{" "}
              Salad
            </label>
            <br /><br />

            <label htmlFor="recipe_name">
              <b> Food Type</b> <span className="mandatory">*</span>
            </label>
            <br />
            <label>
              {" "}
              <input
                type="radio"
                className="rt"
                value="Veg"
                onChange={(e) => setFoodType(e.target.value)}
                name="type"
                id=""
              />{" "}
              Veg
            </label>
            <label>
              {" "}
              <input
                type="radio"
                className="rt"
                value="Non-Veg"
                onChange={(e) => setFoodType(e.target.value)}
                name="type"
                id=""
              />{" "}
              Non-Veg
            </label>
            <br />
            <br />
            <label htmlFor="email">
              {" "}
              <b>Email</b>{" "}
            </label>
            <br />
            <input
              type="email"
              name="email"
              className="inp"
              id="recipe_img"
              value={email}
              disabled={true}
            />
          </Col>
          <Col lg={6} xs={12} className="p-2">
            <label htmlFor="recipe_img">
              {" "}
              <b>Recipe image(s)</b> <span className="mandatory">*</span>
            </label>
            <br />
            <input
              type="file"
              className="inp"
              name="recipe_img"
              onChange={(e) => {
                console.log("Over here", e.target.files[0]);
                setRecipeImgs(e.target.files[0]);
                setRecipeImgsName(e.target.files[0].name);
                // console.log(recipeImgs, recipeImgsName);
              }}
              accept="image/*"
            />
            <br />
            <br />
            <b>Recipe Section</b> <span className="mandatory">*</span>
            <br />
            <br />
            <label>
              {" "}
              <input
                type="radio"
                className="rt"
                value="Commercial"
                onChange={(e) => setRecipeType(e.target.value)}
                name="type2"
                id=""
              />{" "}
              Commercial
            </label>
            <label>
              {" "}
              <input
                type="radio"
                className="rt"
                value="Traditional"
                onChange={(e) => setRecipeType(e.target.value)}
                name="type2"
                id=""
              />{" "}
              Traditional
            </label>
            <label>
              {" "}
              <input
                type="radio"
                className="rt"
                value="Commercial & Traditional"
                onChange={(e) => setRecipeType(e.target.value)}
                name="type2"
                id=""
              />{" "}
              Both
            </label>
          </Col>
        </Row>
        <Row className="p-2">
          <Col lg={6} xs={12} className="p-2">
            <div>
              <label htmlFor="recipe_name">
                <b> Tradition Type</b> <span className="mandatory">*</span>
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  className="rt"
                  value="10"
                  onChange={(e) => setRecipeTradition(e.target.value)}
                  name="tradition"
                  id=""
                />
                South Indian
              </label>

              <label>
                {" "}
                <input
                  type="radio"
                  className="rt"
                  value="11"
                  name="tradition"
                  onChange={(e) => setRecipeTradition(e.target.value)}
                  id=""
                />{" "}
                North Indian
              </label>

              <label>
                {" "}
                <input
                  type="radio"
                  className="rt"
                  value="12"
                  name="tradition"
                  onChange={(e) => setRecipeTradition(e.target.value)}
                  id=""
                />{" "}
                East Indian
              </label>

              <label>
                {" "}
                <input
                  type="radio"
                  className="rt"
                  value="12"
                  name="tradition"
                  onChange={(e) => setRecipeTradition(e.target.value)}
                  id=""
                />{" "}
                West Indian
              </label>
            </div>

            <div>
              <label htmlFor="region">
                {" "}
                <b>Recipe Region</b>{" "}
              </label>
              <br />
              <input
                type="text"
                name="region"
                className="inp"
                id="recipe_region"
                value={recipeRegion}
                placeholder="E.g Bengali, Gujrati"
                onChange={(e) => setRecipeRegion(e.target.value)}
              />
            </div>
          </Col>

          <Col lg={6} xs={12} className="p-2">
            <label htmlFor="quote">
              <b>Give a short description of the recipe and tradition</b>{" "}
            </label>
            <br />
            <textarea
              name="msg"
              id="quote"
              cols="30"
              className="inp3"
              rows="5"
              value={recipeDescription}
              onChange={(e) => setRecipeDescription(e.target.value)}
              placeholder="Start Expressing..."
            ></textarea>
          </Col>
        </Row>
        <Row className="p-4">
          <Col lg={6} xs={12} className="p-2">
            <div className="ingredients">
              <h3>Ingredients</h3>

              <div id="ingredients">
                <textarea
                  name="msg"
                  id="quote"
                  cols="30"
                  className="inp3"
                  rows="5"
                  value={recipeIngredients}
                  onChange={(e) => setRecipeIngredients(e.target.value)}
                  placeholder="Ingredients..."
                ></textarea>
              </div>
            </div>
          </Col>
          <Col lg={6} xs={12} className="p-2">
            <div className="procedure">
              <h2>Procedure</h2>

              <div id="steps">
                <textarea
                  name="msg"
                  id="quote"
                  cols="30"
                  className="inp3"
                  rows="5"
                  value={recipeProcedure}
                  onChange={(e) => setRecipeProcedure(e.target.value)}
                  placeholder="Steps..."
                ></textarea>
              </div>
            </div>
          </Col>
        </Row>
        <div className="submit_btn_div">
          <button
            id="submit_recipe"
            className="btn btn-success"
            // type="submit"
            onClick={(e) => submitRecipe(e)}
          >
            Submit
          </button>
        </div>
        {/* </form> */}
      </Container>
    </div>
  );
}

export default AddRecipe;
