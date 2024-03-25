import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

const loginFormElement = document.getElementById("login-form");

const loginUser = async function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch {
        alert("Incorrect email or password!");
    }
};

onAuthStateChanged(auth, function (user) {
    if (user) {
        window.location.href = "../pages/home.html";
    }
});

loginFormElement.addEventListener("submit", loginUser);
