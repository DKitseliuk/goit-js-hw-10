// Підключення бібліотек
import flatpickr from "flatpickr";
import iziToast from "izitoast";
// Додатковий імпорт стилів бібліотек
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.querySelector("#datetime-picker");
const timerStartBtn = document.querySelector("[data-start]");

const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,  
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      timerStartBtn.setAttribute("disabled", "");
      iziToast.error({
        position: "topRight",
        color: "#ffffff",
        message: "Please choose a date in the future",        
        messageColor: "#ffffff",
        messageSize: "16",
        messageLineHeight: '150%',
        backgroundColor: "#ef4040",
        progressBarColor: "#b51b1b",
        icon: "bi bi-x-octagon",
        iconColor: "#fafafb",
      });
      return;
    }    

    timerStartBtn.removeAttribute("disabled");
    userSelectedDate = selectedDates[0];
  },
};

const fp = flatpickr(dateInput, options);

timerStartBtn.setAttribute("disabled", "");
timerStartBtn.addEventListener("click", startTimer);


function startTimer() { 
  
  const intervalId = setInterval(() => {
    const leftMiliseconds = userSelectedDate - Date.now();

    if (leftMiliseconds > 0) {

      dateInput.setAttribute("disabled", "");
      timerStartBtn.setAttribute("disabled", "");
      
      const leftTimeObj = convertMs(leftMiliseconds);
      
      dataDays.textContent = addLeadingZero(leftTimeObj.days);
      dataHours.textContent = addLeadingZero(leftTimeObj.hours);
      dataMinutes.textContent = addLeadingZero(leftTimeObj.minutes);
      dataSeconds.textContent = addLeadingZero(leftTimeObj.seconds);     
      
    } else {

      dateInput.removeAttribute("disabled");      
      clearInterval(intervalId);

    }
  },
    1000);  
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}
