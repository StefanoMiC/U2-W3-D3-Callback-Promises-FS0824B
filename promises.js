const myPromise = () =>
  new Promise((resolve, reject) => {
    const randTime = Math.floor(Math.random() * 10) + 1;

    setTimeout(() => {
      if (randTime > 5) {
        resolve("YAY!");
      } else {
        reject("OH NOES....");
      }
    }, randTime);
  });

console.log(myPromise());

myPromise()
  .then(successMessage => console.log(successMessage))
  .catch(rejectMessage => console.log(rejectMessage));
