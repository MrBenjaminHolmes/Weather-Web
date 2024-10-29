import "./styles.css";

function getData(location) {
  console.log("Fetching Data...");
  fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/wrexham?key=BQDWT4GT3GAZY8Z364V8BU4JH",
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response.days);
    });
}

getData("Chester");
