import { Component } from '@angular/core';
import { TravelService } from '../travel.service';
import { Travel } from '../travel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  actual: Travel = new Travel();
  constructor(public service: TravelService, private route: ActivatedRoute) {
    //kivesszük a route paramétert és annak átadjuk az id-t amit a route paraméterből veszünk ki mint id!
    service.checkLogin();
    route.params.subscribe(t => {
      this.actual = service.find(t['id']);
    });
  }
}
