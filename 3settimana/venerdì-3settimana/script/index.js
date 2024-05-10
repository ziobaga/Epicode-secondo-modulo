// Aggiornamento dell'anno nel footer
document.getElementById("year").innerText = new Date().getFullYear();

//modifica
//

// Funzione per generare le cards dei prodotti
function generateProductCards(productArray) {
  const row = document.getElementById("events-row");
  productArray.forEach((product) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col");
    newCol.innerHTML = `<div class="card h-100 d-flex flex-column ">
        <img src="${product.imageUrl}" class="card-img-top w-100 " alt="prodotto">
        <div class="card-body d-flex flex-column justify-content-between ">
          <h5 class="card-title">${product.name}</h5>
          <h6 class="card-title">${product.brand}</h6>
          <p class="card-text my-description">${product.description}</p>
          <p class="card-text">${product.price} €</p>
          <div class="d-flex justify-content-between">
          <a href="./details.html?id=${product._id}" class="btn btn-primary button-scopri">Scopri di più</a>
         
          </div>
        </div>
      </div>`;
    row.appendChild(newCol);
  });
}
// https://663d058f17145c4d8c3880e5.mockapi.io/E-commerce
// https://striveschool-api.herokuapp.com/api/agenda
// Funzione per ottenere i prodotti dalla API
const getProducts = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGQwOTgxODQ0MjAwMTUzNzU4YTQiLCJpYXQiOjE3MTUzMzAzMTQsImV4cCI6MTcxNjUzOTkxNH0.Gv9_tPgDZY60W-lN9LtnOdrzOczZ7LV8CzM5uMkZ1G8",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella risposta del server");
      }
    })
    .then((product) => {
      console.log("Products", product);
      generateProductCards(product);
    })
    .catch((err) => {
      console.error("ERRORE", err);
    });
};

// Chiamata alla funzione per ottenere i prodotti
getProducts();
