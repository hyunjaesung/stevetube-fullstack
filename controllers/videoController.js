export const home = (req, res) => res.render("home", { pageTitle: "Home" });
//export const videos = (req, res) =>
// res.render("videos", { pageTitle: "Videos" });
export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  //옛날 방식 const searchingBy = req.query.term;

  res.render("search", { pageTitle: "Search", searchingBy: searchingBy });
};
export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "VideoDetail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "EditVideo" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "DeleteVideo" });
