import axios from "axios";

const API_BASEURL = "http://localhost:3000";

export async function userLogIn(obj) {
  console.log(obj);
  axios.post(`http://localhost:3000/recipe`, { obj: obj }).then((res) => {
    console.log(res);
    return res.status;
  });
}
