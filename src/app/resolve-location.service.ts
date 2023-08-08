import { Injectable } from '@angular/core';
import { WeatherService } from './weather.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResolveLocationService implements Resolve<any> {

  resolve() {
    return this.ws.localWeather();
  }
  constructor(private ws : WeatherService) { }
}
