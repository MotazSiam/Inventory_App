import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-create',
  templateUrl: './type-create.component.html',
  styleUrls: ['./type-create.component.css']
})
export class TypeCreateComponent implements OnInit {
  url:any;
  Cats : any;
  constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string,private router: Router ) {   this.url =baseUrl;
this.url="https://localhost:7064/";

}

  ngOnInit(): void {
    this .http.get<any>( this.url+ "api/"+"category").subscribe(result => {
      this.Cats = result;
    }, error => console.error(error));
  }
  NewType(newType:any){
    if(newType.valid){

    
      let type = new Type;
      type.name = newType.controls.name.value;
      type.description = newType.controls.description.value;
      type.categoryId = newType.controls.category.value;
      
      this.http.post<any>( this.url+ "api/"+'type', type).subscribe(result => { 
        newType.reset();
        this.router.navigateByUrl('/Type');
         }, error => console.error(error));
      
      }
  }
  public routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }
}
class Type {
  id?: number;
  name?: string;
  description?: string;
  categoryId?:number;
  isDeleted?: boolean;
  createdDate?: any;
  category?:any;

}