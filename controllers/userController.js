import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req; // ES6 방식
  if (password !== password2) {
    res.status(400); // Bad request 라는 상태를 보내면 크롬도 저장할지 안물어봄
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({ name, email }); // db모델 데이터 만들고
      await User.register(user, password); // db에 유저 정보 등록
      // User 모델에 이미 인증도와주는 passport plugin이 등록되어있음
      console.log(password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home); // 다시 홈으로 보내기
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

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
