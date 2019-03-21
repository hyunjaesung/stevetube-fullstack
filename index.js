
import express from "express";

const app = express();

const PORT = 4001;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);


const handleHome = (req, res) => res.send("Hello from my ass");

const handleProfile = (req, res) => res.send("You are on my profile");

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);

app.listen(PORT, handleListening); // 4000번 포트로 리스닝

