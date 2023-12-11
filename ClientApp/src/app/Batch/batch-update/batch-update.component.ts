import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-batch-update',
  templateUrl: './batch-update.component.html',
  styleUrls: ['./batch-update.component.css']
})
export class BatchUpdateComponent implements OnInit {

  url:any;
  route: ActivatedRoute = inject(ActivatedRoute);
  batchId : number = 0 ;
  data:any;
  list:any;
  products:any;

  batch:any;
  batchProducts:any;

  newBatchProduct :productBuffer = new productBuffer();
  SelectedProductId!:number;


  totalAmount:number =0;

  keyword:string ="name";
  constructor(public http: HttpClient ,  private router: Router ,  @Inject('BASE_URL') baseUrl: string) {   this.url =baseUrl;
this.url="https://localhost:7064/";

}

   ngOnInit(): void {

    // this .http.get<any>(this.url+ "api/"+"product").subscribe(result => {
    //   this.data = result;
    //   this.list = this.data;
     
    // }, error => console.error(error));

    this.batchId = Number(this.route.snapshot.params['id']);
    this.http.get<any>( this.url+ "api/"+'batch/GetById?id='+this.batchId).subscribe(result => { 
      console.log("result");
      console.log(result);
      this.batch = result;
      this.batchProducts = this.batch.batchProduct;

    //  alert(JSON.stringify(this.batchProducts));
      this.addProducts();

      (<HTMLInputElement>document.getElementById("bookNo")).value = result.bookNo;
      (<HTMLInputElement>document.getElementById("invoiceNo")).value = result.invoiceNo;
      (<HTMLInputElement>document.getElementById("supplierName")).value =result.supplierName;
      (<HTMLInputElement>document.getElementById("inventoryName")).value =result.inventoryName;
      (<HTMLInputElement>document.getElementById("operationDate")).value =formatDate(result.operationDate,'yyyy-MM-dd',"en-US");
  
  
      if(result.btachType ==0){
        (<HTMLInputElement>document.getElementById("type1")).click();
      }
      if(result.btachType ==1){
        (<HTMLInputElement>document.getElementById("type2")).click();
      }
    
    }, error => console.error(error));
    
    let radios = document.querySelectorAll('.radio');
    let labels = document.querySelectorAll('.label');
    let ball = document.querySelector('.ball');
    let prevRadio:any, prevLabel:any;
    radios.forEach((radio, index) => {
      radio.addEventListener('click', function(e) {
        if (prevRadio) prevRadio.classList.toggle('active');
        if (prevLabel) prevLabel.classList.toggle('active');
        radio.classList.toggle('active');
        prevRadio = radio;
        labels[index].classList.toggle('active');
        prevLabel = labels[index];
        ball!.className = `ball pos${index}`;
      });
    });

 
   // this.addProduct();

  }


  addProducts(){
   
    console.log( this.batchProducts);
    
    this .http.get<any>(this.url+ "api/"+"product").subscribe(result => {
      this.data = result;
      this.list = this.data;
      this.batchProducts.forEach((batchProduct:BatchProduct) =>{
        batchProduct.product =  this.data.find((x:any) => x.id === batchProduct.productId);
        let indexData  = this.data.findIndex((x:any)=>   x.id === batchProduct.productId);
       // alert(batchProduct.productId);
        this.data.splice(indexData,1);

       });
     
    }, error => console.error(error));
    
  }



  selectProductEvent(item:any){
    //alert(JSON.stringify(item));
    this.SelectedProductId = item.id;
    this.newBatchProduct.productId = item.id;
    console.log("batch.productId =" +   this.newBatchProduct.productId);

  }
  closeSelectedProduct(){
    this.newBatchProduct = new productBuffer;
  }
  onChangeSearch(val: string){
    this.data = this.list;
    if(val !=""){
      this.data= this.list.filter((product: any) => 
      product.name.toLowerCase().indexOf(val.toLowerCase().toString()) > -1);
    }
  }
  onFocused(event:any){

  }




