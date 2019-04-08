import "./db";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000; // 못찾으면 4000번으로

const handleListening = () =>
  console.log(`Listening on : http://localhost ${PORT}`);

app.listen(PORT, handleListening);
