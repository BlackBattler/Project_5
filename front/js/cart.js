// **************************************************
// **********     Page Panier           
// **************************************************

// --------------------------------------------------
// Fonction principale
// --------------------------------------------------

let monPanier = fGetPanier();

monPanier.forEach((dataPanier) => fDisplayPanier(dataPanier));

function fGetPanier() {
    const dataPanier = localStorage.getItem("cart");
    if (dataPanier == null) {
        return [];
    } else {
        return JSON.parse(dataPanier);
    }
}

function fSavePanier(dataPanier) {
    localStorage.setItem("cart", JSON.stringify(dataPanier));
}

// --------------------------------------------------
// Affichage des produits du panier
// --------------------------------------------------

function fDisplayPanier(dataPanier) {
    const article = fMakeArticle(dataPanier);
    const imageDiv = fMakeImageDiv(dataPanier);
    article.appendChild(imageDiv);
    const itemContentDiv = fMakeItemContent(dataPanier);
    article.appendChild(itemContentDiv);
    fDisplayArticle(article);
    fDisplayTotalQuantity();
    fDisplayTotalPrice();

}

// --------------------------------------------------
// Utilisation de createElement
// --------------------------------------------------
function fMakeArticle(dataPanier) {
    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id = dataPanier.id;
    article.dataset.color = dataPanier.color;

    return article
}

function fDisplayArticle(article) {
    document.querySelector("#cart__items").appendChild(article);
}

function fMakeImageDiv(dataPanier) {
    const div = document.createElement("div");
    div.classList.add("cart__item__img")

    const image = document.createElement("img");
    image.src = dataPanier.imageUrl;
    image.alt = dataPanier.altTxt;
    div.appendChild(image);

    return div
}

function fMakeItemContent(dataPanier) {
    const divItemContent = document.createElement("div");
    divItemContent.classList.add("cart__item__content");

    const divDescription = fMakeContentDescription(dataPanier);
    divItemContent.appendChild(divDescription);

    const divSetting = fMakeContentSetting(dataPanier);
    divItemContent.appendChild(divSetting);

    return divItemContent
}

function fMakeContentDescription(dataPanier) {
    const divDescription = document.createElement("div");
    divDescription.classList.add("cart__item__content__description");

    const name = document.createElement("h2");
    name.textContent = dataPanier.name;
    divDescription.appendChild(name);

    const color = document.createElement("p");
    color.textContent = dataPanier.color;
    divDescription.appendChild(color);

    const price = document.createElement("p");
    price.textContent = dataPanier.price * dataPanier.quantity + " €";
    divDescription.appendChild(price);

    return divDescription
}

function fMakeContentSetting(dataPanier) {
    const settings = document.createElement("div");
    settings.classList.add("cart__item__content__settings");

    fSettingQuantity(settings, dataPanier);
    fSettingDelete(settings, dataPanier);

    return settings
}

function fSettingQuantity(settings, dataPanier) {
    const divQuantity = document.createElement("div");
    divQuantity.classList.add("cart__item__content__settings__quantity");

    const quantity = document.createElement("p");
    quantity.textContent = "Qté : ";
    divQuantity.appendChild(quantity);

    const input = document.createElement("input");
    input.type = "number";
    input.classList.add("itemQuantity");
    input.name = "itemQuantity";
    input.min = "1";
    input.max = "100";
    input.value = dataPanier.quantity;

    divQuantity.appendChild(input);
    settings.appendChild(divQuantity);
}

function fSettingDelete(settings, dataPanier) {
    const divDelete = document.createElement("div");
    divDelete.classList.add("cart__item__content__settings__delete");

    const supprimer = document.createElement("p");
    supprimer.classList.add("deleteItem");
    supprimer.textContent = "Supprimer";
    supprimer.addEventListener("click", () => fDeleteItem(dataPanier.id, dataPanier.color));

    divDelete.appendChild(supprimer);
    settings.appendChild(divDelete);
}

// --------------------------------------------------
// Calcul du quantite article et le prix total
// --------------------------------------------------
function fDisplayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity");
    const total = monPanier.reduce((total, dataPanier) => total + dataPanier.quantity, 0);
    totalQuantity.textContent = total;
}

function fDisplayTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice");
    const total = monPanier.reduce((total, dataPanier) => total + dataPanier.price * dataPanier.quantity, 0)
    totalPrice.textContent = total;
}


// --------------------------------------------------
// Fonction Changement de quantite
// --------------------------------------------------

// --------------------------------------------------
// Fonction de suppression d'article
// --------------------------------------------------

function fDeleteItem(itemID, itemColor, dataPanier) {
    console.log("delete");
    let numTrouve;

    
    for (let i = 0; i < monPanier.lenght; i++) {
        if (monPanier[i].id == itemID && monPanier[i].color == itemColor) {
            numTrouve = i;
            break;
        }
    }
    monPanier.splice(numTrouve, 1);
    fSavePanier(monPanier);
}
