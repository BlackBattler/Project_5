// **************************************************
// **********     Page Produit           
// **************************************************

// --------------------------------------------------
// Fonction principale
// --------------------------------------------------
let itemName, itemPrice, itemImgUrl, itemAltText;

(async function () {
    const articleID = fGetArticleID();
    await fGetArticle(articleID);
})()

// --------------------------------------------------
// Requete API
// --------------------------------------------------

function fGetArticleID() {
    return new URL(window.location.href).searchParams.get("id");
}

function fGetArticle(articleID) {
    return fetch(`http://localhost:3000/api/products/${articleID}`)
        .then(function (httpBodyResponse) {
            return httpBodyResponse.json();
        })

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

            itemName = value.name;
            itemPrice = value.price;
            itemImgUrl = value.imageUrl;
            itemAltText = value.altTxt;
        })

        .catch(function (error) {
            alert(error);
        })
}

// --------------------------------------------------
// Fonction panier
// --------------------------------------------------

function fSavePanier(dataPanier) {
    localStorage.setItem("cart", JSON.stringify(dataPanier));
}

function fGetPanier() {
    let dataPanier = localStorage.getItem("cart");
    if (dataPanier == null) {
        return [];
    } else {
        return JSON.parse(dataPanier);
    }
}

const button = document.querySelector("#addToCart");
button.addEventListener("click", () => {
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    const produitID = new URL(window.location.href).searchParams.get("id");
    if (color != "" && quantity >= 1 && quantity <= 100) {
        let dataProduit = {
            name: itemName,
            color: color,
            quantity: Number(quantity),
            id: produitID,
            price: itemPrice,
            imageUrl: itemImgUrl,
            altTxt: itemAltText
        }
        let dataPanier = fGetPanier();

        let duplicateProduit = dataPanier.find(p => (p.id == dataProduit.id) && (p.color == dataProduit.color));
        if (duplicateProduit != undefined) {
            if ((Number(duplicateProduit.quantity) + quantity) <= 100) {
                duplicateProduit.quantity = Number(duplicateProduit.quantity) + Number(quantity);
            } else {
                duplicateProduit.quantity = 100;
                window.alert(`Vous ne pouvez commander qu'une quantite maximum de 100 par produit et par couleur`);
            }
        } else {
            dataPanier.push(dataProduit);
        }
        alert(`Votre commande  de ${quantity} ${title.innerHTML} ${colors.value} est ajoutee au panier`);
        fSavePanier(dataPanier);
        window.location.href = "cart.html";
    } else {
        alert("Veuillez choisir une couleur et une quantité entre 1 et 100.");
    }
})