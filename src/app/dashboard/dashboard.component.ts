import { Component } from '@angular/core';
import { TravelService } from '../travel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(public service: TravelService, private router: Router) {
    service.checkLogin();
    service.loadMyTravels();
  }

  update(id: string) {
    //elnavigál az edit-re úgy, hogy átadja neki az id-t is!
    this.router.navigate(['edit', id]);
  }
}
