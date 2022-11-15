/* ****************************** */
/*          Page Accueil          */
/* ****************************** */

// Requete API
async function getProduit(){
    let produitListe = await fetch ("http://localhost:3000/api/products");
    return produitListe.json();
}

getProduit()
    .then((produitListe) => {
        let affichage = "";
        // Affichage des produits
        for (let produit of produitListe) {
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

