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

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  // github에서 성공적으로 로그인되고 돌아와서 실행되는 함수
  const {
    _json: { id, avatar_url, name, email }
  } = profile; // profile 안의 변수 가지고 오기
  try {
    const user = await User.findOne({ email }); // db에서 찾기
    if (user) {
      // 이미 있는 계정이면
      user.githubId = id; // 스키마에있는 id에 넣어줌
      user.save(); // github id 저장
      return cb(null, user);
      // 콜백함수, err는 null, user를 전해주니 github에 찾았다는거 알려줌,
      // 시리얼라이즈해서 세션만들어서 쿠키에 저장가능
    }
    const newUser = await User.create({
      // 없으면 새로 생성
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url
    });
    return cb(null, newUser); // 새로만든거 등록했다고 콜백!
  } catch (error) {
    return cb(error); // 에러났다고 콜백
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "UserDetail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "EditProfile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "ChangePassword" });
