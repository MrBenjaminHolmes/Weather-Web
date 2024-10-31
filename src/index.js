import "./styles.css";

window.addEventListener("load", function () {
  document.body.style.opacity = "1";
  document.body.style.backgroundColor = "transparent";
});

const input = document.getElementById("location");

async function getData(location) {
  const cardContainer = document.getElementById("carousel");
  cardContainer.innerHTML = "";

  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=BQDWT4GT3GAZY8Z364V8BU4JH`,
    { mode: "cors" }
  );

  const data = await response.json();
  displayCards(data.days[0].hours);
  displayCurrent(data);
  initCarousel();
}

function displayCurrent(data) {
  const mainContainer = document.getElementById("info");

  mainContainer.innerHTML = "";
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("main");
  mainDiv.innerHTML = `
      <h1 class="location">${data.resolvedAddress}</h1>
        <h2 class="description">${data.currentConditions.conditions}</h2>
        <h1 class="mainTemp">${Math.round(
          (data.currentConditions.temp - 32) * (5 / 9)
        )}°C</h1>
        <div class="feelslike">Feels Like:${Math.round(
          (data.currentConditions.feelslike - 32) * (5 / 9)
        )}°C</div>
        <div class="wind">Wind Speed:${
          data.currentConditions.windspeed
        }mph</div>
        <div class="humidity">Humidity:${data.currentConditions.humidity}%</div>
        <div class="cloudcover">Cloud Cover: ${
          data.currentConditions.cloudcover
        }%</div>
        <div class="uvindex">UV Index: ${data.currentConditions.uvindex}</div>
    `;
  mainContainer.appendChild(mainDiv);
}
function displayCards(data) {
  const cardContainer = document.getElementById("carousel");

  cardContainer.innerHTML = "";
  data.forEach((hour) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
      <h2 class = "toobig">${hour.datetime}</h2>
      <h1  class = "toobig">${Math.round((hour.temp - 32) * (5 / 9))}°C</h1>
      <div>
        <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
          <path d="M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Z"/>
        </svg>
        <p>Wind Speed: ${hour.windspeed} mph</p>
      </div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class = "toobig" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M720-200q-17 0-28.5-11.5T680-240q0-17 11.5-28.5T720-280q17 0 28.5 11.5T760-240q0 17-11.5 28.5T720-200ZM280-80q-17 0-28.5-11.5T240-120q0-17 11.5-28.5T280-160q17 0 28.5 11.5T320-120q0 17-11.5 28.5T280-80Zm-40-120q-17 0-28.5-11.5T200-240q0-17 11.5-28.5T240-280h360q17 0 28.5 11.5T640-240q0 17-11.5 28.5T600-200H240ZM400-80q-17 0-28.5-11.5T360-120q0-17 11.5-28.5T400-160h280q17 0 28.5 11.5T720-120q0 17-11.5 28.5T680-80H400ZM300-320q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z"/></svg>
        <p>Cloud Cover: ${hour.cloudcover}%</p>
      </div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
          <path d="M480-100q-133 0-226.5-92T160-416q0-63 24.5-120.5T254-638l226-222 226 222q45 44 69.5 101.5T800-416q0 132-93.5 224T480-100Z"/>
        </svg>
        <p>Humidity: ${hour.humidity}%</p>
      </div>
    `;
    cardContainer.appendChild(cardDiv);
  });
}

function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const wrapper = document.querySelector(".wrapper");

  const firstCard = carousel.querySelector(".card");
  if (!firstCard) return; // Exit if no cards are available
  const firstCardWidth = firstCard.offsetWidth;

  let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);

  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft +=
        btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
  });
}

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getData(input.value);
  }
});
getData("London");
