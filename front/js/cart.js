// **************************************************
// **********     Page Panier           
// **************************************************

// --------------------------------------------------
// Fonction principale
// --------------------------------------------------

const monPanier = fGetPanier();
console.log(monPanier);

(function () {
    monPanier.forEach((dataPanier) => fDisplayPanier(dataPanier))

})()

function fGetPanier() {
    const dataPanier = localStorage.getItem("cart");
    if (dataPanier == null) {
        return [];
    } else {
        return JSON.parse(dataPanier);
    }
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
    supprimer.textContent = "Supprimer";
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
// Fonction Changement de Quantite
// --------------------------------------------------
function updateQuantityAndPrice(dataPanier) {
    const panier = document.querySelector(".cart__item");

    panier.forEach((panier) => {
        panier.addEventListener("change", (eq) => {
            for (article of dataPanier)
                if(article._id === panier.dataset.id && cart.dataset.couleur === article.couleur) {
                    article.qu
                }
        })
    })


    fDisplayTotalQuantity();
    fDisplayTotalPrice();
}

function fSavePanier(dataPanier) {
    localStorage.setItem("cart", JSON.stringify(dataPanier));
}


// --------------------------------------------------
// Formulaire de commande
// --------------------------------------------------

// Declaration Variables
let firstNameCheck = false;
let lastNameCheck = false;
let addressCheck = false;
let cityCheck = false;
let emailCheck = false;
let addressRegExp = new RegExp("^[0-9]{1,5}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let emailRegExp = new RegExp("^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$");
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

// --------------------------------------------------
// Fonction de verification de saisie
// --------------------------------------------------
function inputCheck(input, regExp, errorMsg, msg) {
    if (regExp.test(input.value)) {
        errorMsg.innerHTML = "";
    }
    else {
        errorMsg.innerHTML = "Veuillez saisir " + msg;
    }
}

// --------------------------------------------------
// Verification des champs du formulaire
// --------------------------------------------------
firstName.addEventListener("change", () => {
    inputCheck(firstName, charRegExp, firstNameErrorMsg, "un prénom");
    if (firstNameErrorMsg.innerHTML != '') {
        firstNameCheck = false;
    } else {
        firstNameCheck = true;
    }
})
lastName.addEventListener("change", () => {
    inputCheck(lastName, charRegExp, lastNameErrorMsg, "un nom");
    if (lastNameErrorMsg.innerHTML != '') {
        lastNameCheck = false;
    } else {
        lastNameCheck = true;
    }
})
address.addEventListener("change", () => {
    inputCheck(address, addressRegExp, addressErrorMsg, "une adresse (Exemple : 10 quai de la charente)");
    if (addressErrorMsg.innerHTML != '') {
        addressCheck = false;
    } else {
        addressCheck = true;
    }
})
city.addEventListener("change", () => {
    inputCheck(city, charRegExp, cityErrorMsg, "une ville (Exemple : Paris)");
    if (cityErrorMsg.innerHTML != '') {
        cityCheck = false;
    } else {
        cityCheck = true;
    }
})
email.addEventListener("change", () => {
    inputCheck(email, emailRegExp, emailErrorMsg, "un e-mail (Exemple : kanap@gmail.com)");
    if (emailErrorMsg.innerHTML != '') {
        emailCheck = false;
    } else {
        emailCheck = true;
    }
})

// --------------------------------------------------
// Bouton de validation de commande
// --------------------------------------------------
order.addEventListener("click", (event) => {
    if (firstNameCheck == true && lastNameCheck == true && addressCheck == true && cityCheck == true && emailCheck == true && panier.length != 0) {
        let produitIDArray = [];
        for (let i = 0; i < dataPanier.length; i++) {
            produitIDArray.push(dataPanier[i].id);
        }

        let panierClient = {
            contact: {
                "firstName": firstName.value,
                "lastName": lastName.value,
                "address": address.value,
                "city": city.value,
                "email": email.value,
            },
            "products": produitIDArray,
        };

        fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(panierClient)
        })

            .then((res) => res.json())
            .then((data) => {
                document.location.href = `confirmation.html?orderId=${data.orderId}`;
            })
            .catch(err => {
                console.log("Erreur de traitement de la commande")
            })
    }
})