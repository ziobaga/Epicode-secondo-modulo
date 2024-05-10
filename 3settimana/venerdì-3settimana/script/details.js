//GET _id

const addressBarContent = new URLSearchParams(location.search); //isoliamo i parametri nell'URL
console.log(addressBarContent);
const id = addressBarContent.get("id");
console.log(addressBarContent.get("id"));

getEventData = function () {
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
        throw new Error("Errore nella risposta del server");
      }
    })
    .then((event) => {
      console.log("DETTAGLI RECUPERATI", event);
      //manipolo il dom per aggiungere la card

      document.getElementById("imgUrl").src = event.imageUrl;
      document.getElementById("name").innerText = event.name;
      document.getElementById("brand").innerText = event.brand;
      document.getElementById("description").innerText = event.description;
      document.getElementById("price").innerText = event.price + " €";
    })
    .catch((err) => {
      console.error("ERRORE", err);
    });
};

getEventData();

//funzione elimina

const deleteEvent = function () {
  // Visualizza il modale di conferma
  const confermaEliminazione = window.confirm(
    "Sei sicuro di voler eliminare il prodotto?"
  );

  // Se l'utente ha confermato, procedi con l'eliminazione
  if (confermaEliminazione) {
    fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGQwOTgxODQ0MjAwMTUzNzU4YTQiLCJpYXQiOjE3MTUzMzAzMTQsImV4cCI6MTcxNjUzOTkxNH0.Gv9_tPgDZY60W-lN9LtnOdrzOczZ7LV8CzM5uMkZ1G8", //API protetta (inserire token)
      },
    })
      .then((response) => {
        if (response.ok) {
          // Se la risposta è ok, mostra un messaggio di conferma e reindirizza
          alert("PRODOTTO ELIMINATO");
          location.assign("index.html");
        } else {
          // Se la risposta non è ok, mostra un messaggio di errore
          alert("ERRORE - PRODOTTO NON ELIMINATO");
        }
      })
      .catch((err) => {
        console.error("ERRORE", err);
        alert("ERRORE - PRODOTTO NON ELIMINATO");
      });
  } else {
    // Se l'utente ha annullato, non fare nulla
    alert("Eliminazione annullata");
  }
};

//funzione modifica

const editButton = document.getElementById("edit-button");
editButton.addEventListener("click", function () {
  location.assign(`backoffice.html?id=${id}`);
});
