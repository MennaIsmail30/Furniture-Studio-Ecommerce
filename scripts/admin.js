import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
    getFirestore,
    addDoc,
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const addFormElement = document.querySelector("#add-form");

const clearInputFields = function () {
    document.querySelector("#id").value = "";
    document.querySelector("#name").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#image").value = "";
    document.querySelector("#price").value = "";
};

const addProduct = async function (event) {
    event.preventDefault();

    let id = document.querySelector("#id").value;
    let name = document.querySelector("#name").value;
    let description = document.querySelector("#description").value;
    let image = document.querySelector("#image").value;
    let price = parseInt(document.querySelector("#price").value);

    let product = {
        name,
        description,
        image,
        price,
    };

    if (id == "") {
        let result = await addDoc(collection(firestore, "Products"), product);

        clearInputFields();
    } else {
        await updateDoc(doc(firestore, "Products", id), product);

        clearInputFields();
    }
};

addFormElement.addEventListener("submit", addProduct);

onSnapshot(collection(firestore, "Products"), function (snapShot) {
    let products = [];
    snapShot.docs.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
    });

    showProducts(products);
});

const showProducts = function (products) {
    const tableBody = document.querySelector("tbody");

    tableBody.innerHTML = "";

    for (const product of products) {
        tableBody.innerHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>${product.image}</td>
                    <td>${product.price}</td>
                    <td><button class="admin-btn" onclick="updateProduct('${product.id}', '${product.name}', '${product.description}', '${product.image}', '${product.price}')">Update</button</td>
                    <td><button class="admin-btn" onclick="deleteProduct('${product.id}')">Delete</button</td>
                </tr>
                `;
    }
};

const deleteProduct = async function (id) {
    let confirmed = confirm("Are you sure you want to delete this product?");
    if (confirmed) {
        await deleteDoc(doc(firestore, "Products", id));
    }
};
window.deleteProduct = deleteProduct;

const updateProduct = function (id, name, description, image, price) {
    document.querySelector("#id").value = id;
    document.querySelector("#name").value = name;
    document.querySelector("#description").value = description;
    document.querySelector("#price").value = price;
};
window.updateProduct = updateProduct;
