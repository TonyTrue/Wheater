
let KeyApi='558eb965cecf4793b33193023231609';


const detailsCity = (city) => {
  return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${KeyApi}&q=${city}&days=10&aqi=no&alerts=no`)
    .then((respuesta) =>
      respuesta.json()
    );
};

export const Services = {
  detailsCity
};
