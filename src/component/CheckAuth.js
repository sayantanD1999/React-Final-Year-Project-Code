export function getData() {
  const loggedInUser = localStorage.getItem("userLoggedIn");
  if (loggedInUser) {
    return loggedInUser;
  } else {
    return null;
  }
}
export function setData(email, name, n, userid) {
  localStorage.setItem("useremail", email);
  localStorage.setItem("username", name);
  localStorage.setItem("userLoggedIn", n);
  localStorage.setItem("userId", userid);
}
