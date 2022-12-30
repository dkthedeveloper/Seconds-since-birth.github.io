let resultElement = document.getElementById("result");
let userNameElement = document.getElementById("user-name");
let weekdayElement = document.getElementById("weekday");
let secondsAliveElement = document.getElementById("seconds-alive");
let datePicker = document.getElementById("date");
let form = document.getElementById("form");
let resetBtn = document.getElementById("reset");
let modalText = document.getElementById('modal-text');
let currentMonth = new Date().getMonth() + 1;
let currentDay = new Date().getUTCDate();
let currentYear = new Date().getFullYear();
let weekday = new Date().toLocaleDateString("default", { weekday: "long" });
let secondsPerYear = 31104000;
let secondsPerMonth = 2592000;
let secondsPerDay = 86400;
let now = new Date();
let userName = "friend";
let modal = document.getElementById("modal");
let backdrop = document.getElementById("backdrop");
let modalCloseBtn = document.getElementById("modal-btn");
let invalidDateMessage = 'Please select past date.';
let noDateMessage = "Please pick a date."


const findSecondsSinceBirth = function (month, year, day) {
  let year1 = secondsPerMonth * (12 - (month - 1)) + secondsPerDay * (30 - day);
  let age = currentYear - year;
  let midYears = secondsPerYear * (age - 1);
  let endYear = secondsPerMonth * (currentMonth - 1);
  let result = year1 + midYears + endYear;
  return result;
};

function modalChange(displayValue, message) {
  modalText.innerHTML = message;
  modal.style.display = displayValue;
}

document.getElementById("submit").onclick = function (event) {
  event.preventDefault();
  if (datePicker.value) {
    console.log(datePicker.value);
    secondsAliveElement.innerHTML = "";
    let birthMonth = datePicker.value.slice(5, 7);
    let birthYear = datePicker.value.slice(0, 4);
    let birthDate = datePicker.value.slice(8, 10);
    let userResult = findSecondsSinceBirth(birthMonth, birthYear, birthDate);
    let nameInput = document.getElementById("name");
    

    if (userResult < 0) {
      modalChange("flex", invalidDateMessage);
      return;
    } else {

      if (nameInput.value) {
        userName = nameInput.value;
      }
    }

    userNameElement.innerHTML = `${userName}`;
    weekdayElement.innerHTML = `${weekday}`;
    secondsAliveElement.innerHTML = `${userResult}`;
    resultElement.style.display = "block";

    const secondsInt = setInterval(() => {
      userResult += 1;
      secondsAliveElement.innerHTML = `${userResult}`;
    }, 1000);
  } else {
    modalChange("flex", noDateMessage);
    return;
  }

  form.style.display = "none";
  resetBtn.style.display = "block";
  form.name.focus();
};

resetBtn.addEventListener("click", () => window.location.reload());
modalCloseBtn.addEventListener("click", () => modalChange("none"));
