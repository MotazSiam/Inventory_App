import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { IgxLegendComponent, IgxCategoryChartComponent } from 'igniteui-angular-charts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {


  @ViewChild("legend", { static: true })
  private legend: IgxLegendComponent | undefined
  @ViewChild("chart", { static: true })
  private chart: IgxCategoryChartComponent | undefined

  batchProducts!: any;
  productYears: any;
  pageSize:any;
  pageNumber: any;
  nextPage:any;   

  productIdChart!: number;
  url:any;
  constructor(public http: HttpClient,@Inject('BASE_URL') baseUrl: string) {
    this.url=environment.API_URL;

   }



  ngOnInit(): void {
    var req = new requestPage;
    var productId :number;


    this.http.post<any>(this.url+"api/"+'batch/GetProductsBatches', req).subscribe(result => {
      this.batchProducts = result;
      this.pageSize = result.pageSize;
      this.pageNumber = result.pageNumber;
      this.nextPage = result.nextPage;
      console.log(result);
    }, error => console.error(error));
  }
  next(){
   
    this.http.post<any>(this.url+"api/"+'batch/GetProductsBatches',    this.batchProducts).subscribe(result => {
      this.batchProducts = result;
      this.pageSize = result.pageSize;
      this.pageNumber = result.pageNumber;
      this.nextPage = result.nextPage;

      if(this.batchProducts.products.length ==0 ){
        var req = new requestPage;
        this.http.post<any>(this.url+"api/"+'batch/GetProductsBatches', req).subscribe(result => {
          this.batchProducts = result;
          this.pageSize = result.pageSize;
          this.pageNumber = result.pageNumber;
          this.nextPage = result.nextPage;
          console.log(result);
        }, error => console.error(error));
      }
      console.log(result);
    }, error => console.error(error));
  }

  back(){
    this.batchProducts.nextPage = this.batchProducts.pageNumber-1;
    this.batchProducts.pageNumber=  this.batchProducts.pageNumber -2;
    this.http.post<any>(this.url+"api/"+'batch/GetProductsBatches', this.batchProducts).subscribe(result => {
      this.batchProducts = result;
      this.pageSize = result.pageSize;
      this.pageNumber = result.pageNumber;
      this.nextPage = result.nextPage;
      console.log(result);
    }, error => console.error(error));
  }
}

class requestPage {
  Batches!: any;
  products!: any;
  pageNumber!: any;
  pageSize!: any;
  nextPage!: any;
}