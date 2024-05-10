//recuperiamo i dati del form nell'evento submit
//e inviare una richiesta al backend per salvare il prodotto
class Product {
  constructor(_name, _imageUrl, _brand, _description, _price) {
    this.name = _name;
    this.imageUrl = _imageUrl;
    this.brand = _brand;
    this.description = _description;
    this.price = _price;
  }
}

//la pagina di backoffice ha un duplice scopo
const addressBarContent = new URLSearchParams(location.search);
const id = addressBarContent.get("id");
console.log("ID?", id);

let productToModify;

const getEventData = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGQwOTgxODQ0MjAwMTUzNzU4YTQiLCJpYXQiOjE3MTUzMzAzMTQsImV4cCI6MTcxNjUzOTkxNH0.Gv9_tPgDZY60W-lN9LtnOdrzOczZ7LV8CzM5uMkZ1G8",
    },
  }) //ci torna un evento, quello con l'id specifico
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dettagli");
      }
    })
    .then((event) => {
      console.log("DETTAGLI RECUPERATI", event);
      //manipolo il dom per riempire i form

      document.getElementById("imageUrl").value = event.imageUrl;
      document.getElementById("name").value = event.name;
      document.getElementById("brand").value = event.brand;
      document.getElementById("description").value = event.description;
      document.getElementById("price").value = event.price;
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

if (id) {
  getEventData();
  document.getElementsByClassName("btn-primary")[0].innerText = "Modifica!";
  document.getElementsByClassName("my-span")[0].innerText = "Modifica Prodotto";
}

const submitEvent = function (e) {
  e.preventDefault();
  //recuperiamo riferimenti agli input del form
  const nameInput = document.getElementById("name"); //campo nome
  const imageUrlInput = document.getElementById("imageUrl"); //campo img
  const brandInput = document.getElementById("brand"); //campo brand
  const descriptionInput = document.getElementById("description"); //campo descrizione text area
  const priceInput = document.getElementById("price"); // campo prezzo

  const productFromForm = new Product(
    nameInput.value,
    imageUrlInput.value,
    brandInput.value,
    descriptionInput.value,
    priceInput.value
  );
  console.log("PRODOTTO DA INVIARE ALLE API", productFromForm);

  //salviamolo permanentemente nel database
  //inviamo una request con post

  //l'indirizzo sul quale opera la POST e lo stesso del GET (parlando sempre di RESTFULL API)
  //submitevent fa cose diverse a seconda del backoffice

  let URL = "https://striveschool-api.herokuapp.com/api/product/";
  let methodToUse = "POST";

  if (id) {
    URL = `https://striveschool-api.herokuapp.com/api/product/${id}`;
    methodToUse = "PUT";
  }

  fetch(URL, {
    method: methodToUse,
    body: JSON.stringify(productFromForm), //in una request il body è SEMPRE una stringa
    headers: {
      "Content-type": "application/json", //ogni volta che facciamo una POST in una API RESTFULL dobbiamo scrivere questa porzione di codice
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGQwOTgxODQ0MjAwMTUzNzU4YTQiLCJpYXQiOjE3MTUzMzAzMTQsImV4cCI6MTcxNjUzOTkxNH0.Gv9_tPgDZY60W-lN9LtnOdrzOczZ7LV8CzM5uMkZ1G8", //API protetta (inserire token)
    },
  })
    .then((response) => {
      if (response.ok) {
        //è stato salvato
        //alert("Il prodotto è stato salvato correttamente");
        alert(`Prodotto ${id ? "modificato" : "creato"}!`);
        location.assign("index.html");
      } else {
        //non è stato salvato
        throw new Error("Errore nel salvataggio della risorsa");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
      alert(err);
    });
};
document.getElementById("event-form").addEventListener("submit", submitEvent);
