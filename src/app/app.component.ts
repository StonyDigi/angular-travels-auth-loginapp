import { Component } from '@angular/core';
import { TravelService } from './travel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'travelapp';
  constructor(public service: TravelService){
    
  }
}
