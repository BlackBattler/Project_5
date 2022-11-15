/* ****************************** */
/*          Page Panier           */
/* ****************************** */

// Variables
let panier = getPanier();

// Requete API
async function getProduit(identifiantProduit) {
    let produitListe = await fetch(`http://localhost:3000/api/products/${identifiantProduit}`);
    return produitListe.json();
}

function getPanier() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {
        return [];
    } else {
        return JSON.parse(panier);
    }
}

function saveBasket(basket) {
    localStorage.setItem("panier", JSON.stringify(basket));
}

function displayPanier(panier) {
    panier = getPanier();
    let affichage = "";
    for (let i = 0; i < panier.length; i++) {
        getProduit(panier[i].id)
            .then (produit => {
                affichage += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                <img src="${produit.imageUrl}" alt="${produit.altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>${produit.name}</h2>
                <p>${panier[i].color}</p>
                <p>${produit.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[i].quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
                </div>
                </div>
                </article>`;
                cart__items.innerHTML = affichage;
            })
    }
}

displayPanier(panier);