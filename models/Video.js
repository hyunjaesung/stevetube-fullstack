import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: { type: String, required: "File URL is required" }, // 비디오를 직접 DB에넣는게아니라 비디오는 Amazon서버에 넣고 DB에 URL저장함
  title: {
    type: String,
    required: "Title is requried"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }] // array로 저장
});

const model = mongoose.model("Video", VideoSchema);

export default model;
