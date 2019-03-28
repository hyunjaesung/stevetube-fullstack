import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import { localsMiddleware } from "./middleware";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug");

app.use("/uploads", express.static("uploads"));
// /uploads 경로 에 간다면 "uploads"라는 directory에서 file을 전달

app.use("/static", express.static("static"));

app.use(cookieParser());
app.use(bodyParser.json()); // 옵션있음, 어떤 방식으로 다룰지
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // 옵션있음
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    // 아무거나 넣어도됨 이걸 기반으로 암호화
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection })
    // 몽구스가 저장소를 DB에 연결시켜줌
  })
);

app.use(passport.initialize());
// 쿠키 파서에서 쿠키가 내려오면 초기화하고 정보에 해당하는 사용자찾음
app.use(passport.session());

app.use(localsMiddleware);
// req.user 만들수있게됨, 그러면 user obj를 .pug템플릿에 추가가능
// 탬플릿에서 로그인된건지 확인해서 화면다르게 띄울수있음

app.use(routes.home, globalRouter); // 글로벌 라우터 /join /login /home /search 등을 다룸
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app; // 누군가 내 파일을 불러오면 이 object를 주겠다는의미
