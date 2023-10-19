import { Services } from "../js/servicio.js";

const btnBuscar = document.getElementById('BtnSearch');

btnBuscar.addEventListener('click', () => {
  // Obtener el valor del elemento con id "Search" en el momento del clic
  
    

  
  const city = document.getElementById('Search').value;

  // Verificar si city no está vacío y contiene solo caracteres alfabéticos
  if (city !== '' && /^[A-Za-z\s]+$/  .test(city)) {
    // Llamar a la función para obtener los detalles de la ciudad (debe definirse Services.detailsCity)
    Services.detailsCity(city)
      .then((data) => {
        if (data.error && data.error.code === 1006) {
          // El objeto data.error está definido y tiene una propiedad 'code' con el valor 1006
          document.querySelector('.error-message').style.display = 'block';
          setTimeout(function() {
            document.querySelector('.error-message').style.display = 'none';
          }, 5000);
        }else{
      crearNuevaLinea(data.location,data.current);
      crearNuevaTabla(data.forecast);   
      document.querySelector('.weather-container').style.display = 'block';
      document.querySelector('.forecast-container').style.display = 'block';
      }
          })
      .catch((error) => {
        const e=document.querySelector('.error-message');
        error
      e.innerHTML ="<p>Error encontrado: "+error+"</p>";
      });
  } else {
    const error=document.querySelector('.error-message');
    error.innerHTML ="<p>Ingresa un nombre de ciudad válido (no vacío y solo caracteres alfabéticos)</p>";
  }
});

function crearNuevaLinea(location,current){
  let locationInfo = location;
  let WheaterInfo =current;
  let cardTitleElement = document.querySelector('.card-body');

  const contenido ='<h5 class="card-title">'+locationInfo.name+', '+ locationInfo.region+', '+locationInfo.country+'</h5><img src="'+WheaterInfo.condition.icon +'" class="card-img-top">'+'<p class="card-text">Ultima actualización: '+locationInfo.localtime+' </p>'+'<p class="card-text">La temperatura actual es de: '+WheaterInfo.temp_c+' °C.</p><p class="card-text">Estado actual: '+WheaterInfo.condition.text+'</p>';
  cardTitleElement.innerHTML = contenido;
}


function crearNuevaTabla(forecast) {
  let content = document.querySelector('[data-table]');
  let tablaHTML = ''; // Variable para acumular las líneas de la tabla

  for (let i = 0; i < forecast.forecastday.length; i++) {
    const dia = forecast.forecastday[i];
    const fecha = dia.date;
    const tempMaxC = dia.day.maxtemp_c;
    const tempMinC = dia.day.mintemp_c;
    const linea = '<tr><td>' + fecha + ' </td>' + '<td>' + tempMaxC + ' °C</td>' + '<td>' + tempMinC + ' °C</td>' + '</tr>';

    tablaHTML += linea;
  }

  
  content.innerHTML = tablaHTML;
}



