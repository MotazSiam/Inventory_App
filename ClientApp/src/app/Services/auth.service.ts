import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:any;
  constructor(public http: HttpClient ,  @Inject('BASE_URL') baseUrl: string) {    this.url =baseUrl;
this.url="https://localhost:7064/";
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
