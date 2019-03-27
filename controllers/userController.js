import routes from "../routes";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 }
  } = req; // ES6 방식
  if (password !== password2) {
    res.status(400); // Bad request 라는 상태를 보내면 크롬도 저장할지 안물어봄
    res.render("join", { pageTitle: "Join" });
  } else {
    // 성공
    // To-do : register user
    // To-do : log user in
    res.redirect(routes.home); // 다시 홈으로 보내기
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = (req, res) => {
  // To-do : DB check
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // todo : logout process
  res.redirect(routes.home);
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "UserDetail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "EditProfile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "ChangePassword" });
