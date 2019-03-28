import multer from "multer";
import routes from "./routes";

export const multerVideo = multer({ dest: "uploads/videos/" });
// /uploads/videos/ 이런식으로 만들면 uploads 폴더가 이미 있는줄알고 폴더생성안함

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "SteveTube";
  res.locals.routes = routes;
  res.locals.user = req.user || null; // 식별안되면 null
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (!req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const uploadVideo = multerVideo.single("videoFile");
// single은 오직하나만 업로드하는거의미 string에 들어오는건 input의 이름
