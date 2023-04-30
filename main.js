let body = document.querySelector("body");
let header = document.querySelector("h1");
let searchButton = document.querySelector("button");
let searchInput = document.querySelector("input");
let info = document.querySelector(".info");
let search = document.querySelector(".search");

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
.catch(err => errorMsg(err));

let showPlanet = (planets) => {
    loadPlanetOnPage(planets[Math.floor(Math.random() * planets.length)]);

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
                loadPlanetOnPage(result);
            }
        }
    });
}

let loadPlanetOnPage = (planet) => {
    header.textContent = planet.name.toUpperCase();
    body.style.backgroundImage = `url('${planet.imgSrc.img}')`;

    let h2 = document.createElement("h2");
    h2.innerText = "Did you know?";

    let description = document.createElement("li");
    description.innerText = planet.description;

    let volume = document.createElement("li");
    volume.innerText = `Volume of ${planet.name}: ${planet.basicDetails.volume}`;

    let mass = document.createElement("li");
    mass.innerText = `Mass of ${planet.name}: ${planet.basicDetails.mass}`;

    let ul = document.createElement("ul");
    ul.append(description, volume, mass);

    let link = document.createElement("p");
    link.innerHTML = `Learn more 👉 <a href="${planet.wikiLink}" target="_blank">${planet.source}</a>`;
    
    info.innerHTML = "";
    info.append(h2, ul, link);
}

let errorMsg = (err) => {
    search.style.display = "none";
    info.innerHTML = `<h3 class="advice">Sorry, server is not responding!</h3><p class="advice">${err}</p>`;
}

// let loadOnPage = (planet) => {
//     header.textContent = planet.name.toUpperCase();
//     body.style.backgroundImage = `url('${planet.imgSrc.img}')`;

//     let description = document.getElementById("description");
//     description.innerText = planet.description;

//     let volume = document.getElementById("volume");
//     volume.innerText = `Volume of ${planet.name}: ${planet.basicDetails.volume}`;

//     let mass = document.getElementById("mass");
//     mass.innerText = `Mass of ${planet.name}: ${planet.basicDetails.mass}`;

//     let link = document.getElementById("link");
//     link.href = planet.wikiLink;
//     link.textContent = planet.source;
// }
