import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  url:any;
  constructor(public http: HttpClient , @Inject('BASE_URL') baseUrl: string , private router: Router ) {   this.url =baseUrl;
this.url="https://localhost:7064/";
 }

  ngOnInit(): void {
  }

  NewCategory(NewCategory:any){
    if(NewCategory.valid){

    
    let cat = new Category;
    cat.name = NewCategory.controls.name.value;
    cat.description = NewCategory.controls.description.value;

    this.http.post<any>(this.url+ "api/"+'category', cat).subscribe(result => { 
      NewCategory.reset();
      this.router.navigateByUrl('/Category');
       }, error => console.error(error));
    
    }
  }

  public routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }
}


class Category {
  id?: number;
  name?: string;
  description?: string;
  isDeleted?: boolean;
  createdDate?: any;
  
}
