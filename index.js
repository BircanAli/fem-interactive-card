const form = document.querySelector("#form");
const thankPage = document.querySelector(".thank-container");
const continueBtn = document.querySelector("#continue-btn");
const formBtn = document.querySelector(".btn");
const allInputFields = document.querySelectorAll("input");

let cardNumberOutput = document.querySelector("#cardNumberOutput");
let cardNameOutput = document.querySelector("#cardName");
let cardExpDate = document.querySelector("#cardDate");
let cardCvv = document.querySelector("#cardCvv");

let alertName = document.querySelector(".alert-name");
let alertCardNumber = document.querySelector(".alert-card");
let alertExpDate = document.querySelector(".alert-date-mm");
let alertExpYY = document.querySelector(".alert-date-yy");
let alertCVV = document.querySelector(".alert-date-cvv");

function renderOutput(formObject) {
  const { name, cardNumber, month, year, cvv } = formObject;

  name ? (cardNameOutput.textContent = name) : null;
  cardNumber ? (cardNumberOutput.textContent = cardNumber) : null;
  month || year ? (cardExpDate.textContent = `${month} / ${year}`) : null;
  cvv ? (cardCvv.textContent = cvv) : null;
}

function thankYouPage() {
  form.classList.toggle("hidden");
  thankPage.classList.toggle("hidden");
}

function formValidator(formObject, formValues) {
  let isValid = true;
  const { name, cardNumber, month, year, cvv } = formObject;
  const currentYear = new Date().getFullYear().toString().substring(2);

  if (formValues.includes("")) {
    alertName.textContent = "please enter name";
    alertCardNumber.textContent = "please enter card number";
    alertExpDate.textContent = "please enter expire date";
    isValid = false;
  }
  if (!name || Number(name)) {
    alertName.textContent = "please enter name";
    alertName.classList.remove("hidden");
    isValid = false;
  } else {
    alertName.classList.add("hidden");
  }

  if (cardNumber.length != 16) {
    alertCardNumber.textContent = "please enter valid card number";
    alertCardNumber.classList.remove("hidden");
    isValid = false;
  } else {
    alertCardNumber.classList.add("hidden");
  }

  if (month > 12 || month <= 0) {
    alertExpDate.textContent = "please enter valid month";
    alertExpDate.classList.remove("hidden");
    isValid = false;
  } else {
    alertExpDate.classList.add("hidden");
  }

  if (year > currentYear || year < currentYear - 5) {
    alertExpYY.textContent = "please enter valid year";
    alertExpYY.classList.remove("hidden");
    isValid = false;
  } else {
    alertExpYY.classList.add("hidden");
  }
  if (!cvv || cvv.length > 3) {
    alertCVV.textContent = "please enter valid cvv";
    alertCVV.classList.remove("hidden");
    isValid = false;
  } else {
    alertCVV.classList.add("hidden");
  }

  if (isValid) {
    renderOutput(formObject);
    thankYouPage();
  }
  return isValid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const formValues = [...formData.values()];
  const formObject = Object.fromEntries(formData);

  localStorage.setItem("form-data", { formObject });

  const result = formValidator(formObject, formValues);
  if (result) {
    event.currentTarget.reset();
  }
});

form.addEventListener("change", (event) => {
  let inputTarget = event.target.nextElementSibling;
  inputTarget.classList.add("hidden");
});

continueBtn.addEventListener("click", (e) => {
  form.classList.toggle("hidden");
  thankPage.classList.toggle("hidden");
});
