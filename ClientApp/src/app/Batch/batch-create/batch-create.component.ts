import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-batch-create',
  templateUrl: './batch-create.component.html',
  styleUrls: ['./batch-create.component.css']
})
export class BatchCreateComponent implements OnInit {

  data:any;
  list:any;
  products:any;
  url:any;
  batchProducts:BatchProduct[] =[];

  newBatchProduct : BatchProduct= new BatchProduct;
  SelectedProductId!:number;


  totalAmount:number =0;

  keyword:string ="name";
  constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string ,private router: Router ) {  this.url =baseUrl;
this.url="https://localhost:7064/";
 }

  ngOnInit(): void {
    this .http.get<any>( this.url+ "api/"+"product").subscribe(result => {
      this.data = result;
      this.list = this.data;
     
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

    
  }



  selectProductEvent(item:any){
    alert(JSON.stringify(item));
    this.SelectedProductId = item.id;
    this.newBatchProduct.productId = item.id;
    alert( this.SelectedProductId );
  }
  closeSelectedProduct(){
    this.newBatchProduct = new BatchProduct;
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

    this.newBatchProduct.product = this.list.find((i: { id: number; }) => i.id === this.newBatchProduct.productId);
   this.batchProducts.push(this.newBatchProduct);


   this.data.forEach((value: { id: number; },index: any)=>{
    if(value.id==this.newBatchProduct.productId) this.data.splice(index,1);
});

this.newBatchProduct = new BatchProduct ;

}


// CaluclateTotal(){
//   this.totalAmount = 0;
//   this.batchProducts.forEach((batchProduct:BatchProduct) =>{
//     this.totalAmount = this.totalAmount + (batchProduct.count* batchProduct.price);
//    });
// }


  deleteProduct(id:number){
 
    this .http.get<any>( this.url+ "api/"+"product").subscribe(result => {
      this.products=  result;
    }, error => console.error(error));
   

    const index = this.products.findIndex((x:any) => x.id === id);
 

    this.data.push(this.products[index]);
   
    this.batchProducts.forEach((value,index)=>{
      if(value.productId==id) this.batchProducts.splice(index,1);
  });

 

  // var findList = this.list.find((x: { id: number; name:string;}) => x.id === id);
  // alert("find List length = "+ findList.length);
  // alert(JSON.stringify( findList[0]));
  // this.data.push(product);
  // alert(JSON.stringify(product));
  // alert(this.data.length);
  }


  NewBatch(newBatch: any){
    console.log(newBatch);
    if (newBatch.valid) {
      var batch = new Batch;
      batch.bookNo = newBatch.controls.bookNo.value;
      batch.supplierName = newBatch.controls.supplierName.value;
      batch.invoiceNo = newBatch.controls.invoiceNo.value;
      batch.inventoryName = newBatch.controls.inventoryName.value;
      batch.btachType = newBatch.controls.type.value;
      batch.operationDate = newBatch.controls.operationDate.value;
      batch.productCount = this.batchProducts.length;
    
      batch.BatchProducts = this.batchProducts;



         this.http.post<any>( this.url+ "api/"+'batch', batch).subscribe(result => {
          newBatch.reset();
          this.router.navigateByUrl('/Batch');
             }, error => console.error(error));
   







      
      alert(newBatch.controls.type.value);
      this.batchProducts= [];

      this .http.get<any>( this.url+ "api/"+"product").subscribe(result => {
        this.data = result;
        this.list = this.data;
       
      }, error => console.error(error));

      newBatch.reset();
    }
    
  }
  public routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }

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
  bookNo!:string;
  invoiceNo!:string;
  supplierName!:string;
  inventoryName!:string;
  btachType!:number;
  operationDate!:any;
  productCount!:number;
 

  BatchProducts: BatchProduct[] = [];
}