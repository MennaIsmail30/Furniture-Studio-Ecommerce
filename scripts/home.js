import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA2UOuu1tbleT219JFTbSdSpG7HvAaQca4",
    authDomain: "furniture-studio-iti.firebaseapp.com",
    projectId: "furniture-studio-iti",
    storageBucket: "furniture-studio-iti.appspot.com",
    messagingSenderId: "974042282926",
    appId: "1:974042282926:web:8384bb3ef625e5e698a63f",
    measurementId: "G-3YHWMFXH7R",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const logoutButtonElement = document.querySelector("#logout-button");

const logoutUser = async function () {
    await signOut(auth);
    window.location.href = "../index.html";
};

logoutButtonElement.addEventListener("click", logoutUser);
