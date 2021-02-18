let formMeteo=document.getElementById("formMeteo");

formMeteo.addEventListener("submit",function(e){
	let value=e.target.value;

	e.preventDefault();

	requeteAJAX(e.target.elements["0"].value);
});

function requeteAJAX(ville)
{
	let request=new XMLHttpRequest();

	request.onreadystatechange=function(){
		if(this.readyState==XMLHttpRequest.DONE&&this.status==200)      //Requête effectuée et statut ok
		{
			let response=JSON.parse(this.responseText);     //Conversion JSON-Objet JavaScript
			
            if(response.hasOwnProperty("errors"))
                alert("Ville introuvable !");
            else
            {
                document.getElementById("reponse").innerHTML=`<p>Votre ville : ${response.city_info.name}<br>`+
                                                             `Située en : ${response.city_info.country}<br>`+
                                                             `Coordonnées : ${response.city_info.latitude} ${response.city_info.longitude}<br>`+
                                                             `Altitude : ${response.city_info.elevation} m<br>`+
                                                             `Le Soleil se lève à : ${response.city_info.sunrise} et se couche à ${response.city_info.sunset}<br>`+

                                                             `Date actuelle : ${response.current_condition.date}<br>`+
                                                             `Température : ${response.current_condition.tmp}°C<br>`+
                                                             `Vitesse du vent : ${response.current_condition.wnd_spd} km/h<br>`+
                                                             `Direction du vent : ${response.current_condition.wnd_dir}<br>`+
                                                             `Pression atmosphérique : ${response.current_condition.pressure}<br>`+
                                                             `Taux d'humidité : ${response.current_condition.humidity}%<br>`+
                                                             `Condition : ${response.current_condition.condition}<br>`+
                                                             `<img src="${response.current_condition.icon}"></p><br><p>`+

                                                             `${response.fcst_day_1.day_long} ${response.fcst_day_1.date}<br>`+
                                                             `Température min : ${response.fcst_day_1.tmin}°C<br>Température max : ${response.fcst_day_1.tmax}°C<br>`+
                                                             `Conditions : ${response.fcst_day_1.condition}</p>`+
                                                             `<img src="${response.fcst_day_1.icon}"></p><br><p>`+

                                                             `${response.fcst_day_2.day_long} ${response.fcst_day_2.date}<br>`+
                                                             `Température min : ${response.fcst_day_2.tmin}°C<br>Température max : ${response.fcst_day_2.tmax}°C<br>`+
                                                             `Conditions : ${response.fcst_day_2.condition}</p>`+
                                                             `<img src="${response.fcst_day_2.icon}"></p><br><p>`+

                                                             `${response.fcst_day_3.day_long} ${response.fcst_day_3.date}<br>`+
                                                             `Température min : ${response.fcst_day_3.tmin}°C<br>Température max : ${response.fcst_day_3.tmax}°C<br>`+
                                                             `Conditions : ${response.fcst_day_3.condition}</p>`+
                                                             `<img src="${response.fcst_day_3.icon}"></p><br><p>`+

                                                             `${response.fcst_day_4.day_long} ${response.fcst_day_4.date}<br>`+
                                                             `Température min : ${response.fcst_day_4.tmin}°C<br>Température max : ${response.fcst_day_4.tmax}°C<br>`+
                                                             `Conditions : ${response.fcst_day_4.condition}</p>`+
                                                             `<img src="${response.fcst_day_4.icon}"></p><br>`;
                //console.log(response);
            }
		}
	};

	requeteURL="https://prevision-meteo.ch/services/json/"+ville;   //Construction requête

	request.open("GET",requeteURL);         //Type GET
	request.send();     //Envoi requête
}