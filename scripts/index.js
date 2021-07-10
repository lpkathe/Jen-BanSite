
const apiUrl = 'https://project-1-api.herokuapp.com';

const createCommentForm = document.forms["createCommentForm"];
const commentsGroup = document.querySelector(".joinTheConversation__comments");

//add an event listener to the form submission
createCommentForm.addEventListener("submit", handleSubmit);

// Register to Heroku
const apiKey = () => {
  axios
    .get(`${apiUrl}/register`)
    .then((response) => {
      console.log(response);
      response.data.api_key
    })
    .catch((error) => console.log('error getting apikey'));
};

// Get comment list.
const getAllComments = () => {
  axios
    .get(`${apiUrl}/comments?api_key=${apiKey}`)
    .then((response) => {
      const commentsArray = response.data;
      commentsArray.forEach((comment) => {
        addComment(comment);
      });
    })
    .catch((error) => console.log('error getting comments:' + error));
};

//Like implementation for comments.
function likeComment(id) {
  if (id === undefined || id === "") {
    console.log("comment id to like not defined");
    return;
  }
  axios
      .put(`${apiUrl}/comments/${id}/like?api_key=${apiKey}`)
      .then((response) => {
        if (response.status === 200) {
          document.getElementById(id).querySelector(".joinTheConversation__buttons--counter").innerText = response.data.likes + " Likes";
        } else {
          console.log(`Error trying to like commentId: ${id} status:${response.status} - ${response}`);
        }
      })
      .catch((error) => console.log(`error for like comment ${id}:` + error));
}

//Remove single comment by a given Id.
function removeComment(id) {
  if (id === undefined || id === "") {
    console.log("comment id to remove not defined");
    return;
  }
  axios
    .delete(`${apiUrl}/comments/${id}?api_key=${apiKey}`)
    .then((response) => {
      if (response.status === 200) {
        document.getElementById(id).remove();
      } else {
        console.log(`Error removing commentId: ${id} status:${response.status} - ${response}`);
      }
    })
    .catch((error) => console.log(`error for like comment ${id}:` + error));
}

// Handle Submit event
function handleSubmit(event) {
  event.preventDefault();
  const newComment = {
    name: createCommentForm["userName"].value, 
    comment: createCommentForm["comment"].value
  };

  axios
    .post(`${apiUrl}/comments?api_key=${apiKey}`, newComment, {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    )
    .then((response) => {
      console.log('HTTP STATUS CODE: ', response.status);

      //after comment has posted, getComments again.
      getAllComments();
    })
    .catch((error) => console.log(error));
    
  createCommentForm.reset();
}

// Create a single comment.
function addComment(comment) {

  // create new elements
  const container = document.createElement('div');
  container.id = comment.id;
  container.classList.add("joinTheConversation__comment");

  const image = document.createElement('p');
  image.classList.add("joinTheConversation__userPicture");

  const commentBox = document.createElement('div');
  commentBox.classList.add("joinTheConversation__comment--box");

  const commentTitles = document.createElement('div');
  commentTitles.classList.add("joinTheConversation__comment--titles");

  const userName = document.createElement('h3');
  userName.classList.add("joinTheConversation__comment--name");
  userName.innerText = comment.name;

  const date = new Date(comment.timestamp);
  const userDates = document.createElement('p');
  userDates.classList.add("joinTheConversation__comment--date");
  userDates.innerText = date.toLocaleDateString();

  commentTitles.appendChild(userName);
  commentTitles.appendChild(userDates);

  const userComment = document.createElement('p');
  userComment.classList.add("joinTheConversation__comment--paragraph");
  userComment.innerText = comment.comment;

  commentBox.appendChild(commentTitles);
  commentBox.appendChild(userComment);

  container.appendChild(image);
  container.appendChild(commentBox);

  const commentButtons = document.createElement('div');
  commentButtons.classList.add("joinTheConversation__buttons");

  const commentLike = document.createElement('img');
  commentLike.classList.add("joinTheConversation__buttons--likes");
  commentLike.setAttribute("src", "assets/Icons/SVG/icon-like.svg");

  const likeCounter = document.createElement("p");
  likeCounter.classList.add("joinTheConversation__buttons--counter");
  likeCounter.innerText = `${comment.likes} Likes`;

  const commentDelete = document.createElement('button');
  commentDelete.innerText = "Remove";
  commentDelete.classList.add("joinTheConversation__buttons--remove");
  commentDelete.addEventListener("click", (event) => {
    removeComment(event.target.parentNode.parentNode.id);
  });

  commentLike.addEventListener("click", (event) => {
    likeComment(event.target.parentNode.parentNode.id);
  });

  commentButtons.appendChild(commentLike);
  commentButtons.appendChild(likeCounter);
  commentButtons.appendChild(commentDelete);

  container.appendChild(commentButtons);

  commentsGroup.insertBefore(container, commentsGroup.firstChild);
}

//initial call to get comments when first loaded.
getAllComments();