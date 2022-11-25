/* ****************************** */
/*          Page Panier           */
/* ****************************** */

// Variables
let panier = getPanier();

// -----------------------------------------------------------------
// Requete API
// -----------------------------------------------------------------
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

function fSavePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}

// -----------------------------------------------------------------
// Affichage des produits du panier
// -----------------------------------------------------------------
function fDisplayPanier(panier) {
    panier = getPanier();
    let affichage = "";
    for (let i = 0; i < panier.length; i++) {
        getProduit(panier[i].id)
            .then(produit => {
                affichage += `<article class="cart__item" data-id="${panier[i].id}" data-color="${panier[i].color}">
                <div class="cart__item__img">
                <img src="${produit.imageUrl}" alt="${produit.altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>${produit.name}</h2>
                <p>${panier[i].color}</p>
                <p>${produit.price * panier[i].quantity} €</p>
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

                // -----------------------------------------------------------------
                // Fonction de modification du panier
                // -----------------------------------------------------------------
                let modificationArticle = document.getElementsByClassName("itemQuantity");

                for (i = 0; i < modificationArticle.length; i++) {
                    modificationArticle[i].addEventListener("change", function changeQuantite() {

                        let produitID = this.closest("article").dataset.id;
                        let produitCouleur = this.closest("article").dataset.color;
                        let trouveIndex = panier.findIndex(p => (p.id == produitID) && (p.color == produitCouleur));

                        if ((panier[trouveIndex].quantity != this.value) && (this.value >= 1 && this.value < 100)) {
                            panier[trouveIndex].quantity = this.value;

                        } else {
                            this.value = 100;
                            panier[trouveIndex].quantity = 100;
                            window.alert(`Vous ne pouvez commander qu'une quantite maximum de 100 par produit et couleur`)
                        }

                        fSavePanier(panier);
                        fTotalArticle(panier);
                        fTotalPrix(panier);
                    });
                }

                // -----------------------------------------------------------------
                // Fonction de suppression d'un article
                // -----------------------------------------------------------------
                let suppressionArticle = document.getElementsByClassName("deleteItem");

                for (i = 0; i < suppressionArticle.length; i++) {
                    suppressionArticle[i].addEventListener("click", function supprimeProduit() {

                        let produitID = this.closest("article").dataset.id;
                        let produitCouleur = this.closest("article").dataset.color;
                        let trouveIndex = panier.findIndex(p => (p.id == produitID) && (p.color == produitCouleur));

                        panier.splice(trouveIndex, 1);
                        fSavePanier(panier);
                        fDisplayPanier(panier);
                    })
                }
            })
    }
    fTotalArticle(panier)
    fTotalPrix(panier)
}

// -----------------------------------------------------------------
// Fonction calcul du total d'article
// -----------------------------------------------------------------
function fTotalArticle(panier) {
    let totalArticle = 0;
    for (i = 0; i < panier.length; i++) {
        totalArticle += Number(panier[i].quantity);
    }
    document.querySelector("#totalQuantity").innerHTML = totalArticle;
}


// -----------------------------------------------------------------
// Fonction calcul du prix total
// -----------------------------------------------------------------
function fTotalPrix(panier) {
    let totalPrix = 0;
    for (i = 0; i < panier.length; i++) {
        let quantity = panier[i].quantity;
        getProduit(panier[i].id)
        .then(produit => {
            totalPrix += Number(produit.price) * Number(quantity);
            document.querySelector("#totalPrice").innerHTML = totalPrix;
        })

    }
}

fDisplayPanier(panier);