import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent {
  model = {
    name: "",
    lastName: "",
    address: "",
    age: "",
  };
  url:any;
  route: ActivatedRoute = inject(ActivatedRoute);
  public brand: any;
  public brandId : any;

  public base64Image: String | null | undefined = null;;
  public src :String | null | undefined = null;;
  constructor(public http: HttpClient , private router: Router ,  @Inject('BASE_URL') baseUrl: string) {  this.url =baseUrl;
this.url="https://localhost:7064/";
}
  ngOnInit(): void {
    this.brandId = Number(this.route.snapshot.params['id']);
    this .http.get<any>(this.url+ "api/"+"brand/GetById?Id="+this.brandId).subscribe(result => {
      this.brand=  result;

      (<HTMLInputElement>document.getElementById("name")).value =  result.name;
      (<HTMLInputElement>document.getElementById("description")).value =result.description;
      this.src = result.img;
      this.base64Image = result.img;
    }, error => console.error(error));
  }

  EditBrand(brand:any){
   // alert(brand.controls.description.value);
    this.brand.name =   brand.controls.name.value;
    this.brand.description = brand.controls.description.value;
    this.brand.img= this.base64Image?.toString();

   
    this.http.put<any>(this.url+ "api/"+'brand', this.brand).subscribe(result => { 
      this.router.navigateByUrl('/Brand');
       }, error => console.error(error));
  }
  
  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = () => {
       // String const fileStr = reader.result?.toString();
        this.base64Image = reader.result?.toString();
      this.src = this.base64Image;
      this.brand.img = this.base64Image;
        // this.brand.id=123;
        //alert( this.brand.img?.length);
    };
}

public routeTo(link:any){
  this.router.navigateByUrl('/'+link);
}
}


