import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bill-create',
  templateUrl: './bill-create.component.html',
  styleUrls: ['./bill-create.component.css']
})
export class BillCreateComponent implements OnInit {
  data:any;
  list:any;
  listCustomer:any;
  products:any;
  url:any;

  bill:any;
 billProducts:billProduct[] = [];
  customers:any;

  selectedCustomer:any;

  newBillProduct:billProduct= new billProduct;

  SelectedProductId!:number;

 
  totalAmount:number =0;

  keyword:string ="name";
  constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string ,private router: Router ) {  
this.url=environment.API_URL;
 }

  ngOnInit(): void {
    this .http.get<any>( this.url+ "api/"+"product").subscribe(result => {
      this.data = result;
      this.list = this.data;
     
    }, error => console.error(error));
    this .http.get<any>( this.url+ "api/"+"customer").subscribe(result => {
      this.customers = result;
      this.listCustomer = this.customers;
    }, error => console.error(error));

  }

  selectCustomer(item:any){
    this.selectedCustomer = item;

  }
  cancelSelectedCustomer(){
    this.selectedCustomer = null;
  }
  onChangeSearchCustomer(val: string){
    this.customers = this.listCustomer;
    if(val !=""){
      this.customers= this.listCustomer.filter((customer: any) => 
      customer.name.toLowerCase().indexOf(val.toLowerCase().toString()) > -1);
    }
  }
  onFocused(event:any){

  }

  selectProductEvent(item:any){
    this.SelectedProductId = item.id;
    this.newBillProduct.productId = item.id;

  }
  closeSelectedProduct(){
    this.newBillProduct = new billProduct;
  }
  onChangeSearch(val: string){
    this.data = this.list;
    if(val !=""){
      this.data= this.list.filter((product: any) => 
      product.name.toLowerCase().indexOf(val.toLowerCase().toString()) > -1);
    }
  }
  addPrice(event: any){
    this.newBillProduct.price = event.target.value;
   
  }

  addCount(event: any){
    this.newBillProduct.count = event.target.value;

  }

  addProduct(){

    this.newBillProduct.product = this.list.find((i: { id: number; }) => i.id === this.newBillProduct.productId);
   this.billProducts.push(this.newBillProduct);
  
   this.CaluclateTotal();
  
   this.data.forEach((value: { id: number; },index: any)=>{
    if(value.id==this.newBillProduct.productId) this.data.splice(index,1);
  });
  
  this.newBillProduct = new billProduct ;
  
  }

  CaluclateTotal(){
    this.totalAmount = 0;
    this.billProducts.forEach((billProduct:any) =>{
      this.totalAmount = this.totalAmount + (billProduct.count* billProduct.price);
     });
  }
  deleteProduct(id:number){
 
    this .http.get<any>( this.url+ "api/"+"product").subscribe(result => {
      this.products=  result;
    }, error => console.error(error));
   

    const index = this.products.findIndex((x:any) => x.id === id);
 

    this.data.push(this.products[index]);
   
    this.billProducts.forEach((value,index)=>{
      if(value.productId==id) this.billProducts.splice(index,1);
  });
  }

  public routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }
  addBill(newBill: any){
    this.CaluclateTotal();
   var bill :Bill = new Bill;

   console.log(this.selectedCustomer);

   bill.customerId =  this.selectedCustomer.id;

   bill.billDate = newBill.controls.billDate.value;
   bill.bookNo = newBill.controls.bookNo.value;
   bill.description = newBill.controls.description.value;

   bill.productCount = this.billProducts.length;
   bill.totalAmount = this.totalAmount;

   bill.billProducts =this.billProducts;

   console.log(bill);
   this.http.post<any>( this.url+ "api/"+'bill', bill).subscribe(result => {
    newBill.reset();
    this.router.navigateByUrl('/Bill');
       }, error => console.error(error));
  }
}



class Bill{
  customerId?: any;
  billDate?: any;
  bookNo?: any;
  description? : any;
  productCount?: any;
  totalAmount?: any;
  billProducts?:any;




}

class billProduct{
  price=0;
  count=1;
  productId:number =0;
  product?:any;

}
