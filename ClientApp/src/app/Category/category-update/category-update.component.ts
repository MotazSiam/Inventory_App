import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
  url:any;
  route: ActivatedRoute = inject(ActivatedRoute);
  public category: any;
  public categoryId : any;
  constructor(public http: HttpClient , private router: Router , @Inject('BASE_URL') baseUrl: string) {   this.url =baseUrl;
this.url="https://localhost:7064/";
 }

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.params['id']);
    this .http.get<any>(this.url+ "api/"+"category/GetById?Id="+this.categoryId).subscribe(result => {
      this.category=  result;

      (<HTMLInputElement>document.getElementById("name")).value =  result.name;
      (<HTMLInputElement>document.getElementById("description")).value =result.description;
    
    }, error => console.error(error));
  }
  EditCategory(category : any){

 //alert(category.controls.description.value);
 this.category.name =   category.controls.name.value;
 this.category.description = category.controls.description.value;

   
    this.http.put<any>(this.url+ "api/"+'category', this.category).subscribe(result => {
      this.router.navigateByUrl('/Category');
        }, error => console.error(error));
  }

  public routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }
}
