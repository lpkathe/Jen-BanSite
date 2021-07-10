
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
  userDates.className = "joinTheConversation__comment--date";
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

  commentsGroup.insertBefore(container, commentsGroup.firstChild);
}

//initial call to get comments when first loaded.
getAllComments();