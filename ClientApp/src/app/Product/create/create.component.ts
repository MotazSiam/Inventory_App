import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class ProductCreateComponent implements OnInit {

public product: Product ={
  name: '',
  nameAR: '',
  description: '',
  model: '',
  size: '',
  code: '',
  electricity: '',
  engine: '',
  startStock: 0
};
url:any;
public list: Product[] = [];
public brands: Brand[] = [];
public cats : any;
public types:any;
public TypesByCat:any;
search:String ="";
  constructor(public http: HttpClient,  @Inject('BASE_URL') baseUrl: string ,private router: Router )   {   this.url =baseUrl;
this.url="https://localhost:7064/";
}

  ngOnInit(): void {

    this .http.get<Brand[]>(this.url+ "api/"+"brand").subscribe(result => {
        this.brands = result;
      }, error => console.error(error));
      this .http.get<Brand[]>(this.url+ "api/"+"category").subscribe(result => {
        this.cats = result;
      }, error => console.error(error));
      this .http.get<Brand[]>(this.url+ "api/"+"type").subscribe(result => {
        this.types = result;
       // alert(this.types.length);
      }, error => console.error(error));
  }

  changeBrand(event:any){
   console.log( event.target);
   // alert( event.target.value);
  }

  selectCategory(categoryId:any){
    //alert(categoryId);
    this.TypesByCat =this.types;
    this.TypesByCat =this.TypesByCat.filter((product: any) => product.categoryId == categoryId);
    //alert(this.TypesByCat.length);
  }
   AddProduct(newProduct : any)
  {

this.product.brandId = newProduct.controls.brand.value;
    this.product.name =   newProduct.controls.name.value;
    this.product.nameAR = newProduct.controls.nameAR.value;
    this.product.model =   newProduct.controls.model.value;
    this.product.description = newProduct.controls.description.value;
    this.product.size =   newProduct.controls.size.value;
    this.product.code = newProduct.controls.code.value;
  
    this.product.electricity = newProduct.controls.electricity.value;

    this.product.engine = newProduct.controls.engine.value;
    this.product.startStock = newProduct.controls.startStock.value;

    this.product.categoryId = newProduct.controls.category.value;
    this.product.typeId = newProduct.controls.type.value;

    //alert("category value  = "+ newProduct.controls.category.value +";");




    this.http.post<any>(this.url+ "api/"+'product', this.product).subscribe(result => {
      this.router.navigateByUrl('/Product');
    }, error => console.error(error));
  }
  public routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }

}

class Product {
  id?: number;
  name: string ="";
  nameAR: string ="";
  description: string ="";
  model: string ="";
  size: string = "";
  code: string="";
  electricity: string ="";
  engine : string ="";
  startStock : number =0;
  brandId?: number;
  categoryId?: number;
  typeId?: number;
 
}

interface Brand {
  id: number;
  name: string;
  description?: string;
  img?: string ;
  isDeleted: boolean;
  createdDate: any;
  
}