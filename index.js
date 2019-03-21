<<<<<<< HEAD
import express from "express";
=======
const express = require("express");
// require 은 module 을 폴더안 어딘가에서 가져오라고함 node_modules폴더가서 express찾을듯
>>>>>>> parent of 33799c5... babel error
const app = express();

const PORT = 4001;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

<<<<<<< HEAD
const handleHome = (req, res) => res.send("Hello from my ass");

const handleProfile = (req, res) => res.send("You are on my profile");

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
=======
app.listen(PORT, handleListening); // 4000번 포트로 리스닝
>>>>>>> parent of 33799c5... babel error
