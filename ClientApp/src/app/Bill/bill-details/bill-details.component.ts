import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {
  url:any;
  bill:any;
  route: ActivatedRoute = inject(ActivatedRoute);
  bill_Id? : number;
  constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string ,private router: Router ) {  
    this.url=environment.API_URL;
     }
  ngOnInit(): void {
    this.bill_Id = Number(this.route.snapshot.params['id']);
  
    this .http.get<any>(this.url+ "api/"+"bill/GetById?bill_Id="+this.bill_Id).subscribe(result => {
      this.bill = result;
    }, error => console.error(error));
  }
  public routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }

}
