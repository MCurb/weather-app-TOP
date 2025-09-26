import './styles.css';
import 'iconify-icon';
import {
  handleFormData,
  handleTemperatureToggle,
} from './display-weather-data';

const form = document.querySelector('.form');
const tempCheckbox = document.querySelector('.temp-checkbox');

form.addEventListener('submit', handleFormData);

tempCheckbox.addEventListener('click', handleTemperatureToggle);

// Init
// displayData();