  addCount(event: any){
    this.newBatchProduct.count = event.target.value;

  }

  addProduct(){
    //alert("newBatchProduct = "+this.newBatchProduct.productId);

    this.newBatchProduct.product = this.list.find((i: { id: number; }) => i.id === this.newBatchProduct.productId);
    this.newBatchProduct.productName = this.newBatchProduct.product.name;
    this.newBatchProduct.productNameAR = this.newBatchProduct.product.nameAR;
   this.batchProducts.push(this.newBatchProduct);



   this.data.forEach((value: { id: number; },index: any)=>{
    if(value.id==this.newBatchProduct.productId) this.data.splice(index,1);});

this.newBatchProduct = new productBuffer ;

}

ReomveProductFromSearch(){
 
   
}





  deleteProduct(id:number){
    
    this .http.get<any>(this.url+ "api/"+"product").subscribe(result => {
      this.products=  result;
      const index = this.products.findIndex((x:any) => x.id === id);

      console.log(this.products[index]);
      this.data.push(this.products[index]);
     
      this.batchProducts.forEach((value:any,index: any)=>{
        if(value.productId==id) this.batchProducts.splice(index,1);
    });

    }, error => console.error(error));
   

  

  

  // var findList = this.list.find((x: { id: number; name:string;}) => x.id === id);
  // alert("find List length = "+ findList.length);
  // alert(JSON.stringify( findList[0]));
  // this.data.push(product);
  // alert(JSON.stringify(product));
  // alert(this.data.length);
  }


 EditBatch(newBatch: any){
  console.log(this.batch);
    console.log(newBatch);
   

      var batch = new Batch;
      if(newBatch.controls.bookNo.value){
      batch.bookNo = newBatch.controls.bookNo.value;
      }else{
        batch.bookNo = this.batch.bookNo;
      }
      if(newBatch.controls.invoiceNo.value){
        batch.invoiceNo = newBatch.controls.invoiceNo.value;
        }else{
          batch.invoiceNo = this.batch.invoiceNo;
        }
      if(newBatch.controls.supplierName.value){ batch.supplierName = newBatch.controls.supplierName.value;}else{
        batch.supplierName = this.batch.supplierName;
      }
      if(newBatch.controls.inventoryName.value){
        batch.inventoryName =  newBatch.controls.inventoryName.value;
      }else{
        batch.inventoryName = this.batch.inventoryName;
      }
      if( newBatch.controls.type.value){
        batch.btachType = newBatch.controls.type.value;
      }else{
        batch.btachType = this.batch.batchType;
      }

      if(newBatch.controls.operationDate.value){
        batch.operationDate = newBatch.controls.operationDate.value;
      }else{
        batch.operationDate = this.batch.operationDate;
      }


      batch.productCount = this.batchProducts.length;
      
      batch.BatchProducts = this.batchProducts;

      batch.batchId = this.batchId;

      console.log(batch);
         this.http.put<any>(this.url+ "api/"+'batch', batch).subscribe(result => { 
          this.router.navigateByUrl('/Batch');
            }, error => console.error(error));
   




      this.batchProducts= [];

      this .http.get<any>(this.url+ "api/"+"product").subscribe(result => {
        this.data = result;
        this.list = this.data;
       
      }, error => console.error(error));

      newBatch.reset();
    }
    
  

}

class productBuffer{

  batchId!:number;
  productId!:number;
  count: number = 1;
  btachType!:number;
  operationDate!:any;
productName!:string;
productNameAR!:string;
  product:any; 
}
class BatchProduct{
  batchId!:number;
  productId!:number;
  count: number = 1;
  btachType!:number;
  operationDate!:any;

  product:any;
}

class Batch{
  batchId!:number;
  bookNo!:string;
  invoiceNo!:string;
  supplierName!:string;
  inventoryName!:string;
  btachType!:number;
  operationDate!:any;
  productCount!:number

  BatchProducts: BatchProduct[] = [];
}