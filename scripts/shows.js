const showsList = document.querySelector(".shows__list");

const apiUrl = 'https://project-1-api.herokuapp.com';

//function to get apikey
const apiKey = () => {
  axios
    .get(`${apiUrl}/register`)
    .then((response) => {
      const apiKey = response.data.api_key
      console.log(apiKey);
    })
    .catch((error) => console.log('error getting apikey:' + error));
};

//function to load shows from API
const loadShows = () => {
  axios
    .get(`${apiUrl}/showdates?api_key=${apiKey}`)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        addShowsLabels();
        response.data.forEach((record, index) => {
          const show = {
            "date": new Date(parseInt(record.date)).toLocaleDateString(),
            "venue": record.place,
            "location": record.location
          };
          addShow(show, index + 1);
        });
      }
    })
    .catch((error) => console.log('error getting shows data:' + error));
}

function onLoad(event) {
  loadShows();
}

//function to add shows titles (for tablet & desktop).
function addShowsLabels() {
  const labelsGroup = document.createElement("div");
  labelsGroup.className = "shows__group shows__group--desktop";
  labelsGroup.appendChild(createShowTitleElement("Date"));
  labelsGroup.appendChild(createShowTitleElement("Venue"));
  labelsGroup.appendChild(createShowTitleElement("Location"));
  showsList.insertBefore(labelsGroup, showsList.firstChild);
}

//function to create a title element.
function createShowTitleElement(title, className) {
  const titleElement = document.createElement("label");
  if (className !== undefined) {
    titleElement.className = "shows__titles " + className;
  } else {
    titleElement.className = "shows__titles";
  }
  titleElement.innerText = title;
  return titleElement;
}

//function to get a show value element.
function createShowValueElement(value) {
  const valueElement = document.createElement("p");
  valueElement.className = "shows__value";
  valueElement.innerText = value;
  return valueElement;
}

//function to create each show.
function addShow(show, index) {
  if (show !== undefined) {
    const showDiv = document.createElement("div");
    showDiv.className = "shows__group";

    Object.entries(show).forEach(entry => {
      showDiv.appendChild(createShowTitleElement(entry[0], "shows__group--mobile"));
      showDiv.appendChild(createShowValueElement(entry[1]));
      showsList.appendChild(showDiv);
    });

    const buttonElement = document.createElement("button");
    buttonElement.className = "shows__button";
    buttonElement.innerText = "BUY TICKETS";
    buttonElement.onclick = function () {
      console.log("Button " + index + " has been Clicked!");
    }
    const lineElement = document.createElement("hr");
    lineElement.className = "line";

    showDiv.appendChild(buttonElement);
    showsList.appendChild(lineElement);
  }
}

window.addEventListener("load", onLoad);