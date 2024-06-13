import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ProductListComponent implements OnInit {
  url: any;
  public products: Product[] = [];

  public isSpare: boolean = false;
  public types: any;
  public categories: any;
  public brands: any;


  public list: Product[] = [];
  search: string = "";
  sortName: boolean = false;

  constructor(public http: HttpClient, private router: Router, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl;
    this.url = "https://localhost:7064/";
  }

  ngOnInit(): void {

    this.http.get<Product[]>(this.url + "api/" + "brand").subscribe(result => {
      this.brands = result;
    }, error => console.error(error));
    this.http.get<Product[]>(this.url + "api/" + "category").subscribe(result => {
      this.categories = result;
    }, error => console.error(error));
    this.http.get<Product[]>(this.url + "api/" + "type").subscribe(result => {
      this.types = result;
    }, error => console.error(error));

    this.http.get<Product[]>(this.url + "api/" + "product").subscribe(result => {
      this.products = result;
      this.list = this.products;
    }, error => console.error(error));
  }
  getAll() {
    this.http.get<Product[]>(this.url + "api/" + "product").subscribe(result => {
      this.products = result;
      this.list = this.products;
    }, error => console.error(error));
  }
  getByBrand(id: any) {
    this.http.get<Product[]>(this.url + "api/" + "product/GetByBrand?id=" + id).subscribe(result => {
      this.products = result;
      this.list = this.products;
    }, error => console.error(error));
  }

  getByCategory(id: any) {
    this.http.get<Product[]>(this.url + "api/" + "product/GetByCategory?id=" + id).subscribe(result => {
      this.products = result;
      this.list = this.products;
    }, error => console.error(error));
  }
  getByType(id: any) {
    this.http.get<Product[]>(this.url + "api/" + "product/GetByType?id=" + id).subscribe(result => {
      this.products = result;
      this.list = this.products;
    }, error => console.error(error));
  }
  changeSearch(event: any) {
    this.search = event.target.value;
    this.products = this.list.filter((product: Product) =>
      product.name.toLowerCase().indexOf(this.search.toLowerCase().toString()) > -1 ||
      product.nameAR.toLowerCase().indexOf(this.search.toLowerCase().toString()) > -1 ||
      product.model.toLowerCase().indexOf(this.search.toLowerCase().toString()) > -1 ||
      product.size.toLowerCase().indexOf(this.search.toLowerCase().toString()) > -1 ||
      product.electricity.toLowerCase().indexOf(this.search.toLowerCase().toString()) > -1 ||
      product.engine.toLowerCase().indexOf(this.search.toLowerCase().toString()) > -1 ||
      product.brand.name.toLowerCase().indexOf(this.search.toLowerCase().toString()) > -1);

  }

  routeTo(link: any) {
    this.router.navigateByUrl('/' + link);
  }

  SortDESC(sortBy: string) {

    if (sortBy == "name") {
      this.products = this.products.sort((a, b) => a.name > b.name ? 1 : -1);
    }

    if (sortBy == "category") {
      this.products = this.products.sort((a, b) => a.category.name > b.category.name ? 1 : -1);
    }
    if (sortBy == "type") {
      this.products = this.products.sort((a, b) => a.type.name > b.type.name ? 1 : -1);
    }

    if (sortBy == "brand") {
      this.products = this.products.sort((a, b) => a.brand.name > b.brand.name ? 1 : -1);
    }
    if (sortBy == "model") {
      this.products = this.products.sort((a, b) => a.model > b.model ? 1 : -1);
    }

    if (sortBy == "size") {
      this.products = this.products.sort((a, b) => a.size > b.size ? 1 : -1);
    }



    if (sortBy == "code") {
      this.products = this.products.sort((a, b) => a.code > b.code ? 1 : -1);
    }

    if (sortBy == "electricity") {
      this.products = this.products.sort((a, b) => a.electricity > b.electricity ? 1 : -1);
    }
    if (sortBy == "engine") {
      this.products = this.products.sort((a, b) => a.engine > b.engine ? 1 : -1);
    }
    if (sortBy == "startStock") {
      this.products = this.products.sort((a, b) => a.startStock > b.startStock ? 1 : -1);
    }

  }


  Sort(sortBy: string) {

    if (sortBy == "name") {
      this.products = this.products.sort((a, b) => a.name > b.name ? -1 : 1);
    }

    if (sortBy == "category") {
      this.products = this.products.sort((a, b) => a.category.name > b.category.name ? -1 : 1);
    }
    if (sortBy == "type") {
      this.products = this.products.sort((a, b) => a.type.name > b.type.name ? -1 : 1);
    }

    if (sortBy == "brand") {
      this.products = this.products.sort((a, b) => a.brand.name > b.brand.name ? -1 : 1);
    }
    if (sortBy == "model") {
      this.products = this.products.sort((a, b) => a.model > b.model ? -1 : 1);
    }

    if (sortBy == "size") {
      this.products = this.products.sort((a, b) => a.size > b.size ? -1 : 1);
    }

    if (sortBy == "name") {
      this.products = this.products.sort((a, b) => a.name > b.name ? -1 : 1);
    }


    if (sortBy == "code") {
      this.products = this.products.sort((a, b) => a.code > b.code ? -1 : 1);
    }

    if (sortBy == "electricity") {
      this.products = this.products.sort((a, b) => a.electricity > b.electricity ? -1 : 1);
    }
    if (sortBy == "engine") {
      this.products = this.products.sort((a, b) => a.engine > b.engine ? -1 : 1);
    }
    if (sortBy == "startStock") {
      this.products = this.products.sort((a, b) => a.startStock > b.startStock ? -1 : 1);
    }

  }
  SortByName() {

    let on = this.sortName;

    if (!this.sortName) {

      on = true;
      this.products = this.products.sort((a, b) => a.name > b.name ? 1 : -1);

    }
    if (this.sortName) {
      on = false;
      this.products = this.products.sort((a, b) => a.name > b.name ? -1 : 1);
    }
    this.sortName = on;
  }


  changeSearchIsSpare(value: boolean) {
    this.isSpare = value;
    var req: searchDTO = {
      keyword: '',
      isSpare: this.isSpare
    };


    this.http.post<any>(this.url + "api/" + 'product/Search', req).subscribe(result => {
      this.products = result;
      this.list = this.products;
    }, error => console.error(JSON.stringify(error)));
  }
  SearchProduct(event: any) {
    var req: searchDTO = {
      keyword: event.target.value,
      isSpare: this.isSpare
    };


    this.http.post<any>(this.url + "api/" + 'product/Search', req).subscribe(result => {
      this.products = result;
      this.list = this.products;
    }, error => console.error(JSON.stringify(error)));

  }
  SortByCategory() {

    let on = this.sortName;

    if (!this.sortName) {

      on = true;
      this.products = this.products.sort((a, b) => a.name > b.name ? 1 : -1);

    }
    if (this.sortName) {
      on = false;
      this.products = this.products.sort((a, b) => a.name > b.name ? -1 : 1);
    }
    this.sortName = on;
  }

}





class searchDTO {

  keyword?: string;
  isSpare?: boolean;
}


class Product {
  id?: number;
  name: string = "";
  nameAR: string = "";
  description: string = "";
  model: string = "";
  size: string = "";
  code: string = "";
  electricity: string = "";
  engine: string = "";
  startStock: number = 0;
  brandId?: number;
  CategoryId?: number;
  TypeId?: number;
  isDeleted?: boolean;
  createdDate?: any;
  brand?: any;
  category?: any;
  type?: any;

  img?: string;
  unit?: string;
  isSpare?: boolean;
  spareForProducts?: boolean;
  cost?: number;
  price?: number;


}