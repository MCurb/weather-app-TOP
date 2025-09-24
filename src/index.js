import './styles.css';
import 'iconify-icon';
import { displayData, handleFormData } from './display-weather-data';

const form = document.querySelector('.form');

form.addEventListener('submit', handleFormData);

// Init
// displayData();
