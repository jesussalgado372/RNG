let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let codeStackEmail = document.getElementById("codeStackEmail");
let personalEmail = document.getElementById("personalEmail");
let summonBtn = document.getElementById("summonBtn");
let previousCards = document.querySelectorAll(".previous-card");
let lastStudent = null;

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
      card.querySelector(".prev-codeStackEmail").innerText =
        student.codeStackEmail;
      card.querySelector(".prev-personalEmail").innerText =
        student.personalEmail;
    }
  });
}

summonBtn.addEventListener("click", () => {
  getData().then((students) => {
    let randomStudent = randomizeData(students);

    if (lastStudent !== null) {
      previousStudents.unshift(lastStudent);

      if (previousStudents.length > 5) {
        previousStudents.pop();
      }

      updatePreviousCards();
    }

    firstName.innerText = randomStudent.firstName;
    lastName.innerText = randomStudent.lastName;
    codeStackEmail.innerText = randomStudent.codeStackEmail;
    personalEmail.innerText = randomStudent.personalEmail;

    lastStudent = randomStudent;
  });
});
