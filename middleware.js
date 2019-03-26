import multer from "multer";
import routes from "./routes";

export const multerVideo = multer({ dest: "videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "SteveTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
// single은 오직하나만 업로드하는거의미 string에 들어오는건 input의 이름
