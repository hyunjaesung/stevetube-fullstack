import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

const PORT = 4000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hello from my ass");

const handleProfile = (req, res) => res.send("You are on my profile");

const betweenHome = (req, res, next) => {
  console.log("Between");
  next();
};

app.use(cookieParser());
app.use(bodyParser.json()); // 옵션있음, 어떤 방식으로 다룰지
app.use(bodyParser.urelencoded({ extened: true }));
app.use(morgan("dev")); // 옵션있음
app.use(helmet());

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
