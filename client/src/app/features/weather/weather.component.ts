import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  city: string = ''
  weatherData: any = null
  errorMessage: string = ''
  backgroundImage: string = '';

  async getWeather(){
    try {
      const response = await axios.get(`http://localhost:3000/api/weather/${this.city}`);
      this.weatherData = response.data;
      console.log(this.weatherData)
      this.setBackgroundImage(this.weatherData.weatherCondition);
      this.errorMessage = '';
    } catch (error: any) {
      this.errorMessage = 'City not found. Please try again.';
      this.weatherData = null;
  }
}

setBackgroundImage(weatherCondition: string) {
  switch (weatherCondition.toLowerCase()) {
    case 'clear':
      this.backgroundImage = 'assets/sunny.gif';
      break;
    case 'clouds':
      this.backgroundImage = 'assets/cloudy.gif';
      break;
    case 'rain':
      this.backgroundImage = 'assets/rainy.gif';
      break;
    case 'snow':
      this.backgroundImage = 'assets/snowy.gif';
      break;
    case 'haze':
      this.backgroundImage = 'assets/haze.gif';
      break;

    default:
      this.backgroundImage = 'assets/default.jpg'; 
  }
}

}