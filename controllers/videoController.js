import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    // await 는 async 있어야 쓸수있음, model 안에 여러옵션있음 Find 블라블라
    res.render("home", { pageTitle: "Home", videos: videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  //옛날 방식 const searchingBy = req.query.term;

  res.render("search", {
    pageTitle: "Search",
    searchingBy: searchingBy,
    videos: videos
  });
};
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path } // 파일에서 path 받아오기
  } = req;

  const newVideo = await Video.create({
    // 스키마 따라서 넣어서 db data생성
    fileUrl: path,
    title,
    description
  });
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    // 몽구스가 id로 DB에서 비디오 찾아줌
    res.render("videoDetail", { pageTitle: "VideoDetail", video });
    //탬플릿에 db에서 찾아낸 video 전달
  } catch (error) {
    redirect(routes.home);
  }
};

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "EditVideo" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "DeleteVideo" });
