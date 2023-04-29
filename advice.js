let getAdvice = document.getElementById("advice-button");
let info = document.querySelector(".info");

let showAdvice = () => {
    fetch('https://api.adviceslip.com/advice')
    .then(response => response.json())
    .then(data => info.innerHTML = `<h3 id="advice">${data.slip.advice}</h3>`)
    .catch(err => info.innerHTML = `<h3 id="advice">Sorry, server is not responding!</h3><p id="advice">${err}</p>`);
}

showAdvice();

getAdvice.addEventListener("click", event => {
    event.preventDefault();
    showAdvice();
});
