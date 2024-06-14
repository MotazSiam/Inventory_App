import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  
  public customers:any;
  public list: any;
  
  url:any;

  public sortName:any;

  search:String ="";

  constructor( public http: HttpClient , private router: Router  , @Inject('BASE_URL') baseUrl: string) 
  {
    
    this.url=environment.API_URL;
    this.sortName= false;
   }

   ngOnInit(): void {

    this .http.get<any>(this.url+ "api/"+"customer").subscribe(result => {
        this.customers = result;
        this.list = this.customers;
      }, error => console.error(error));
  }


  routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }
  SortByName(){

    let on = this.sortName;
    if(!this.sortName){
      
      on= true;
      this.customers = this.customers.sort((a: any,b: any) => a.name > b.name ? 1 : -1);
      
    }
    if(this.sortName){
      on = false;
      this.customers =this.customers.sort((a:any,b:any)  => a.name > b.name ? -1 : 1);
    }
    this.sortName= on;
  }
  // sortDESCByName(){
   
  //   this.brands = this.brands.sort((name) => 0 - this.brands.length);
  // }
  // sortByName(){
   
  //   this.brands = this.brands.sort((a,b) => a.name > b.name ? 1 : -1);
  // }

  changeSearch(event: any){
    this.search = event.target.value;
    this.customers= this.list.filter((customer: any) => 
    customer.name.toLowerCase().indexOf(this.search.toLowerCase().toString()) > -1);

  }

}
