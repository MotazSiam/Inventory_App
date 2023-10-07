import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  url:any;
  public customer: Customer ={};
  public base64Image: String | null | undefined = null;
  cusotmerId: any;
  
  route: ActivatedRoute = inject(ActivatedRoute);
  public src :String | null | undefined = null;;

  constructor(public http: HttpClient , private router: Router , @Inject('BASE_URL') baseUrl: string) {
    this.url =baseUrl;
this.url="https://localhost:7064/";   
   // this.base64Image = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAyNTAgMjUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAgMjUwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojREQwMDMxO30NCgkuc3Qxe2ZpbGw6I0MzMDAyRjt9DQoJLnN0MntmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMTI1LDMwIDEyNSwzMCAxMjUsMzAgMzEuOSw2My4yIDQ2LjEsMTg2LjMgMTI1LDIzMCAxMjUsMjMwIDEyNSwyMzAgMjAzLjksMTg2LjMgMjE4LjEsNjMuMiAJIi8+DQoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIxMjUsMzAgMTI1LDUyLjIgMTI1LDUyLjEgMTI1LDE1My40IDEyNSwxNTMuNCAxMjUsMjMwIDEyNSwyMzAgMjAzLjksMTg2LjMgMjE4LjEsNjMuMiAxMjUsMzAgCSIvPg0KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMjUsNTIuMUw2Ni44LDE4Mi42aDBoMjEuN2gwbDExLjctMjkuMmg0OS40bDExLjcsMjkuMmgwaDIxLjdoMEwxMjUsNTIuMUwxMjUsNTIuMUwxMjUsNTIuMUwxMjUsNTIuMQ0KCQlMMTI1LDUyLjF6IE0xNDIsMTM1LjRIMTA4bDE3LTQwLjlMMTQyLDEzNS40eiIvPg0KPC9nPg0KPC9zdmc+DQo=';
}

  ngOnInit(): void {
    this.cusotmerId = this.route.snapshot.params['id'];
   
    this .http.get<any>(this.url+ "api/"+"customer/GetById?Id="+this.cusotmerId).subscribe(result => {
      this.customer=  result;

      (<HTMLInputElement>document.getElementById("name")).value =  result.name;
      (<HTMLInputElement>document.getElementById("address")).value =result.address;
      (<HTMLInputElement>document.getElementById("city")).value =  result.city;
      (<HTMLInputElement>document.getElementById("phone")).value =result.phone;

      this.src = result.img;
      this.base64Image = result.img;
    }, error => console.error(error));
  }
  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = () => {
       // String const fileStr = reader.result?.toString();
        this.base64Image = reader.result?.toString();
      this.src = this.base64Image;
        // this.brand.id=123;
       
    };
}


editCustomer(editCustomer: any){
  console.log(editCustomer);


  if( editCustomer.controls.name.value){
    this.customer.name =   editCustomer.controls.name.value;
  }
  if(editCustomer.controls.address.value){
    this.customer.address = editCustomer.controls.address.value;
  }
  if(editCustomer.controls.city.value){
    this.customer.city = editCustomer.controls.city.value;
  }
  if(editCustomer.controls.phone.value){
    this.customer.phone = editCustomer.controls.phone.value;
  }


  this.customer.img= this.base64Image?.toString();

  console.log(  this.customer);
  this.http.put<any>(this.url+ "api/"+'customer', this.customer).subscribe(result => {  
    editCustomer.reset();
    this.router.navigateByUrl('/Customer');
    }, error => console.error(error));
}
public routeTo(link:any){
  this.router.navigateByUrl('/'+link);
}

}

class Customer{
  name?:any;
  address?:any;
  city?:any;
  phone?:any;
  img?:any;

}