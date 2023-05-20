import { Component } from '@angular/core';
import { TravelService } from '../travel.service';
import { Registerdata } from '../registerdata';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  actual: Registerdata = new Registerdata();
  constructor(public service: TravelService) {

  }
}
