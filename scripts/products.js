// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Code
const logoutButtonElement = document.querySelector("#logout");

const logoutUser = async function () {
    await signOut(auth);
    window.location.href = "./index.html";
};

logoutButtonElement.addEventListener("click", logoutUser);

const productsContainerElement = document.querySelector(".products");

document.addEventListener("DOMContentLoaded", async function () {
    let result = await getDocs(collection(firestore, "Products"));

    let products = [];
    result.docs.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
    });

    productsContainerElement.innerHTML = "";

    let productHTML;
    for (let i = 0; i < products.length; i++) {
        productHTML = `
            <article class="product">
                <img src="../assets/images/${products[i].image.split("fakepath\\")[1]}" class="product-img" />
                <div class="product-info">
                    <h3 class="product-name">${products[i].name}</h3>
                    <p class="product-description">${products[i].description}</p>
                    <div class="product-rating">
                        <i class="star fa-solid fa-star star_done"></i>
                        <i class="star fa-solid fa-star star_done"></i>
                        <i class="star fa-solid fa-star star_done"></i>
                        <i class="star fa-solid fa-star star_done"></i>
                        <i class="star fa-solid fa-star star_done"></i>
                    </div>
                    <p class="product-price">${products[i].price}$</p>
                    <button class="button add-to-cart-button" onclick="addToCart('${products[i].name}', '${
            products[i].image.split("fakepath\\")[1]
        }', ${products[i].price})">Add to Cart</button>
                </div>
            </article>
            `;

        productsContainerElement.innerHTML += productHTML;
    }
});

const addToCart = function (name, image, price) {
    let cartItem = {
        name,
        image,
        price,
    };

    if (!localStorage.getItem("cart")) {
        let cartArray = [];
        cartArray.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cartArray));
    } else {
        let cartArray = JSON.parse(localStorage.getItem("cart"));
        cartArray.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cartArray));
    }
};
window.addToCart = addToCart;
