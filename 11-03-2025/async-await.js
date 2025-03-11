console.log("Start");

async function asyncFunction() {
  await new Promise((resolve) => {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    console.log(sum);
  });
}
asyncFunction();
console.log("End");
