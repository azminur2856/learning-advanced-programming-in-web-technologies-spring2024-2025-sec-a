console.log("Start");

const promies = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Success");
  } else {
    reject("Failure");
  }
});

promies
  .then((message) => console.log(message))
  .catch((error) => console.log(error));
console.log("End");
