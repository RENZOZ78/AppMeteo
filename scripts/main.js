const CLEFAPI = '6202dd93180a1717ca32707850723c29';
let resultsAPI;

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
        })
}

