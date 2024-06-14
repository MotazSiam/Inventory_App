import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  public brands: Brand[] = [];
  public list: Brand[] = [];
  search:String ="";
  public sortName!:Boolean;
  url:any;
  constructor( public http: HttpClient , private router: Router  , @Inject('BASE_URL') baseUrl: string) {
this.url=environment.API_URL;

    this.sortName= false;
   }

    ngOnInit(): void {

      this .http.get<Brand[]>(this.url+ "api/"+"brand").subscribe(result => {
          this.brands = result;
          this.list = this.brands;
        }, error => console.error(error));
    }

  routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }
  SortByName(){

    let on = this.sortName;
    if(!this.sortName){
      
      on= true;
      this.brands = this.brands.sort((a,b) => a.name > b.name ? 1 : -1);
      
    }
    if(this.sortName){
      on = false;
      this.brands =this.brands.sort((a,b) => a.name > b.name ? -1 : 1);
    }
    this.sortName= on;
  }
  // sortDESCByName(){
   
  //   this.brands = this.brands.sort((name) => 0 - this.brands.length);
  // }
  // sortByName(){
   
  //   this.brands = this.brands.sort((a,b) => a.name > b.name ? 1 : -1);
  // }

  changeSearch(event: any){
    this.search = event.target.value;
    this.brands= this.list.filter((brand: Brand) => 
    brand.name.toLowerCase().indexOf(this.search.toLowerCase().toString()) > -1);

  }
    


}

interface Brand {
  id: number;
  name: string;
  description?: string;
  img?: string ;
  isDeleted: boolean;
  createdDate: any;
  
}
