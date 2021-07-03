const showsSection = document.querySelector(".shows__section");

const shows = [
  {
    dates: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA"
  },
  {
    dates: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA"
  },
  {
    dates: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA"
  },
  {
    dates: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA"
  },
  {
    dates: "Fri nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA"
  },
  {
    dates: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA"
  }
];

function onLoad(event) {

  if (screen.width < 768) {
    shows.forEach((data, index) => {

      const showDiv = document.createElement("div");
      Object.entries(data).forEach(entry => {
        const [title, value] = entry;

        const titleElement = document.createElement("label");
        titleElement.className = "shows__titles";
        titleElement.innerText = title;

        const valueElement = document.createElement("p");
        valueElement.className = "shows__value";
        valueElement.innerText = value;

        showDiv.appendChild(titleElement);
        showDiv.appendChild(valueElement);
      });

      const buttonElement = document.createElement("button");
      buttonElement.className = "shows__button";
      buttonElement.innerText = "BUY TICKETS";
      buttonElement.onclick = function () {
        console.log("Button" + index + "Clicked!");
      }
      const lineElement = document.createElement("hr");
      lineElement.className = "line";

      showDiv.appendChild(buttonElement);
      showDiv.appendChild(lineElement);
      showsSection.appendChild(showDiv);
    })
  } else {
    const showsList = document.querySelector(".shows__list");
    const titlesDiv = document.createElement("div");

    Object.keys(shows[0]).forEach(title => {
      const titleElement = document.createElement("label");
      titleElement.className = "shows__titles";
      titleElement.innerText = title;
      titlesDiv.className = "shows__group shows__group--1";
      titlesDiv.appendChild(titleElement);
    });
    showsList.appendChild(titlesDiv);

    shows.forEach((data, index) => {
      const showDiv = document.createElement("div");

      Object.entries(data).forEach(entry => {
        const valueElement = document.createElement("p");
        valueElement.className = "shows__value";
        valueElement.innerText = entry[1];

        showDiv.appendChild(valueElement);
        showDiv.className = "shows__group";
        showsList.appendChild(showDiv);
      });

      const buttonElement = document.createElement("button");
      buttonElement.className = "shows__button";
      buttonElement.innerText = "BUY TICKETS";
      buttonElement.onclick = function () {
        console.log("Button" + index + "Clicked!");
      }
      const lineElement = document.createElement("hr");
      lineElement.className = "line";

      showDiv.appendChild(buttonElement);
      showsList.appendChild(lineElement);
    });
  }
}

window.addEventListener("load", onLoad);