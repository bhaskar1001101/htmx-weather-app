import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs';
import { ForecastWeather } from '../forecast-weather';
import { WeatherService } from '../weather.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'wa-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit{
  forecastForm !: FormGroup;  
  cityForecast : ForecastWeather[] = [];

  constructor(private ws : WeatherService){}

  ngOnInit(): void {
    this.forecastForm = new FormGroup({
      forecastCity : new FormControl('')
    })
  }

  onSubmit(){
    this.cityForecast.splice(0,this.cityForecast.length);
    this.ws.fiveDayForecast(this.forecastForm.value.forecastCity).subscribe((data)=>{
      for(let i=0 ; i<(data as any).list.length; i+=8){
        const temporary = new ForecastWeather((data as any).list[i].name,
                                              (data as any).list[i].dt_txt,
                                              (data as any).list[i].main.temp,
                                              (data as any).list[i].weather[0].icon, 
                                              (data as any).list[i].weather[0].description, 
                                              (data as any).list[i].main.temp_max, 
                                              (data as any).list[i].main.temp_min);
                                              this.cityForecast.push(temporary);
      }
    })
  }
}
