import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import RecipeFeed from "./component/RecipeFeed";
import AddRecipe from "./component/AddRecipe";
import UserInfo from "./component/UserInfo";
import ViewRecipe from "./component/View_Recipe";
import EditProfile from "./component/EditProfile";
//Admin
import AllRecipe from "./component/Admin/AllRecipe";
import AdminLogin from "./component/Admin/AdminLogin";
import ViewRecipeAdmin from "./component/Admin/ViewRecipe";
import ViewUser from "./component/Admin/ViewUser";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recipefeed/:email" element={<RecipeFeed />} />
          <Route path="/Add_Recipe/:email" element={<AddRecipe />} />
          <Route path="/userinfo/:email" element={<UserInfo />} />
          <Route path="/editprofile/:email" element={<EditProfile />} />
          <Route path="/viewrecipe/:foodId" element={<ViewRecipe />} />
          {/* Admin */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/allrecipe/:email" element={<AllRecipe />} />
          <Route
            path="/admin/viewrecipe/:email/:foodId"
            element={<ViewRecipeAdmin />}
          />
          <Route
            path="/admin/viewuser/:email/:useremail"
            element={<ViewUser />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
