import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // 자동으로 .env파일의 자료를 가져와서 process.env.key에 저장해줌

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
}); // datebase 주소를 써준다, 계속 귀찮게 몽구스가 권고하는거 해둠

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = error => console.log(`Error on DB Connection : ${error}`);

db.once("open", handleOpen); // 한번실행
db.on("error", handleError); // 에러발생시
