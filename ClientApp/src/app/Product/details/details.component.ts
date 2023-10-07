import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  product:any;
  url:any;
  totalCount :number=0;
  totalAmount:number =0 ;
  productId : number = 0 ;
  constructor( public http: HttpClient , @Inject('BASE_URL') baseUrl: string , private router: Router ) {   this.url =baseUrl;
this.url="https://localhost:7064/";
}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.params['id']);
  
    this .http.get<any>(this.url+ "api/"+"product/GetById?productId="+this.productId).subscribe(result => {
      this.product = result;
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



}
