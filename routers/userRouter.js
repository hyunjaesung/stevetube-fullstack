import express from "express";
import routes from "../routes";
import {
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile); // userDetail이 제일나중에실행되야함 id인식되버리기에
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
