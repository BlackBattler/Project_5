// Declaration des variables
const apiUrl = "http://localhost:3000/api/products";
let affichage = "";

// Recuperation des donnees de l'API
fetch(apiUrl)

    .then((response) => response.json())

    // 
    .then((data) => {
        console.table(data);

        // Affichage des produits
        for (let produit of data) {
            affichage += `<a href="./product.html?id=${produit._id}">
            <article>
            <img src="${produit.imageUrl}" alt="${produit.altTxt}">
            <h3 class="productName">${produit.name}</h3>
            <p class="productDescription">${produit.description}</p>
            </article>
            </a>`
        }
        items.innerHTML = affichage;
    })

    // Affichage erreur
    .catch((error) => {
        console.error("Error", error);
    })

