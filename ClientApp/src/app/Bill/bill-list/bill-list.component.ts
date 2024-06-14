import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  bills: any;
  list: any;
  search: any;
  sortName: any = true;
  url:any;

  showProductList:any = false;
  batchProducts: any;
  batchDetial: any;
  btachProductTotalCount: number = 0;
  batchProductsTotalAmount: number=0;
  constructor( public http: HttpClient ) { 
    
this.url=environment.API_URL;

  }
  ngOnInit(): void {
    this .http.get<any>( this.url+ "api/"+"bill").subscribe(result => {
      this.bills = result;
      this.list = this.bills;
    }, error => console.error(error));
  }


  changeSearch(event: any){
    this.search = event.target.value;
    this.bills= this.list.filter((customer: any) => 
    customer.customer.name.toLowerCase().indexOf(this.search.toLowerCase().toString()) > -1);
  }

  SortByName(){

    let on = this.sortName;
    if(!this.sortName){
      
      on= true;
      this.bills = this.bills.sort((a: any,b: any) => a.customer.name > b.customer.name ? 1 : -1);
      
    }
    if(this.sortName){
      on = false;
      this.bills =this.bills.sort((a: any,b: any) => a.customer.name > b.customer.name ? -1 : 1);
    }
    this.sortName= on;
  }
}
