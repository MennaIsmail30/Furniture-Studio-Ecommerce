import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA2UOuu1tbleT219JFTbSdSpG7HvAaQca4",
    authDomain: "furniture-studio-iti.firebaseapp.com",
    databaseURL: "https://furniture-studio-iti-default-rtdb.firebaseio.com",
    projectId: "furniture-studio-iti",
    storageBucket: "furniture-studio-iti.appspot.com",
    messagingSenderId: "974042282926",
    appId: "1:974042282926:web:8384bb3ef625e5e698a63f",
    measurementId: "G-3YHWMFXH7R",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const logoutButtonElement = document.querySelector("#logout-button");

const logoutUser = async function () {
    await signOut(auth);
    window.location.href = "../index.html";
};

logoutButtonElement.addEventListener("click", logoutUser);

const tableBody = document.querySelector("tbody");

const showCart = function () {
    if (localStorage.getItem("cart")) {
        let cartArray = JSON.parse(localStorage.getItem("cart"));

        tableBody.innerHTML = "";

        for (const [index, product] of cartArray.entries()) {
            tableBody.innerHTML += `
                <tr>
                    <td>${product.name}</td>
                    <td><img src="../assets/images/${product.image}" alt=""></td>
                    <td>${product.price} $</td>
                    <td><button class="admin-btn" onclick="removeProduct(${index})">Remove</button></td>
                </tr>
            `;
        }
    }
};

const removeProduct = function (index) {
    let cartArray = JSON.parse(localStorage.getItem("cart"));

    cartArray.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cartArray));

    showCart();
};
window.removeProduct = removeProduct;

document.addEventListener("DOMContentLoaded", function () {
    showCart();
});

const placeOrder = async function () {
    if (localStorage.getItem("cart")) {
        let cartArray = JSON.parse(localStorage.getItem("cart"));
        let order = [];

        cartArray.forEach((product) => {
            let productName = product.name;
            let productPrice = product.price;
            order.push({ name: productName, price: productPrice });
        });

        const orderObject = { order };

        let result = await addDoc(collection(firestore, "Orders"), orderObject);
        localStorage.removeItem("cart");
        showCart();
        window.location.reload();
    }
};
window.placeOrder = placeOrder;
