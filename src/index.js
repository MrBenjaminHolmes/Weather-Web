import "./styles.css";
const input = document.getElementById("location");
function getData(location) {
  console.log("Fetching Data...");
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=BQDWT4GT3GAZY8Z364V8BU4JH`, // Use actual key
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.days);
    });
}

// Call the function

input.addEventListener("keydown", function (event) {
  // Check if the Enter key was pressed
  if (event.key === "Enter") {
    // Call getData with the input value
    getData(input.value);
  }
});
