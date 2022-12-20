// **************************************************
// **********     Page Accueil           
// **************************************************

// --------------------------------------------------
// Fonction principale
// --------------------------------------------------

(async function () {
    const articles = await fGetArticles();
    for (produit of articles) {
        fDisplayProduit(articles);
    }
})()

// --------------------------------------------------
// Requete API du produit
// --------------------------------------------------

function fGetArticles() {
    return fetch(`http://localhost:3000/api/products`)
        .then(function (httpBodyResponse) {
            return httpBodyResponse.json();
        })

        .then(function (articles) {
            return articles;
        })
        
        .catch(function (error) {
            alert(error);
        })
}

// --------------------------------------------------
// Fonction d'affichage du produit
// --------------------------------------------------

function fDisplayProduit() {
    document.getElementById("items").innerHTML += `
    <a href="./product.html?id=${produit._id}">
    <article>
    <img src="${produit.imageUrl}" alt="${produit.altTxt}">
    <h3 class="productName">${produit.name}</h3>
    <p class="productDescription">${produit.description}</p>
    </article>
    </a>`
}