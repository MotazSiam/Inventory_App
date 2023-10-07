import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  url:any;
  public forecasts: WeatherForecast[] = [];
  public brands: Brand[] = [];
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url =baseUrl;
this.url="https://localhost:7064/";


    this.getBrand().subscribe(response => {
      //alert(JSON.stringify( response));
    });

    //try {

    http.get<Brand>(this.url+ "api/"+'brand/first').subscribe(
      {
        next: data => {
       //   alert(data.name);
        },
        error: error => {

          alert('There was an error!' + error.message);
        }
      });
    //  alert("test");
      http.get<Brand[]>(this.url+ "api/"+"brand").subscribe(result => {
        var count = result.length;
        this.brands = result;
      }, error => console.error(error));

    //} catch (e) {
    //  alert(e);
    //}
    //alert("test2");
  }



  public getBrand(): Observable<any> {
    const urlGetBrand = this.url+ "api/"+'brand/first';
    return this.http.get<Brand>(urlGetBrand);
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface Brand {
  id: number;
  name: string;
  description?: string;
  img?: string ;
  isDeleted: boolean;
  createdDate: any;
  
}
