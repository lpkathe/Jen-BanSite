const formButton = document.querySelector(".joinTheConversation__button");

function captureValues(event) {
  event.preventDefault();

  const commentsContainer = document.querySelector(".joinTheConversation__comments");
  const firstChildContainer = commentsContainer.firstChild;
  const userPicture = document.querySelector(".joinTheConversation__userPicture").src;
  const formName = document.querySelector(".joinTheConversation__form--input1").value;
  const formComment = document.querySelector(".joinTheConversation__form--comment").value;

  const userForm = document.createElement("div");
  const commentBox = document.createElement("div");
  const commentTitles = document.createElement("div");
  const userName = document.createElement("h3");
  const userDate = document.createElement("p");
  const comment = document.createElement("p");

  userName.innerText = formName;
  const date = new Date();
  userDate.innerText = date.toLocaleDateString();
  comment.innerText = formComment;

  if (userPicture != "") {
    const userImg = document.createElement("img");
    userImg.setAttribute("src", userPicture);
    userImg.classList = "joinTheConversation__userPicture";
    userForm.appendChild(userImg);
  } else {
    const userImg = document.createElement("p");
    userImg.classList = "joinTheConversation__userPicture";
    userForm.appendChild(userImg);
  }

  userForm.classList = "joinTheConversation__comment";
  commentBox.classList = "joinTheConversation__comment--box";
  commentTitles.classList = "joinTheConversation__comment--titles";
  userName.classList = "joinTheConversation__comment--name";
  userDate.classList = "joinTheConversation__comment--date";
  comment.classList = "joinTheConversation__comment--paragraph";

  commentsContainer.insertBefore(userForm, firstChildContainer);
  userForm.appendChild(commentBox);
  commentBox.appendChild(commentTitles);
  commentTitles.appendChild(userName);
  commentTitles.appendChild(userDate);
  commentBox.appendChild(comment);

  const form = document.querySelector(".joinTheConversation__form");
  form.reset();
}

formButton.addEventListener("click", captureValues);