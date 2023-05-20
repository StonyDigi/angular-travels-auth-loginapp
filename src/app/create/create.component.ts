import { Component } from '@angular/core';
import { TravelService } from '../travel.service';
import { Travel } from '../travel';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  actual: Travel = new Travel();
  constructor(public service: TravelService) {
    service.checkLogin();
  }

  create() {
    this.service.add(this.actual);
  }
}
