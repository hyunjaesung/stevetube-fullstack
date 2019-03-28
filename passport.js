import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

// strategy 하나 사용 해
// strategy는 로그인 방식 로컬인지 facebook인지 github 인지 같은 것들

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
