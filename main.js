let body = document.querySelector("body");
let header = document.querySelector("h1");
let searchButton = document.querySelector("button");
let searchInput = document.querySelector("input");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1bada1397bmsh5b88164000c472fp19d221jsn7eccc911c205',
		'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
	}
};

fetch('https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/', options)
	.then(response => response.json())
	.then(response => showPlanet(response))
	.catch(err => console.error(err));

let showPlanet = (planets) => {
    loadOnPage(planets[Math.floor(Math.random() * planets.length)]);

    searchInput.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            searchButton.click();
        }
    });

    searchButton.addEventListener("click", event => {
        event.preventDefault();
        let input = searchInput.value;
        if (input) {
            searchInput.value = "";
            let result = planets.find(planet => planet.name.toUpperCase() === input.toUpperCase());
            if (!result) {
                window.alert("Planet is not found!\nPlease enter a valid planet name of our solar system.");
            }
            else{
                loadOnPage(result);
            }
        }
    });
}

let loadOnPage = (planet) => {
    header.textContent = planet.name.toUpperCase();
    body.style.backgroundImage = `url('${planet.imgSrc.img}')`;

    let description = document.getElementById("description");
    description.innerText = planet.description;

    let volume = document.getElementById("volume");
    volume.innerText = `Volume of ${planet.name}: ${planet.basicDetails.volume}`;

    let mass = document.getElementById("mass");
    mass.innerText = `Mass of ${planet.name}: ${planet.basicDetails.mass}`;

    let link = document.getElementById("link");
    link.href = planet.wikiLink;
    link.textContent = planet.source;
}
