const form = document.querySelector(".js-search");
const list = document.querySelector(".js-list");

form.addEventListener("submit", onSearch);

function onSearch(e) {
  e.preventDefault();
  const { query, days } = e.currentTarget.elements;
  weatherApi(query.value, days.value)
    .then((data) => {
      createMarkup(data);
    })
    .catch((err) => {
      createErrorMessage(err);
    });
}

function weatherApi(city, days) {
  const BASE_URL = "https://api.weatherapi.com/v1";
  const KEY = "3a06640ea88548118f8154427222812";
  return fetch(
    `${BASE_URL}/forecast.json?key=${KEY}&q=${city}&days=${days}`
  ).then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function createMarkup({ forecast: { forecastday: arr } }) {
  const markup = arr.map(
    ({
      date,
      day: {
        avgtemp_c: avg,
        condition: { text, icon },
      },
    }) => `<li><img src="${icon}" alt="${text}">
        <h2>Дата: ${date}</h2>
        <h3>Температура: ${Math.round(avg)}</h3>
        <span>${text}</span>
     </li>`
  );
  list.innerHTML = markup.join("");
}

function createErrorMessage(err) {
  const markup = `<li class="error"><h2>Type error: ${err}</h2></li>`;
  list.innerHTML = markup;
}
