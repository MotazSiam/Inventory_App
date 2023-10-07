import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];
  public list: Category[] = [];
  search:String ="";
  public sortName!:Boolean;
  url:any;
  constructor( public http: HttpClient , private router: Router , @Inject('BASE_URL') baseUrl: string) {   this.url =baseUrl;
this.url="https://localhost:7064/";
 }

  ngOnInit(): void {

    this .http.get<Category[]>(this.url+ "api/"+"category").subscribe(result => {
      this.categories = result;
      this.list = this.categories;
    }, error => console.error(error));
  }

  routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }

  
  SortByName(){

    let on = this.sortName;
    if(!this.sortName){
      
      on= true;
      this.categories = this.categories.sort((a,b) => a.name > b.name ? 1 : -1);
      
    }
    if(this.sortName){
      on = false;
      this.categories =this.categories.sort((a,b) => a.name > b.name ? -1 : 1);
    }
    this.sortName= on;
  }

  changeSearch(event: any){
    this.search = event.target.value;
    this.categories= this.list.filter((category: Category) => 
    category.name.toLowerCase().indexOf(this.search.toLowerCase().toString()) > -1);

  }

}

class Category {
  id?: number;
  name: string ="";
  description?: string;
  isDeleted?: boolean;
  createdDate?: any;
  
}