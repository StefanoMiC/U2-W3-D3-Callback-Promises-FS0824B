const fetchCaracter = () => {
  // fetch("https://api.disneyapi.dev/character", {method: "GET"})
  // il metodo GET è il default, non serve

  // avviare una fetch equivale ad avviare una richiesta HTTP ad un server collegato all'indirizzo URL fornito
  // la richiesta HTTP richiede del tempo per svolgersi e determinare un valore o un eventuale errore
  // per questo la fetch racchiude una Promise per gestire queste due eventualità
  fetch("https://api.disneyapi.dev/character")
    //   la Promise a questo punto è avviata, e se finirà positivamente si attiverà il primo .then()
    // nel quale troveremo l'oggetto Response come parametro della callback
    .then(responseObj => {
      // l'oggetto response lo possiamo valutare nella sua proprietà ok che ci farà capire se l'esito è stato positivo
      // (e possiamo aspettarci di aver ottenuto i dati che volevamo)
      // oppure negativo e di conseguenza non servirebbe convertire i dati perché in ogni caso non ci sarebbe nulla di utile da convertire.
      console.log(responseObj);

      if (responseObj.ok) {
        // qui dentro ci entriamo solo in caso di risultato positivo della fetch
        // utilizziamo il metodo già disponibile sull'oggetto Response che è il .json()
        //.json() converte il responseObj.body da ReadableStream a elemento JS che potremo utilizzare normalmente
        return responseObj.json(); // dobbiamo necessariamente ritornare l'operazione (che è una Promise)
        // altrimenti il prossimo .then() non riceverà mai il valore e avremo undefined nel parametro
      }
    })
    .then(disneyObj => {
      // a questo punto avremo il dato che ci serve nel parametro di questa callback che puoi chiamare come vuoi, meglio se con un nome coerente con il dato ricevuto
      // (guarda dal network tab cosa ricevi per saperlo!)
      const row = document.getElementById("card-container");
      // se lavoriamo qui dentro saremo sincronizzati esattamente con l'arrivo del dato
      // da questo momento in poi posso trattare il mio dato come abbiamo sempre fatto

      console.log(disneyObj);
      // semplice ciclo sulla proprietà contenente un array di oggetti che mi crea tanti elementi nella pagina quanti sono gli elementi dell'array
      disneyObj.data.forEach(char => {
        const col = document.createElement("div");
        col.className = "col";
        const img = document.createElement("img");
        img.style.width = "100%";
        img.src = char.imageUrl;

        col.appendChild(img);
        row.appendChild(col);
      });
    })
    .catch(err => console.log(err));
  // avere un catch è fondamentale per catturare eventuali errori che altrimenti potrebbero rompere l'esecuzione del programma se lasciati liberi
};

window.onload = () => {
  fetchCaracter();
};
