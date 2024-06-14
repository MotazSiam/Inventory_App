import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public user: User = new User;
  public currentYear:any;
  url:any;
  constructor(public http: HttpClient ,  private router: Router, @Inject('BASE_URL') baseUrl: string) { 
    
this.url=environment.API_URL;;

    
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigateByUrl('/');
    }
    this.currentYear=(new Date()).getFullYear();
  }

  signIn(formUser:any){
    console.log(formUser);
    this.user.email =  formUser.controls.email.value;
    this.user.password = formUser.controls.password.value;
    this.http.post<any>( this.url+ "api/"+'user/SignIn', this.user).subscribe(result => { 
      localStorage.setItem ('token', result.authToken);
      this.router.navigateByUrl('/');
      window.location.reload();
       }, error => {    
        (<HTMLInputElement>document.getElementById("error")).hidden = false;
        (<HTMLInputElement>document.getElementById("error")).textContent = JSON.stringify(error.error.title);
      
      setTimeout(function() {
        (<HTMLInputElement>document.getElementById("error")).hidden = true;
        
    }.bind(this), 6000);
       return;
      
         });
  }
}
 class User{
  email:string="";
  password:string="";
}
