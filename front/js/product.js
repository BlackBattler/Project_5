/* ****************************** */
/*          Page Produit          */
/* ****************************** */

// Recuperation de l'ID du produit
let produitID = new URL(window.location.href).searchParams.get("id");

// Requete API
async function getProduit(identifiantProduit) {
    let produit = await fetch(`http://localhost:3000/api/products/${identifiantProduit}`);
    return produit.json();
}

// Affichage du produit
getProduit(produitID)
    .then((value) => {
        document.querySelector(".item__img").innerHTML = `<img src="${value.imageUrl}" alt="${value.altTxt}"></img>`;
        title.innerHTML = value.name;
        price.innerHTML = value.price;
        description.innerHTML = value.description;

        let out = colors.innerHTML;
        for (let produitCouleur of value.colors) {
            out += `<option value="${produitCouleur}"> ${produitCouleur} </option>`;
        }
        colors.innerHTML = out;

    })

    // Affichage erreur
    .catch((error) => {
        console.error("Error", error);
    })


/* ****************************** */
/*        Fonction panier         */
/* ****************************** */

// Fonction de sauvegarde du panier
function fSavePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}

function getPanier() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {
        return [];
    } else {
        return JSON.parse(panier);
    }
}

// Fonctionnement du bouton " Ajouter au panier"
addToCart.addEventListener("click", () => {
    if (quantity.value >= 1 && quantity.value <= 100 && colors.value != "") {
        let produit = { id: `${produitID}`, color: `${colors.value}`, quantity: Number(`${quantity.value}`) }
        let panier = getPanier();

        //
        let duplicateProduit = panier.find(p => (p.id == produit.id) && (p.color == produit.color));
        if (duplicateProduit != undefined) {
            if ((Number(duplicateProduit.quantity) + Number(`${quantity.value}`)) <= 100) {
                duplicateProduit.quantity = Number(duplicateProduit.quantity) + Number(`${quantity.value}`);
            } else {
                duplicateProduit.quantity = 100;
                window.alert(`Vous ne pouvez commander qu'une quantite maximum de 100 par produit et par couleur`)
            }

        } else {
            panier.push(produit);
        }
        window.alert(`Votre commande  de ${quantity.value} ${title.innerHTML} ${colors.value} est ajoutee au panier`)
        fSavePanier(panier);
    } else {
        window.alert(`Veuillez choisir une couleur et une quantité entre 1 et 100 avant de l'ajouter au panier`)
    }
})
