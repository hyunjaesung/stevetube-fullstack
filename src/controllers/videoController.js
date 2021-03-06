import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    // await 는 async 있어야 쓸수있음, model 안에 여러옵션있음 Find 블라블라
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;

  let videos = [];

  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
    // mongoose에서 제공하는 regular expression, options i 는 insensitive의미, 대소문자구분안함
    // title : searchingBy 라고 쓰면 정확히 같은 것 만찾음
  } catch (error) {
    console.log(error);
  }

  res.render("search", {
    pageTitle: "Search",
    searchingBy,
    videos
  });
};
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location } // 파일에서 path 받아오기
  } = req;

  const newVideo = await Video.create({
    // 스키마 따라서 넣어서 db data생성
    fileUrl: location,
    title,
    description,
    creator: req.user.id
  });

  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    // populate는 type이 object id 일때만 불러올수 있음
    // console.log(video);
    // 몽구스가 id로 DB에서 비디오 찾아줌
    res.render("videoDetail", {
      pageTitle: `${video.title}`,
      video
    });
    // 탬플릿에 db에서 찾아낸 video 전달
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);
    console.log(video.creator);
    console.log(req.user.id);
    if (video.creator == req.user.id) {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    } else {
      console.log("id authentication error");
      throw Error();
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  // 폼에서 포스트로 리퀘스트된것들
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator == req.user.id) {
      await Video.findOneAndRemove({ _id: id });
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
    res.end();
  } finally {
    // 마지막은 무조건 이렇게 의미
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req; // 인풋창에 서브밋된 정보

  try {
    const video = await Video.findById(id); // video db 소환
    const newComment = await Comment.create({
      // comment db data 만들기
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment.id); // 비디오 DB에 comment id 넣어줌
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Delete Comment on DB

export const postDeleteComment = async (req, res) => {
  // 프론트앤드에서 전달 받은 정보
  const {
    body: { commentId },
    user
  } = req;

  try {
    const deleteComment = await Comment.findOne({ _id: commentId });

    if (String(deleteComment.creator) !== user.id) {
      res.status(400);
    } else {
      // 삭제
      await Comment.findByIdAndRemove({ _id: commentId });
    }
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
