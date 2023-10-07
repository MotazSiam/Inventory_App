import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})
export class AppComponent {
  title = 'app';

  public token:any;
  
  constructor( private router: Router){
    this.token=localStorage.getItem('token');
    if(!this.token){
      this.router.navigateByUrl('/SignIn');
    }
  }

 public routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }

  public signOut(){
    localStorage.removeItem('token');
    window.location.reload();
  }
}
