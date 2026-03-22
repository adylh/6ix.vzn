import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

/*
  Replace this with your Firebase config from:
  Firebase Console > Project Settings > Your apps > SDK setup and configuration
*/
const firebaseConfig = {
    apiKey: "AIzaSyCGEXeLj9bYmEfhBPJtTQgPhbA4gNlzoPM",
    authDomain: "church-register-b62ec.firebaseapp.com",
    projectId: "church-register-b62ec",
    storageBucket: "church-register-b62ec.firebasestorage.app",
    messagingSenderId: "977705988414",
    appId: "1:977705988414:web:87fdcb35eeb1240361bc6f",
    measurementId: "G-V5FVZYPNYX"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const registerForm = document.getElementById("registerForm");
const alertBox = document.getElementById("alertBox");
const submitBtn = document.getElementById("submitBtn");
const submitSpinner = document.getElementById("submitSpinner");
const btnText = document.querySelector(".btn-text");

const fullName = document.getElementById("fullName");
const team = document.getElementById("team");
const serviceDay = document.getElementById("serviceDay");
const role = document.getElementById("role");
const notes = document.getElementById("notes");

let isSubmitting = false;

function showAlert(message, type = "success") {
  alertBox.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

  setTimeout(() => {
    const alert = alertBox.querySelector(".alert");
    if (alert) {
      alert.classList.remove("show");
      setTimeout(() => {
        alertBox.innerHTML = "";
      }, 150);
    }
  }, 5000);
}

function setLoadingState(loading) {
  submitBtn.disabled = loading;
  submitSpinner.classList.toggle("d-none", !loading);
  btnText.textContent = loading ? "Submitting..." : "Submit Register";
}

function validateField(field) {
  if (!field.value.trim()) {
    field.classList.add("is-invalid");
    return false;
  }
  field.classList.remove("is-invalid");
  return true;
}

function validateForm() {
  const fields = [fullName, team, serviceDay, role];
  let isValid = true;

  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

[fullName, team, serviceDay, role].forEach((field) => {
  field.addEventListener("change", () => validateField(field));
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (isSubmitting) return;

  const isValid = validateForm();

  if (!isValid) {
    showAlert("Please complete all required fields before submitting.", "danger");
    return;
  }

  isSubmitting = true;
  setLoadingState(true);

  try {
    await addDoc(collection(db, "checkins"), {
      name: fullName.value.trim(),
      team: team.value.trim(),
      serviceDay: serviceDay.value.trim(),
      role: role.value.trim(),
      notes: notes.value.trim(),
      submittedAt: serverTimestamp()
    });

    registerForm.reset();

    [fullName, team, serviceDay, role].forEach((field) => {
      field.classList.remove("is-invalid");
    });

    showAlert("Your register has been submitted successfully.", "success");
  } catch (error) {
    console.error("Error submitting register:", error);
    showAlert("There was a problem submitting your register. Please try again.", "danger");
  } finally {
    isSubmitting = false;
    setLoadingState(false);
  }
});