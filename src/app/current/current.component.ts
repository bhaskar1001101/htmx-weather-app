import { Component, OnInit, Type} from '@angular/core';
import 'rxjs';
import { WeatherService } from '../weather.service';
import {CurrentWeather} from '../current-weather'
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'wa-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  constructor(private ws : WeatherService, private route: ActivatedRoute){}  
  myWeather !: CurrentWeather;
    
    ngOnInit() {
      this.route.data.subscribe(
        (data : any) => {
          this.myWeather = data.myWeather;
        }
      )
    }

    onSubmit(weatherForm : NgForm){
      this.ws.anotherCityWeather(weatherForm.value.city).subscribe((data)=>{
        this.myWeather = new CurrentWeather((data as any).name,
                                            (data as any).main.temp,
                                            (data as any).weather[0].icon, 
                                            (data as any).weather[0].description, 
                                            (data as any).main.temp_max, 
                                            (data as any).main.temp_min);
      })
    }
}
