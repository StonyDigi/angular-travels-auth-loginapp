import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Logindata } from './logindata';
import { Tokendata } from './tokendata';
import { Travel } from './travel';
import { Router } from '@angular/router';
import { Registerdata } from './registerdata';

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  travels: Array<Travel> = new Array<Travel>();
  myTravels: Array<Travel> = new Array<Travel>();
  constructor(private http: HttpClient, private router: Router) {
    //amikor a service be lesz injectálva az alkalmazásba, rögtön betölti az adatokat
    this.load();
  }

  add(t: Travel) {
    //token headers hozzáadása (authorized)
    const headers = new HttpHeaders({
      'content-Type': 'application/json' ,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    //kulcs értéket küldünk végülis {headers: headers}
    this.http.post<Travel>('https://apiexample.andraskovacs.com/Travel', t, {headers: headers})
    .subscribe(t => {
      console.log(t);
      this.router.navigate(['list']);
      this.load();
    }, error => {
      console.log(error);
    });

  }

  update(t: Travel) {
    const headers = new HttpHeaders({
      'content-Type': 'application/json' ,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    this.http.put<Travel>('https://apiexample.andraskovacs.com/Travel', t, {headers: headers})
    .subscribe(t => {
      this.load();
      this.loadMyTravels();
      this.router.navigate(['dashboard']);
    }, error => {
      console.log('Valami gond van!');
    });
  }

  //abban az esetben, ha nem vagyunk bejelentkezve a profilunkba, egyszerűen el route-ol minket
  //nem engedi, hogy manuálisan hozzájussunk a /create, /saját hirdetések-hez mielött bejelentkeznénk.
  checkLogin() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }
  //kiszűri id alapján azt az utazást amit módosítani akarunk!!
  find(id: string) : Travel {
    return this.myTravels.filter(t => t.id == id)[0];
  }

  loadMyTravels() {
    const headers = new HttpHeaders({
      'content-Type': 'application/json' ,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    this.http.patch<Array<Travel>>('https://apiexample.andraskovacs.com/Travel', '', {headers: headers})
    .subscribe(t => this.myTravels = t);

  }

  load(){
    this.http.get<Array<Travel>>('https://apiexample.andraskovacs.com/Travel')
    .subscribe(t => {this.travels = t; console.log(this.travels);});
    
  }

  delete(id: string){
    const headers = new HttpHeaders({
      'content-Type': 'application/json' ,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    this.http.delete('https://apiexample.andraskovacs.com/Travel/' + id, {headers: headers})
    .subscribe(t => {
    alert('Sikeresen törölte!');
    this.load();
    this.loadMyTravels();
    });
  }

  //sima feedback, egyszerűbb
  login(ld: Logindata){
    this.http.post<Tokendata>('https://apiexample.andraskovacs.com/Auth', ld)
    .subscribe(t => {
      localStorage.setItem('token', t.token);
    }, error => {
      alert('Hibás felhasználónév/jelszó');
    });
  }

  register(rd: Registerdata) {
    //elküldjük az /Auth endpointra az rd registration data-t
    this.http.put('https://apiexample.andraskovacs.com/Auth', rd)
    .subscribe(t => {
      //Válasz: ha sikeres, elnavigáljuk magunkat a login felületre, mehetünk bejelentkezni!
      this.router.navigate(['login']);
      alert('Gratulálunk! Sikeres regsitráció.')
    }, error => {
      alert('Hiba bejelentkezés során!');
      console.log(error);
    });
  }

  //login bad feedback szépen,advancedebben és ad nekünk visszajelzést
  async loginWhitFeedback(ld: Logindata) : Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<Tokendata>('https://apiexample.andraskovacs.com/Auth', ld)
    .subscribe(t => {
      localStorage.setItem('token', t.token);
      resolve(true);
    }, error => {
      reject(false);
    });
    });
  }

  isLoggedIn(): boolean{
    let token = localStorage.getItem('token');
    return token != null;
  }

  logout(){
    localStorage.clear();
  }
}