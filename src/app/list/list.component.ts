import { Component } from '@angular/core';
import { TravelService } from '../travel.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  constructor(public service: TravelService) {
    
  }
}
