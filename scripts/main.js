//importation du tableau des jours
import tabJoursEnOrdre from "./Utilitaire/gestionTemps.js";

console.log("DEPUIS MAIN JS: " + tabJoursEnOrdre)

const CLEFAPI = '6202dd93180a1717ca32707850723c29';
let resultatsAPI;


const temps = document.querySelector('.temps')
const temperature = document.querySelector('.temperature')
const localisation = document.querySelector('.localisation')
const heure = document.querySelectorAll('.heure-nom-prevision')
const tempPourH = document.querySelectorAll('.heure-prevision-valeur')


//IL VA  NOUS FALLOIR LA GEOLOCALISATION
if(navigator.geolocation) { //si le navigateur a bien la geolocalisation
    navigator.geolocation.getCurrentPosition(position => {
        //console.log(position);

        //APELLE la longitude et la latitude, alors on appelle la methode api
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);

    }, () => {
        alert(`Vous avez refuseé la géolocalisation, l'application ne peut pas fonctionneer, veuillez l'activer.!`)

    })
}

//CREATION FUNCIOTN API
function AppelAPI(long, lat) {
    //console.log(long, lat);
    //on enleve autosave pour eviter que l'api fasse des erreurs

    //on utilise la methode fetch() qui va recuperer le sdonnées de notre api
    //on prend le lien APICALL et on prend la reference de la CLEAPI
    //on complete lat et long avec les templates ceterol pour mettre les expression js direcetement dedans
    //fetch retourne un preomesse /fetch va se resoudre quand les données seront présentes
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
        //ENSUITE RETURN PROMESSE AU FORMAT JSON pour que ca soit comprehensible
        .then((reponse) => {
            return reponse.json(); //DONNEES
        })
        //CONSOL LOG DES DONNEES
        .then((data) => {
            console.log(data);

           let resultatsAPI = data;

            temps.innerText = resultatsAPI.current.weather[0].description; //on prends temsp de notre index html
            temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;//math.trunc enleve les chiifres apres la virgule
            localisation.innerText = resultatsAPI.timezone;

            //HEURES PAR TRANCHE DE 3 AVEC LEUR TEMPERATURE

            let heureActuelle = new Date().getHours();

            for(let i = 0; i < heure.length; i++) {

                let heureIncr = heureActuelle + i * 3;

                if(heureIncr > 24) {
                    heure[i].innerText = `${heureIncr - 24} h`;
                } else if (heureIncr === 24) {
                    heure[i].innerText = "00 h"
                } else {
                heure[i].innerText = `${heureIncr} h`;//dans chaque bloc je vais afficher lheure actuel et / sa va incrementer par 3h
            }}

            // temp pour 3h
            for(let j = 0; j < tempPourH.length; j++) {

                 tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`


            }
        })
}

