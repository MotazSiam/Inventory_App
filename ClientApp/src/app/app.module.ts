import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { IgxLegendModule, IgxCategoryChartModule } from 'igniteui-angular-charts';



import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import{BrandCreateComponent} from './Brand/brand-create/brand-create.component';
import { BrandListComponent } from './Brand/brand-list/brand-list.component';
import {ProductListComponent} from './Product/list/list.component';
import{ProductCreateComponent} from './Product/create/create.component';
import { CategoryListComponent } from './Category/category-list/category-list.component';
import { TypeListComponent } from './Type/type-list/type-list.component';
import { BatchListComponent } from './Batch/batch-list/batch-list.component';
import { BatchCreateComponent } from './Batch/batch-create/batch-create.component';
import { DetailsComponent } from './Product/details/details.component';
import { CategoryCreateComponent } from './Category/category-create/category-create.component';
import { TypeCreateComponent } from './Type/type-create/type-create.component';
import { BatchUpdateComponent } from './Batch/batch-update/batch-update.component';
import {BrandUpdateComponent } from './Brand/brand-update/brand-update.component';
import { CategoryUpdateComponent } from './Category/category-update/category-update.component';
import { TypeUpdateComponent } from './Type/type-update/type-update.component';
import { ProductUpdateComponent } from './Product/product-update/product-update.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthService } from './Services/auth.service';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { CustomerCreateComponent } from './Customer/customer-create/customer-create.component';
import { CustomerListComponent } from './Customer/customer-list/customer-list.component';
import { CustomerUpdateComponent } from './Customer/customer-update/customer-update.component';
import { BillCreateComponent } from './Bill/bill-create/bill-create.component';
import { BillListComponent } from './Bill/bill-list/bill-list.component';
import { BillDetailsComponent } from './Bill/bill-details/bill-details.component';
import {BillUpdateComponent} from './Bill/bill-update/bill-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    BrandCreateComponent,
    BrandListComponent,
    ProductListComponent,
    ProductCreateComponent,
    CategoryListComponent,
    TypeListComponent,
    BatchListComponent,
    BatchCreateComponent,
    DetailsComponent,
    CategoryCreateComponent,
    TypeCreateComponent,
    BatchUpdateComponent,
    BrandUpdateComponent,
    CategoryUpdateComponent,
    TypeUpdateComponent,
    ProductUpdateComponent,
    SignInComponent,
    CustomerCreateComponent,
    CustomerListComponent,
    CustomerUpdateComponent,
    BillCreateComponent,
    BillListComponent,
    BillDetailsComponent,
    BillUpdateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AutocompleteLibModule,
    IgxLegendModule,
    IgxCategoryChartModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      {path: 'Brand/Create', component: BrandCreateComponent},
      {path: 'Brand', component:BrandListComponent},
      {path: 'Product/Create', component: ProductCreateComponent},
      {path:'Product', component:ProductListComponent},
      {path: 'Product/details/:id' ,component: DetailsComponent},
      {path:'Category', component:CategoryListComponent},
      {path:'Category/Create', component:CategoryCreateComponent},
      {path:'Type', component:TypeListComponent},
      {path:'Batch' , component:BatchListComponent},
      {path:'Batch/Create', component: BatchCreateComponent},
      {path:'Type/Create', component:TypeCreateComponent},
      {path:'Batch/Update/:id', component:BatchUpdateComponent},
      {path:'Brand/Update/:id',component:BrandUpdateComponent},
      {path:"Category/Update/:id",component:CategoryUpdateComponent},
      {path:"Type/Update/:id", component:TypeUpdateComponent},
      {path:"Product/Update/:id",component:ProductUpdateComponent},
      {path:"SignIn", component:SignInComponent},
      {path:"Customer", component:CustomerListComponent},
      {path:"Customer/Create", component:CustomerCreateComponent},
      {path:"Customer/Update/:id" , component:CustomerUpdateComponent},
      {path:"Bill/Create" , component : BillCreateComponent},
      {path:"Bill", component:BillListComponent},
      {path:"Bill/Detail/:id", component:BillDetailsComponent},
      {path:"Bill/Update/:id", component:BillUpdateComponent}
    ])
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor , multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
