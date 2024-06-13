import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import domToImage from 'dom-to-image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as moment from 'moment';
//import moment from 'moment';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  @ViewChild('content') content!:ElementRef;  
  @ViewChild('dataToExport', { static: false }) public dataToExport!: ElementRef ;
  product:any;
  url:any;
  totalCount :number=0;
  totalAmount:number =0 ;
  productId : number = 0 ;
datePicker: any;
  pdfName: any;
  print: boolean = false;
  
  constructor( public http: HttpClient , @Inject('BASE_URL') baseUrl: string , private router: Router ) {   this.url =baseUrl;
this.url="https://localhost:7064/";
}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.params['id']);
  
    this .http.get<any>(this.url+ "api/"+"product/GetById?productId="+this.productId).subscribe(result => {
      this.product = result;
      console.log(JSON.stringify(result));
      
      this.calculateTotal();
    }, error => console.error(error));
    
  }

  calculateTotal(){
    this.product.batchProducts.forEach((batchProduct:any) =>{
    if(batchProduct.btachType==0){
      this.totalAmount = this.totalAmount + (batchProduct.count* batchProduct.price);
    }
    if(batchProduct.btachType==1){
      this.totalAmount = this.totalAmount - (batchProduct.count* batchProduct.price);
    }

     });
  }
  public routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }


  showPrintDiv(value:boolean){
    this.print = value;
  }




   printDiv(divName : string){
   // alert(divName);
    var printContents = document.getElementById(divName)  as HTMLElement;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents.innerHTML;

    window.print();

    document.body.innerHTML = originalContents;

    window.location.reload();

  }

  

}
