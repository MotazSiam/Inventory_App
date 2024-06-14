import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:any;
  constructor(public http: HttpClient ,  @Inject('BASE_URL') baseUrl: string) {    
this.url=environment.API_URL;
}

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public login(user:any){
    this.http.post<any>(this.url+ "api/"+'User/SignIn', user).subscribe(result => { 
      localStorage.setItem ('token', result.authToken);
       }, error => console.error(error));
  }

  public logout(){
    localStorage.removeItem('token');
  }
}
