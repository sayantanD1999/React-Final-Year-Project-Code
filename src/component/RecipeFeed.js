import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../CSS/recipe.css";
import { FaUserAlt, FaClock, FaUtensils, FaSmile } from "react-icons/fa";
import { BiCheckboxChecked } from "react-icons/bi";
// import {about} from "../../public/food";
import { getData, setData } from "./CheckAuth";

import axios from "axios";

function RecipeFeed() {
  let { email } = useParams();
  const navigate = useNavigate();
  const [all, setAll] = useState([]);
  const [allSearch, setAllSearch] = useState([]);
  const [ni, setNI] = useState([]);
  const [si, setSI] = useState([]);
  const [ei, setEI] = useState([]);
  const [wi, setWI] = useState([]);
  const [initials, setInitials] = useState("");
  const [name, setName] = useState("");
  // const [useremail, setUserEmail] = useState("");

  useEffect(() => {
    var loggedInUser = getData();

    if (!loggedInUser) {
      navigate("/");
    } else {
      document.getElementById("all").style.display = "block";
      document.getElementById("all_btn").classList.add("active");

      console.log(email);
      axios.post(`/showrecipefeed/${email}`).then((response) => {
        // console.log(res);
        if (response && response.status == 200) {
          // console.log(response);
          for (let i = 0; i < response.data.val.length; i++) {
            setAll((all) => [...all, response.data.val[i]]);
            setAllSearch((allSearch) => [...allSearch, response.data.val[i]]);
            if (response.data.val[i].category_id == 10) {
              // console.log(response.data.val);
              setSI((si) => [...si, response.data.val[i]]);
            }
            if (response.data.val[i].category_id == 11) {
              setNI((ni) => [...ni, response.data.val[i]]);
            }
            if (response.data.val[i].category_id == 12) {
              setEI((ei) => [...ei, response.data.val[i]]);
            }
            if (response.data.val[i].category_id == 13) {
              setWI((wi) => [...wi, response.data.val[i]]);
            }
          }
          // setUserEmail(response.data.val[0].email);
          // setName(response.data.val[0].name);
          // console.log(name, useremail);
        }
      });
      const name = localStorage.getItem("username").split(" ");
      let x = "";
      for (let i = 0; i < name.length; i++) {
        console.log(name[i]);
        x += name[i].split("")[0].toUpperCase();
      }

      setInitials(x);
    }
  }, []);

  const searchRecipe = (val) => {
    console.log(val);
    let arr = []
    for (let i = 0; i < all.length; i++) {
      if (all[i].food.toUpperCase().search(val.toUpperCase()) != -1) {
        arr.push(all[i]);
      }
    }
    setAllSearch([...arr]);
  }

  function openNav() {
    document.getElementsByClassName("overlay")[0].style.width = "100%";
    // document.getElementById("myBtn").style.display = "none";
  }
  function closeNav() {
    document.getElementsByClassName("overlay")[0].style.width = "0%";
    // document.getElementById("myBtn").style.display = "block";
  }

  function set_tab(ele, e) {
    console.log(ele.target.parentNode, e);
    var tab_btns = document.getElementsByClassName("tab_btns");
    for (let i = 0; i < tab_btns.length; i++) {
      tab_btns[i].classList.remove("active");
    }
    var tab = document.getElementsByClassName("tab_content");
    for (let i = 0; i < tab.length; i++) {
      tab[i].style.display = "none";
    }
    document.getElementById(e).style.display = "block";
    // console.log(ele);
    ele.target.parentNode.classList.add("active");
    closeNav();
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
      <nav class="navbar navbar-light bg-dark justify-content-between">
        <a class="navbar-brand">Recipe</a>
        <div className="d-flex">
          <Link to={`/userinfo/${email}`}>
            <div id="profile">
              <FaUserAlt style={{ color: "#fff" }} />
              <span id="profile_name">{initials}</span>
            </div>
          </Link>

          <Link to={`/Add_Recipe/${email}`} className="btn-nav">
            Upload Recipe
          </Link>
          <button className="btn-nav" onClick={logout}>
            Log Out
          </button>
        </div>
      </nav>

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
              <div className="d-flex">
                <Link to={`/userinfo/${email}`}>
                  <div id="profile">
                    <FaUserAlt style={{ color: "#fff" }} />
                    <span id="profile_name">{initials}</span>
                  </div>
                </Link>
                <button className="btn-nav" onClick={logout}>
                  Log Out
                </button>
                <Link to={`/Add_Recipe/${email}`}>
                  <button className="btn-nav">Upload Recipe</button>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-5 d-flex justify-content-center">
        <ul className="d-flex p-0 pt-3">
          <div
            className="tab_btns"
            onClick={(e) => set_tab(e, "all")}
            data-zone="all"
            id="all_btn"
          >
            <p className="nav-link"> All</p>
          </div>
          <div
            className="tab_btns"
            onClick={(e) => set_tab(e, "si")}
            id="si_btn"
            data-zone="si"
          >
            <p className="nav-link">South Indian</p>
          </div>
          <div
            className="tab_btns"
            onClick={(e) => set_tab(e, "ni")}
            data-zone="ni"
          >
            <p className="nav-link">North Indian</p>
          </div>
          <div
            className="tab_btns"
            onClick={(e) => set_tab(e, "ei")}
            data-zone="ei"
          >
            <p className="nav-link"> East Indian</p>
          </div>
          <div
            className="tab_btns"
            onClick={(e) => set_tab(e, "wi")}
            data-zone="wi"
          >
            <p className="nav-link"> West Indian</p>
          </div>
        </ul>
      </div>

      <div className="tab_holder container">
        <div className="tab_content all-indian" id="all">
          <div className="col-12 my-auto text-center">
            <input type="text" name="" placeholder="Search a recipe" id="search" className="p-2" onChange={e => searchRecipe(e.target.value)} />
          </div>
          <div>
            {allSearch.map((data, index) => {
              // {
              //   console.log(data);
              // }
              return (
                <div className="card" key={index}>
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
                      to={`/viewrecipe/${data.id}`}
                      className="card-btn text-center pt-2"
                    >
                      Check Recipe <i className="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="tab_content south-indian" id="si">
          <div>
            {si.map((data, index) => {
              // {
              //   console.log(data);
              // }
              return (
                <div className="card" key={index}>
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
                      to={`/viewrecipe/${data.id}`}
                      className="card-btn text-center pt-2"
                    >
                      Check Recipe <i className="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="tab_content north-indian" id="ni">
          <div>
            {ni.map((data, index) => {
              // {
              //   console.log(data);
              // }
              return (
                <div className="card" key={index}>
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
                      to={`/viewrecipe/${data.id}`}
                      className="card-btn text-center pt-2"
                    >
                      Check Recipe <i className="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="tab_content east-indian" id="ei">
          <div>
            {ei.map((data, index) => {
              // {
              //   console.log(data);
              // }
              return (
                <div className="card" key={index}>
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
                      to={`/viewrecipe/${data.id}`}
                      className="card-btn text-center pt-2"
                    >
                      Check Recipe <i className="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="tab_content west-indian" id="wi">
          <div>
            {wi.map((data, index) => {
              // {
              //   console.log(data);
              // }
              return (
                <div className="card" key={index}>
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
                      to={`/viewrecipe/${data.id}`}
                      className="card-btn text-center pt-2"
                    >
                      Check Recipe <i className="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeFeed;
