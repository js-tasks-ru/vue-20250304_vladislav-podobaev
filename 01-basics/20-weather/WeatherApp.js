import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

function getCelsius(Kelvin) {
  const celsius = Kelvin - 273.15
  return celsius.toFixed(1) + ' ' + '°C'
}

function getPressure(hPa) {
  const mmHg = 0.75 * hPa
  return mmHg.toFixed(0)
}

export default defineComponent({
  name: 'WeatherApp',
  setup() {
    return {
      weatherData: getWeatherData(),
      weatherIcons: WeatherConditionIcons,
      getCelsius,
      getPressure,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <ul class="weather-list unstyled-list">
        <li
          v-for="location in weatherData"
          class="weather-card"
          :class="{ 'weather-card--night': location.current.sunrise > location.current.dt || location.current.dt > location.current.sunset}"
        >
          <div v-if="location.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️ </span>
            <span class="weather-alert__description">Королевская метеослужба короля Арагорна II: Предвещается наступление сильного шторма.</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ location.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ location.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="location.current.weather.description">{{ weatherIcons[location.current.weather.id]}}</div>
            <div class="weather-conditions__temp">{{ getCelsius(location.current.temp) }}</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ getPressure(location.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ location.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ location.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ location.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
