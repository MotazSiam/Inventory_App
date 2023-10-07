import { Injectable } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService , private router: Router) {}

  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    const token = this.auth.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization:  "Bearer " + token
        }
      });
    }

    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
          
  
        (<HTMLInputElement>document.getElementById("error")).hidden = false;
          (<HTMLInputElement>document.getElementById("error")).textContent = err.error.msg;
        
        setTimeout(function() {
          (<HTMLInputElement>document.getElementById("error")).hidden = true;
          
      }.bind(this), 3000);
         return;
        }
        this.auth.logout();
        this.router.navigate(['SignIn']);
        window.location.reload();
      }
    }));
  }
  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   return next.handle(request);
  // }
}
//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

//     if(!this.auth.getToken()){
//       this.router.navigateByUrl('/SginIn');
//     }
//     request = request.clone({
    
//       setHeaders: {
//         Authorization: `Bearer ${this.auth.getToken()}`,
//         'Content-Type': 'application/json'
//       }
//     });
   
//     console.log(request);
//     return next.handle(request).pipe(
//       catchError((err: any) => {
//         if (err instanceof HttpErrorResponse) {
//             if (err.status === 401) {
//               this.router.navigateByUrl('/SginIn');
//          }
//       }
//       return throwError(err);
//     }))
//   }
// }
