import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModule } from "@angular/core";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-type-update',
  templateUrl: './type-update.component.html',
  styleUrls: ['./type-update.component.css']
})
export class TypeUpdateComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  Cats : any;
  typeId:any;
  type:any;
  selectedCat : any;
  url:any;
  constructor(public http: HttpClient , private router: Router , @Inject('BASE_URL') baseUrl: string ) {  
this.url=environment.API_URL;

this.typeId = Number(this.route.snapshot.params['id']);



    this .http.get<any>(this.url+ "api/"+"category").subscribe(result => {
      this.Cats = result;
    }, error => console.error(error));
    
      this .http.get<any>(this.url+ "api/"+"type/GetById?Id="+this.typeId).subscribe(result => {
      this.type=  result;
      this.type.id = result.id;
      (<HTMLInputElement>document.getElementById("name")).value =  result.name;
      (<HTMLInputElement>document.getElementById("description")).value =result.description;
      this.selectedCat = result.categoryId;

      
    }, error => console.error(error));
 }

  async ngOnInit(): Promise<void> {


    
  }
  EditType(editType:any){
    console.log(editType);
    this.type.name = editType.controls.name.value;
      this.type.description = editType.controls.description.value;
      if(!editType.controls.category.value){
      this.type.categoryId = this.selectedCat;
     
      }else{ 
        this.type.categoryId = editType.controls.category.value;
      }
     

      this.http.put<any>(this.url+ "api/"+'type', this.type).subscribe(result => { 
        this.router.navigateByUrl('/Type');

         }, error => console.error(error));

        

  }
  public routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }

}
