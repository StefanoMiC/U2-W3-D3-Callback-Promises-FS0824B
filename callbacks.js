const count = function () {
  const randTime = Math.floor(Math.random() * 4000);

  setTimeout(() => {
    console.log("Sono passati " + randTime / 1000 + "s");
  }, randTime);
};

const countAndDone = function () {
  count(); // l'operazione interna a questa funzione è ASINCRONA

  // essendo count un'operazione asincrona, il console.log successivo (che è sincrono)
  // non ha motivo di aspettarlo...
  console.log("Finito");
};

// countAndDone();

// POSSIBILE SOLUZIONE CON CALLBACK

const countWithCallback = function (callback) {
  const randTime = Math.floor(Math.random() * 4000);

  setTimeout(() => {
    console.log("Sono passati " + randTime / 1000 + "s");
    // qui riusciamo ad inserire un codice NON STABILITO A PRIORI, ma SEMPRE DINAMICO, che può variare anche in lunghezza e nelle operazioni da svolgere
    callback(); // handleCount()
  }, randTime);
};

const handleCount = () => {
  alert("This one is over");
};

const countAndDoneAsync = function () {
  // queste operazioni si avviano tutte insieme, ma daranno un risultato in tempi differenti stabiliti dai singoli timeout
  // noi riusciamo a stabilire il cosa verrà fatto una volta avviata la funzione, non riusciremo mai a stabilire QUANDO verrà eseguita
  // (e non ci interessa, ci basta la certezza della sua esecuzione in un qualche lasso di tempo)
  countWithCallback(() => console.log("FINITO"));
  countWithCallback(() => console.log("We are done!"));
  countWithCallback(() => console.log("YAY! Everything is over!"));
  countWithCallback(handleCount);
};

// countAndDoneAsync();

// altro esempio di implementazione di callback che permette di avere un output sempre variabile, data una stessa funzione phoneCall
const answer = time => console.log("📞Pronto? Chi è? " + time / 1000 + "s");
const grannysAnswer = time => console.log("📞Pronto caro, sei tu? Hai mangiato? " + time / 1000 + "s");
const angryAnswer = time => console.log("📞Ma chi diavolo è a quest'ora!?! " + time / 1000 + "s");

const phoneCall = callback => {
  const randTime = Math.floor(Math.random() * 4000);

  setTimeout(() => {
    callback(randTime); // answer(randTime), angryAnswer(randTime), grannysAnswer(randTime), (() => console.log("📞Quanto paga di bolletta?"))(randTime)
  }, randTime);

  console.log("☎️ Il telefono sta squillando...");
};

phoneCall(answer);
phoneCall(angryAnswer);
phoneCall(grannysAnswer);
phoneCall(time => console.log("📞Quanto paga di bolletta? " + time / 1000 + "s"));

const arrOfAnimals = ["cat", "dog", "horse", "rabbit"];

// arr.forEach((animal) => )

const forEach = function (callback) {
  for (let i = 0; i < arrOfAnimals.length; i++) {
    const element = arrOfAnimals[i];

    callback(element);
  }
};

forEach(animal => console.log(animal + "!"));

const map = function (callback) {
  const newArr = [];

  for (let i = 0; i < arrOfAnimals.length; i++) {
    const element = arrOfAnimals[i];

    newArr.push(callback(element));
  }

  return newArr;
};

console.log(map(animal => animal.charAt(0).toUpperCase() + animal.slice(1) + "!"));

const filter = function (callback) {
  const newArr = [];

  for (let i = 0; i < arrOfAnimals.length; i++) {
    const element = arrOfAnimals[i];

    if (callback(element)) {
      newArr.push(element);
    }
  }

  return newArr;
};

console.log(filter(animal => animal.length > 3));
