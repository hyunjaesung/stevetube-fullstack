import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middleware";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();

app.use(helmet());
app.set("view engine", "pug");

app.use("/uploads", express.static("uploads"));
// /uploads 경로 에 간다면 "uploads"라는 directory에서 file을 전달

app.use(cookieParser());
app.use(bodyParser.json()); // 옵션있음, 어떤 방식으로 다룰지
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // 옵션있음

app.use(localsMiddleware);

app.use("/", globalRouter); //글로벌 라우터 /join /login /home /search 등을 다룸
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app; // 누군가 내 파일을 불러오면 이 object를 주겠다는의미
