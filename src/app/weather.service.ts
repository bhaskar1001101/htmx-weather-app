import { Injectable } from '@angular/core';
import { CurrentWeather } from './current-weather';
import {HttpClient} from '@angular/common/http';
import 'rxjs';
import { ForecastWeather } from './forecast-weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  location !: any;
  myWeather !: CurrentWeather;
  constructor( private http : HttpClient) { }

  localWeather(){
    return new Promise ((res,rej) =>{
      navigator.geolocation.getCurrentPosition((pos)=> {
        this.location = pos.coords;
        const lat = this.location.latitude;
        const lon = this.location.longitude;
        return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ea15277fcd2f872af5dc36e40060057b`).toPromise().then((data)=>{
          this.myWeather = new CurrentWeather((data as any).name,
                                            (data as any).main.temp,
                                            (data as any).weather[0].icon, 
                                            (data as any).weather[0].description, 
                                            (data as any).main.temp_max, 
                                            (data as any).main.temp_min);
                                            res(this.myWeather);
        })
      })
    })    
  }

  anotherCityWeather(city : string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ea15277fcd2f872af5dc36e40060057b`);
  }

  fiveDayForecast(city : string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ea15277fcd2f872af5dc36e40060057b`);
  }
}


