import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  accessKeyId: process.env.AWS_KEY,
  region: "ap-northest-2c",
  s3BucketEndpoint: true,
  endpoint: "http://stevetube.s3.amazonaws.com"
});

const multerVideo = multer({
  storage: multerS3({
    s3, // key
    acl: "public-read", // access control lists
    bucket: "stevetube/video" // 안에 폴더하나 더만들기
  })
});

export const multerAvatar = multer({
  storage: multerS3({
    s3, // key
    acl: "public-read", // access control lists
    bucket: "stevetube/avatar" // 안에 폴더하나 더만들기
  })
});

// 추천하는방법아님 외부서버에 업로드하는게 맞음
// export const multerVideo = multer({ dest: "uploads/videos/" }); // stroage는 default값으로 nodejs기준임
// /uploads/videos/ 이런식으로 만들면 uploads 폴더가 이미 있는줄알고 폴더생성안함

// export const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "SteveTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null; // 식별안되면 null
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

export const uploadAvatar = multerAvatar.single("avatar");
