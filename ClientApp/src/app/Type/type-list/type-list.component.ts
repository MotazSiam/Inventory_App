import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {
  url:any;
  public types: Type[] = [];
  public list: Type[] = [];
  
  search:String ="";
  public sortName!:Boolean;
  constructor( public http: HttpClient , private router: Router , @Inject('BASE_URL') baseUrl: string) {  this.url =baseUrl;
this.url="https://localhost:7064/";

 }

  ngOnInit(): void {
    this .http.get<Type[]>(this.url+ "api/"+"type").subscribe(result => {
      this.types = result;
      this.list = this.types;
    }, error => console.error(error));
  }

  changeSearch(event: any){
    this.search = event.target.value;
    this.types= this.list.filter((category: Type) => 
    category.name.toLowerCase().indexOf(this.search.toLowerCase().toString()) > -1);

  }

  SortByName(){

    let on = this.sortName;
    if(!this.sortName){
      
      on= true;
      this.types = this.types.sort((a,b) => a.name > b.name ? 1 : -1);
      
    }
    if(this.sortName){
      on = false;
      this.types =this.types.sort((a,b) => a.name > b.name ? -1 : 1);
    }
    this.sortName= on;
  }

  routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }
}

class Type {
  id?: number;
  name: string ="";
  description?: string;
  isDeleted?: boolean;
  createdDate?: any;
  category?:any;
  categoryId?:number;  
  
}
