import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent implements OnInit {
  batches: any;
  list: any;
  search: any;
  sortName: any = true;
  url:any;

  showProductList:any = false;
  batchProducts: any;
  batchDetial: any;
  btachProductTotalCount: number = 0;
  batchProductsTotalAmount: number=0;
  constructor( public http: HttpClient , @Inject('BASE_URL') baseUrl: string ) { 
    
this.url=environment.API_URL;

  }

  ngOnInit(): void {
    this .http.get<any>( this.url+ "api/"+"Batch").subscribe(result => {
      this.batches = result;
      this.list = this.batches;
    }, error => console.error(error));
  }

  changeSearch(event: any){
    this.search = event.target.value;
    this.batches= this.list.filter((brand: any) => 
    brand.code.toLowerCase().indexOf(this.search.toLowerCase().toString()) > -1);
  }

  SortByName(){

    let on = this.sortName;
    if(!this.sortName){
      
      on= true;
      this.batches = this.batches.sort((a: { code: string; },b: { code: string; }) => a.code > b.code ? 1 : -1);
      
    }
    if(this.sortName){
      on = false;
      this.batches =this.batches.sort((a: { code: string; },b: { code: string; }) => a.code > b.code ? -1 : 1);
    }
    this.sortName= on;
  }


  ShowBatchDetails(id:number){

  
    this.showProductList=true;
    this.batchDetial = this.batches.find((i: { id: number; }) => i.id === id);
    
    this.http.get<any>( this.url+ "api/"+"Batch/Products?batchId="+id).subscribe(result => {
      this.batchProducts = result;
      this.CalculateTotal(); 

    }, error => console.error(error)); 

  }

  CalculateTotal(){
    this.btachProductTotalCount=0;
    this.batchProductsTotalAmount=0;
  
    this.batchProducts.forEach((batchProduct: any) => {
    
      this.btachProductTotalCount = this.btachProductTotalCount + batchProduct.count;
      this.batchProductsTotalAmount = this.batchProductsTotalAmount+ (batchProduct.count*batchProduct.price);
    });
  }
  closeBatchDetails(){
    this.showProductList= false;
    this.batchProducts= null;
  }

}
