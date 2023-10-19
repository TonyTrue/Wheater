
let KeyApi='inserte';


const detailsCity = (city) => {
  return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${KeyApi}&q=${city}&days=10&aqi=no&alerts=no`)
    .then((respuesta) =>
      respuesta.json()
    );
};

export const Services = {
  detailsCity
};
