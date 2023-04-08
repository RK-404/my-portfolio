let getAdvice = document.getElementById("advice-button");
let h3 = document.querySelector("h3");

let showAdvice = () => {
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => h3.innerText = data.slip.advice)
        .catch(err => console.error(err));
}

showAdvice();

getAdvice.addEventListener("click", event => {
    event.preventDefault();
    showAdvice();
})
