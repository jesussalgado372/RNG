let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let codeStackEmail = document.getElementById("codeStackEmail");
let personalEmail = document.getElementById("personalEmail");
let summonBtn = document.getElementById("summonBtn");

// Select all previous student cards
const previousCards = document.querySelectorAll(".previous-card");

// Array to store the last 5 generated students
let previousStudents = [];

function getData() {
  return fetch("../data/data.json")
    .then((res) => res.json())
    .then((data) => data.students);
}

function randomizeData(students) {
  let randomIndex = Math.floor(Math.random() * students.length);
  return students[randomIndex];
}

function updatePreviousCards() {
  previousCards.forEach((card, index) => {
    let student = previousStudents[index];

    if (student) {
      card.querySelector(".prev-firstName").innerText = student.firstName;
      card.querySelector(".prev-lastName").innerText = student.lastName;
      card.querySelector(".prev-codeStackEmail").innerText = student.codeStackEmail;
      card.querySelector(".prev-personalEmail").innerText = student.personalEmail;
    }
  });
}

summonBtn.addEventListener("click", () => {
  getData().then((students) => {
    let randomStudent = randomizeData(students);

    // Add new random student to history
    previousStudents.unshift(randomStudent);

    // Keep only the last 5 students
    if (previousStudents.length > 5) {
      previousStudents.pop();
    }

    // Update previous cards
    updatePreviousCards();

    // Update main card
    firstName.innerText = randomStudent.firstName;
    lastName.innerText = randomStudent.lastName;
    codeStackEmail.innerText = randomStudent.codeStackEmail;
    personalEmail.innerText = randomStudent.personalEmail;
  });
});
