import { Component } from '@angular/core';
import { Logindata } from '../logindata';
import { TravelService } from '../travel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  actual: Logindata = new Logindata();
  //false, ha nincs hiba a bejelentkezéskor
  isError: boolean = false;
  constructor(public service: TravelService, private router: Router){
    
  }

  async login() {
    //Meghívja awaitel a serviceben lévő logint es átadja neki a this.actual-t
    let success : boolean = await this.service.loginWhitFeedback(this.actual);
    //ha ez a success nemigaz akkor nem sikeres a belépés és ennek hatására megjelenítjük a hibaüzenetet a html oldalon!
    if(!success) {
      this.isError = true;
    } else {
      //sikeres belépés után átnavigál a listázó nézetre
      this.router.navigate(['list']);
    }
  }
}