import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModule } from "@angular/core";
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  url:any;
  public productId:any;
  public product:any;
  public list:any;
public brands: any;
public cats : any;
public types:any;
public TypesByCat:any;

public selectedCat:any;
public selectedType:any;
public selectedBrand: any;

  constructor(public http: HttpClient , private router: Router,  @Inject('BASE_URL') baseUrl: string) {   this.url =baseUrl;
this.url="https://localhost:7064/";

this.productId = Number(this.route.snapshot.params['id']);
    
this .http.get(this.url+ "api/"+"brand").subscribe(result => {
  this.brands = result;
}, error => console.error(error));
this .http.get(this.url+ "api/"+"category").subscribe(result => {
  this.cats = result;
}, error => console.error(error));
this .http.get(this.url+ "api/"+"type").subscribe(result => {
this.types = result;
}, error => console.error(error));

 this .http.get<any>(this.url+ "api/"+"product/GetById?productId="+this.productId).subscribe(result => {
  this.product=  result;
  
  //alert(JSON.stringify(this.product));


  this.selectedCat = result.categoryId;
  (<HTMLInputElement>document.getElementById("name")).value =  result.name;
  (<HTMLInputElement>document.getElementById("description")).value =result.description;
  (<HTMLInputElement>document.getElementById("nameAR")).value =  result.nameAR;
  (<HTMLInputElement>document.getElementById("model")).value =result.model;
  (<HTMLInputElement>document.getElementById("size")).value =  result.size;
  (<HTMLInputElement>document.getElementById("code")).value =result.code;
  (<HTMLInputElement>document.getElementById("electricity")).value =  result.electricity;
  (<HTMLInputElement>document.getElementById("engine")).value =result.engine;
  (<HTMLInputElement>document.getElementById("startStock")).value =  result.startStock;



  this.selectCategory(this.selectedCat);
  

}, error => console.error(error));

console.log(this.product);
}

// SelectedBrand(){
//   console.log(this.product);
//   if(this.brands != undefined){
//   alert(JSON.stringify(this.brands.length));
//   var brand =  this.brands.filter((brand: any) => brand.id == this.product.brandId);
//   this.selectedBrand= brand[0];
//   }
// }
  async ngOnInit(): Promise<void> {


  }
  EditProduct(editProduct:any){

    if(editProduct.controls.name.value){
      this.product.name =   editProduct.controls.name.value;
    }
    if(editProduct.controls.description.value){
      this.product.description =   editProduct.controls.description.value;
    }
    if(editProduct.controls.nameAR.value){
      this.product.nameAR =   editProduct.controls.nameAR.value;
    }
    if(editProduct.controls.model.value){
      this.product.model =   editProduct.controls.model.value;
    }
    if(editProduct.controls.size.value){
      this.product.size =   editProduct.controls.size.value;
    }
    if(editProduct.controls.code.value){
      this.product.code =   editProduct.controls.code.value;
    }
    if(editProduct.controls.electricity.value){
      this.product.electricity =   editProduct.controls.electricity.value;
    }
    if(editProduct.controls.engine.value){
      this.product.engine =   editProduct.controls.engine.value;
    }
    if(editProduct.controls.startStock.value){
      this.product.startStock =   editProduct.controls.startStock.value;
    }
    if(!editProduct.controls.type.value){
      this.product.typeId = this.selectedType;
      }else{ 
        this.product.typeId = editProduct.controls.type.value;
      }
      if(!editProduct.controls.brand.value){
        this.product.brandId = this.selectedBrand;
        }else{ 
          this.product.brandId = editProduct.controls.brand.value;
        }

    if(!editProduct.controls.category.value){
      this.product.categoryId = this.selectedCat;
      }else{ 
        this.product.categoryId = editProduct.controls.category.value;
      }


      this.http.put<any>(this.url+ "api/"+'product', this.product).subscribe(result => { 
        this.router.navigateByUrl('/Product');

         }, error => console.error(error));

    
  }

  selectCategory(categoryId:any){
   
    this.TypesByCat =this.types;
    this.TypesByCat =this.TypesByCat.filter((product: any) => product.categoryId == categoryId);
    
  }
  public routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }

}
