import express from "express";
import routes from "../routes";
import {
  userDetail,
  changePassword,
  getEditProfile
} from "../controllers/userController";
import { onlyPrivate } from "../middleware";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile); // userDetail이 제일나중에실행되야함 id인식되버리기에
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
