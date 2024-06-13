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


base64Image: string | undefined;
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

  console.log(result);

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
  (<HTMLInputElement>document.getElementById("price")).value =  result.price;
  (<HTMLInputElement>document.getElementById("cost")).value =  result.cost;
  (<HTMLInputElement>document.getElementById("spareForProducts")).value =  result.spareForProducts;
  (<HTMLInputElement>document.getElementById("unit")).value =  result.unit;



  if(result.isSpare ==0){
    (<HTMLInputElement>document.getElementById("product")).click();
  }
  if(result.isSpare ==1){
    (<HTMLInputElement>document.getElementById("spare")).click();
  }

  this.base64Image = this.url+result.img;


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

  handleUpload(event: any) {
    const file = event.target.files[0];

    alert(JSON.stringify(file.type));
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = () => {
        this.base64Image = reader.result?.toString();

        var request : ImgRequest ={
          img : this.base64Image,
          fileType : file.type
        };
    
        this.http.post<any>(this.url+"api/"+'product/UploadImg', request).subscribe(result => {
          
          this.product.img = result.imgUrl;
        }, error => console.error( JSON.stringify(error)));
 

    };

   
  }
  EditProduct(editProduct:any){

    console.log(editProduct);

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


      if(editProduct.controls.unit.value){
        this.product.unit = editProduct.controls.unit.value;
       }
      
      if(editProduct.controls.isSpare.value == 1){
        this.product.isSpare = true;
      }else{
        this.product.isSpare = false;
      }
      if(editProduct.controls.cost.value){
        this.product.cost = editProduct.controls.cost.value;
       }
       if(editProduct.controls.price.value){
        this.product.price = editProduct.controls.price.value;
       }
       if(editProduct.controls.spareForProducts.value){
        this.product.spareForProducts = editProduct.controls.spareForProducts.value;
       }
    
      // this.product.cost = editProduct.controls.cost.value;
      // this.product.price = editProduct.controls.price.value;
      // this.product.spareForProducts = editProduct.controls.spareForProducts.value;

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

interface ImgRequest{
  img?:string;
  fileType ?: string;
}