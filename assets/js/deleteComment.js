import axios from "axios";

const deleteButton = document.getElementsByClassName("jsDeleteComment");
const commentNumber = document.getElementById("jsCommentNumber");

// Fake things

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = event => {
  event.parentElement.remove();
  decreaseNumber();
};

// Find and Delete

const sendDeleteComment = async function handleDelete() {
  console.log("Clicked");
  const videoId = window.location.href.split("/videos/")[1];
  const commentId = this.getAttribute("value");
  // Html에서 버튼에 넣은 코멘트 ID로 해당 코멘트 찾아내기
  console.log(commentId);
  const response = await axios({
    url: `/api/${videoId}/deletecomment`,
    method: "POST",
    data: {
      commentId
    }
  });
  console.log(response);
  if (response.status === 200) {
    // Fake 삭제 실행
    deleteComment(this);
  }
};

function init() {
  for (let i = 0; i < deleteButton.length; i += 1) {
    deleteButton[i].addEventListener("click", sendDeleteComment);
  }
}

if (deleteButton) {
  init();
}
