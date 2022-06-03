function UnixtoTimestamp(unix){
    var dataHora = new Date(unix * 1000);
    var h = dataHora.getHours();
    var m = dataHora.getMinutes();
    var s = dataHora.getSeconds();

    return h + ':' + m + ':' + s;
}
function KelvinToCelcius (t){
    return (parseFloat(t) - 273.15).toFixed(1);
}

{
    var key = '. . .'
}
var lat = -22.84;
var lon = -43.31;
var url ='https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key;

var xhr;
if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
} else if (window.ActiveXObject){
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

xhr.onreadystatechange = function() {
    var clima = document.getElementById('clima');

    if (this.readyState == 4 && this.status == 200){
        var obj = JSON.parse(this.responseText);
        console.log(obj);

        clima.innerHTML = 'Pais: ' + obj.sys.country + '<br>';
        clima.innerHTML += 'Cidade: ' + obj.name + '<br>'; 

        for ( x = 0; x < obj.weather.length; x++) {
         clima.innerHTML += '<b>' + obj.weather[x].description + '</b<br>';
        }
        clima.innerHTML += '<br>';

        clima.innerHTML += 'Latitude: ' + obj.coord.lat + '<br>';
        clima.innerHTML += 'Longitude: ' + obj.coord.lon + '<br>';
        clima.innerHTML += 'Nascer do Sol: ' + UnixtoTimestamp(obj.sys.sunrise) + '<br>';
        clima.innerHTML += 'Por do Sol: ' + UnixtoTimestamp(obj.sys.sunset) + '<br><br>';

        clima.innerHTML += 'Temperatura: ' + KelvinToCelcius(obj.main.temp) + 'ºC<br>';
        clima.innerHTML += 'Temperatura (max): ' + KelvinToCelcius(obj.main.temp_max) + 'ºC<br>';
        clima.innerHTML += 'Temperatura (min): ' + KelvinToCelcius(obj.main.temp_min) + 'ºC<br><br>';    

        clima.innerHTML += 'velocidade do Vento:' + obj.wind.speed + 'm/s<br>';

    } else {
        clima.innerHTML = 'Carregando . . .'
    }
};
xhr.open("GET", url, true);
xhr.send();


