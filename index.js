import express from "express"; // 좀더 모던하게 표현

//const express = require("express");
// require 은 module 을 폴더안 어딘가에서 가져오라고함 node_modules폴더가서 express찾을듯

const app = express();
//express를 불러와서 app을 만듬

const PORT = 4000;

function handleListening() {
  console.log(`Listening on : http:// localhost:${PORT}`);
}

function handleHome(req, res) {
  res.send("Hello from Home");
}

function handleProfile(req, res) {
  res.send("you are on my profile");
}

app.get("/profile", handleProfile);

app.get("/", handleHome); // 누가 접속하면 handleHome 작동

app.listen(PORT, handleListening); // 4000번 포트로 리스닝
