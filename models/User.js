import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String, // 여러모듈로 가입해도 알수있게
  avatarUrl: String, // fileUrl이랑 같은 방식으로 저장됨
  facebookId: Number,
  githubId: Number
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

UserSchema.statics.serializeUser = () => (user, cb) => cb(null, user.id);

UserSchema.statics.deserializeUser = function() {
  const self = this;
  return (id, cb) => self.findById(id, cb);
};

// username field 에는 뭐든 올수있는데 email이 유용

const model = mongoose.model("User", UserSchema);

export default model;
